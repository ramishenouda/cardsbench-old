namespace CardsBench.API.Models
{
    public class List
    {
        public int ListId { get; set; }
        public string Title { get; set; }
        public Board Board { get; set; }
        public string BoardId { get; set; }
    }
}