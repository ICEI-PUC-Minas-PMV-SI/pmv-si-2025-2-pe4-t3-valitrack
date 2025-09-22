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

// Obter a string criptografada do appsettings.json
var encryptedConnStrBase64 = builder.Configuration.GetConnectionString("DefaultConnection");
var encryptedConnStrBytes = Convert.FromBase64String(encryptedConnStrBase64);

// Descriptografar usando EncryptService
var encryptService = new EncryptService();
var decryptedConnStr = encryptService.DecryptAES(encryptedConnStrBytes);

// EF Core: registrar DbContext (usa ConnectionStrings:DefaultConnection)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(decryptedConnStr));

// Register dependencies
builder.Services.AddSingleton<UserRepository>();
builder.Services.AddScoped<UserService>();
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

var app = builder.Build();

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
[JsonSerializable(typeof(CadastraUserDto))]
[JsonSerializable(typeof(CreateCatalogDto))]
[JsonSerializable(typeof(CatalogDto))]
[JsonSerializable(typeof(IEnumerable<CatalogDto>))]
[JsonSerializable(typeof(List<CatalogDto>))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}
