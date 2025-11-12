using System;
using System.Security.Cryptography;
using System.Text;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace ApiVilaTrack.Services
{
    public class EncryptService
    {
        private readonly string _publicKeyPath;
        private readonly string _privateKeyPath;

        public EncryptService()
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";

            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
                .Build();

            _publicKeyPath = config["Gpg:PublicKeyPath"];
            _privateKeyPath = config["Gpg:PrivateKeyPath"];
        }

        // Gera par de chaves AES (sim�trica)
        public void GenerateAndSaveKeys()
        {
            using (var aes = Aes.Create())
            {
                // Gera chave AES-256 e IV
                aes.KeySize = 256;
                aes.GenerateKey();
                aes.GenerateIV();

                // Salva chave e IV em arquivos bin�rios
                File.WriteAllBytes(_publicKeyPath, aes.Key);
                File.WriteAllBytes(_privateKeyPath, aes.IV);
            }
        }

        // Criptografa texto com AES e chave sim�trica j� existente
        public byte[] EncryptAES(string plainText)
        {
            try
            {
                using (var aes = Aes.Create())
                {
                    // L� chave e IV dos arquivos
                    aes.Key = File.ReadAllBytes(_publicKeyPath);
                    aes.IV = File.ReadAllBytes(_privateKeyPath);

                    var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                    byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
                    byte[] encrypted = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

                    return (encrypted);
                }
            }
            catch (Exception)
            {
                throw;
            }
           
        }

        // Descriptografa texto com AES
        public string DecryptAES(byte[] cipherText)
        {
            using (var aes = Aes.Create())
            {
                aes.IV = File.ReadAllBytes(_privateKeyPath);
                aes.Key = File.ReadAllBytes(_publicKeyPath);

                var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
                byte[] decrypted = decryptor.TransformFinalBlock(cipherText, 0, cipherText.Length);
                return Encoding.UTF8.GetString(decrypted);
            }
        }
    }
}
