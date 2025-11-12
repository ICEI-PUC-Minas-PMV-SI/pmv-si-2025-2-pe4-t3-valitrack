using ApiVilaTrack.Data;
using ApiVilaTrack.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApiVilaTrack.Repositories;

public class UserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllAsync() => await _context.Users.ToListAsync();

    public async Task<User?> GetByIdAsync(int id) => await _context.Users.FindAsync(id);

    public async Task<User?> GetByNameAsync(string name) =>
        await _context.Users.FirstOrDefaultAsync(u => u.Name == name);

    public async Task<User> AddAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<bool> UpdateAsync(int id, User user)
    {
        var existing = await _context.Users.FindAsync(id);
        if (existing is null) return false;

        existing.Name = user.Name;
        existing.Senha = user.Senha;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user is null) return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }
}