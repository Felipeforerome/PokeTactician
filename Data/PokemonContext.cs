using Microsoft.EntityFrameworkCore;

namespace PokeTactician_Backend.Models
{
    public class PokemonContext : DbContext
    {
        public PokemonContext(DbContextOptions<PokemonContext> options)
            : base(options)
        {
        }

        public DbSet<Pokemon> Pokemons { get; set; } = null!;
        public DbSet<Move> Moves { get; set; } = null!;
        public DbSet<PokemonType> Types { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships for Type1 and Type2 required because it's not obvious from the names which goes to which
            modelBuilder.Entity<Pokemon>()
                .HasOne(p => p.Type1)
                .WithMany(t => t.PrimaryTypePokemons)
                .HasForeignKey("Type1Id")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Pokemon>()
                .HasOne(p => p.Type2)
                .WithMany(t => t.SecondaryTypePokemons)
                .HasForeignKey("Type2Id")
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
    }
}