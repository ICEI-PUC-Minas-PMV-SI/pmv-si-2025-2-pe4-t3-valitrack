using System.ComponentModel.DataAnnotations.Schema;

namespace ApiVilaTrack.Entities;

public class StockProduct
{
    public int Id { get; set; }
    public string InternalCode { get; set; } = string.Empty;
    public DateOnly ExpirationDate { get; set; }
    public string UnitType { get; set; } = string.Empty;
    public float OriginalPrice { get; set; }
    public float PromotionalPrice { get; set; }
    public float CostPrice { get; set; }
    public int Priority { get; set; }

    // FK real (compatível com Status.Id)
    public int StatusId { get; set; }

    // Enum de domínio (não mapeado)
    [NotMapped]
    public StatusEnum Status
    {
        get => (StatusEnum)StatusId;
        set => StatusId = (int)value;
    }

    public string UpdatedBy { get; set; } = string.Empty;
    public DateOnly ControlDate { get; set; }

    // Navegações   
    public Catalog? Catalog { get; set; }
    public Status? StatusEntity { get; set; }
}

public enum StatusEnum
{
    Ativo = 1,
    Vendido = 2,
    Expirado = 3
}