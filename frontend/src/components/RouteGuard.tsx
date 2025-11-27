'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/recover',
  '/about',
  '/contact',
  '/',
]

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()

  const isPublicRoute = PUBLIC_ROUTES.some(
    route => pathname === route || pathname.startsWith(route),
  )

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      router.replace('/auth/login')
    }
  }, [isAuthenticated, isLoading, pathname, router, isPublicRoute])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b2239]"></div>
      </div>
    )
  }

  if (!isAuthenticated && !isPublicRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b2239]"></div>
      </div>
    )
  }

  return <>{children}</>
}
