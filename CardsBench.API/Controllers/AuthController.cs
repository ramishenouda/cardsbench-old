using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CardsBench.API.Dtos;
using CardsBench.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CardsBench.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IPasswordHasher<User> _passwordHash;
        private readonly IMapper _mapper;

        public AuthController(IConfiguration config,
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
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegistrationDto userForRegistrationDto)
        {
            User userToRegister = _mapper.Map<User>(userForRegistrationDto);
            userToRegister.UserName = userForRegistrationDto.Email;

            IdentityResult result = await _userManager.CreateAsync(userToRegister, userForRegistrationDto.Password);

            if (result.Succeeded)
            {
                var userToReturn = _mapper.Map<UserToReturnDto>(userToRegister);

                return Ok(userToReturn);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            if (ModelState.IsValid)
            {
                User userToLogin = await _userManager.FindByEmailAsync(userForLoginDto.Email);

                if (userToLogin == null)
                    return Unauthorized();

                Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.CheckPasswordSignInAsync(userToLogin, userForLoginDto.Password, false);

                if (result.Succeeded)
                {
                    var userToReturn = _mapper.Map<UserToReturnDto>(userToLogin);
                    return Ok(new
                    {
                        token = GenerateJwtToken(userToLogin),
                        user = userToReturn
                    });
                }

                return Unauthorized();
            }

            return BadRequest(ModelState);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(14),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
