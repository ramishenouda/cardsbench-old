using System.Threading.Tasks;

namespace CardsBench.API.Data
{
    public class CardsBenchRepository : ICardsBenchRepository
    {
        private readonly DataContext _context;

        public CardsBenchRepository(DataContext context)
        {
            this._context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}