import { Modal } from '@/components/modal'
import api from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'

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
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  return {
    title: product?.title || 'Produto não encontrado',
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return <div>Erro: Não foi possível carregar o produto.</div>
  }

  return (
    <div>
      <Modal product={product} />
    </div>
  )
}
