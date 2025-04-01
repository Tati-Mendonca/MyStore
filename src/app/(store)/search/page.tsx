import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Product } from '@/data/types/product'
import api from '@/data/api'

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api.get(`/api/products/search?query=${query}`)
  return response.data
}

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q: query } = await searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col px-5 gap-4">
      <p className="text-sm pt-3">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative rounded-lg bg-zinc-200 overflow-hidden flex justify-center items-end"
            >
              <Image
                className="group-hover:scale-105 transition-transform duration-500"
                src={product.image}
                width={480}
                height={480}
                quality={100}
                alt={product.title}
              />
              <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/80 p-1 pl-5">
                <span className="text-zinc-50 text-sm truncate">
                  {product.title}
                </span>
                <span className="flex h-full items-center justify-center rounded-full bg-slate-400 px-4 font-semibold">
                  {product?.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
