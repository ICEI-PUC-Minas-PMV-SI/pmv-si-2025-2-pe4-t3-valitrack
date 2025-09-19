using System.Text.Json.Serialization;
using ApiVilaTrack.Repositories;
using ApiVilaTrack.Services;
using ApiVilaTrack.Controllers;
using ApiVilaTrack.Dtos;
using Microsoft.AspNetCore.Routing.Constraints;

var builder = WebApplication.CreateSlimBuilder(args);

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
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}
