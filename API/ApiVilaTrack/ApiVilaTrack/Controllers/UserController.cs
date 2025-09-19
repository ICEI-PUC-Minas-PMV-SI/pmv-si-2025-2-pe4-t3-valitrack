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
        public ActionResult<IEnumerable<UserDto>> GetAll()
        {
            var users = _service.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<UserDto> GetById(int id)
        {
            var user = _service.GetById(id);
            return user is not null ? Ok(user) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Add(CadastraUserDto userDto)
        {
            var created = _service.Add(userDto);
            return Created($"/users/{created.Id}", created);
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, CadastraUserDto userDto)
        {
            return _service.Update(id, userDto) ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return _service.Delete(id) ? NoContent() : NotFound();
        }
    }
}