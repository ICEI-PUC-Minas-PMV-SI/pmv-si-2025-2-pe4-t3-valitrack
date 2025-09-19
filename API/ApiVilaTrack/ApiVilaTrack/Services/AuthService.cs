using ApiVilaTrack.Dtos;
using ApiVilaTrack.Entities;
using ApiVilaTrack.Repositories;

namespace ApiVilaTrack.Services;

public class AuthService
{
    private readonly UserRepository _repository;
    private readonly EncryptService _gpgService;

    public AuthService(UserRepository repository, EncryptService gpgService)
    {
        _repository = repository;
        _gpgService = gpgService;
    }

    public UserDto? Authenticate(string name, string senha)
    {
        var user = _repository.GetAll().FirstOrDefault(u => u.Name == name);
        if (user == null)
            return null;

        // Descriptografa a senha armazenada
        var senhaDescriptografada = _gpgService.DecryptAES(Convert.FromBase64String(user.Senha));
        if (senhaDescriptografada == senha)
            return new UserDto(user.Id, user.Name);
        return null;
    }

    public UserDto Register(string name, string senha)
    {
        var senhaCriptografada = _gpgService.EncryptAES(senha);
        var user = new User(0, name, Convert.ToBase64String(senhaCriptografada));
        var created = _repository.Add(user);
        return new UserDto(created.Id, created.Name);
    }
}
