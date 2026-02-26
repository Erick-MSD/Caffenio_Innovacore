using Microsoft.EntityFrameworkCore;
using Caffenio.API.Models;

namespace Caffenio.API.Data;

public class CaffenioDbContext : DbContext
{
    public CaffenioDbContext(DbContextOptions<CaffenioDbContext> options) : base(options)
    {
    }

    // DbSets
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuraciones adicionales si son necesarias
    }
}
