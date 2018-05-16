using NotesApp.Data.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApp.Data.Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext() : base("NotesAppDBConn", throwIfV1Schema: false)
        {

        }
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
        public DbSet<tblNote> tblNotes { get; set; }
        public DbSet<tblLink> tblLinks { get; set; }
    }
}
