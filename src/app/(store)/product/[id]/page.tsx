import { AddToCartButton } from '@/components/add-to-cart-button'
import api from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface ProductProps {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<Product> {
  try {
    const response = await api.get(`/api/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    throw error
  }
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.id)
  return {
    title: product.title,
  }
}

export default async function ProductPage({ params }: ProductProps) {
  const { id } = await Promise.resolve(params)
  const product = await getProduct(id)

  return (
    <Link
      href={`/`}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <div className="bg-white flex">
        <div className="col-span-5 overflow-hidden">
          <Image
            className="relative"
            src="/T-shirt.png"
            width={400}
            height={400}
            quality={100}
            alt={product.title}
          />
        </div>

        <div className="flex flex-col justify-center px-12">
          <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
          <p className="mt-2 leading-relaxed text-zinc-400">
            {product.description}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
              {product?.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
            <span className="text-sm text-zinc-400">
              Em 12x s/ juros de {''}
              {(product.price / 12).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <div className="mt-8 space-y-4">
            <span className="block font-semibold">Tamanhos</span>
            <div className="flex justify-around ">
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-500 bg-zinc-500 text-sm font-semibold text-zinc-200"
              >
                P
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border bg-zinc-500 bg-zinc-500 text-sm font-semibold text-zinc-200"
              >
                M
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border bg-zinc-500 bg-zinc-500 text-sm font-semibold text-zinc-200"
              >
                G
              </button>
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border bg-zinc-500 bg-zinc-500 text-sm font-semibold text-zinc-200"
              >
                GG
              </button>
            </div>
          </div>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </Link>
    // <div className="relative grid max-h-[650px] grid-cols-3">
    //   <div className="col-span-2 overflow-hidden">
    //     <Image
    //       //   className="relative"
    //       src="/T-shirt.png"
    //       width={1000}
    //       height={1000}
    //       quality={100}
    //       alt={product.title}
    //     />
    //   </div>
    //   <div className="flex flex-col justify-center px-12">
    //     <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
    //     <p className="mt-2 leading-relaxed text-zinc-400">
    //       {product.description}
    //     </p>
    //     <div className="mt-8 flex items-center gap-3">
    //       <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
    //         {product?.price.toLocaleString('pt-BR', {
    //           style: 'currency',
    //           currency: 'BRL',
    //           minimumFractionDigits: 0,
    //           maximumFractionDigits: 0,
    //         })}
    //       </span>
    //       <span className="text-sm text-zinc-400">
    //         Em 12x s/ juros de {''}
    //         {(product.price / 12).toLocaleString('pt-BR', {
    //           style: 'currency',
    //           currency: 'BRL',
    //         })}
    //       </span>
    //     </div>
    //     <div className="mt-8 space-y-4">
    //       <span className="block font-semibold">Tamanhos</span>
    //       <div className="flex gap-2">
    //         <button
    //           type="button"
    //           className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
    //         >
    //           P
    //         </button>
    //         <button
    //           type="button"
    //           className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
    //         >
    //           M
    //         </button>
    //         <button
    //           type="button"
    //           className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
    //         >
    //           G
    //         </button>
    //         <button
    //           type="button"
    //           className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
    //         >
    //           GG
    //         </button>
    //       </div>
    //     </div>
    //     <AddToCartButton productId={product.id} />
    //   </div>
    // </div>
  )
}
