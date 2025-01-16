import Image from 'next/image'
import { Product } from '@/data/types/product'

type CardProps = {
  product: Product
}

export default function Card({ product }: CardProps) {
  const image = product.image ? `/images/${product.image}` : '/no-image.jpg'

  return (
    <div>
      <Image
        src={image}
        width={920}
        height={920}
        quality={100}
        alt={product.title || 'Imagem do produto'}
      ></Image>
      <h2>{product.title}</h2>
      <p>Preço: R$ {product.price}</p>
      <p>Cor {product.color}</p>
      <p>{product.description}</p>
    </div>
  )
}
