namespace PokeTactician.DTOs;

public class MoveDtoOut
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }
    public int Power { get; set; }
    public float Accuracy { get; set; }
    public int PP { get; set; }
    public required string Damage_class { get; set; }
    public int Priority { get; set; }
}