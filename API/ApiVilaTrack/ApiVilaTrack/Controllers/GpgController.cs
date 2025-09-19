using ApiVilaTrack.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiVilaTrack.Controllers
{
    [ApiController]
    [Route("gpg")]
    public class GpgController : ControllerBase
    {
        private readonly EncryptService _gpgService;

        public GpgController(EncryptService gpgService)
        {
            _gpgService = gpgService;
        }

        [HttpPost("encrypt")]
        public async Task<IActionResult> Encrypt([FromBody] string plainText)
        {
            var encrypted = _gpgService.EncryptAES(plainText);
            return Ok(encrypted);
        }

        [HttpPost("decrypt")]
        public async Task<IActionResult> Decrypt([FromBody] string encryptedText)
        {
            var decrypted = _gpgService.EncryptAES(encryptedText);
            return Ok(decrypted);
        }

        [HttpGet("generate-keys")]
        public ActionResult GenerateKeys()
        {
            _gpgService.GenerateAndSaveKeys();
            return Ok("Chaves AES-256 geradas e salvas com sucesso.");
        }
    }
}
