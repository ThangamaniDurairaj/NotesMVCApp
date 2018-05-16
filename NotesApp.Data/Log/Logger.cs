using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApp.Data.Log
{
    public class Logger
    {
        /// <summary>
        /// method which is used to write exception into file
        /// </summary>
        /// <param name="ex">incoming exception</param>
        public static void Write(string ex)
        {
            string filename = "LogFile";
            string strEx = DateTime.Now.ToString() + ":" + ex.ToString() + Environment.NewLine;
            if (!File.Exists(AppDomain.CurrentDomain.BaseDirectory.ToString() + filename + ".log"))
            {
                var stream = File.Create(AppDomain.CurrentDomain.BaseDirectory.ToString() + filename + ".log");
                File.AppendAllText(AppDomain.CurrentDomain.BaseDirectory.ToString() + filename + ".log", strEx.ToString());
                stream.Close();
            }
            else
            {
                File.AppendAllText(AppDomain.CurrentDomain.BaseDirectory.ToString() + filename + ".log", strEx.ToString());
            }
        }
    }

}

