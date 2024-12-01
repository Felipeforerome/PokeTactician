using System.ComponentModel.DataAnnotations;

public class PokemonType
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Pokemon>? Pokemons { get; } = [];
}