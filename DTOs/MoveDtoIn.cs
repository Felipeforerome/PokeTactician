namespace PokeTactician_Backend.DTOs;

public class MoveDtoIn
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required int TypeId { get; set; }
    public int Power { get; set; }
    public float Accuracy { get; set; }
    public int PP { get; set; }
    public required string Damage_Class { get; set; }
    public int Priority { get; set; }
}