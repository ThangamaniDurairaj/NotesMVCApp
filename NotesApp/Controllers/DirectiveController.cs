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
            ////UserID= "c6dd5399-18c6-420c-abd0-d15d0a726565";
            //var url = Request.Url.AbsoluteUri;

            //if (UserID!=null)
            //{
            //    var list = new List<tblNote>();

            //    AccountsRepository accountsRepository = new AccountsRepository();
            //    list = accountsRepository.GetInfo(UserID);
            //    return View(list);
            //}
            return View();
        }

       
    }
}