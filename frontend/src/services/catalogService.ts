import { apiClient } from './apiClient'

export interface CatalogResponse {
  internalCode: string
  name: string
  section: string
  quantity: number
}

export interface CreateCatalogDto {
  internalCode: string
  name: string
  section: string
  quantity: number
}

export interface UpdateCatalogDto {
  name: string
  section: string
  quantity: number
}

class CatalogService {
  private basePath = '/catalog'

  async getAll(): Promise<CatalogResponse[]> {
    const response = await apiClient.get<CatalogResponse[]>(this.basePath)
    return response.data
  }

  async getByCode(internalCode: string): Promise<CatalogResponse> {
    const response = await apiClient.get<CatalogResponse>(`${this.basePath}/${internalCode}`)
    return response.data
  }

  async create(dto: CreateCatalogDto): Promise<CatalogResponse> {
    const response = await apiClient.post<CatalogResponse>(this.basePath, dto)
    return response.data
  }

  async update(internalCode: string, dto: UpdateCatalogDto): Promise<CatalogResponse> {
    const response = await apiClient.put<CatalogResponse>(
      `${this.basePath}/${internalCode}`,
      dto
    )
    return response.data
  }

  async delete(internalCode: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${internalCode}`)
  }

  async exists(internalCode: string): Promise<boolean> {
    try {
      await apiClient.get(`${this.basePath}/${internalCode}`)
      return true
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false
      }
      throw error
    }
  }
}

export const catalogService = new CatalogService()
