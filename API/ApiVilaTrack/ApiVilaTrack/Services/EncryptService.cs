using System;
using System.Security.Cryptography;
using System.Text;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace ApiVilaTrack.Services
{
    public class EncryptService
    {
        private readonly string? _publicKeyPath;
        private readonly string? _privateKeyPath;

        public EncryptService()
        {
            try
            {
                var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";

                var config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
                    .Build();

                _publicKeyPath = config["Gpg:PublicKeyPath"];
                _privateKeyPath = config["Gpg:PrivateKeyPath"];

                Console.WriteLine($"[EncryptService] Initialized - PublicKeyPath: {_publicKeyPath ?? "NOT SET"}, PrivateKeyPath: {_privateKeyPath ?? "NOT SET"}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[EncryptService] Warning: Failed to load configuration - {ex.Message}");
                _publicKeyPath = null;
                _privateKeyPath = null;
            }
        }

        // Helper method to get key bytes from file or environment variable
        private byte[] GetKeyBytes(string? keyPath, string envVarName)
        {
            // Try environment variable first (for Railway deployment)
            var envKey = Environment.GetEnvironmentVariable(envVarName);
            if (!string.IsNullOrEmpty(envKey))
            {
                Console.WriteLine($"[EncryptService] Using {envVarName} from environment variable");
                return Convert.FromBase64String(envKey);
            }

            // Fall back to file (for local development)
            if (!string.IsNullOrEmpty(keyPath) && File.Exists(keyPath))
            {
                Console.WriteLine($"[EncryptService] Using key from file: {keyPath}");
                return File.ReadAllBytes(keyPath);
            }

            throw new FileNotFoundException($"Encryption key not found. Set {envVarName} environment variable or provide key file at {keyPath}");
        }

        // Gera par de chaves AES (simetrica)
        public void GenerateAndSaveKeys()
        {
            if (string.IsNullOrEmpty(_publicKeyPath) || string.IsNullOrEmpty(_privateKeyPath))
            {
                throw new InvalidOperationException("Key paths not configured");
            }

            using (var aes = Aes.Create())
            {
                // Gera chave AES-256 e IV
                aes.KeySize = 256;
                aes.GenerateKey();
                aes.GenerateIV();

                // Salva chave e IV em arquivos binarios
                File.WriteAllBytes(_publicKeyPath, aes.Key);
                File.WriteAllBytes(_privateKeyPath, aes.IV);
            }
        }

        // Criptografa texto com AES e chave simetrica ja existente
        public byte[] EncryptAES(string plainText)
        {
            try
            {
                using (var aes = Aes.Create())
                {
                    // Le chave e IV dos arquivos ou variaveis de ambiente
                    aes.Key = GetKeyBytes(_publicKeyPath, "AES_KEY");
                    aes.IV = GetKeyBytes(_privateKeyPath, "AES_IV");

                    var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                    byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
                    byte[] encrypted = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

                    return encrypted;
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
            try
            {
                using (var aes = Aes.Create())
                {
                    // Le chave e IV dos arquivos ou variaveis de ambiente
                    aes.Key = GetKeyBytes(_publicKeyPath, "AES_KEY");
                    aes.IV = GetKeyBytes(_privateKeyPath, "AES_IV");

                    var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
                    byte[] decrypted = decryptor.TransformFinalBlock(cipherText, 0, cipherText.Length);
                    return Encoding.UTF8.GetString(decrypted);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
