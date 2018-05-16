using NotesApp.Data.Infrastructure;
using NotesApp.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApp.Service
{
    public class NotesRepository : INoteRepository
    {
        ApplicationDbContext dbContext = new ApplicationDbContext();

        public List<tblNote> GetNotes()
        {
            var list = new List<tblNote>();
            try
            {
                list = dbContext.tblNotes.OrderBy(a => a.ID).ToList<tblNote>();
                return list;
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return list;
        }

        public async Task<int> AddReminder(tblNote model)
        {
            int i = 0;
            try
            {
                tblNote tbl = dbContext.tblNotes.Where<tblNote>(a => a.ID == model.ID).First();
                tbl.Reminder = model.Reminder;
                i = await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return i;
        }

        public async Task<int> AddNote(tblNote model)
        {
            int i = 0;
            try
            {
                if (model.Mode == "1")
                {
                    dbContext.tblNotes.Add(model);
                    i = await dbContext.SaveChangesAsync();
                    return i;
                }

                if (model.Mode == "2")
                {
                    tblNote tbl = dbContext.tblNotes.Where<tblNote>(a => a.ID == model.ID).First();
                    tbl.Title = model.Title;
                    tbl.Content = model.Content;
                    tbl.UserID = model.UserID;
                    tbl.ColorCode = model.ColorCode;
                    tbl.IsTrash = model.IsTrash;
                    tbl.IsPin = model.IsPin;
                    tbl.IsDelete = model.IsDelete;
                    tbl.IsArchive = model.IsArchive;
                    tbl.Reminder = model.Reminder;
                    tbl.ImageUrl = model.ImageUrl;
                    //tbl.Reminder = Convert.ToString(DateTime.Now.ToShortTimeString());
                    //tbl.Reminder = Convert.ToString(DateTime.Now.ToString("MMMM"))+", "+ Convert.ToString(DateTime.Now.ToShortTimeString());

                    i = await dbContext.SaveChangesAsync();
                    return i;
                }

                if (model.Mode == "3")
                {
                    tblNote tbl = dbContext.tblNotes.Where<tblNote>(a => a.ID == model.ID).First();
                    dbContext.tblNotes.Remove(tbl);
                    i = await dbContext.SaveChangesAsync();
                }

            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return i;
        }

        public Task<int> UpdateNote(tblNote model)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteNote(tblNote model)
        {
            throw new NotImplementedException();
        }
    }
}
