using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace NotesApp.Data.Domain.Twilio
{
    class Config
    {
        public static string AccountSid => WebConfigurationManager.AppSettings["AccountSid"] ??
                                        "AC296d71cf6362aeb365f1ff305ae63ed0";

        public static string AuthToken => WebConfigurationManager.AppSettings["AuthToken"] ??
                                          "578cce258351051642dee6f81f1f09fe";

        public static string TwilioNumber => WebConfigurationManager.AppSettings["TwilioNumber"] ??
                                             "+12517327228";
    }
}
