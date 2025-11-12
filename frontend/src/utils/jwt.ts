import { SignJWT, jwtVerify, decodeJwt } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET || 'valitrack-secret-key-2025'
)
const JWT_EXPIRY = '7d' // 1 week

export interface TokenPayload {
  id: number
  name: string
  exp?: number
  iat?: number
}

/**
 * Generate a JWT token for the authenticated user
 */
export async function generateToken(
  payload: Omit<TokenPayload, 'exp' | 'iat'>
): Promise<string> {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET)
}

/**
 * Decode and verify a JWT token
 */
export async function verifyToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as TokenPayload
  } catch (error) {
    console.error('Invalid token:', error)
    return null
  }
}

/**
 * Decode a token without verifying (useful for checking expiry)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = decodeJwt(token)
    return decoded as TokenPayload
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

/**
 * Check if a token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true

  const currentTime = Math.floor(Date.now() / 1000)
  return decoded.exp < currentTime
}

/**
 * Save token to localStorage
 */
export function saveToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

/**
 * Get token from localStorage
 */
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

/**
 * Remove token from localStorage
 */
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

/**
 * Get current authenticated user from token
 */
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const token = getToken()
  if (!token) return null

  if (isTokenExpired(token)) {
    removeToken()
    return null
  }

  return await verifyToken(token)
}
