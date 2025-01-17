import api from '@/data/api'
import { Product } from '@/data/types/product'
import Link from 'next/link'
import Image from 'next/image'

async function getProductsFeatured(): Promise<Product[]> {
  try {
    const response = await api.get('/api/products/featured')
    return response.data || []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export default async function Home() {
  const [highLightedProduct, ...otherProducts] = await getProductsFeatured()

  return (
    <main className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLightedProduct.id}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-200 overflow-hidden flex justify-center "
      >
        <Image
          className="group-hover:scale-105 transition-transform duration-500"
          src="/T-shirt.png"
          width={920}
          height={920}
          quality={100}
          alt={highLightedProduct?.title}
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/80 p-1 pl-5">
          <span className="text-zinc-50 text-sm truncate">
            {highLightedProduct?.title}
          </span>
          <span className="flex h-full items-center justify-center rounded-full bg-slate-400 px-4 font-semibold">
            {highLightedProduct?.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-200 overflow-hidden flex justify-center "
          >
            <Image
              className="group-hover:scale-105 transition-transform duration-500"
              src="/T-shirt.png"
              width={920}
              height={920}
              quality={100}
              alt={product.title}
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/80 p-1 pl-5">
              <span className="text-zinc-50 text-sm truncate">
                {product.title}
              </span>
              <span className="flex h-full items-center justify-center rounded-full bg-slate-400 px-4 font-semibold">
                {highLightedProduct?.price.toLocaleString('pt-BR', {
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
    </main>
  )
}
