using ApiVilaTrack.Entities;
using System.ComponentModel.DataAnnotations;

namespace ApiVilaTrack.Dtos;

public record CreateStockProductDto(
    [Required(ErrorMessage = "Código interno é obrigatório")]
    [StringLength(50, ErrorMessage = "Código interno deve ter no máximo 50 caracteres")]
    [RegularExpression(@"^[A-Za-z0-9_-]+$", ErrorMessage = "Código interno deve conter apenas letras, números, hífen e underscore")]
    string InternalCode,
    
    [Required(ErrorMessage = "Data de vencimento é obrigatória")]
    DateOnly ExpirationDate,
    
    [Required(ErrorMessage = "Tipo de unidade é obrigatório")]
    [StringLength(20, ErrorMessage = "Tipo de unidade deve ter no máximo 20 caracteres")]
    [RegularExpression(@"^[A-Za-z0-9\s]+$", ErrorMessage = "Tipo de unidade deve conter apenas letras, números e espaços")]
    string UnitType,
    
    [Required(ErrorMessage = "Preço original é obrigatório")]
    [Range(0.01, 999999.99, ErrorMessage = "Preço original deve estar entre 0,01 e 999.999,99")]
    float OriginalPrice,
    
    [Required(ErrorMessage = "Preço promocional é obrigatório")]
    [Range(0.01, 999999.99, ErrorMessage = "Preço promocional deve estar entre 0,01 e 999.999,99")]
    float PromotionalPrice,
    
    [Required(ErrorMessage = "Preço de custo é obrigatório")]
    [Range(0.01, 999999.99, ErrorMessage = "Preço de custo deve estar entre 0,01 e 999.999,99")]
    float CostPrice,
    
    [Required(ErrorMessage = "Prioridade é obrigatória")]
    [Range(1, 3, ErrorMessage = "Prioridade deve estar entre 1 e 3")]
    int Priority,
    
    [Required(ErrorMessage = "Status é obrigatório")]
    StatusEnum Status,
    
    [Required(ErrorMessage = "Usuário que atualizou é obrigatório")]
    [StringLength(100, ErrorMessage = "Nome do usuário deve ter no máximo 100 caracteres")]
    string UpdatedBy,
    
    [Required(ErrorMessage = "Data de controle é obrigatória")]
    DateOnly ControlDate
);

public record UpdateStockProductDto(
    DateOnly? ExpirationDate,
    
    [StringLength(20, ErrorMessage = "Tipo de unidade deve ter no máximo 20 caracteres")]
    [RegularExpression(@"^[A-Za-z0-9\s]+$", ErrorMessage = "Tipo de unidade deve conter apenas letras, números e espaços")]
    string? UnitType,
    
    [Range(0.01, 999999.99, ErrorMessage = "Preço original deve estar entre 0,01 e 999.999,99")]
    float? OriginalPrice,
    
    [Range(0.01, 999999.99, ErrorMessage = "Preço promocional deve estar entre 0,01 e 999.999,99")]
    float? PromotionalPrice,
    
    [Range(0.01, 999999.99, ErrorMessage = "Preço de custo deve estar entre 0,01 e 999.999,99")]
    float? CostPrice,
    
    [Range(1, 3, ErrorMessage = "Prioridade deve estar entre 1 e 3")]
    int? Priority,
    
    StatusEnum? Status,

    [StringLength(100, ErrorMessage = "Nome do usuário deve ter no máximo 100 caracteres")]
    string? UpdatedBy,
    
    DateOnly? ControlDate
);

public record StockProductDto(
    int Id,
    string InternalCode,
    DateOnly ExpirationDate,
    string UnitType,
    float OriginalPrice,
    float PromotionalPrice,
    float CostPrice,
    int Priority,
    StatusEnum Status,
    string UpdatedBy,
    DateOnly ControlDate
);

public record StockProductResponseDto(
    int Id,
    string InternalCode,
    string ProductName,
    string Section,
    DateOnly ExpirationDate,
    string UnitType,
    float OriginalPrice,
    float PromotionalPrice,
    float CostPrice,
    int Priority,
    StatusEnum Status,
    string StatusDescription,
    string UpdatedBy,
    DateOnly ControlDate,
    float Quantity
);
