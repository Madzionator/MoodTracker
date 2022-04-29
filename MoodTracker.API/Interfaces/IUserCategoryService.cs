namespace MoodTracker.API.Interfaces;

public interface IUserCategoryService
{
    void AddCategory(List<int> dto);
    List<int> GetCategories();
}