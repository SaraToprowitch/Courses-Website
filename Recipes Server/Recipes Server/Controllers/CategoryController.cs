using Microsoft.AspNetCore.Mvc;
using Recipes_Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Recipes_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static List<Category> categories = new List<Category>
        {
            new Category{Id= 1, Name="Client", UrlIcon="Client"},
            new Category{Id= 2, Name="Server", UrlIcon="Server"},
            new Category{Id= 3, Name="DataBase", UrlIcon="Technology"}
        };

        // GET: api/<CategoryController>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            return categories[id-1];
        }

        // POST api/<CategoryController>
        [HttpPost]
        public void Post([FromBody] Category value)
        {
            categories.Add(value);
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Category value)
        {
            categories[id-1].Id = value.Id;
            categories[id-1].Name = value.Name;
            categories[id - 1].UrlIcon = value.UrlIcon;
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            categories.Remove(categories[id-1]);
        }
    }
}
