import api from '@/data/api'
import { Product } from '@/types/product'

export async function GET() {
  try {
    const response = await api.get('/api/products')
    console.log(response)

    const produtos = <Product[]>(
      response.data.filter((product: { featured: boolean }) => product.featured)
    )
    console.log(produtos)
    return new Response(JSON.stringify(produtos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Erro na requisição:', err)
    return new Response(JSON.stringify({ error: 'Erro ao buscar produtos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
