using System;

namespace CardsBench.API.Dtos
{
    public class UserToReturnDto
    {
        public string Email { get; set; }
        public string KnownAs { get; set; }
        public string Introduction { get; set; }
        public string Gender { get; set; }
        public DateTime LastActive { get; set; }
    }
}