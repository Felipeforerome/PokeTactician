namespace PokeTactician.DTOs;
public class PokemonDtoIn
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Hp { get; set; }
    public int Att { get; set; }
    public int Deff { get; set; }
    public int SpAtt { get; set; }
    public int SpDeff { get; set; }
    public int Spe { get; set; }
    public int Type1Id { get; set; }
    public int? Type2Id { get; set; }
    public bool Mythical { get; set; }
    public bool Legendary { get; set; }
    public bool BattleOnly { get; set; }
    public bool Mega { get; set; }
    public required List<int> MoveIds { get; set; }
    public required List<int> GameIds { get; set; }
}