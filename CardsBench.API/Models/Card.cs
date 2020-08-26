using System.ComponentModel.DataAnnotations.Schema;

namespace CardsBench.API.Models
{
    public class Card
    {
        public string CardId { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
    }
}
