using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using ApiVilaTrack.Services;

namespace ApiVilaTrack.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .Build();

        // Obter a string criptografada do appsettings.json
        var encryptedConnStrBase64 = configuration.GetConnectionString("DefaultConnection");
        var encryptedConnStrBytes = Convert.FromBase64String(encryptedConnStrBase64);

        // Descriptografar usando EncryptService
        var encryptService = new EncryptService();
        var decryptedConnStr = encryptService.DecryptAES(encryptedConnStrBytes);

        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseSqlServer(decryptedConnStr);

        return new AppDbContext(optionsBuilder.Options);
    }
}