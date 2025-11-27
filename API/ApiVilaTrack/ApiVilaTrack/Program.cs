using ApiVilaTrack.Controllers;
using ApiVilaTrack.Data;
using ApiVilaTrack.Dtos;
using ApiVilaTrack.Repositories;
using ApiVilaTrack.Services;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateSlimBuilder(args);

// Helper method to normalize SQL Server connection string keywords
static string NormalizeConnectionString(string connectionString)
{
    if (string.IsNullOrEmpty(connectionString))
        return connectionString;

    // Replace common non-standard keywords with SQL Server standard ones
    var normalized = connectionString
        .Replace("userid=", "User Id=", StringComparison.OrdinalIgnoreCase)
        .Replace("user id=", "User Id=", StringComparison.OrdinalIgnoreCase)
        .Replace("uid=", "User Id=", StringComparison.OrdinalIgnoreCase)
        .Replace("password=", "Password=", StringComparison.OrdinalIgnoreCase)
        .Replace("pwd=", "Password=", StringComparison.OrdinalIgnoreCase)
        .Replace("server=", "Server=", StringComparison.OrdinalIgnoreCase)
        .Replace("data source=", "Server=", StringComparison.OrdinalIgnoreCase)
        .Replace("addr=", "Server=", StringComparison.OrdinalIgnoreCase)
        .Replace("address=", "Server=", StringComparison.OrdinalIgnoreCase)
        .Replace("network address=", "Server=", StringComparison.OrdinalIgnoreCase)
        .Replace("database=", "Database=", StringComparison.OrdinalIgnoreCase)
        .Replace("initial catalog=", "Initial Catalog=", StringComparison.OrdinalIgnoreCase);

    return normalized;
}

try
{
    Console.WriteLine("=== Starting ValiTrack API ===");

    var envDatabaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
    var configConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    var connectionString = envDatabaseUrl ?? configConnectionString;

    Console.WriteLine($"DATABASE_URL environment variable: {(envDatabaseUrl != null ? "SET" : "NOT SET")}");
    Console.WriteLine($"Config connection string: {(configConnectionString != null ? "SET" : "NOT SET")}");

    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException(
            "Connection string not found. Set DATABASE_URL environment variable or configure DefaultConnection in appsettings.json");
    }

    var useEncrypted = builder.Configuration.GetValue<bool?>("UseEncryptedConnection") ?? false;

    if (envDatabaseUrl != null)
    {
        useEncrypted = false;
        Console.WriteLine("Using DATABASE_URL from environment (plain text)");
    }
    else
    {
        Console.WriteLine($"UseEncryptedConnection: {useEncrypted}");
    }

    string decryptedConnStr;
    if (useEncrypted)
    {
        Console.WriteLine("Decrypting connection string...");
        var encryptedConnStrBytes = Convert.FromBase64String(connectionString);
        var encryptService = new EncryptService();
        decryptedConnStr = encryptService.DecryptAES(encryptedConnStrBytes);
        Console.WriteLine("Connection string decrypted successfully");
    }
    else
    {
        decryptedConnStr = connectionString;
        Console.WriteLine("Using plain text connection string");
    }

    // Normalize connection string keywords for SQL Server compatibility
    var normalizedConnStr = NormalizeConnectionString(decryptedConnStr);
    Console.WriteLine("Connection string normalized for SQL Server");

    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(normalizedConnStr));

    Console.WriteLine("DbContext configured successfully");
}
catch (Exception ex)
{
    Console.WriteLine("=== FATAL ERROR DURING DATABASE SETUP ===");
    Console.WriteLine($"Exception Type: {ex.GetType().FullName}");
    Console.WriteLine($"Message: {ex.Message}");
    Console.WriteLine($"Stack Trace: {ex.StackTrace}");
    if (ex.InnerException != null)
    {
        Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
        Console.WriteLine($"Inner Stack Trace: {ex.InnerException.StackTrace}");
    }
    throw;
}

try
{
    Console.WriteLine("Registering dependencies...");

    builder.Services.AddScoped<UserRepository>();
    builder.Services.AddScoped<UserService>();
    builder.Services.AddScoped<AuthService>();
    builder.Services.AddScoped<StockProductRepository>();
    builder.Services.AddScoped<StockProductService>();
    builder.Services.AddScoped<SecurityService>();

    Console.WriteLine("Configuring GPG settings...");
    builder.Services.Configure<GpgDto>(builder.Configuration.GetSection("Gpg"));
    builder.Services.AddSingleton<EncryptService>();

    Console.WriteLine("Configuring Swagger...");
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    Console.WriteLine("Configuring routing...");
    builder.Services.Configure<RouteOptions>(options =>
    {
        options.SetParameterPolicy<RegexInlineRouteConstraint>("regex");
    });

    Console.WriteLine("Configuring controllers...");
    builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
        });

    Console.WriteLine("Configuring CORS...");

    // Get allowed origins from environment variable or use defaults
    var allowedOrigins = Environment.GetEnvironmentVariable("ALLOWED_ORIGINS")?.Split(',')
        ?? new[] {
            "http://localhost:3000",
            "https://localhost:3000"
        };

    Console.WriteLine($"CORS allowed origins: {string.Join(", ", allowedOrigins)}");

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowFrontend", policy =>
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    });

    Console.WriteLine("Building application...");
    var app = builder.Build();

    Console.WriteLine("Application built successfully");

    var port = Environment.GetEnvironmentVariable("PORT") ?? "5041";
    Console.WriteLine($"Configuring to listen on port: {port}");

    app.Urls.Clear();
    app.Urls.Add($"http://0.0.0.0:{port}");

    Console.WriteLine("Configuring middleware...");
    app.UseCors("AllowFrontend");
    app.UseMiddleware<ApiVilaTrack.Middleware.SecurityMiddleware>();

    Console.WriteLine($"Environment: {app.Environment.EnvironmentName}");
    if (app.Environment.IsDevelopment())
    {
        Console.WriteLine("Enabling Swagger...");
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    Console.WriteLine("Mapping controllers...");
    app.MapControllers();

    Console.WriteLine("=== ValiTrack API Ready to Start ===");
    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine("=== FATAL ERROR DURING APP INITIALIZATION ===");
    Console.WriteLine($"Exception Type: {ex.GetType().FullName}");
    Console.WriteLine($"Message: {ex.Message}");
    Console.WriteLine($"Stack Trace: {ex.StackTrace}");
    if (ex.InnerException != null)
    {
        Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
        Console.WriteLine($"Inner Stack Trace: {ex.InnerException.StackTrace}");
    }
    Environment.Exit(1);
}

public record Todo(int Id, string? Title, DateOnly? DueBy = null, bool IsComplete = false);

[JsonSerializable(typeof(UserDto))]
[JsonSerializable(typeof(IEnumerable<UserDto>))]
[JsonSerializable(typeof(Todo[]))]
[JsonSerializable(typeof(LoginDto))]
[JsonSerializable(typeof(CadastraUserDto))]
[JsonSerializable(typeof(CreateCatalogDto))]
[JsonSerializable(typeof(CatalogDto))]
[JsonSerializable(typeof(IEnumerable<CatalogDto>))]
[JsonSerializable(typeof(List<CatalogDto>))]
[JsonSerializable(typeof(CreateStockProductDto))]
[JsonSerializable(typeof(UpdateStockProductDto))]
[JsonSerializable(typeof(StockProductDto))]
[JsonSerializable(typeof(StockProductResponseDto))]
[JsonSerializable(typeof(IEnumerable<StockProductResponseDto>))]
[JsonSerializable(typeof(List<StockProductResponseDto>))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}
