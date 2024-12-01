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
    }
}