'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import Button from '@mui/material/Button'
import ky from 'ky'
import { useQuery } from 'react-query'

import { ProductType } from '@/shared/ProductType'
import CartStore from '@/states/CartStore'

export default function ProductPage({ productId }: { productId: number }) {
  const { addProduct } = CartStore()

  const { data, isLoading, isError } = useQuery<ProductType>(
    'product',
    async (): Promise<ProductType> =>
      ky
        .get(`https://localhost:7056/api/Product/GetProducts/${productId}`)
        .json<ProductType>()
  )
  if (isLoading || data === undefined) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>
  return (
    <div className=" h-full w-full p-5 px-32">
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
      >
        Назад
      </Button>
      <div className="flex h-full w-full p-10">
        <div
          className="h-full w-1/2"
          style={{
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${data.image}`,
          }}
        />
        <div className="flex w-1/2 flex-col gap-5">
          <h1 className="text-5xl font-bold">{data.name}</h1>
          <p className="text-xl font-medium">Описание:</p>
          <p className="font-light text-neutral-700">{data.description}</p>
          <p className="text-2xl font-bold">{data.price} рублей</p>
          <Button
            variant="outlined"
            color="success"
            endIcon={<ShoppingCartCheckoutIcon />}
            onClick={() => addProduct(data)}
          >
            В корзину
          </Button>
        </div>
      </div>
    </div>
  )
}
