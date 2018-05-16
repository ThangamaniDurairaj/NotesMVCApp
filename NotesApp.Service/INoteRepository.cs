using NotesApp.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApp.Service
{
    public interface INoteRepository
    {
        List<tblNote> GetNotes();       
        Task<int> AddNote(tblNote model);
        Task<int> UpdateNote(tblNote model);     
        Task<int> DeleteNote(tblNote model);
    }
}
