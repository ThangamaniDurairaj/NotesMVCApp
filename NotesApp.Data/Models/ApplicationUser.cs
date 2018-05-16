using NotesApp.Data.Infrastructure;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NotesApp.Data.Models
{
    public class ApplicationUser : IdentityUser
    {

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }

        public string FirstName { get; set; }

        public string Lastname { get; set; }

        public string Gender { get; set; }

        public string BirthDate { get; set; }

        public string Aadhar { get; set; }


        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string city { get; set; }

        public string District { get; set; }

        public string PinCode { get; set; }

        public string State { get; set; }

        public string Country { get; set; }

        internal async Task<ClaimsIdentity> GenerateUserIdentityAsync(ApplicationUserManager userManager, string authenticationType)
        {
            var userIdentity = await userManager.CreateIdentityAsync(this, authenticationType);
            return userIdentity;
        }
    }
}
