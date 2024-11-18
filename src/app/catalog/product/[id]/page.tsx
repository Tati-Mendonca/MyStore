interface ProductProps {
  params: {
    id: string
  }
}

export default function Product(props: ProductProps) {
  return <h1>Produto selecionado: {props.params.id}</h1>
}
