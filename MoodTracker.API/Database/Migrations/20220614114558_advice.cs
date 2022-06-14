using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoodTracker.API.Migrations
{
    public partial class advice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Advices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Advices", x => x.Id)
                        .Annotation("SqlServer:Clustered", true);
                });

            migrationBuilder.InsertData(
                table: "Advices",
                columns: new[] { "Id", "CategoryId", "Description" },
                values: new object[,]
                {
                    { 1, 1, "Porada do pracy" },
                    { 2, 2, "Porada do hobby" },
                    { 3, 3, "Porada do rodziny" },
                    { 4, 4, "Porada do przyjaciół" },
                    { 5, 5, "Porada do lifestyle" },
                    { 6, 6, "Porada do samorealizacji" },
                    { 7, 7, "Porada do zdrowia" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Advices");
        }
    }
}
