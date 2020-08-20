using Microsoft.EntityFrameworkCore.Migrations;

namespace CardsBench.API.Migrations
{
    public partial class AddedBoardBackground : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Background",
                table: "Boards",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Background",
                table: "Boards");
        }
    }
}
