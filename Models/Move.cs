using System.ComponentModel.DataAnnotations;
// TODO Implement Move changes per generation i.e. Power from 45 to 35
// Ex: https://pokeapi.co/api/v2/move/22/
public class Move
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public required PokemonType Type { get; set; }
    public int Power { get; set; }
    public float Accuracy { get; set; }
    public int PP { get; set; }
    public required string Damage_Class { get; set; }
    public int Priority { get; set; }
    public List<Pokemon>? Pokemon { get; }
}