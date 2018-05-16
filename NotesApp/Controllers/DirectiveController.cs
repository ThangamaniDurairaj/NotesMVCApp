using NotesApp.Data.Models;
using NotesApp.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NotesApp.Controllers
{
    public class DirectiveController : Controller
    {
        // GET: Directive
        public ActionResult Header()
        {
            return View();
        }

        //GET: /Directive/SideNav
        [HttpGet]
        public ActionResult SideNav(string UserID)
        {
            return View();
        }
    }
}