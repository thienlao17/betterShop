'use client'

import { useQuery } from 'react-query'
import { ProductType } from '@/shared/ProductType'
import ky from 'ky'

export default function ProductPage({ productId }: { productId: number }) {
  const { data, isLoading, isError } = useQuery<ProductType[]>(
    'product',
    async (): Promise<ProductType[]> =>
      ky
        .get(`https://localhost:7056/api/Product/GetProducts/${productId}`)
        .json<ProductType[]>()
  )
  if (isLoading) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>
  console.log(data)
  return <div></div>
}
