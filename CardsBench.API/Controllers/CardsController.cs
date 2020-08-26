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
    [Route("api/{userid}/{boardId}/{listid}/[controller]")]
    public class CardsController : ControllerBase
    {
        private readonly ICardsBenchRepository _repo;
        private readonly IMapper _mapper;

        public CardsController(DataContext context, ICardsBenchRepository repo,
            UserManager<User> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{cardId}")]
        public async Task<IActionResult> GetCard([FromRoute]CardsControllerParamsDto paramsDto, string cardId)
        {
            if(paramsDto.UserId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            if(!await _repo.UserInBoard(paramsDto.UserId, paramsDto.BoardId))
                return Unauthorized();

            var list = await _repo.GetList(paramsDto.BoardId, paramsDto.ListId);

            if (list == null)
                return BadRequest("Card not found.");

            var card = GetCard(list, cardId);

            if (card != null)
            {
                var cardToReturn = _mapper.Map<CardToReturnDto>(card);
                cardToReturn.ListId = paramsDto.ListId;
                
                return Ok(cardToReturn);
            }
            
            return BadRequest("Card not found.");
        }

        [HttpPost]
        public async Task<IActionResult> AddCard([FromRoute]CardsControllerParamsDto paramsDto, CardToAddDto cardDto)
        {
            if(paramsDto.UserId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            if(!await _repo.UserInBoard(paramsDto.UserId, paramsDto.BoardId))
                return Unauthorized();

            var list = await _repo.GetList(paramsDto.BoardId, paramsDto.ListId);

            if(list == null)
                return BadRequest("Board or list not found, refresh the page.");

            Card card = _mapper.Map<Card>(cardDto);

            string cardId = DateTime.Now.ToFileTime().ToString();
            cardId = cardId.Substring(cardId.Length / 2, cardId.Length / 4);

            card.Order = list.Cards.Count;
            card.CardId = paramsDto.ListId + cardId;

            list.Cards.Add(card);

            if(await _repo.SaveAll())
            {
                var cardToReturn = _mapper.Map<CardToReturnDto>(card);
                cardToReturn.ListId = paramsDto.ListId;

                return Ok(cardToReturn);
            }

            return BadRequest("Couldn't add the card. try refreshing the page.");
        }

        [HttpDelete("{cardId}")]
        public async Task<IActionResult> DeleteCard([FromRoute]CardsControllerParamsDto paramsDto, string cardId)
        {
            if(paramsDto.UserId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            if(!await _repo.UserInBoard(paramsDto.UserId, paramsDto.BoardId))
                return Unauthorized();

            var list = await _repo.GetList(paramsDto.BoardId, paramsDto.ListId);

            if(list == null)
                return BadRequest("board not found, refresh the page.");

            Card card = GetCard(list, cardId);

            if(card == null)
                return BadRequest("List not found or you can't delete that list.");

            _repo.Remove(card);

            foreach (var c in list.Cards)
            {
                if(c.Order > card.Order)
                    c.Order--;
            }

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the list.");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCard([FromRoute]CardsControllerParamsDto paramsDto, CardForUpdateDto cardDto)
        {
            if(paramsDto.UserId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            if(!await _repo.UserInBoard(paramsDto.UserId, paramsDto.BoardId))
                return BadRequest();

            var list = await _repo.GetList(paramsDto.BoardId, paramsDto.ListId);

            if(list == null)
                return BadRequest();

            var card = GetCard(list, cardDto.CardId);

            if(card == null)
                return BadRequest();

            if(card.Order != cardDto.Order)
            {
                if(cardDto.Order > list.Cards.Count)
                    return BadRequest();

                int newOrder = cardDto.Order;

                // Moving the card to the right.
                if(card.Order < newOrder)
                {
                    newOrder++;
                    foreach (var cardInList in list.Cards)
                    {
                        if(cardInList.Order < newOrder && cardInList.Order > card.Order)
                            cardInList.Order--;
                    }
                }

                // Moving the list to the left.
                else if(card.Order > newOrder)
                {
                    newOrder--;
                    int currentOrder = card.Order;
                    foreach (var cardInList in list.Cards)
                    {
                        if(cardInList.Order > newOrder && cardInList.Order < currentOrder)
                            cardInList.Order++;
                    }
                }
            }

            _mapper.Map(cardDto, card);

            if(await _repo.SaveAll())
                return Ok();

            return BadRequest("Couldn't add the list. Try refreshing the page.");
        }

        static Card GetCard(List list, string cardId)
        {
            Card card = null;
            foreach (var c in list.Cards)
            {
                if(c.CardId == cardId)
                {
                    card = c;
                    break;
                }
            }

            return card;
        }
    }
}
