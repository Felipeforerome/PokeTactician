namespace PokeTactician.DTOs;

public class PokemonTypeChartAttacking
{
    public required string Type { get; set; }
    public required Dictionary<string, double> Effectiveness { get; set; }
}