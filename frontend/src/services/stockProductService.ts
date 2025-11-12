import { apiClient } from './apiClient'

// Enums matching backend
export enum StatusEnum {
  Ativo = 1,
  Vendido = 2,
  Expirado = 3,
}

// Response DTO from backend
export interface StockProductResponse {
  id: number
  internalCode: string
  productName: string
  section: string
  expirationDate: string // DateOnly from backend comes as string
  unitType: string
  originalPrice: number
  promotionalPrice: number
  costPrice: number
  priority: number
  status: StatusEnum
  statusDescription: string
  updatedBy: string
  controlDate: string // DateOnly from backend comes as string
  quantity: number
}

// Create DTO for backend
export interface CreateStockProductDto {
  internalCode: string
  expirationDate: string // Format: YYYY-MM-DD
  unitType: string
  originalPrice: number
  promotionalPrice: number
  costPrice: number
  priority: number
  status: StatusEnum
  updatedBy: string
  controlDate: string // Format: YYYY-MM-DD
}

// Update DTO for backend
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

  /**
   * Get all stock products
   */
  async getAll(): Promise<StockProductResponse[]> {
    const response = await apiClient.get<StockProductResponse[]>(this.basePath)
    return response.data
  }

  /**
   * Get stock product by ID
   */
  async getById(id: number): Promise<StockProductResponse> {
    const response = await apiClient.get<StockProductResponse>(`${this.basePath}/${id}`)
    return response.data
  }

  /**
   * Get stock products by internal code
   */
  async getByInternalCode(internalCode: string): Promise<StockProductResponse[]> {
    const response = await apiClient.get<StockProductResponse[]>(
      `${this.basePath}/by-code/${internalCode}`
    )
    return response.data
  }

  /**
   * Get stock products by status
   */
  async getByStatus(status: StatusEnum): Promise<StockProductResponse[]> {
    const response = await apiClient.get<StockProductResponse[]>(
      `${this.basePath}/by-status/${status}`
    )
    return response.data
  }

  /**
   * Get products expiring by a certain date
   * @param expirationDate Optional date in YYYY-MM-DD format. Defaults to 7 days from today.
   */
  async getExpiringProducts(expirationDate?: string): Promise<StockProductResponse[]> {
    const params = expirationDate ? `?expirationDate=${expirationDate}` : ''
    const response = await apiClient.get<StockProductResponse[]>(
      `${this.basePath}/expiring${params}`
    )
    return response.data
  }

  /**
   * Create a new stock product
   */
  async create(dto: CreateStockProductDto): Promise<StockProductResponse> {
    const response = await apiClient.post<StockProductResponse>(this.basePath, dto)
    return response.data
  }

  /**
   * Update a stock product
   */
  async update(id: number, dto: UpdateStockProductDto): Promise<StockProductResponse> {
    const response = await apiClient.put<StockProductResponse>(
      `${this.basePath}/${id}`,
      dto
    )
    return response.data
  }

  /**
   * Delete a stock product
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`)
  }

  /**
   * Check if a stock product exists
   */
  async exists(id: number): Promise<boolean> {
    try {
      await apiClient.get(`${this.basePath}/${id}`)
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

export const stockProductService = new StockProductService()
