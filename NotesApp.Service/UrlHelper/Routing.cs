using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace NotesApp.Service.UrlHelper1
{
    public class UrlRouting : Controller
    {
        public string UrlGenerater1(string UserID, string code)
        {
            try
            {
                //var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = UserID, code = code }, protocol: Request.Url.Scheme);
                //var callbackUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority).ToString() + "/Account/ConfirmEmail/" + UserID.ToString() + "/" + code.Replace("/", "____").Replace("+", "----").ToString();
                var Url = new UrlHelper(HttpContext.Request.RequestContext);
                var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId =UserID, code = code },/* "http://localhost:50203"*/  protocol: Request.Url.Scheme);

                return callbackUrl;
            }
            catch (Exception ex)
            {

                ex.ToString();
            }
            return "Error";
        }
    }
}
