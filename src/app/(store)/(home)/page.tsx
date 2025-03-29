import api from '@/data/api'
import { Product } from '@/data/types/product'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

async function getProductsFeatured(): Promise<Product[]> {
  try {
    const response = await api.get('/api/products/featured')
    return response.data || []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Home',
}
export default async function Home() {
  let products: Product[] = []

  try {
    products = await getProductsFeatured()
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-red-400">
          Ops! Algo deu errado.
        </h1>
        <p className="text-gray-500 mt-2">
          Não foi possível carregar os produtos. Tente novamente mais tarde.
        </p>
      </div>
    )
  }

  const [highLightedProduct, ...otherProducts] = products
  return (
    <main className="grid max-h-[860px] grid-cols-10 grid-rows-2 gap-4 px-5">
      <Link
        href={`/product/${highLightedProduct.id}`}
        className="group relative col-span-7 row-span-6 rounded-lg bg-zinc-200 overflow-hidden flex justify-center max-h-[calc(100vh-5rem)] "
      >
        <Image
          className="group-hover:scale-105 transition-transform duration-500"
          src={highLightedProduct.image}
          width={600}
          height={600}
          quality={100}
          alt={highLightedProduct?.title}
        />
        <div className="absolute bottom-18 sm:bottom-16 md:bottom-20 right-5 sm:right-10 md:right-44 h-12 flex items-center gap-2 max-w-[250px] sm:max-w-[280px] md:max-w-[320px] rounded-full border-2 border-zinc-500 bg-black/80 p-1 pl-5">
          <span className="text-zinc-50 text-xs sm:text-sm md:text-base truncate">
            {highLightedProduct?.title}
          </span>
          <span className="flex h-full items-center justify-center rounded-full bg-slate-400 px-4 font-semibold text-xs sm:text-sm md:text-base">
            {Math.floor(highLightedProduct?.price).toLocaleString('pt-BR', {
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
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-200 overflow-hidden flex justify-center max-h-[17rem]"
          >
            <Image
              className="group-hover:scale-105 transition-transform duration-500 "
              src={product.image}
              width={300}
              height={300}
              quality={100}
              alt={product.title}
            />

            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/80 p-1 pl-5">
              <span className="text-zinc-50 text-sm truncate">
                {product.title}
              </span>
              <span className="flex h-full items-center justify-center rounded-full bg-slate-400 px-4 font-semibold">
                {Math.floor(product?.price).toLocaleString('pt-BR', {
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
