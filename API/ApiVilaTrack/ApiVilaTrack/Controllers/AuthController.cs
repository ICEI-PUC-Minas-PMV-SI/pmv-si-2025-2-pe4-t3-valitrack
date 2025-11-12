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
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _authService.AuthenticateAsync(loginDto.Name, loginDto.Senha);
        if (user == null)
            return Unauthorized();
        return Ok(user);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] LoginDto registerDto)
    {
        var user = await _authService.RegisterAsync(registerDto.Name, registerDto.Senha);
        return Ok(user);
    }
}
