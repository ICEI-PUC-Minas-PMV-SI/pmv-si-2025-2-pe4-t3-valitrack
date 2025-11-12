using ApiVilaTrack.Dtos;
using ApiVilaTrack.Entities;
using ApiVilaTrack.Repositories;

namespace ApiVilaTrack.Services;

public class UserService
{
    private readonly UserRepository _repository;
    private readonly EncryptService _gpgService;

    public UserService(UserRepository repository, EncryptService gpgService)
    {
        _repository = repository;
        _gpgService = gpgService;
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        var users = await _repository.GetAllAsync();
        return users.Select(u => new UserDto(u.Id, u.Name));
    }

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var user = await _repository.GetByIdAsync(id);
        return user is null ? null : new UserDto(user.Id, user.Name);
    }

    public async Task<UserDto> AddAsync(CadastraUserDto userDto)
    {
        var senhaCriptografada = _gpgService.EncryptAES(userDto.senha);
        var user = new User
        {
            Name = userDto.Name,
            Senha = Convert.ToBase64String(senhaCriptografada)
        };
        var created = await _repository.AddAsync(user);
        return new UserDto(created.Id, created.Name);
    }

    public async Task<bool> UpdateAsync(int id, CadastraUserDto userDto)
    {
        var senhaCriptografada = _gpgService.EncryptAES(userDto.senha);
        var user = new User(id, userDto.Name, Convert.ToBase64String(senhaCriptografada));
        return await _repository.UpdateAsync(id, user);
    }

    public async Task<bool> DeleteAsync(int id) => await _repository.DeleteAsync(id);
}