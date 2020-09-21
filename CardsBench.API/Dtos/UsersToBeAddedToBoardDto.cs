using System.Collections.Generic;

namespace CardsBench.API.Dtos
{
    public class UsersToBeAddedToBoardDto
    {
        public List<string> UsersEmails { get; set; }
        public string BoardId { get; set; }
    }
}
