import create from 'zustand'

import { ProductType } from '@/shared/ProductType'

type CartItem = ProductType & { quantity: number }

type CartStoreType = {
  cart: CartItem[]
  addProduct: (product: ProductType) => void
  removeProduct: (productId: number) => void
}

const CartStore = create<CartStoreType>((set) => ({
  cart: [],
  addProduct: (product) =>
    set((state) => {
      const productInCart = state.cart.find((item) => item.id === product.id)
      if (productInCart) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      }
    }),
  removeProduct: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),
}))

export default CartStore
