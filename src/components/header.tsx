'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CartWidget } from './cart-widget'
import { SearchForm } from './search-form'
import { Suspense } from 'react'

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <div className="flex items-center justify-between bg-zinc-50 px-5">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-zinc-950">
          My Store
        </Link>
        <Suspense fallback={<p>Carregando busca...</p>}>
          <SearchForm />
        </Suspense>
      </div>
      <div className="flex items-center gap-4">
        <CartWidget onClick={toggleSidebar} />

        <div className="w-px h-4 bg-zinc-700" />
        <Link href="/" className="flex items-center gap-2 hover:underline">
          <span className="text-sm">Account</span>
          <Image
            src="https://github.com/tati-mendonca.png"
            alt="Picture of the user"
            className="h-6 w-6 rounded-full"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  )
}
