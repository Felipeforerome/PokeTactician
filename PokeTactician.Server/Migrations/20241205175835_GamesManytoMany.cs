using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PokeTactician.Migrations
{
    /// <inheritdoc />
    public partial class GamesManytoMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Pokemons_PokemonId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_PokemonId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "PokemonId",
                table: "Games");

            migrationBuilder.CreateTable(
                name: "GamePokemon",
                columns: table => new
                {
                    GamesId = table.Column<int>(type: "integer", nullable: false),
                    PokemonId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GamePokemon", x => new { x.GamesId, x.PokemonId });
                    table.ForeignKey(
                        name: "FK_GamePokemon_Games_GamesId",
                        column: x => x.GamesId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GamePokemon_Pokemons_PokemonId",
                        column: x => x.PokemonId,
                        principalTable: "Pokemons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GamePokemon_PokemonId",
                table: "GamePokemon",
                column: "PokemonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GamePokemon");

            migrationBuilder.AddColumn<int>(
                name: "PokemonId",
                table: "Games",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Games_PokemonId",
                table: "Games",
                column: "PokemonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Pokemons_PokemonId",
                table: "Games",
                column: "PokemonId",
                principalTable: "Pokemons",
                principalColumn: "Id");
        }
    }
}
