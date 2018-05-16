using NotesApp.Data.Infrastructure;
using NotesApp.Data.Log;
using NotesApp.Data.Models;
using NotesApp.Service;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Routing;

namespace NotesApp.Controllers
{
    //[RoutePrefix("api/NotesApi")]
    [Authorize]
    public class NotesApiController : ApiController
    {
        private INoteRepository _noteRepository;

        public NotesApiController()
        {
            _noteRepository = new NotesRepository();
        }

        //GET: api/NotesApi/getNotes
        [Route("api/NotesApi/GetNotes")]
        public List<tblNote> GetNotes()
        {
            var list = new List<tblNote>();

            try
            {
                list = _noteRepository.GetNotes();
                return list;
            }
            catch (Exception ex)
            {
                Logger.Write(ex.ToString());
            }

            return list;
        }

        //POST: api/NotesApi/AddNote
        public async Task<int> AddNote(tblNote model)
        {
            int i = 0;

            try
            {
                i = await _noteRepository.AddNote(model);
                return i;
            }
            catch (Exception ex)
            {
                Logger.Write(ex.ToString());
            }
            return i;

        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<string> PostImage()
        {

            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            string fileSaveLocation = HttpContext.Current.Server.MapPath("~/Images");

            CustomMultipartFormDataStreamProvider provider = new CustomMultipartFormDataStreamProvider(fileSaveLocation);
            List<string> files = new List<string>();

            await Request.Content.ReadAsMultipartAsync(provider);

            var data = provider.FileData.Count;

            var Title = provider.FormData["Title"];
            var Content = provider.FormData["Content"];
            var ColorCode = provider.FormData["ColorCode"];
            var ID = provider.FormData["ID"];
            var IsPin = provider.FormData["IsPin"];
            string Reminder = provider.FormData["Reminder"];
            var IsArchive = provider.FormData["IsArchive"];

            tblNote model = new tblNote();
            var url = RequestContext.Url.Request.RequestUri.Authority;
            //var returnurl = url.Scheme + "://" + url.Host + ":" + url.Port + "/api/NotesApi/GetNotes";
            foreach (MultipartFileData file in provider.FileData)
            {
                files.Add(Path.GetFileName(file.LocalFileName));

                var fileLocation = file.LocalFileName;
                var split = fileLocation.Split('\\');
                var length = split.Length;
                var filename = split[length - 1];

                model.Title = Title;
                model.Content = Content;
                model.ColorCode = ColorCode;
                model.ImageUrl = "https://" + url + "/Images/" + filename;
                model.ID = Convert.ToInt16(ID);
                model.Mode = "2";
                model.Reminder = Reminder;
                model.IsPin = Convert.ToInt16(IsPin);

            }

            NotesController notesController = new NotesController();
            await notesController.GetNotes(model);

            return model.ImageUrl;
        }

        public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
        {
            public CustomMultipartFormDataStreamProvider(string path) : base(path) { }

            public override string GetLocalFileName(HttpContentHeaders headers)
            {
                return headers.ContentDisposition.FileName.Replace("\"", string.Empty);
            }
        }

    }
}