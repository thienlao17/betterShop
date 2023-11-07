'use client'

import ky from 'ky'
import { useQuery } from 'react-query'

import { ProductType } from '@/shared/ProductType'

export default function HomePage() {
  const { data, isLoading, isError } = useQuery<ProductType[]>(
    'product',
    async (): Promise<ProductType[]> =>
      ky
        .get('https://localhost:7056/api/Product/GetProducts')
        .json<ProductType[]>()
  )
  if (isLoading) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>
  return (
    <div>
      <p>Product list</p>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
