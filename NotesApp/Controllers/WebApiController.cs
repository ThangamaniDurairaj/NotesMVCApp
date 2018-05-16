using NotesApp.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using NotesApp.Service;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using System.Net.Http.Headers;
using System.Web;


namespace NotesApp.Controllers
{
    public class WebApiController : ApiController
    {
        // GET api/<controller>
        AccountsRepository accountRepository = new AccountsRepository();
        private SignInStatus result;


        // POST: api/WebApi/Register
        [HttpPost]
        public async Task<IdentityResult> Register(RegisterViewModel model)
        {
            IdentityResult result = null;
            if (ModelState.IsValid)
            {
                result = await accountRepository.Register(model);
                return result;
            }
            return result;
        }

        //POST: api/WebApi/Login
        [HttpPost]
        public async Task<SignInStatus> Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                AccountController accountController = new AccountController();
               await accountController.Token(model);
                var result = await accountRepository.Login(model, returnUrl);
                return result;
            }
            return result;
        }


        //GET: api/WebApi/ConfirmEmail
        public async Task<IdentityResult> ConfirmEmail(string userId, string code)
        {
            var result = await accountRepository.ConfirmEmail(userId, code);
            return result;
        }

        //POST: api/WebApi/ForgotPassword
        public async Task ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                await accountRepository.ForgotPassword(model);
            }
        }

        //POST: api/WebApi/ResetPassword
        public async Task<string> ResetPassword(ResetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                string result = await accountRepository.ResetPassword(model);
                return result;
            }
            return "";
        }

        //GET: api/WebApi/VerifyPhoneNumber
        public async Task SendPhoneNumber(VerifyPhoneNumberBindingModel model)
        {
            if (ModelState.IsValid)
            {
                await accountRepository.SendPhoneNumber(model);
            }
        }

        //POST: api/WebApi/VerifyPhoneNumber
        public async Task VerifyPhoneNumber(VerifyPhoneNumberBindingModel model)
        {
            if (ModelState.IsValid)
            {
                await accountRepository.VerifyPhoneNumber(model);
            }
        }


        public async Task<string> GenerateTokenAsync(LoginViewModel context)
        {
            var jsonString = "";
            try
            {
                var handler = new WebRequestHandler() { ServerCertificateValidationCallback = (sender, cert, chain, sslPolicyErrors) => true };

                using (var client = new HttpClient(handler))
                {
                    //client.BaseAddress = new Uri(Request.RequestUri.GetLeftPart(UriPartial.Authority).ToString());
                    client.BaseAddress = new Uri(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority));
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    // HTTP POST                
                    var body = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type", "password"),
                    new KeyValuePair<string, string>("username", context.Email),
                    new KeyValuePair<string, string>("password", context.Password)
                };
                    var content = new FormUrlEncodedContent(body);
                    HttpResponseMessage response = await client.PostAsync("token", content);

                    if (response.IsSuccessStatusCode)
                    {
                        jsonString = await response.Content.ReadAsStringAsync();
                        jsonString = jsonString.Split(',')[0].ToString().Split(':')[1].ToString();

                        return jsonString.Replace("\"", "");
                    }
                    else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                    {
                        return string.Empty;
                    }
                    else
                    {
                        return string.Empty;
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return jsonString;
        }




        public async Task<SignInStatus> ExternalLoginCallback(ExternalLoginInfo loginInfo, bool isPersistent)
        {
            var result = await accountRepository.ExternalLoginCallback(loginInfo, isPersistent);
            return result;
        }

        public async Task<IdentityResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            IdentityResult result = null;
            if (ModelState.IsValid)
            {
                result = await accountRepository.ExternalLoginConfirmation(model, returnUrl);
                return result;
            }
            return result;
        }

        public void Logout()
        {
            accountRepository.Logout();
        }
    }
}