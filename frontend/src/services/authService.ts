import apiClient from './apiClient'

class AuthService {
  async login(credentials: { email: string; password: string }) {
    const response = await apiClient.post('/auth/login', credentials)
    return response.data
  }

  // async register(userData: any) {
  //   const response = await apiClient.post('/auth/register', userData)
  //   return response.data
  // }

  // async logout() {
  //   const response = await apiClient.post('/auth/logout')
  //   return response.data
  // }
}

export const authService = new AuthService()
export default authService
