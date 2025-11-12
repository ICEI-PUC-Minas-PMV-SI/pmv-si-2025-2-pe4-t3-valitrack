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

    public async Task<UserDto?> AuthenticateAsync(string name, string senha)
    {
        var user = await _repository.GetByNameAsync(name);
        if (user == null)
            return null;

        // Descriptografa a senha armazenada
        var senhaDescriptografada = _gpgService.DecryptAES(Convert.FromBase64String(user.Senha));
        if (senhaDescriptografada == senha)
            return new UserDto(user.Id, user.Name);
        return null;
    }

    public async Task<UserDto> RegisterAsync(string name, string senha)
    {
        var senhaCriptografada = _gpgService.EncryptAES(senha);
        var user = new User
        {
            Name = name,
            Senha = Convert.ToBase64String(senhaCriptografada)
        };
        var created = await _repository.AddAsync(user);
        return new UserDto(created.Id, created.Name);
    }
}
