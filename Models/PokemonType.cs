using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class PokemonType
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<TypeEffectiveness>? Attacking { get; set; } = new List<TypeEffectiveness>();
    public List<TypeEffectiveness>? Defending { get; set; } = new List<TypeEffectiveness>();

    public List<Pokemon>? PrimaryTypePokemons { get; set; } = new List<Pokemon>();
    public List<Pokemon>? SecondaryTypePokemons { get; set; } = new List<Pokemon>();
    public List<Move>? Moves { get; set; } = new List<Move>();
    // Computed property to aggregate both PrimaryTypePokemons and SecondaryTypePokemons
    [NotMapped]
    public IEnumerable<Pokemon> Pokemons => (PrimaryTypePokemons ?? Enumerable.Empty<Pokemon>()).Concat(SecondaryTypePokemons ?? Enumerable.Empty<Pokemon>());
}

public class TypeEffectiveness
{
    public int Id { get; set; }
    public int AttackingTypeId { get; set; }
    public required PokemonType AttackingType { get; set; }
    public int DefendingTypeId { get; set; }
    public required PokemonType DefendingType { get; set; }
    public double Effectiveness { get; set; }
}