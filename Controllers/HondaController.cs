using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using Newtonsoft.Json;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System;


namespace MvcMovie.Controllers
{
    public class HondaController : Controller
    {
        
        // 
        // GET: /HelloWorld/

        public string Index()
        {
            return "This is my default action...";
        }

        // 
        // GET: /Honda/Data/ 

        public dynamic Data(string country="", string keysearch = "")
    {
        string path = "./utils/honda_wmi.json";
        var reader = new StreamReader(path);
        var jsonFromFile = reader.ReadToEnd();
        var data = JsonConvert.DeserializeObject<List<Vehicle>>(jsonFromFile);
        if (country==null)
        {
            country="";
        }
        if (keysearch==null)
        {
            keysearch="";
        }
        
        foreach(Vehicle v in data)
            if (v.Country==null)
            {
                v.Country="";
            }
        Console.WriteLine(data);
        var filterdata= data.Where((d) => (d.Country.ToLower().Contains(country.ToLower()) & d.Name.ToLower().Contains(keysearch.ToLower())));
        return filterdata;
    }
    }
}

public class Vehicle
	{
		public string Country { get; set; }
		public string CreatedOn { get; set; }
		public string DateAvailableToPublic { get; set; }
		public int Id { get; set; }
		public string Name { get; set; }
        public string UpdatedOn { get; set; }
        public string VehicleType { get; set; }
        public string WMI { get; set; }
	}
