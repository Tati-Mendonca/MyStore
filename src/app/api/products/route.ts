// export async function GET(Request) {
//   return new Response('This is a  new PRODUCTS route')
// }

import api from '@/data/api'

export async function GET() {
  try {
    const response = await api.get('/api/products')
    console.log(response.data)
    return new Response(JSON.stringify(response.data))
  } catch (err) {
    console.error('Erro na requisição:', err)
  }
}
