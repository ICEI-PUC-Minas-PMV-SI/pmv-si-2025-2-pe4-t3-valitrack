using ApiVilaTrack.Dtos;
using Microsoft.Extensions.Options;
using PgpCore;
using System.IO;
using System.Threading.Tasks;

namespace ApiVilaTrack.Services
{
    public class GpgService
    {
        private readonly GpgDto _options;

        public GpgService(IOptions<GpgDto> options)
        {
            _options = options.Value;
        }

        public async Task<string> EncryptString(string plainText)
        {
            try
            {
                using (var pgp = new PGP())
                using (var inputStream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(plainText)))
                using (var outputStream = new MemoryStream())
                using (var publicKeyStream = File.OpenRead(_options.PublicKeyPath)) // chave pública
                {
                    // Aqui passamos o stream da chave pública
                    await pgp.EncryptStreamAsync(
                        inputStream: inputStream,
                        outputStream: outputStream
                    );

                    outputStream.Position = 0;
                    using (var reader = new StreamReader(outputStream))
                    {
                        return await reader.ReadToEndAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public async Task<string> DecryptString(string encryptedText)
        {
            try
            {
                using (var pgp = new PGP())
                using (var inputStream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(encryptedText)))
                using (var outputStream = new MemoryStream())
                using (var privateKeyStream = File.OpenRead(_options.PrivateKeyPath))
                {
                    // Se a chave privada tem senha, passe como segundo parâmetro
                    string passPhrase = _options.PrivateKeyPassword;

                    await pgp.DecryptStreamAsync(
                        inputStream: inputStream,
                        outputStream: outputStream
                    );

                    outputStream.Position = 0;
                    using (var reader = new StreamReader(outputStream))
                    {
                        return await reader.ReadToEndAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
