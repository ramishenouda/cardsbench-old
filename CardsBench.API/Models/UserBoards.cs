namespace CardsBench.API.Models
{
    public class UserBoards
    {
        public string UserId { get; set; }
        public User User { get; set; }
        
        public string BoardId { get; set; }
        public Board Board { get; set; }
    }
}
