import { createContext, ReactNode, useContext, useState } from 'react'

interface CartItem {
  productId: number
  quantity: number
  title: string
  price: number
  image: string
  // size: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  getTotalPrice: () => number
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(product: CartItem) {
    if (
      !product.productId ||
      !product.title ||
      !product.price ||
      !product.image
    ) {
      console.error('Produto inválido:', product)
      return
    }

    setCartItems((state) => {
      const productInCart = state.some(
        (item) => item.productId === product.productId,
      )

      if (productInCart) {
        return state.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        )
      } else {
        return [...state, product]
      }
    })
  }

  function removeFromCart(productId: number) {
    setCartItems((state) =>
      state.filter((item) => item.productId !== productId),
    )
  }

  function updateQuantity(productId: number, quantity: number) {
    setCartItems((state) =>
      state.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    )
  }

  function getTotalPrice() {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
    return Number(total.toFixed(2))
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
