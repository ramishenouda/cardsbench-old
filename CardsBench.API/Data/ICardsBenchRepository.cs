using System.Threading.Tasks;

namespace CardsBench.API.Data
{
    public interface ICardsBenchRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
    }
}