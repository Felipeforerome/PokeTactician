namespace PokeTactician_Backend.DTOs;
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
    public required PokemonTypeDtoOut Type1 { get; set; }
    public PokemonTypeDtoOut? Type2 { get; set; }
    public bool Mythical { get; set; }
    public bool Legendary { get; set; }
    public bool BattleOnly { get; set; }
    public bool Mega { get; set; }
    public required List<int> KnowableMoves { get; set; } = new List<int>();
    public required List<int> Games { get; set; } = new List<int>();
}