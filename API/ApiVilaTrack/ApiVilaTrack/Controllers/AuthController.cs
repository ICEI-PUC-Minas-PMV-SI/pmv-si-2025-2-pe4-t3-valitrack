using ApiVilaTrack.Dtos;
using ApiVilaTrack.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiVilaTrack.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto loginDto)
    {
        var user = _authService.Authenticate(loginDto.Name, loginDto.Senha);
        if (user == null)
            return Unauthorized();
        return Ok(user);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] LoginDto registerDto)
    {
        var user = _authService.Register(registerDto.Name, registerDto.Senha);
        return Ok(user);
    }
}
