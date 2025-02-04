import { Modal } from '@/components/modal'
import api from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'

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
    <div>
      <Modal product={product} />
    </div>
  )
}
