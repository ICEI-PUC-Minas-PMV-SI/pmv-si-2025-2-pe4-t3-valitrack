namespace ApiVilaTrack.Entities;

public class Catalog
{
    public string InternalCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Section { get; set; } = string.Empty;
    public float Quantity { get; set; }
}