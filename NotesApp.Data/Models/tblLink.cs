using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApp.Data.Models
{
    public class tblLink
    {
        public int id { get; set; }
        public int LinkID { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
    }
}
