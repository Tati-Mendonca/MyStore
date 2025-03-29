import { Modal } from '@/components/modal'
import api from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'

interface ProductProps {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await api.get(`/api/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return null
  }
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.id)
  return {
    title: product ? product.title : 'Produto não encontrado',
  }
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.id)

  if (!product) {
    return <p className="text-center">Produto não encontrado 😢</p>
  }

  return (
    <div>
      <Modal product={product} />
    </div>
  )
}
