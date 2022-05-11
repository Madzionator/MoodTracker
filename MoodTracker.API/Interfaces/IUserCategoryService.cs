namespace MoodTracker.API.Interfaces;

public interface IUserCategoryService
{
    void AddCategory(List<int> dto);
    void AddCategory(List<int> dto, int userId);
    List<int> GetCategories();
}