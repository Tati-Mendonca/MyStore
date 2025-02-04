'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AddToCartButton } from './add-to-cart-button'
import Link from 'next/link'

interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
}

interface ModalProps {
  product: Product
}

export function Modal({ product }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg relative">
        <Link
          href="/"
          className="absolute top-4 right-4 text-gray-600"
          onClick={handleClose}
        >
          ✖
        </Link>

        <div className="flex">
          <div className="col-span-5 overflow-hidden">
            <Image
              src={product.image}
              width={400}
              height={400}
              quality={100}
              alt={product.title}
            />
          </div>
          <div className="flex flex-col justify-center px-12">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="mt-2 leading-relaxed text-zinc-400">
              {product.description}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="inline-block rounded-full bg-slate-400 px-5 py-2.5 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="mt-8 space-y-4">
              <span className="block font-semibold">Tamanhos</span>
              <div className="flex justify-around ">
                <button
                  type="button"
                  className="flex h-9 w-14 items-center justify-center rounded-full border border-solid border-zinc-700 text-sm font-semibold text-zinc-700"
                >
                  P
                </button>
                <button
                  type="button"
                  className="flex h-9 w-14 items-center justify-center rounded-full border border-solid border-zinc-700 text-sm font-semibold text-zinc-700"
                >
                  M
                </button>
                <button
                  type="button"
                  className="flex h-9 w-14 items-center justify-center rounded-full border border-solid border-zinc-700 text-sm font-semibold text-zinc-700"
                >
                  G
                </button>
                <button
                  type="button"
                  className="flex h-9 w-14 items-center justify-center rounded-full border border-solid border-zinc-700 text-sm font-semibold text-zinc-700"
                >
                  GG
                </button>
              </div>
            </div>
            <AddToCartButton
              productId={product.id}
              name={product.title}
              price={product.price}
              image={product.image}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
