using Microsoft.EntityFrameworkCore.Migrations;

namespace CardsBench.API.Migrations
{
    public partial class CreatedABoardEntityWithManyToManyRelationshipWithTheUserEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
                {
                    BoardId = table.Column<string>(nullable: false),
                    BoardName = table.Column<string>(nullable: false),
                    OwnerId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boards", x => x.BoardId);
                });

            migrationBuilder.CreateTable(
                name: "UserBorads",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    BoardId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBorads", x => new { x.UserId, x.BoardId });
                    table.ForeignKey(
                        name: "FK_UserBorads_Boards_BoardId",
                        column: x => x.BoardId,
                        principalTable: "Boards",
                        principalColumn: "BoardId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBorads_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserBorads_BoardId",
                table: "UserBorads",
                column: "BoardId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserBorads");

            migrationBuilder.DropTable(
                name: "Boards");
        }
    }
}
