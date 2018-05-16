using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NotesApp.Data;
[assembly: OwinStartup(typeof(NotesApp.Data.Startup))]

namespace NotesApp
{
    public partial class Startup
    {
       
    }
}