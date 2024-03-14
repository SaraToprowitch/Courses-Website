namespace Recipes_Server.Models
{
    public enum LearningWay
    {
        Zoom,
        Frontal
    }
    public class Course
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int CategoryId { get; set; }

        public int CountLessons { get; set; }

        public LearningWay LearningWay { get; set; }

        public DateTime BeginningDate { get; set; }

        public List<string> Silibus { get; set; }

        public int SpeacherId { get; set; }

        public string Image { get; set; }

    }
}
