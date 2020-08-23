using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CardsBench.API.Data;
using CardsBench.API.Dtos;
using CardsBench.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CardsBench.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/{userid}/boards/{boardid}/[controller]")]
    public class ListsController : ControllerBase
    {
        private readonly ICardsBenchRepository _repo;

        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public ListsController(DataContext context, ICardsBenchRepository repo,
            UserManager<User> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
            _userManager = userManager;
        }

        
        [HttpGet("{listId}")]
        public async Task<IActionResult> GetList(string userId, string boardId, int listId)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var currentUser = await _userManager.FindByIdAsync(userId);

            if(currentUser == null)
                return Unauthorized();

            var list = await _repo.GetList(boardId, listId);
            
            if (list != null)
            {
                var listToReturn = _mapper.Map<ListToReturnDto>(list);
                return Ok(listToReturn);
            }
            
            return BadRequest("List not found.");
        }

        [HttpPost]
        public async Task<IActionResult> CreateList(string userId, string boardId, ListForCreationDto listForCreationDto)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var currentUser = await _userManager.FindByIdAsync(userId);

            if(currentUser == null)
                return Unauthorized();

            var board = await _repo.GetBoard(boardId);

            if(board == null)
                return BadRequest("board not found, refresh the page.");

            if(!await _repo.UserInBoard(userId, boardId))
                return Unauthorized();

            List list = _mapper.Map<List>(listForCreationDto);
            
            board.Lists.Add(list);

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Couldn't add the list. try refreshing the page.");
        }

        [HttpDelete("{listId}")]
        public async Task<IActionResult> DeleteList(string userId, string boardId, int listId)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var currentUser = await _userManager.FindByIdAsync(userId);

            if(currentUser == null)
                return Unauthorized();

            var board = await _repo.GetBoard(boardId);

            if(board == null)
                return BadRequest("board not found, refresh the page.");

            if(!await _repo.UserInBoard(userId, boardId))
                return Unauthorized();

            var list = await _repo.GetList(boardId, listId);

            if(list == null)
                return BadRequest("List not found or you can't delete that list.");

            _repo.Remove(list);

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the list.");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateList(string userId, string boardId, ListForUpdateDto listForUpdateDto)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var currentUser = await _userManager.FindByIdAsync(userId);

            if(currentUser == null)
                return Unauthorized();

            var board = await _repo.GetBoard(boardId);

            if(board == null)
                return BadRequest("board not found, refresh the page.");

            if(!await _repo.UserInBoard(userId, boardId))
                return Unauthorized();

            var list = await _repo.GetList(boardId, listForUpdateDto.ListId);

            _mapper.Map(listForUpdateDto, list);

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Couldn't add the list. try refreshing the page.");
        }

    }
}
