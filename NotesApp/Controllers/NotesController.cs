using NotesApp.Data;
using NotesApp.Data.Log;
using NotesApp.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace NotesApp.Controllers
{
    [Authorize]
    public class NotesController : Controller
    {
        AccountController accountController = new AccountController();
        static List<tblNote> list = new List<tblNote>();

        //GET: Notes/GetNotes
        [HttpGet]
        public async Task<ActionResult> GetNotes()
        {
            try
            {
                var token = TempData["access_token"].ToString();
                TempData.Keep("access_token");

                list = await accountController.ConsumeApi("", token);

                return View(list);
            }
            catch (Exception ex)
            {
                Logger.Write(ex.ToString());
                return RedirectToAction("Login", "Account");
            }


        }

        //POST: Notes/GetNotes
        [HttpPost]
        public async Task<ActionResult> GetNotes(tblNote model)
        {
            var i = 0;
            try
            {

                if (ModelState.IsValid)
                {
                    i = await accountController.ConsumePostApi(model);
                    return View();
                }
            }
            catch (Exception ex)
            {

                Logger.Write(ex.ToString());

            }
            return View(i);

        }

        //GET: Notes/Trash
        [HttpGet]
        public async Task<ActionResult> Trash()
        {
            try
            {
                var token = TempData["access_token"].ToString();
                TempData.Keep("access_token");

                list = await accountController.ConsumeApi("", token);

                return View(list);
            }
            catch (Exception ex)
            {
                Logger.Write(ex.ToString());

                return RedirectToAction("Login", "Account");
            }
        }

        //GET: Notes/Archive
        [HttpGet]
        public async Task<ActionResult> Archive()
        {
            try
            {
                var token = TempData["access_token"].ToString();
                TempData.Keep("access_token");

                list = await accountController.ConsumeApi("", token);

                return View(list);
            }
            catch (Exception ex)
            {
                Logger.Write(ex.ToString());

                return RedirectToAction("Login", "Account");
            }

        }

        //GET: Notes/Reminder
        [HttpGet]
        public async Task<ActionResult> Reminder()
        {
            try
            {
                var token = TempData["access_token"].ToString();
                TempData.Keep("access_token");

                list = await accountController.ConsumeApi("", token);

                return View(list);
            }
            catch (Exception ex)
            {
                Logger.Write(ex.ToString());

                return RedirectToAction("Login", "Account");
            }

        }


        [HttpGet]
        public ActionResult GetNoteExternal()
        {
            try
            {
                NotesApiController noteApiController = new NotesApiController();
                list = noteApiController.GetNotes();

                return View("GetNotes", list);
            }
            catch (Exception ex)
            {
                Logger.Write(ex.ToString());

                return RedirectToAction("Login", "Account");
            }


        }

        [HttpGet]
        public ActionResult PopUp()
        {
            return View();
        }


        [HttpGet]
        public async Task<ActionResult> List()
        {
            try
            {
                var token = TempData["access_token"].ToString();
                TempData.Keep("access_token");

                list = await accountController.ConsumeApi("", token);

                return View(list);
            }
            catch (Exception ex)
            {
                Logger.Write(ex.ToString());
                return RedirectToAction("Login", "Account");
            }
        }
    }
}