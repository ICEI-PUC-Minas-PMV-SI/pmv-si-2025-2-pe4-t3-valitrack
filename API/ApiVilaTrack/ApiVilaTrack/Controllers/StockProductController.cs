using ApiVilaTrack.Dtos;
using ApiVilaTrack.Entities;
using ApiVilaTrack.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ApiVilaTrack.Controllers;

[ApiController]
[Route("stock-products")]
public class StockProductController : ControllerBase
{
    private readonly StockProductService _service;

    public StockProductController(StockProductService service)
    {
        _service = service;
    }

    /// <summary>
    /// Lista todos os produtos em estoque
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StockProductResponseDto>>> GetAll()
    {
        var products = await _service.GetAllAsync();
        return Ok(products);
    }

    /// <summary>
    /// Busca um produto em estoque por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<StockProductResponseDto>> GetById(int id)
    {
        var product = await _service.GetByIdAsync(id);
        return product != null ? Ok(product) : NotFound();
    }

    /// <summary>
    /// Busca produtos em estoque por código interno
    /// </summary>
    [HttpGet("by-code/{internalCode}")]
    public async Task<ActionResult<IEnumerable<StockProductResponseDto>>> GetByInternalCode(string internalCode)
    {
        // Validação de segurança
        if (string.IsNullOrEmpty(internalCode) || !SecurityService.IsSafeInternalCode(internalCode))
            return BadRequest("Código interno inválido ou contém caracteres perigosos");

        try
        {
            var products = await _service.GetByInternalCodeAsync(internalCode);
            return Ok(products);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Busca produtos em estoque por status
    /// </summary>
    [HttpGet("by-status/{status}")]
    public async Task<ActionResult<IEnumerable<StockProductResponseDto>>> GetByStatus(StatusEnum status)
    {
        var products = await _service.GetByStatusAsync(status);
        return Ok(products);
    }

    /// <summary>
    /// Busca produtos próximos ao vencimento
    /// </summary>
    [HttpGet("expiring")]
    public async Task<ActionResult<IEnumerable<StockProductResponseDto>>> GetExpiringProducts([FromQuery] DateOnly? expirationDate = null)
    {
        var targetDate = expirationDate ?? DateOnly.FromDateTime(DateTime.Today.AddDays(7)); // 7 dias por padrão
        var products = await _service.GetExpiringProductsAsync(targetDate);
        return Ok(products);
    }

    /// <summary>
    /// Cadastra um novo produto no estoque
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<StockProductResponseDto>> Create([FromBody] CreateStockProductDto dto)
    {
        // Validação do modelo
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Validações de segurança adicionais
        if (!SecurityService.IsSafeInternalCode(dto.InternalCode))
            return BadRequest("Código interno inválido ou contém caracteres perigosos");
        
        if (!SecurityService.IsSafeUnitType(dto.UnitType))
            return BadRequest("Tipo de unidade inválido ou contém caracteres perigosos");
        
        if (!SecurityService.IsSafeUserName(dto.UpdatedBy))
            return BadRequest("Nome do usuário inválido ou contém caracteres perigosos");

        if (!SecurityService.IsSafeNumericValue(dto.OriginalPrice))
            return BadRequest("Preço original deve estar entre 0,01 e 999.999,99");
        
        if (!SecurityService.IsSafeNumericValue(dto.PromotionalPrice))
            return BadRequest("Preço promocional deve estar entre 0,01 e 999.999,99");
        
        if (!SecurityService.IsSafeNumericValue(dto.CostPrice))
            return BadRequest("Preço de custo deve estar entre 0,01 e 999.999,99");
        
        if (!SecurityService.IsSafePriority(dto.Priority))
            return BadRequest("Prioridade deve estar entre 1 e 3");

        try
        {
            var product = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Atualiza um produto no estoque
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<StockProductResponseDto>> Update(int id, [FromBody] UpdateStockProductDto dto)
    {
        // Validação do modelo
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Validações de segurança para campos fornecidos
        if (!string.IsNullOrEmpty(dto.UnitType) && !SecurityService.IsSafeUnitType(dto.UnitType))
            return BadRequest("Tipo de unidade inválido ou contém caracteres perigosos");
        
        if (!string.IsNullOrEmpty(dto.UpdatedBy) && !SecurityService.IsSafeUserName(dto.UpdatedBy))
            return BadRequest("Nome do usuário inválido ou contém caracteres perigosos");

        if (dto.OriginalPrice.HasValue && !SecurityService.IsSafeNumericValue(dto.OriginalPrice.Value))
            return BadRequest("Preço original deve estar entre 0,01 e 999.999,99");
        
        if (dto.PromotionalPrice.HasValue && !SecurityService.IsSafeNumericValue(dto.PromotionalPrice.Value))
            return BadRequest("Preço promocional deve estar entre 0,01 e 999.999,99");
        
        if (dto.CostPrice.HasValue && !SecurityService.IsSafeNumericValue(dto.CostPrice.Value))
            return BadRequest("Preço de custo deve estar entre 0,01 e 999.999,99");
        
        if (dto.Priority.HasValue && !SecurityService.IsSafePriority(dto.Priority.Value))
            return BadRequest("Prioridade deve estar entre 1 e 3");

        try
        {
            var product = await _service.UpdateAsync(id, dto);
            return product != null ? Ok(product) : NotFound();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Remove um produto do estoque
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    /// <summary>
    /// Verifica se um produto existe no estoque
    /// </summary>
    [HttpHead("{id}")]
    public async Task<ActionResult> Exists(int id)
    {
        var exists = await _service.ExistsAsync(id);
        return exists ? Ok() : NotFound();
    }
}