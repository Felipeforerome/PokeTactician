namespace PokeTactician.DTOs;
public class PokemonDtoOut
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int Hp { get; set; }
    public int Att { get; set; }
    public int Deff { get; set; }
    public int SpAtt { get; set; }
    public int SpDeff { get; set; }
    public int Spe { get; set; }
    public required string Type1 { get; set; }
    public string? Type2 { get; set; }
    public bool Mythical { get; set; }
    public bool Legendary { get; set; }
    public bool BattleOnly { get; set; }
    public bool Mega { get; set; }
    public required List<string> KnowableMoves { get; set; } = new List<string>();
    public required List<string> Games { get; set; } = new List<string>();
}