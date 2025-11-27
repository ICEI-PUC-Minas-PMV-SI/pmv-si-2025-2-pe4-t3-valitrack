using ApiVilaTrack.Data;
using ApiVilaTrack.Entities;
using ApiVilaTrack.Services;
using Microsoft.EntityFrameworkCore;

namespace ApiVilaTrack.Repositories;

public class StockProductRepository
{
    private readonly AppDbContext _context;

    // O repositório recebe o contexto do banco de dados via injeção de dependência
    public StockProductRepository(AppDbContext context)
    {
        _context = context;
    }

    // Retorna todos os produtos em estoque, incluindo os dados do catálogo e do status
    public async Task<IEnumerable<StockProduct>> GetAllAsync()
    {
        return await _context.StockProducts
            .Include(sp => sp.Catalog)
            .Include(sp => sp.StatusEntity)
            .ToListAsync();
    }

    // Busca um produto em estoque pelo ID, incluindo catálogo e status
    public async Task<StockProduct?> GetByIdAsync(int id)
    {
        return await _context.StockProducts
            .Include(sp => sp.Catalog)
            .Include(sp => sp.StatusEntity)
            .FirstOrDefaultAsync(sp => sp.Id == id);
    }

    // Busca todos os produtos em estoque de acordo com o código interno do catálogo (partial match)
    public async Task<IEnumerable<StockProduct>> GetByInternalCodeAsync(string internalCode)
    {
        // Sanitiza o código interno (permite busca parcial, então não valida formato completo)
        var sanitizedCode = SecurityService.SanitizeString(internalCode);

        // Busca parcial no código interno OU no nome do produto
        return await _context.StockProducts
            .Include(sp => sp.Catalog)
            .Include(sp => sp.StatusEntity)
            .Where(sp => sp.InternalCode.Contains(sanitizedCode) ||
                        (sp.Catalog != null && sp.Catalog.Name.Contains(sanitizedCode)))
            .ToListAsync();
    }

    // Busca todos os produtos em estoque com um determinado status
    public async Task<IEnumerable<StockProduct>> GetByStatusAsync(StatusEnum status)
    {
        return await _context.StockProducts
            .Include(sp => sp.Catalog)
            .Include(sp => sp.StatusEntity)
            .Where(sp => sp.StatusId == (int)status)
            .ToListAsync();
    }

    // Busca produtos que estão para vencer até uma data específica e que estejam ativos
    public async Task<IEnumerable<StockProduct>> GetExpiringProductsAsync(DateOnly expirationDate)
    {
        return await _context.StockProducts
            .Include(sp => sp.Catalog)
            .Include(sp => sp.StatusEntity)
            .Where(sp => sp.ExpirationDate <= expirationDate && sp.StatusId == (int)StatusEnum.Ativo)
            .OrderBy(sp => sp.ExpirationDate)
            .ToListAsync();
    }

    // Adiciona um novo produto em estoque ao banco de dados
    public async Task<StockProduct> AddAsync(StockProduct stockProduct)
    {
        // Sanitiza e valida os dados antes de salvar
        stockProduct.InternalCode = SecurityService.SanitizeString(stockProduct.InternalCode);
        stockProduct.UnitType = SecurityService.SanitizeString(stockProduct.UnitType);
        stockProduct.UpdatedBy = SecurityService.SanitizeString(stockProduct.UpdatedBy);

        // Validações de segurança
        if (!SecurityService.IsSafeInternalCode(stockProduct.InternalCode))
            throw new ArgumentException("Código interno inválido");

        if (!SecurityService.IsSafeUnitType(stockProduct.UnitType))
            throw new ArgumentException("Tipo de unidade inválido");

        _context.StockProducts.Add(stockProduct);
        await _context.SaveChangesAsync();
        return stockProduct;
    }

    // Atualiza um produto em estoque existente pelo ID
    public async Task<bool> UpdateAsync(int id, StockProduct stockProduct)
    {
        var existingProduct = await _context.StockProducts.FindAsync(id);
        if (existingProduct == null)
            return false;

        // Sanitiza e valida os dados antes de atualizar
        stockProduct.InternalCode = SecurityService.SanitizeString(stockProduct.InternalCode);
        stockProduct.UnitType = SecurityService.SanitizeString(stockProduct.UnitType);
        stockProduct.UpdatedBy = SecurityService.SanitizeString(stockProduct.UpdatedBy);

        // Validações de segurança
        if (!SecurityService.IsSafeInternalCode(stockProduct.InternalCode))
            throw new ArgumentException("Código interno inválido");

        if (!SecurityService.IsSafeUnitType(stockProduct.UnitType))
            throw new ArgumentException("Tipo de unidade inválido");

        existingProduct.InternalCode = stockProduct.InternalCode;
        existingProduct.ExpirationDate = stockProduct.ExpirationDate;
        existingProduct.UnitType = stockProduct.UnitType;
        existingProduct.OriginalPrice = stockProduct.OriginalPrice;
        existingProduct.PromotionalPrice = stockProduct.PromotionalPrice;
        existingProduct.CostPrice = stockProduct.CostPrice;
        existingProduct.Priority = stockProduct.Priority;
        existingProduct.Status = stockProduct.Status;
        existingProduct.UpdatedBy = stockProduct.UpdatedBy;
        existingProduct.ControlDate = stockProduct.ControlDate;

        await _context.SaveChangesAsync();
        return true;
    }

    // Remove um produto em estoque pelo ID
    public async Task<bool> DeleteAsync(int id)
    {
        var stockProduct = await _context.StockProducts.FindAsync(id);
        if (stockProduct == null)
            return false;

        _context.StockProducts.Remove(stockProduct);
        await _context.SaveChangesAsync();
        return true;
    }

    // Verifica se existe um produto em estoque com o ID informado
    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.StockProducts.AnyAsync(sp => sp.Id == id);
    }
}