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

    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(decryptedConnStr));

    Console.WriteLine("DbContext configured successfully");
}
catch (Exception ex)
{
    Console.WriteLine("=== FATAL ERROR DURING STARTUP ===");
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

// Register dependencies
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<StockProductRepository>();
builder.Services.AddScoped<StockProductService>();
builder.Services.AddScoped<SecurityService>();
builder.Services.Configure<GpgDto>(builder.Configuration.GetSection("Gpg"));
builder.Services.AddSingleton<EncryptService>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrar suporte ao parâmetro regex
builder.Services.Configure<RouteOptions>(options =>
{
    options.SetParameterPolicy<RegexInlineRouteConstraint>("regex");
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
    });

// Add CORS support
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowFrontend");

// Security middleware
app.UseMiddleware<ApiVilaTrack.Middleware.SecurityMiddleware>();

// Enable Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Map controllers
app.MapControllers();

app.Run();

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
