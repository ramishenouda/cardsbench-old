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
                    ListId = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Order = table.Column<int>(nullable: false),
                    ListBoardId = table.Column<string>(nullable: true),
                    ListId1 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => new { x.ListId, x.CardId });
                    table.ForeignKey(
                        name: "FK_Cards_Lists_ListBoardId_ListId1",
                        columns: x => new { x.ListBoardId, x.ListId1 },
                        principalTable: "Lists",
                        principalColumns: new[] { "BoardId", "ListId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cards_ListBoardId_ListId1",
                table: "Cards",
                columns: new[] { "ListBoardId", "ListId1" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cards");
        }
    }
}
