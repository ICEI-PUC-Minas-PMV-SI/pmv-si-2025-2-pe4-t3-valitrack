using ApiVilaTrack.Entities;

namespace ApiVilaTrack.Repositories;

public class UserRepository
{
    private readonly List<User> _users = new();
    private int _nextId = 1;

    public IEnumerable<User> GetAll() => _users;

    public User? GetById(int id) => _users.FirstOrDefault(u => u.Id == id);

    public User Add(User user)
    {
        var newUser = new User(_nextId++, user.Name, user.Senha);
        _users.Add(newUser);
        return newUser;
    }

    public bool Update(int id, User user)
    {
        var index = _users.FindIndex(u => u.Id == id);
        if (index == -1) return false;
        _users[index] = new User(id, user.Name, user.Senha);
        return true;
    }

    public bool Delete(int id)
    {
        var user = GetById(id);
        if (user is null) return false;
        _users.Remove(user);
        return true;
    }
}