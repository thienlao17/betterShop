import create from 'zustand'

import { ProductType } from '@/shared/ProductType'

type CartItem = ProductType & { quantity: number }

type CartStoreType = {
  cart: CartItem[]
  addProduct: (product: ProductType) => void
  removeProduct: (productId: number) => void
  decreaseProduct: (productId: number) => void
  clearCart: () => void
}

const getInitialCart = () => {
  const cartData = localStorage.getItem('cart')
  return cartData ? JSON.parse(cartData) : []
}

const CartStore = create<CartStoreType>((set) => ({
  cart: getInitialCart(),
  addProduct: (product) =>
    set((state) => {
      const productInCart = state.cart.find((item) => item.id === product.id)
      if (productInCart) {
        const updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        return { cart: updatedCart }
      }
      const updatedCart = [...state.cart, { ...product, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    }),
  removeProduct: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (product) => product.id !== productId
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    }),
  decreaseProduct: (productId) =>
    set((state) => {
      const updatedCart = state.cart
        .map((product) =>
          product.id === productId
            ? {
                ...product,
                quantity: Math.max(0, product.quantity - 1),
              }
            : product
        )
        .filter((product) => product.quantity > 0) // Remove products with quantity zero
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    }),
  clearCart: () =>
    set(() => {
      localStorage.removeItem('cart')
      return { cart: [] }
    }),
}))

export default CartStore
