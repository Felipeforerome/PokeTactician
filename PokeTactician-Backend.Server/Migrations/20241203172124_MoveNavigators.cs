using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PokeTactician_Backend.Migrations
{
    /// <inheritdoc />
    public partial class MoveNavigators : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Types_Type1Id",
                table: "Pokemons");

            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Types_Type2Id",
                table: "Pokemons");

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Types_Type1Id",
                table: "Pokemons",
                column: "Type1Id",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Types_Type2Id",
                table: "Pokemons",
                column: "Type2Id",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Types_Type1Id",
                table: "Pokemons");

            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_Types_Type2Id",
                table: "Pokemons");

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Types_Type1Id",
                table: "Pokemons",
                column: "Type1Id",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_Types_Type2Id",
                table: "Pokemons",
                column: "Type2Id",
                principalTable: "Types",
                principalColumn: "Id");
        }
    }
}
