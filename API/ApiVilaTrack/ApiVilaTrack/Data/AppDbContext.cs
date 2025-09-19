using Microsoft.EntityFrameworkCore;
using ApiVilaTrack.Entities;

namespace ApiVilaTrack.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Catalog> Catalogs => Set<Catalog>();
    public DbSet<StockProduct> StockProducts => Set<StockProduct>();
    public DbSet<Status> Statuses => Set<Status>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Catalog>()
            .HasKey(c => c.InternalCode);

        // FK: StockProduct.InternalCode -> Catalog.InternalCode
        modelBuilder.Entity<StockProduct>()
            .HasOne(sp => sp.Catalog)
            .WithMany()
            .HasForeignKey(sp => sp.InternalCode)
            .HasPrincipalKey(c => c.InternalCode);

        // FK: StockProduct.StatusId -> Status.Id
        modelBuilder.Entity<StockProduct>()
            .HasOne(sp => sp.StatusEntity)
            .WithMany()
            .HasForeignKey(sp => sp.StatusId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<Status>()
            .HasKey(s => s.Id);
    }
}