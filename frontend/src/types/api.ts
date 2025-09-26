export interface ApiResponse<T = any> {
  data?: T
  message?: string
  success?: boolean
  [key: string]: any
}

export interface ApiError {
  message?: string
  statusCode?: number
  [key: string]: any
}
