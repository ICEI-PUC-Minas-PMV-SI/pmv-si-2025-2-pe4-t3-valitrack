using ApiVilaTrack.Data;
using ApiVilaTrack.Dtos;
using ApiVilaTrack.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiVilaTrack.Controllers;

[ApiController]
[Route("catalog")]
public class CatalogController : ControllerBase
{
    private readonly AppDbContext _db;

    public CatalogController(AppDbContext db)
    {
        _db = db;
    }

    // POST /catalog - cadastra item no catálogo
    [HttpPost]
    public async Task<ActionResult<CatalogDto>> Create([FromBody] CreateCatalogDto dto)
    {
        // Verifica duplicidade pela PK (InternalCode)
        var exists = await _db.Catalogs.AnyAsync(c => c.InternalCode == dto.InternalCode);
        if (exists)
            return Conflict($"Já existe item com InternalCode '{dto.InternalCode}'.");

        var entity = new Catalog
        {
            InternalCode = dto.InternalCode,
            Name = dto.Name,
            Section = dto.Section,
            Quantity = dto.Quantity
        };

        _db.Catalogs.Add(entity);
        await _db.SaveChangesAsync();

        var result = new CatalogDto(entity.InternalCode, entity.Name, entity.Section, entity.Quantity);
        return CreatedAtAction(nameof(GetByCode), new { code = entity.InternalCode }, result);
    }

    // GET /catalog - lista itens
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CatalogDto>>> GetAll()
    {
        var list = await _db.Catalogs
            .Select(c => new CatalogDto(c.InternalCode, c.Name, c.Section, c.Quantity))
            .ToListAsync();

        return Ok(list);
    }

    // GET /catalog/{code} - consulta por código
    [HttpGet("{code}")]
    public async Task<ActionResult<CatalogDto>> GetByCode(string code)
    {
        var c = await _db.Catalogs.AsNoTracking().FirstOrDefaultAsync(x => x.InternalCode == code);
        if (c is null) return NotFound();
        return Ok(new CatalogDto(c.InternalCode, c.Name, c.Section, c.Quantity));
    }

    // PUT /catalog/{code} - atualiza item por código 
    [HttpPut("{code}")]
    public async Task<ActionResult<CatalogDto>> Update(string code, [FromBody] UpdateCatalogDto dto)
    {
        var entity = await _db.Catalogs.FirstOrDefaultAsync(c => c.InternalCode == code);
        if (entity is null) return NotFound();

        entity.Name = dto.Name;
        entity.Section = dto.Section;
        entity.Quantity = dto.Quantity;

        await _db.SaveChangesAsync();

        var result = new CatalogDto(entity.InternalCode, entity.Name, entity.Section, entity.Quantity);
        return Ok(result);
    }

    // DELETE /catalog/{code} - remove item por código
    [HttpDelete("{code}")]
    public async Task<IActionResult> Delete(string code)
    {
        var entity = await _db.Catalogs.FirstOrDefaultAsync(c => c.InternalCode == code);
        if (entity is null) return NotFound();

        _db.Catalogs.Remove(entity);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}