namespace MoodTracker.API.Interfaces;

public interface ICategoryService
{
    void AddCategory(List<int> dto);
    List<int> GetCategories();
}