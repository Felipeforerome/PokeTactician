using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PokeTactician.Migrations
{
    /// <inheritdoc />
    public partial class TypeEffectiveness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TypeEffectivenesses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AttackingTypeId = table.Column<int>(type: "integer", nullable: false),
                    DefendingTypeId = table.Column<int>(type: "integer", nullable: false),
                    Effectiveness = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeEffectivenesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TypeEffectivenesses_Types_AttackingTypeId",
                        column: x => x.AttackingTypeId,
                        principalTable: "Types",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TypeEffectivenesses_Types_DefendingTypeId",
                        column: x => x.DefendingTypeId,
                        principalTable: "Types",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TypeEffectivenesses_AttackingTypeId",
                table: "TypeEffectivenesses",
                column: "AttackingTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TypeEffectivenesses_DefendingTypeId",
                table: "TypeEffectivenesses",
                column: "DefendingTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TypeEffectivenesses");
        }
    }
}
