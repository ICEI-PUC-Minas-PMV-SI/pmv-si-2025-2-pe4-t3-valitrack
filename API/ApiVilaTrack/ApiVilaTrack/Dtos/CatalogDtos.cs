namespace ApiVilaTrack.Dtos;

public record CreateCatalogDto(string InternalCode, string Name, string Section, float Quantity);
public record CatalogDto(string InternalCode, string Name, string Section, float Quantity);