
public class Game
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Pokemon>? Pokemon { get; }
}