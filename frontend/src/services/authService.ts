import apiClient from './apiClient'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  id: number
  name: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Map frontend fields to backend API contract
    const loginDto = {
      Name: credentials.email, // Backend uses 'Name' field
      Senha: credentials.password, // Backend uses 'Senha' field
    }

    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      loginDto,
    )
    return response.data
  }

  async register(userData: {
    name: string
    password: string
  }): Promise<LoginResponse> {
    const registerDto = {
      Name: userData.name,
      Senha: userData.password,
    }

    const response = await apiClient.post<LoginResponse>(
      '/auth/register',
      registerDto,
    )
    return response.data
  }
}

export const authService = new AuthService()
export default authService
