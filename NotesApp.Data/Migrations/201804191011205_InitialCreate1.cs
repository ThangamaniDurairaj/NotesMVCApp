namespace NotesApp.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblNotes", "ImageUrl", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblNotes", "ImageUrl");
        }
    }
}
