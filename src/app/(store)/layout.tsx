'use client'

import { Header } from '@/components/header'
import Sidebar from '@/components/sidebar'
import { CartProvider } from '@/contexts/cart-context'
import { ReactNode, useState } from 'react'

export default function Store({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <CartProvider>
      {' '}
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 py-8">
        <Header toggleSidebar={toggleSidebar} />
        {children}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </CartProvider>
  )
}
