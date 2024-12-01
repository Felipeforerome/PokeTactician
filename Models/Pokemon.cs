using System.ComponentModel.DataAnnotations;

public class Pokemon
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }

    public int Hp { get; set; }
    public int Att { get; set; }
    public int Deff { get; set; }
    public int SpAtt { get; set; }
    public int SpDeff { get; set; }
    public int Spe { get; set; }
    public required List<PokemonType> Types { get; set; }
    public bool Mythical { get; set; }
    public bool Legendary { get; set; }
    public bool BattleOnly { get; set; }
    public bool Mega { get; set; }

    public List<Move>? KnowableMoves { get; set; }
}