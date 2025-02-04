'use client'

import { useCart } from '@/contexts/cart-context'
import Link from 'next/link'

export interface AddToCartButtonProps {
  productId: number
  name: string
  price: number
  image: string
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
}: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddProdutToCart() {
    addToCart({
      productId,
      title: name,
      price,
      image,
      quantity: 1,
    })
  }

  return (
    <>
      <Link
        href="/"
        onClick={handleAddProdutToCart}
        className="flex mt-6 rounded-full bg-emerald-500 py-3 px-6 justify-center text-white font-semibold shadow-md transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        Adicionar ao carrinho
      </Link>
    </>
  )
}
