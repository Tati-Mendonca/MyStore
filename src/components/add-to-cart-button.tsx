'use client'

import { useCart } from '@/contexts/cart-context'

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
    <button
      type="button"
      onClick={handleAddProdutToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao carrinho
    </button>
  )
}
