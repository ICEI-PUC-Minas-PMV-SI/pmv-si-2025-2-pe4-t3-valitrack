import { apiClient } from './apiClient'

export enum StatusEnum {
  Ativo = 1,
  Vendido = 2,
  Expirado = 3,
}

export interface StockProductResponse {
  id: number
  internalCode: string
  productName: string
  section: string
  expirationDate: string
  unitType: string
  originalPrice: number
  promotionalPrice: number
  costPrice: number
  priority: number
  status: StatusEnum
  statusDescription: string
  updatedBy: string
  controlDate: string
  quantity: number
}

export interface CreateStockProductDto {
  internalCode: string
  expirationDate: string
  unitType: string
  originalPrice: number
  promotionalPrice: number
  costPrice: number
  priority: number
  status: StatusEnum
  updatedBy: string
  controlDate: string
}

export interface UpdateStockProductDto {
  expirationDate?: string
  unitType?: string
  originalPrice?: number
  promotionalPrice?: number
  costPrice?: number
  priority?: number
  status?: StatusEnum
  updatedBy?: string
  controlDate?: string
}

class StockProductService {
  private basePath = '/stock-products'

  async getAll(): Promise<StockProductResponse[]> {
    const response = await apiClient.get<StockProductResponse[]>(this.basePath)
    return response.data
  }

  async getById(id: number): Promise<StockProductResponse> {
    const response = await apiClient.get<StockProductResponse>(`${this.basePath}/${id}`)
    return response.data
  }

  async getByInternalCode(internalCode: string): Promise<StockProductResponse[]> {
    const response = await apiClient.get<StockProductResponse[]>(
      `${this.basePath}/by-code/${internalCode}`
    )
    return response.data
  }

  async getByStatus(status: StatusEnum): Promise<StockProductResponse[]> {
    const response = await apiClient.get<StockProductResponse[]>(
      `${this.basePath}/by-status/${status}`
    )
    return response.data
  }

  async getExpiringProducts(expirationDate?: string): Promise<StockProductResponse[]> {
    const params = expirationDate ? `?expirationDate=${expirationDate}` : ''
    const response = await apiClient.get<StockProductResponse[]>(
      `${this.basePath}/expiring${params}`
    )
    return response.data
  }

  async create(dto: CreateStockProductDto): Promise<StockProductResponse> {
    const response = await apiClient.post<StockProductResponse>(this.basePath, dto)
    return response.data
  }

  async update(id: number, dto: UpdateStockProductDto): Promise<StockProductResponse> {
    const response = await apiClient.put<StockProductResponse>(
      `${this.basePath}/${id}`,
      dto
    )
    return response.data
  }

  async delete(id: number): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`)
  }

  async exists(id: number): Promise<boolean> {
    try {
      await apiClient.get(`${this.basePath}/${id}`)
      return true
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false
      }
      throw error
    }
  }
}

export const stockProductService = new StockProductService()
