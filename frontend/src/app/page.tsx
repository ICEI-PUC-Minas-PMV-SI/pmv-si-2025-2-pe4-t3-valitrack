'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeRedirect() {
  const router = useRouter()

  useEffect(() => {
    // redireciona automaticamente para /auth/login
    router.push('/auth/login')
  }, [router])

  return null // não renderiza nada
}
