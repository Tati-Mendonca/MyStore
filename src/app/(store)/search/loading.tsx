'use client'

import { Skeleton } from '@/components/skeleton'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoadingContent() {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || 'Carregando...'

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[400px]" />
        ))}
      </div>
    </div>
  )
}

export default function HomeLoading() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <LoadingContent />
    </Suspense>
  )
}
