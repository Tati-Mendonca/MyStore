'use client'

import { useCart } from '@/contexts/cart-context'
import { ShoppingBag } from 'lucide-react'

interface CartWidgetProps {
  onClick?: () => void
}

export function CartWidget({ onClick }: CartWidgetProps) {
  const { items } = useCart()
  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="h-4 w-4" />
      <div
        className={`text-sm hover:underline transition-all duration-300 ${
          items.length > 0 ? 'text-emerald-600' : 'text-black'
        }`}
        onClick={onClick}
      >
        Cart({items.length})
      </div>
    </div>
  )
}
