export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7036',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}
