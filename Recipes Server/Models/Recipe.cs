namespace Recipes_Server.Models
{
    public enum DifficultyLevel
    {
        VeryEasy,
        Easy,
        Medium,
        Hard,
        VeryHard
    }
    public class Recipe
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int CategoryId { get; set; }

        public TimeSpan Duration { get; set; }

        public DifficultyLevel Difficulty { get; set; }

        public DateTime Date { get; set; }

        public List<string> Ingredients { get; set; }

        public List<string> Instructions { get; set; }

        public string UserId { get; set; }

        public string UrlIcon { get; set; }

    }
}
