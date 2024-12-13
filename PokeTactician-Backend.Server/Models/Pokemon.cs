using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

public class Pokemon : IValidatableObject
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
    public required int Type1Id { get; set; }
    public required PokemonType Type1 { get; set; }
    public int? Type2Id { get; set; }
    public PokemonType? Type2 { get; set; }
    public bool Mythical { get; set; }
    public bool Legendary { get; set; }
    public bool BattleOnly { get; set; }
    public bool Mega { get; set; }
    public required List<Move> KnowableMoves { get; set; } = new List<Move>();
    public required List<Game> Games { get; set; } = new List<Game>();

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Type1 != null && Type2 != null && Type1.Id == Type2.Id)
        {
            yield return new ValidationResult("Type1 and Type2 must be different.", new[] { nameof(Type1), nameof(Type2) });
        }
    }
}