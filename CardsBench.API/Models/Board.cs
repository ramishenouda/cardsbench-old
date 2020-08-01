using System.Collections.Generic;

namespace CardsBench.API.Models
{
    public class Board
    {
        public string Id { get; set; }
        public ICollection<string> UsersAndRoles { get; set; }
        // Can be a team or a user.
        public string OwnerId { get; set; }
    }
}