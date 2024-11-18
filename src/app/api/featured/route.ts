// export async function GET(Request) {
//   return new Response('This is a  new Products Featured route')
// }

import api from '@/data/api'
import { Product } from '@/types/product'

export async function GET() {
  try {
    const response = await api.get('/api/products')
    const produtos = <Product>(
      response.data.filter((product: { featured: boolean }) => product.featured)
    )
    console.log(produtos)
    return new Response(JSON.stringify(produtos))
  } catch (err) {
    console.error('Erro na requisição:', err)
  }
}
