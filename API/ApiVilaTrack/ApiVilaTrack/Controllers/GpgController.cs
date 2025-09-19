using ApiVilaTrack.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiVilaTrack.Controllers
{
    [ApiController]
    [Route("gpg")]
    public class GpgController : ControllerBase
    {
        private readonly GpgService _gpgService;

        public GpgController(GpgService gpgService)
        {
            _gpgService = gpgService;
        }

        [HttpPost("encrypt")]
        public async Task<IActionResult> Encrypt([FromBody] string plainText)
        {
            var encrypted = await _gpgService.EncryptString(plainText);
            return Ok(encrypted);
        }

        [HttpPost("decrypt")]
        public async Task<IActionResult> Decrypt([FromBody] string encryptedText)
        {
            var decrypted = await _gpgService.DecryptString(encryptedText);
            return Ok(decrypted);
        }
    }
}
