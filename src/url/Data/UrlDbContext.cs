using Microsoft.EntityFrameworkCore;
using URLService.Entities;

namespace URLService.Data;

public class UrlDbContext: DbContext {
    public UrlDbContext(DbContextOptions<UrlDbContext> options) : base(options) {}

    public DbSet<URL> URLs { get; set; }
}