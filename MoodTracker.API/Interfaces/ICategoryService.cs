namespace MoodTracker.API.Interfaces;

public interface ICategoryService
{
    void AddCategory(List<int> catId);
    List<int> GetCategories();
}