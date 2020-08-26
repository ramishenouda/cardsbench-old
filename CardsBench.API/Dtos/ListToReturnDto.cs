using System.Collections.Generic;
using CardsBench.API.Models;

namespace CardsBench.API.Dtos
{
    public class ListToReturnDto
    {
        public string ListId { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
        public ICollection<Card> Cards { get; set; }
    }
}
