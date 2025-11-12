using ApiVilaTrack.Data;
using ApiVilaTrack.Dtos;
using ApiVilaTrack.Entities;
using ApiVilaTrack.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ApiVilaTrack.Services;

public class StockProductService
{
    private readonly StockProductRepository _repository;
    private readonly AppDbContext _context;

    public StockProductService(StockProductRepository repository, AppDbContext context)
    {
        _repository = repository;
        _context = context;
    }

    public async Task<IEnumerable<StockProductResponseDto>> GetAllAsync()
    {
        var stockProducts = await _repository.GetAllAsync();
        return stockProducts.Select(MapToResponseDto);
    }

    public async Task<StockProductResponseDto?> GetByIdAsync(int id)
    {
        var stockProduct = await _repository.GetByIdAsync(id);
        return stockProduct != null ? MapToResponseDto(stockProduct) : null;
    }

    public async Task<IEnumerable<StockProductResponseDto>> GetByInternalCodeAsync(string internalCode)
    {
        var stockProducts = await _repository.GetByInternalCodeAsync(internalCode);
        return stockProducts.Select(MapToResponseDto);
    }

    public async Task<IEnumerable<StockProductResponseDto>> GetByStatusAsync(StatusEnum status)
    {
        var stockProducts = await _repository.GetByStatusAsync(status);
        return stockProducts.Select(MapToResponseDto);
    }

    public async Task<IEnumerable<StockProductResponseDto>> GetExpiringProductsAsync(DateOnly expirationDate)
    {
        var stockProducts = await _repository.GetExpiringProductsAsync(expirationDate);
        return stockProducts.Select(MapToResponseDto);
    }

    public async Task<StockProductResponseDto> CreateAsync(CreateStockProductDto dto)
    {
        // Verificar se o produto existe no catálogo
        var catalogExists = await _context.Catalogs.AnyAsync(c => c.InternalCode == dto.InternalCode);
        if (!catalogExists)
            throw new ArgumentException($"Produto com código '{dto.InternalCode}' não encontrado no catálogo.");

        var stockProduct = new StockProduct
        {
            InternalCode = dto.InternalCode,
            ExpirationDate = dto.ExpirationDate,
            UnitType = dto.UnitType,
            OriginalPrice = dto.OriginalPrice,
            PromotionalPrice = dto.PromotionalPrice,
            CostPrice = dto.CostPrice,
            Priority = dto.Priority,
            Status = dto.Status,
            UpdatedBy = dto.UpdatedBy,
            ControlDate = dto.ControlDate
        };

        var created = await _repository.AddAsync(stockProduct);
        return MapToResponseDto(created);
    }

    public async Task<StockProductResponseDto?> UpdateAsync(int id, UpdateStockProductDto dto)
    {
        var existingProduct = await _repository.GetByIdAsync(id);
        if (existingProduct == null)
            return null;

        // Atualizar apenas os campos fornecidos
        if (dto.ExpirationDate.HasValue)
            existingProduct.ExpirationDate = dto.ExpirationDate.Value;
        
        if (!string.IsNullOrEmpty(dto.UnitType))
            existingProduct.UnitType = dto.UnitType;
        
        if (dto.OriginalPrice.HasValue)
            existingProduct.OriginalPrice = dto.OriginalPrice.Value;
        
        if (dto.PromotionalPrice.HasValue)
            existingProduct.PromotionalPrice = dto.PromotionalPrice.Value;
        
        if (dto.CostPrice.HasValue)
            existingProduct.CostPrice = dto.CostPrice.Value;
        
        if (dto.Priority.HasValue)
            existingProduct.Priority = dto.Priority.Value;
        
        if (dto.Status.HasValue)
            existingProduct.Status = dto.Status.Value;
        
        if (!string.IsNullOrEmpty(dto.UpdatedBy))
            existingProduct.UpdatedBy = dto.UpdatedBy;
        
        if (dto.ControlDate.HasValue)
            existingProduct.ControlDate = dto.ControlDate.Value;

        var updated = await _repository.UpdateAsync(id, existingProduct);
        if (!updated)
            return null;

        var updatedProduct = await _repository.GetByIdAsync(id);
        return updatedProduct != null ? MapToResponseDto(updatedProduct) : null;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _repository.ExistsAsync(id);
    }

    private StockProductResponseDto MapToResponseDto(StockProduct stockProduct)
    {
        return new StockProductResponseDto(
            stockProduct.Id,
            stockProduct.InternalCode,
            stockProduct.Catalog?.Name ?? "Produto não encontrado",
            stockProduct.Catalog?.Section ?? "Seção não definida",
            stockProduct.ExpirationDate,
            stockProduct.UnitType,
            stockProduct.OriginalPrice,
            stockProduct.PromotionalPrice,
            stockProduct.CostPrice,
            stockProduct.Priority,
            stockProduct.Status,
            stockProduct.StatusEntity?.Description ?? GetStatusDescription(stockProduct.Status),
            stockProduct.UpdatedBy,
            stockProduct.ControlDate,
            stockProduct.Catalog?.Quantity ?? 0
        );
    }

    /// <summary>
    /// Retorna a descrição textual do status do produto.
    /// </summary>
    private string GetStatusDescription(StatusEnum status)
    {
        return status switch
        {
            StatusEnum.Ativo => "Ativo",
            StatusEnum.Vendido => "Vendido",
            StatusEnum.Expirado => "Expirado",
            _ => "Desconhecido"
        };
    }
}