using CardsBench.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CardsBench.API.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Board> Boards { get; set; }
        public DbSet<UserBoards> UserBorads { get; set; }
        public DbSet<List> Lists { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserBoards>()             
                .HasKey(x => new {x.UserId, x.BoardId});
            
            builder.Entity<List>()
                .HasKey(l => new { l.BoardId, l.ListId });
        }
    }
}
