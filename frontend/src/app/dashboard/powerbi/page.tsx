'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function PowerBIPage() {
  const [isLoading, setIsLoading] = useState(true)

  // URL do relatório Power BI (será configurada via variável de ambiente)
  const powerbiUrl = process.env.NEXT_PUBLIC_POWERBI_EMBED_URL || ''

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0b2239] px-28 py-4 shadow-md flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold text-white">Dashboard Power BI</h1>
          <p className="mt-1 text-sm text-gray-300">
            Visualização de dados e relatórios
          </p>
        </div>

        <Link className="" href={'/products'}>
          Voltar para Home
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mx-auto max-w-screen-2xl">
          {!powerbiUrl ? (
            // Mensagem quando a URL não está configurada
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mb-4 text-6xl">📊</div>
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                  Power BI não configurado
                </h2>
                <p className="mb-4 text-gray-600">
                  Para exibir o relatório do Power BI, configure a variável de
                  ambiente:
                </p>
                <div className="rounded-md bg-gray-100 p-4 text-left">
                  <code className="text-sm text-gray-800">
                    NEXT_PUBLIC_POWERBI_EMBED_URL=sua-url-aqui
                  </code>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Adicione esta variável no arquivo{' '}
                  <span className="font-mono">.env.local</span> e reinicie o
                  servidor.
                </p>
              </div>
            </div>
          ) : (
            // Container do iframe
            <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#0b2239] border-r-transparent"></div>
                    <p className="text-gray-600">Carregando relatório...</p>
                  </div>
                </div>
              )}

              {/* Power BI Iframe */}
              <iframe
                src={powerbiUrl}
                className="h-[calc(100vh-180px)] w-full border-0"
                allowFullScreen
                onLoad={handleIframeLoad}
                title="Power BI Report"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
