using Microsoft.AspNetCore.Mvc;
using Recipes_Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Recipes_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static List<User> users = new List<User>
        {
            new User { Id = 1, Name = "aaa", Address = "123 Main Street", Email = "john@example.com", Password = "123" },
            new User { Id = 2, Name = "Alice Smith", Address = "456 Elm Street", Email = "alice@example.com", Password = "456" },
            new User { Id = 3, Name = "Bob Johnson", Address = "789 Oak Street", Email = "bob@example.com", Password = "789" },
            new User { Id = 4, Name = "מרצה 3", Address = "כתובת 3", Email = "lecturer3@example.com", Password = "password3" }

        };

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return users[id - 1];
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] User value)
        {
            
            users.Add(value);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User value)
        {
            users[id - 1].Id = value.Id;
            users[id - 1].Name = value.Name;
            users[id - 1].Address = value.Address;
            users[id - 1].Email = value.Email;
            users[id - 1].Password = value.Password;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            for (int i = 0; i < users.Count; i++)
            {
                if (users[i].Id == id)
                {
                    users.RemoveAt(i);
                    return Ok(); 
                }
            }

            return NotFound(); 
        }
    }
}
