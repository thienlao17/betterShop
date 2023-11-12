'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import ky from 'ky'
import Link from 'next/link'
import { useQuery } from 'react-query'

import { CategoryType } from '@/shared/CategoryType'
import { ProductType } from '@/shared/ProductType'

export default function CategoryPage({ categoryId }: { categoryId: number }) {
  const { data, isLoading, isError } = useQuery<ProductType[]>(
    'products',
    async (): Promise<ProductType[]> =>
      ky
        .get(
          `https://localhost:7056/api/Product/GetProductsByCategory/${categoryId}`
        )
        .json<ProductType[]>()
  )
  const {
    data: categoryData,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
  } = useQuery<CategoryType[]>(
    'category',
    async (): Promise<CategoryType[]> =>
      ky
        .get(
          `https://localhost:7056/api/Category/GetCategory?catId=${categoryId}`
        )
        .json<CategoryType[]>()
  )
  if (isLoading) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>
  if (categoryIsLoading || categoryData === undefined) return <p>Is Loading</p>
  if (categoryIsError) return <p>Can not fetch data</p>

  return (
    <div className=" h-full  w-full p-5 px-32">
      <Link href="/" className="font-bold text-neutral-900">
        <Button variant="outlined" startIcon={<ArrowBackIcon />}>
          На главную
        </Button>
      </Link>
      <h1 className=" py-3 text-2xl font-extrabold text-neutral-900">
        Продукты в категории {categoryData.name}:
      </h1>
      <ul className="mt-0.5 flex w-full flex-wrap items-center justify-center gap-10">
        {data?.map((item) => (
          <Link href={`/product/${item.id}`} key={item.id}>
            <li
              key={item.id}
              className="relative flex h-96 w-96 flex-col gap-5 rounded-2xl bg-white p-8 shadow"
            >
              <div
                className="h-full w-full"
                style={{
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${item.image}`,
                }}
              />
              <h1 className=" rounded-2xl text-2xl font-bold">{item.name}</h1>
              <p className="font-medium">{item.price} руб.</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
