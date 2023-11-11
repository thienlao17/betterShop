'use client'

import ky from 'ky'
import Link from 'next/link'
import { useQuery } from 'react-query'

import { CategoryType } from '@/shared/CategoryType'

export default function HomeCategories() {
  const { data, isLoading, isError } = useQuery<CategoryType[]>(
    'product',
    async (): Promise<CategoryType[]> =>
      ky
        .get('https://localhost:7056/api/Category/GetCategories')
        .json<CategoryType[]>()
  )
  if (isLoading) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>
  return (
    <div className="h-full rounded-2xl bg-neutral-900 p-5">
      <p className="text-xl font-bold text-neutral-200">Категории:</p>
      <ul className="mt-0.5 flex flex-col gap-2">
        {data?.map((item) => (
          <li key={item.id}>
            <Link
              href={`/category/${item.id}`}
              className="font-bold text-neutral-200"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
