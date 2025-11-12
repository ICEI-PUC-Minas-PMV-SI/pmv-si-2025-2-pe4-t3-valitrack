import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { API_CONFIG } from './api.config'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers,
    })
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config)
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config)
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, data, config)
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.patch<T>(url, data, config)
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config)
  }

  async head<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.client.head<T>(url, config)
  }

  getInstance(): AxiosInstance {
    return this.client
  }
}

export const apiClient = new ApiClient()
export default apiClient
