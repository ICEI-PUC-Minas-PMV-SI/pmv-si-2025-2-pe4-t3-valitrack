'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  generateToken,
  getCurrentUser,
  removeToken,
  saveToken,
  type TokenPayload,
} from '@/utils/jwt'

interface AuthContextType {
  user: TokenPayload | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (userData: { id: number; name: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/recover',
  '/about',
  '/contact',
  '/',
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TokenPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for existing token on mount
    const initAuth = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setIsLoading(false)

      // Redirect logic
      if (!currentUser && !isPublicRoute(pathname)) {
        router.push('/auth/login')
      }
    }

    initAuth()
  }, [pathname, router])

  const isPublicRoute = (path: string): boolean => {
    return PUBLIC_ROUTES.some(route => path === route || path.startsWith(route))
  }

  const login = async (userData: { id: number; name: string }) => {
    const token = await generateToken(userData)
    saveToken(token)
    setUser(userData)
    router.push('/products')
  }

  const logout = () => {
    removeToken()
    setUser(null)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
