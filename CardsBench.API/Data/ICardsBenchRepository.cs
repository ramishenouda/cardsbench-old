using System.Collections.Generic;
using System.Threading.Tasks;
using CardsBench.API.Models;

namespace CardsBench.API.Data
{
    public interface ICardsBenchRepository
    {
        void Add<T>(T entity) where T : class;
        void Remove<T>(T entity) where T : class;
        Task<Board> GetBoard(string id);
        Task<List<Board>> GetUserBoards(string id);
        Task RemoveUserBoard(string userId);
        Task<bool> UserInBoard(string userId, string boardId);
        Task<List> GetList(string boardId, string listId);
        Task<Card> GetCard(string boardId, string listId, string cardId);
        Task<bool> SaveAll();
    }
}
