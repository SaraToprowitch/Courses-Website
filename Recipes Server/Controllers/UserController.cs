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
            new User
            {
                Id = 1,
                Name = "שם משתמש ראשון",
                Address = "כתובת משתמש ראשון",
                Email = "user1@example.com",
                Password = "password1"
            },
            new User
            {
                Id = 2,
                Name = "שם משתמש שני",
                Address = "כתובת משתמש שני",
                Email = "user2@example.com",
                Password = "password2"
            },
            new User
            {
                Id = 3,
                Name = "שם משתמש שלישי",
                Address = "כתובת משתמש שלישי",
                Email = "user3@example.com",
                Password = "password3"
            }
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
            return users[id-1];
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
            users[id - 1].Email = value.Email;
            users[id - 1].Password = value.Password;
            users[id - 1].Address = value.Address;

        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            users.Remove(users[id-1]);
        }
    }
}
