using Microsoft.AspNetCore.Mvc;
using Recipes_Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Recipes_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        public static List<Recipe> recipes = new List<Recipe>
        {
            new Recipe
            {
                Id = 1,
                Name = "פיצה",
                CategoryId = 1, // ניתן להחליף לערכים אמיתיים של קטגוריה
                Duration = new TimeSpan(1,1,1,1,1),
                Difficulty = DifficultyLevel.Medium,
                Date =DateTime.Now,
                Ingredients = new List<string> { "בצק", "רוטב עגבניות", "גבינה", "תוספות לבחירתך" },
                Instructions = new List<string> { "פתח את הבצק", "שים רוטב עגבניות", "פזר גבינה", "אפה בתנור" },
                UserId = "12345", // מזהה המשתמש המוסיף את המתכון
                UrlIcon = "https://example.com/pizza-icon.jpg" // כתובת האייקון של המתכון
            },
            new Recipe
            {
                Id = 2,
                Name = "סלט ירקות",
                CategoryId = 2, // ניתן להחליף לערכים אמיתיים של קטגוריה
                Duration = new TimeSpan(1,1,1,1,1),
                Difficulty = DifficultyLevel.Easy,
                Date = DateTime.Now,
                Ingredients = new List<string> { "עגבניות", "מלפפונים", "פלפלים", "קישואים" },
                Instructions = new List<string> { "חתוך את הירקות לקוביות", "ערבב את הירקות", "הוסף רוטב סלט לטעם" },
                UserId = "54321", // מזהה המשתמש המוסיף את המתכון
                UrlIcon = "https://example.com/salad-icon.jpg" // כתובת האייקון של המתכון
            },
            new Recipe
            {
                Id = 3,
                Name = "עוגת שוקולד",
                CategoryId = 3, // ניתן להחליף לערכים אמיתיים של קטגוריה
                Duration = new TimeSpan(1,1,1,1,1),
                Difficulty = DifficultyLevel.Hard,
                Date = DateTime.Now,
                Ingredients = new List<string> { "שוקולד", "ביצים", "קמח", "סוכר", "שמן" },
                Instructions = new List<string> { "הוסף את המרכיבים לקערה", "ערבב היטב", "אפה בתנור לפי ההוראות" },
                UserId = "67890", // מזהה המשתמש המוסיף את המתכון
                UrlIcon = "https://example.com/cake-icon.jpg" // כתובת האייקון של המתכון
            }
        };
        // GET: api/<RecipeController>
        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return recipes;
        }

        // GET api/<RecipeController>/5
        [HttpGet("{id}")]
        public Recipe Get(int id)
        {
            return recipes[id - 1];
        }

        // POST api/<RecipeController>
        [HttpPost]
        public void Post([FromBody] Recipe value)
        {
            recipes.Add(value);
        }

        // PUT api/<RecipeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Recipe value)
        {
            var recipeToUpdate = recipes.FirstOrDefault(r => r.Id == id);
            if (recipeToUpdate != null)
            {
                recipeToUpdate.Id = value.Id;
                recipeToUpdate.Name = value.Name;
                recipeToUpdate.CategoryId = value.CategoryId;
                recipeToUpdate.Duration = value.Duration;
                recipeToUpdate.Difficulty = value.Difficulty;
                recipeToUpdate.Date = value.Date;
                recipeToUpdate.Ingredients = value.Ingredients;
                recipeToUpdate.Instructions = value.Instructions;
                recipeToUpdate.UserId = value.UserId;
                recipeToUpdate.UrlIcon = value.UrlIcon;
            }
        }

        // DELETE api/<RecipeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            recipes.Remove(recipes[id-1]);
        }
    }
}
