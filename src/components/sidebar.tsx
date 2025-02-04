'use client'

import { useCart } from '@/contexts/cart-context'
import Link from 'next/link'
import Image from 'next/image'

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
            <div className="flex-shrink-0">
              {items.map((item, index) => (
                <div key={item.productId} className="mb-4">
                  <div className="flex justify-evenly items-center">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        width={80}
                        height={80}
                        quality={100}
                        alt={item?.title}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Preço:
                        {item.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1"
                          onClick={() => handleIncreaseQuantity(item.productId)}
                        >
                          +
                        </button>
                        <p className="text-sm border rounded-md px-2">
                          {item.quantity}
                        </p>
                        <button
                          className="p-1 "
                          onClick={() => handleDecreaseQuantity(item.productId)}
                        >
                          -
                        </button>
                      </div>

                      <button
                        className="px-3 py-1 rounded-2xl bg-slate-400 text-sm text-white font-medium shadow-md transition-all duration-300 hover:bg-slate-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
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
                  Total:{' '}
                  {getTotalPrice().toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <Link href="/success">
                <button
                  className="w-full mt-5 rounded-full bg-emerald-500 px-6 py-3 text-white font-semibold shadow-md transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
