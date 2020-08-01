using System;
using System.ComponentModel.DataAnnotations;

namespace CardsBench.API.Dtos
{
    public class UserForRegistrationDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(4)]
        public string Password { get; set; }

        [Required]
        [MinLength(4)]
        public string Gender { get; set; }

        [Required]
        [MinLength(2)]
        public string KnownAs { get; set; }

        public DateTime LastActive { get; set; }

        public UserForRegistrationDto()
        {
            LastActive = DateTime.Now;
        }
    }
}