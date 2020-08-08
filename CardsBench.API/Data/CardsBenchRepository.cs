using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardsBench.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CardsBench.API.Data
{
    public class CardsBenchRepository : ICardsBenchRepository
    {
        private readonly DataContext _context;

        public CardsBenchRepository(DataContext context)
        {
            this._context = context;
        }

        public async Task<Board> GetBoard(string id)
        {
            return await _context.Boards.FirstOrDefaultAsync(x => x.BoardId == id);
        }

        public async Task<List<Board>> GetUserBoards(string userId)
        {
            var boardsId = await _context.UserBorads.Where(x => x.UserId == userId).Select(x => x.BoardId).ToListAsync();

            var boardsToReturn = await _context.Boards.Where(x => boardsId.Contains(x.BoardId)).ToListAsync();

            return boardsToReturn;
        }

        public async Task<bool> UserInBoard(string userId, string boardId)
        {
            var board = await _context.UserBorads.FirstOrDefaultAsync(x => x.UserId == userId && x.BoardId == boardId);
            
            if(board != null)
                return true;
            
            return false;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Remove<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}