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

// Obter a string de conexão do appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var useEncrypted = builder.Configuration.GetValue<bool?>("UseEncryptedConnection") ?? true;

if (!string.IsNullOrEmpty(connectionString))
{
    string decryptedConnStr;
    if (useEncrypted)
    {
        // Descriptografar usando EncryptService
        var encryptedConnStrBytes = Convert.FromBase64String(connectionString);
        var encryptService = new EncryptService();
        decryptedConnStr = encryptService.DecryptAES(encryptedConnStrBytes);
    }
    else
    {
        // Usar connection string sem criptografia (desenvolvimento)
        decryptedConnStr = connectionString;
    }

    // EF Core: registrar DbContext (usa ConnectionStrings:DefaultConnection)
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(decryptedConnStr));
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
