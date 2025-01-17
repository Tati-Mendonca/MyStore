import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/cart-context'
import { ReactNode } from 'react'

export default function Store({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {' '}
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 py-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
