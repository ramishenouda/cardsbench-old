using System;
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
    [Route("api/{userid}/{boardid}/[controller]")]
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
        public async Task<IActionResult> GetList(string userId, string boardId, string listId)
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
        public async Task<IActionResult> AddList(string userId, string boardId, ListForCreationDto listForCreationDto)
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

            string listId = DateTime.Now.ToFileTime().ToString();
            listId = listId.Substring(listId.Length / 2, listId.Length / 4);

            list.Order = board.Lists.Count;
            list.ListId = boardId + listId;
            
            var listToReturn = _mapper.Map<ListToReturnDto>(list);
            board.Lists.Add(list);

            if(await _repo.SaveAll())
                return Ok(new {list = listToReturn});

            return BadRequest("Couldn't add the list. try refreshing the page.");
        }

        [HttpDelete("{listId}")]
        public async Task<IActionResult> DeleteList(string userId, string boardId, string listId)
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

            foreach (var l in board.Lists)
            {
                if(l.Order > list.Order)
                    l.Order--;
            }

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

            if(listForUpdateDto.Order > board.Lists.Count)
                return BadRequest();

            if(list.Order != listForUpdateDto.Order)
            {
                int newOrder = listForUpdateDto.Order;

                // Moving the list to the right.
                if(list.Order < newOrder)
                {
                    newOrder++;
                    foreach (var listInBored in board.Lists)
                    {
                        if(listInBored.Order < newOrder)
                            listInBored.Order--;
                    }
                }

                // Moving the list to the left.
                if(list.Order > newOrder)
                {
                    newOrder--;
                    int currentOrder = list.Order;
                    foreach (var listInBored in board.Lists)
                    {
                        if(listInBored.Order > newOrder && listInBored.Order < currentOrder)
                            listInBored.Order++;
                    }
                }
            }

            _mapper.Map(listForUpdateDto, list);

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Couldn't add the list. Try refreshing the page.");
        }
    }
}
