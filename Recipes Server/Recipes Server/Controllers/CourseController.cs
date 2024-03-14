using Microsoft.AspNetCore.Mvc;
using Recipes_Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Recipes_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
       public static List<Course> courses = new List<Course>
        {
            new Course 
            { 
                Id = 1, 
                Name = "C", 
                CategoryId = 2, 
                CountLessons = 10, 
                LearningWay = LearningWay.Zoom, 
                BeginningDate = DateTime.Now, 
                Silibus = new List<string> { "Material on topic 1", "Material on topic 2" }, 
                SpeacherId = 1, 
                Image = "../assets/C.png"

            },
            new Course
            {
                Id = 3,
                Name = "SQL",
                CategoryId = 3,
                CountLessons = 12,
                LearningWay = LearningWay.Zoom,
                BeginningDate = DateTime.Now.AddDays(14),
                Silibus = new List<string> { "Material on topic 5", "Material on topic 6" },
                SpeacherId = 3,
                Image = "../assets/SQL.png"
            },
            new Course 
            { 
                Id = 2, 
                Name = "Java", 
                CategoryId = 2, 
                CountLessons = 15, 
                LearningWay = LearningWay.Frontal,
                BeginningDate = DateTime.Now.AddDays(7), 
                Silibus = new List<string> { "Material on topic 3", "Material on topic 4" }, 
                SpeacherId = 1,
                Image = "../assets/J.png"

            },
            
            new Course
            {
                Id = 4,
                Name = "C#",
                CategoryId = 2,
                CountLessons = 20,
                LearningWay = LearningWay.Frontal,
                BeginningDate = DateTime.Now,
                Silibus = new List<string> { "Material on topic 5", "Material on topic 6" },
                SpeacherId = 1,
                Image = "../assets/CS.png"
            },
            new Course
            {
                Id = 5,
                Name = "JavaScript",
                CategoryId = 1,
                CountLessons = 10,
                LearningWay = LearningWay.Frontal,
                BeginningDate = DateTime.Now.AddMonths(2),
                Silibus = new List<string> { "Material on topic 5", "Material on topic 6" },
                SpeacherId = 2,
                Image = "../assets/JavaScript.png"
            },
            new Course
            {
                Id = 6,
                Name = "C++",
                CategoryId = 2,
                CountLessons = 10,
                LearningWay = LearningWay.Zoom,
                BeginningDate = DateTime.Now.AddDays(18),
                Silibus = new List<string> { "Material on topic 5", "Material on topic 6" },
                SpeacherId = 2,
                Image = "../assets/C++.png"
            }
        };
        
        // GET: api/<RecipeController>
        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return courses;
        }

        // GET api/<RecipeController>/5
        [HttpGet("{id}")]
        public Course Get(int id)
        {
            return courses.FirstOrDefault(c=>c.Id==id);
        }

        // POST api/<RecipeController>
        [HttpPost]
        
        public void Post([FromBody] Course value)
        {
            bool flag=false;
            foreach (var course in courses)
            {
                if (course.Id == value.Id)
                {
                    flag=true;  
                    course.Name = value.Name;
                    course.CategoryId = value.CategoryId;
                    course.CountLessons = value.CountLessons;
                    course.LearningWay = value.LearningWay;
                    course.BeginningDate = value.BeginningDate;
                    course.Silibus = value.Silibus;
                    course.SpeacherId = value.SpeacherId;
                    course.Image = value.Image;
                    break;
                }
            }
            if (flag == false)
            {
                courses.Add(value);
            }


        }
        // PUT api/<RecipeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Course value)
        {
            courses[id - 1].Id = value.Id;
            courses[id - 1].Name = value.Name;
            courses[id-1].BeginningDate = value.BeginningDate;
            courses[id - 1].Silibus = value.Silibus;
            courses[id - 1].SpeacherId = value.SpeacherId;
            courses[id - 1].Image = value.Image;
            courses[id-1].CountLessons = value.CountLessons;
            courses[id - 1].CategoryId = value.CategoryId;
            courses[id-1].LearningWay=value.LearningWay;
        }

        // DELETE api/<RecipeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            courses.Remove(courses[id - 1]);
        }
    }
}
