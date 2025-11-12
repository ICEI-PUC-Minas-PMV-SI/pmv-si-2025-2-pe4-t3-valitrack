using ApiVilaTrack.Dtos;
using ApiVilaTrack.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ApiVilaTrack.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly UserService _service;

        public UserController(UserService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            var users = await _service.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(int id)
        {
            var user = await _service.GetByIdAsync(id);
            return user is not null ? Ok(user) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Add(CadastraUserDto userDto)
        {
            var created = await _service.AddAsync(userDto);
            return Created($"/users/{created.Id}", created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, CadastraUserDto userDto)
        {
            return await _service.UpdateAsync(id, userDto) ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await _service.DeleteAsync(id) ? NoContent() : NotFound();
        }
    }
}