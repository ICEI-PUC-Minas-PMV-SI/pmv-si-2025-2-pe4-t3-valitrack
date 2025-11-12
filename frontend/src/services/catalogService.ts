import { apiClient } from './apiClient'

// Response DTO from backend
export interface CatalogResponse {
  internalCode: string
  name: string
  section: string
  quantity: number
}

// Create DTO for backend
export interface CreateCatalogDto {
  internalCode: string
  name: string
  section: string
  quantity: number
}

// Update DTO for backend
export interface UpdateCatalogDto {
  name: string
  section: string
  quantity: number
}

class CatalogService {
  private basePath = '/catalog'

  /**
   * Get all catalog items
   */
  async getAll(): Promise<CatalogResponse[]> {
    const response = await apiClient.get<CatalogResponse[]>(this.basePath)
    return response.data
  }

  /**
   * Get catalog item by internal code (PK)
   */
  async getByCode(internalCode: string): Promise<CatalogResponse> {
    const response = await apiClient.get<CatalogResponse>(`${this.basePath}/${internalCode}`)
    return response.data
  }

  /**
   * Create a new catalog item
   */
  async create(dto: CreateCatalogDto): Promise<CatalogResponse> {
    const response = await apiClient.post<CatalogResponse>(this.basePath, dto)
    return response.data
  }

  /**
   * Update a catalog item by internal code
   */
  async update(internalCode: string, dto: UpdateCatalogDto): Promise<CatalogResponse> {
    const response = await apiClient.put<CatalogResponse>(
      `${this.basePath}/${internalCode}`,
      dto
    )
    return response.data
  }

  /**
   * Delete a catalog item by internal code
   */
  async delete(internalCode: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${internalCode}`)
  }

  /**
   * Check if a catalog item exists
   */
  async exists(internalCode: string): Promise<boolean> {
    try {
      await apiClient.get(`${this.basePath}/${internalCode}`)
      return true
    } catch (error: any) {
      // If 404, item doesn't exist
      if (error.response?.status === 404) {
        return false
      }
      // For other errors, throw them
      throw error
    }
  }
}

export const catalogService = new CatalogService()
