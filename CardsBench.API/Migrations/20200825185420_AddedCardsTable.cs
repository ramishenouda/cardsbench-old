using Microsoft.EntityFrameworkCore.Migrations;

namespace CardsBench.API.Migrations
{
    public partial class AddedCardsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    CardId = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Order = table.Column<int>(nullable: false),
                    ListBoardId = table.Column<string>(nullable: true),
                    ListId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => new {x.CardId, x.ListId});
                    table.ForeignKey(
                        name: "FK_Cards_Lists_ListBoardId_ListId",
                        columns: x => new { x.ListBoardId, x.ListId },
                        principalTable: "Lists",
                        principalColumns: new[] { "BoardId", "ListId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cards_ListBoardId_ListId",
                table: "Cards",
                columns: new[] { "ListBoardId", "ListId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cards");
        }
    }
}
