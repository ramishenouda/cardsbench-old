using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace CardsBench.API.Models
{
    public class User : IdentityUser
    {
        public string KnownAs { get; set; }
        public string Introduction { get; set; }
        public string Gender { get; set; }
        public string ProfilePicture { get; set; }
        public ICollection<string> Boards { get; set; }
        public DateTime LastActive { get; set; }
    }
}
