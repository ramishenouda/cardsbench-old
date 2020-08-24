using System.Security.Claims;
using CardsBench.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CardsBench.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using CardsBench.API.Dtos;
using System;
using AutoMapper;

namespace CardsBench.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/{userid}/[controller]")]
    public class BoardsController : ControllerBase
    {
        private readonly ICardsBenchRepository _repo;

        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public BoardsController(DataContext context, ICardsBenchRepository repo,
            UserManager<User> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
            _userManager = userManager;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(string userId, BoardForCreationDto boardForCreation)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var currentUser = await _userManager.FindByIdAsync(userId);

            if(currentUser == null)
                return Unauthorized();

            string boardId = DateTime.Now.ToFileTime().ToString();

            boardId = boardId.Substring(boardId.Length / 2, boardId.Length / 4) + userId.Substring(2, 4);

            Board board = new Board
            {
                OwnerId = userId,
                BoardName = boardForCreation.Name,
                BoardId = boardId
            };

            currentUser.UserBoards = new List<UserBoards>
            {
                new UserBoards
                {
                    User = currentUser,
                    Board = board
                }
            };

            _repo.Add(board);

            if (await _repo.SaveAll())
            {
                var boardToReturn = _mapper.Map<BoardToReturnDto>(board);
                return Ok(new {board = boardToReturn});
            }

            return BadRequest("Something is wrong, please try again.");
        }

        [HttpPost("addusers")]
        public async Task<IActionResult> AddUsersToBoard(string userId, UsersToBeAddedToBoardDto usersToBeAddedToBoard)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            Board board = await _repo.GetBoard(usersToBeAddedToBoard.BoardId);

            if(board == null)
                return BadRequest("Board not found");
            
            var currentLoggedInUser = await _userManager.FindByIdAsync(userId);

            if(currentLoggedInUser == null)
                return Unauthorized();

            if(board.OwnerId != userId)
                return Unauthorized();

            foreach (var userEmail in usersToBeAddedToBoard.UsersEmail)
            {
                var userToAdd = await _userManager.FindByEmailAsync(userEmail);       
         
                if (userToAdd == null)
                    return BadRequest(userToAdd.Email + " is not found.");

                userToAdd.UserBoards = new List<UserBoards>
                {
                    new UserBoards
                    {
                        User = userToAdd,
                        Board = board
                    }
                };
            }


            if(await _repo.SaveAll())
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{boardId}")]
        public async Task<IActionResult> DeleteBoard(string userId, string boardId)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var board = await _repo.GetBoard(boardId);

            if(board == null)
                return BadRequest("Board not found");

            if(userId != board.OwnerId)
                return Unauthorized("Only board owner can delete the board");
            
            _repo.Remove(board);

            if(await _repo.SaveAll())
                return NoContent();

            return BadRequest("An error occurred during deletion. Please try again.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBoard(string userId, string id)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var board = await _repo.GetBoard(id);

            if(board == null)
                return BadRequest();

            if(await _repo.UserInBoard(userId, id))
            {
                var boardToReturn = _mapper.Map<BoardToReturnDto>(board);

                return Ok(new 
                {
                    board = boardToReturn
                });
            }

            return Unauthorized();
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateBoard(string userId, BoardForUpdateDto boardForUpdate)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var board = await _repo.GetBoard(boardForUpdate.BoardId);
            
            if(board == null)
                return BadRequest("Board not found or You don't have access to that board.");

            if(board.OwnerId != userId)
                return Unauthorized();

            if(await _repo.UserInBoard(userId, boardForUpdate.BoardId))
                _mapper.Map(boardForUpdate, board);
            
            if(await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating board {boardForUpdate.BoardId} failed on save");
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserBoards(string userId)
        {
            if(userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);

            if(user == null)
                return BadRequest("Please logout and login again.");

            var boardsFromRepo = await _repo.GetUserBoards(userId);

            var boardsToReturn = _mapper.Map<IEnumerable<BoardToReturnDto>>(boardsFromRepo);

            return Ok(new {
                boards = boardsToReturn
            });
        }
    }
}
