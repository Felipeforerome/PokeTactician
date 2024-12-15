namespace PokeTactician.DTOs;

public class PokemonTypeChartDefending
{
    public required string Type { get; set; }
    public required Dictionary<string, double> Effectiveness { get; set; }
}