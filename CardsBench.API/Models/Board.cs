using System.Collections.Generic;

namespace CardsBench.API.Models
{
    public class Board
    {
        public string BoardId { get; set; }
        public string BoardName { get; set; }
        public string OwnerId { get; set; }
        public ICollection<UserBoards> UserBoards { get; set; }
    }
}