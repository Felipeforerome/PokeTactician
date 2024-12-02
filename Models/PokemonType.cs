using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class PokemonType
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }


    public List<Pokemon>? PrimaryTypePokemons { get; set; } = new List<Pokemon>();
    public List<Pokemon>? SecondaryTypePokemons { get; set; } = new List<Pokemon>();

    // Computed property to aggregate both PrimaryTypePokemons and SecondaryTypePokemons
    [NotMapped]
    public IEnumerable<Pokemon> Pokemons => (PrimaryTypePokemons ?? Enumerable.Empty<Pokemon>()).Concat(SecondaryTypePokemons ?? Enumerable.Empty<Pokemon>());
}