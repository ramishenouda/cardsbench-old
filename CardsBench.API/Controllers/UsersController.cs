using System.Threading.Tasks;
using CardsBench.API.Dtos;
using CardsBench.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using System.Security.Claims;
using CardsBench.API.Data;

namespace CardsBench.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ICardsBenchRepository _repo;
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IPasswordHasher<User> _passwordHash;
        private readonly IMapper _mapper;

        public UsersController(IConfiguration config,
            ICardsBenchRepository repo,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IPasswordHasher<User> passwordHash,
            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _passwordHash = passwordHash;
            _mapper = mapper;
            _config = config;
            _repo = repo;
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> Update(string id, UserForUpdateDto userForUpdateDto)
        {
            if(id != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            User user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return BadRequest("User not found");

            if (!string.IsNullOrEmpty(userForUpdateDto.Email))
                user.Email = userForUpdateDto.Email;
            else
                ModelState.AddModelError("errors", "Email cannot be empty");

            if (!string.IsNullOrEmpty(userForUpdateDto.Password))
                user.PasswordHash = _passwordHash.HashPassword(user, userForUpdateDto.Password);
            else
                ModelState.AddModelError("errors", "Password cannot be empty");

            if (!string.IsNullOrEmpty(userForUpdateDto.Gender))
                user.Gender = userForUpdateDto.Gender;
            else
                ModelState.AddModelError("errors", "Gender cannot be empty");

            if (!string.IsNullOrEmpty(userForUpdateDto.KnownAs))
                user.KnownAs = userForUpdateDto.KnownAs;
            else
                ModelState.AddModelError("errors", "KnownAs cannot be empty");

            if (ModelState.ErrorCount == 0)
            {
                IdentityResult result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                    return Ok("Updated successfully");
                else
                    return BadRequest(result.Errors);
            }

            return BadRequest(ModelState);
        }

        [Authorize]
        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);
            var userToReturn = _mapper.Map<UserToReturnDto>(user);

            return Ok(userToReturn);
        }
        
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var currentUserId = (User.FindFirst(ClaimTypes.NameIdentifier).Value).ToString();

            if(id != currentUserId) 
                return Unauthorized();

            User user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return BadRequest("user not found");

            await _repo.RemoveUserBoard(id);
            
            IdentityResult result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
                return Ok("We're sorry to see you go...");

            else
                return BadRequest(result.Errors);
        }
    }
}
