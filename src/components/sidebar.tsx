'use client'

import { useCart } from '@/contexts/cart-context'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart()
  if (!isOpen) {
    return null
  }

  const handleIncreaseQuantity = (productId: number) => {
    const quantity =
      items.find((item) => item.productId === productId)?.quantity ?? 0
    updateQuantity(productId, quantity + 1)
  }

  const handleDecreaseQuantity = (productId: number) => {
    const currentQuantity =
      items.find((item) => item.productId === productId)?.quantity || 1
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1)
    }
  }

  const handleRemoveProduct = (productId: number) => {
    removeFromCart(productId)
  }

  return (
    <>
      <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 transition-transform transform">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold">Carrinho de compras</h2>
          <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />

          {items.length === 0 ? (
            <p className="text-gray-500 mt-4">Carrinho vazio</p>
          ) : (
            <div>
              {items.map((item, index) => (
                <div key={item.productId} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Preço: ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => handleIncreaseQuantity(item.productId)}
                      >
                        +
                      </button>
                      <p className="text-sm">{item.quantity}</p>
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => handleDecreaseQuantity(item.productId)}
                      >
                        -
                      </button>
                      <button
                        className="px-2 py-1 bg-gray-500 text-white rounded"
                        onClick={() => handleRemoveProduct(item.productId)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>

                  {index < items.length - 0 && (
                    <hr className="h-px mt-3 bg-gray-200 border-0 dark:bg-gray-700" />
                  )}
                </div>
              ))}

              <div className="mt-4">
                <h3 className="font-semibold">
                  Preço Total: ${getTotalPrice()}
                </h3>
              </div>
              <Link href="/success">
                <button
                  className=" bg-green-600 p-3 mt-5 w-full rounded-full text-white"
                  onClick={onClose}
                >
                  Finalizar compras
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
    </>
  )
}
