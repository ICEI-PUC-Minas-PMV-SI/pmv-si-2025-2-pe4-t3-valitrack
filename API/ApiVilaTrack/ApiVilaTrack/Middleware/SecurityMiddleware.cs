using System.Text.RegularExpressions;

namespace ApiVilaTrack.Middleware;

public class SecurityMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<SecurityMiddleware> _logger;

    public SecurityMiddleware(RequestDelegate next, ILogger<SecurityMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Verifica se a requisição contém padrões suspeitos
        if (ContainsSuspiciousPatterns(context))
        {
            _logger.LogWarning("Tentativa de ataque detectada de {RemoteIp}: {RequestPath}", 
                context.Connection.RemoteIpAddress, context.Request.Path);
            
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync("Requisição bloqueada por motivos de segurança");
            return;
        }

        await _next(context);
    }

    private bool ContainsSuspiciousPatterns(HttpContext context)
    {
        var path = context.Request.Path.Value?.ToLower() ?? "";
        var query = context.Request.QueryString.Value?.ToLower() ?? "";
        var body = "";

        // Padrões suspeitos comuns de SQL Injection
        var suspiciousPatterns = new[]
        {
            "union select", "drop table", "delete from", "insert into", "update set",
            "or 1=1", "and 1=1", "';", "--", "/*", "*/", "xp_", "sp_",
            "exec(", "execute(", "script>", "<script", "javascript:", "onload=",
            "onerror=", "onclick=", "alert(", "confirm(", "prompt("
        };

        var allText = $"{path} {query} {body}".ToLower();

        return suspiciousPatterns.Any(pattern => allText.Contains(pattern));
    }
}
