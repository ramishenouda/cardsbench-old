using System.Collections.Generic;

namespace CardsBench.API.Dtos
{
    public class BoardToReturnDto
    {
        public string BoardId { get; set; }
        public string BoardName { get; set; }
        public string OwnerId { get; set; }
        public string Background { get; set; }
        public ICollection<ListToReturnDto> Lists { get; set; }
    }
}
