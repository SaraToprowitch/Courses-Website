using Microsoft.AspNetCore.Mvc;
using Recipes_Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Recipes_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LecturerController : ControllerBase
    {
        public static List<Lecturer> lecturers = new List<Lecturer>
        {
            new Lecturer { Id = 1, Name = "aaa", Address = "123 Main Street", Email = "john@example.com", Password = "123" },
            new Lecturer { Id = 2, Name = "Alice Smith", Address = "456 Elm Street", Email = "alice@example.com", Password = "456" },
            new Lecturer { Id = 4, Name = "מרצה 3", Address = "כתובת 3", Email = "lecturer3@example.com", Password = "password3" }
        };
        // GET: api/<SpeacherController>
        [HttpGet]
        public IEnumerable<Lecturer> Get()
        {
            return lecturers;
        }

        // GET api/<SpeacherController>/5
        [HttpGet("{id}")]
        public Lecturer Get(int id)
        {
            return lecturers[id - 1];
        }

        // POST api/<SpeacherController>
        [HttpPost]
        public void Post([FromBody] Lecturer value)
        {
            lecturers.Add(value);
        }

        // PUT api/<SpeacherController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Lecturer value)
        {
            lecturers[id - 1].Id = value.Id;
            lecturers[id - 1].Name = value.Name;
            lecturers[id-1].Address = value.Address;
            lecturers[id - 1].Email = value.Email;
            lecturers[id - 1].Password = value.Password;
        }

        // DELETE api/<SpeacherController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            for (int i = 0; i < lecturers.Count; i++)
            {
                if (lecturers[i].Id == id)
                {
                    lecturers.RemoveAt(i);
                    return Ok(); 
                }
            }

            return NotFound(); 
        }
    }
}
