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

    public IEnumerable<UserDto> GetAll() =>
        _repository.GetAll().Select(u => new UserDto(u.Id, u.Name));

    public UserDto? GetById(int id)
    {
        var user = _repository.GetById(id);
        return user is null ? null : new UserDto(user.Id, user.Name);
    }

    public UserDto Add(CadastraUserDto userDto)
    {
        var senhaCriptografada = _gpgService.EncryptAES(userDto.senha);
        var user = new User(userDto.Id, userDto.Name, Convert.ToBase64String(senhaCriptografada));
        var created = _repository.Add(user);
        return new UserDto(created.Id, created.Name);
    }

    public bool Update(int id, CadastraUserDto userDto)
    {
        var senhaCriptografada = _gpgService.EncryptAES(userDto.senha);
        var user = new User(id, userDto.Name, Convert.ToBase64String(senhaCriptografada));
        return _repository.Update(id, user);
    }

    public bool Delete(int id) => _repository.Delete(id);
}