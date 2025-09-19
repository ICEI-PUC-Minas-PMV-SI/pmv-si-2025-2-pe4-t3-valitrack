using ApiVilaTrack.Dtos;
using ApiVilaTrack.Entities;
using ApiVilaTrack.Repositories;

namespace ApiVilaTrack.Services;

public class UserService
{
    private readonly UserRepository _repository;
    private readonly GpgService _gpgService;

    public UserService(UserRepository repository, GpgService gpgService)
    {
        _repository = repository;
        _gpgService = gpgService;
    }

    public IEnumerable<UserDto> GetAll() =>
        _repository.GetAll().Select(u => new UserDto(u.Id, u.Name, u.Email));

    public UserDto? GetById(int id)
    {
        var user = _repository.GetById(id);
        return user is null ? null : new UserDto(user.Id, user.Name, user.Email);
    }

    public async Task<UserDto> Add(UserDto userDto)
    {
        var senhaCriptografada = await _gpgService.EncryptString(userDto.senha);
        var user = new User(userDto.Id, userDto.Name, senhaCriptografada);
        var created = _repository.Add(user);
        return new UserDto(created.Id, created.Name, created.Email);
    }

    public bool Update(int id, UserDto userDto)
    {
        var user = new User(id, userDto.Name, userDto.senha);
        return _repository.Update(id, user);
    }

    public bool Delete(int id) => _repository.Delete(id);
}