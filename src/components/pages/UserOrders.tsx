'use client'

import HomeBanners from '@/components/layout/HomeBanners'
import HomeCategories from '@/components/layout/HomeCategories'
import { useQuery } from 'react-query'
import { ProductType } from '@/shared/ProductType'
import ky from 'ky'
import useAuthStore from '@/states/AuthStore'
import Link from 'next/link'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export type OrderType = {
  id: number
  status: string
}

export default function UserOrders() {
  const user = useAuthStore((state) => state.user)
  const { data, isLoading, isError } = useQuery<OrderType[]>(
    'orders',
    async (): Promise<OrderType[]> =>
      ky
        .get(
          `https://localhost:7056/api/Order/GetOrdersByUser?userId=${user?.id}`
        )
        .json<OrderType[]>()
  )
  if (isLoading) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>
  return (
    <div className=" h-full  w-full p-5 px-32">
      <Link href="/" className="font-bold text-neutral-900">
        <Button variant="outlined" startIcon={<ArrowBackIcon />}>
          На главную
        </Button>
      </Link>
      <h1 className=" py-3 text-2xl font-extrabold text-neutral-900">
        Мои заказы:
      </h1>
      <ul className="mt-0.5 flex w-full flex-wrap items-center justify-center gap-10">
        {data?.map((item) => (
          <li
            key={item.id}
            className="flex h-32 w-full items-center justify-between rounded-2xl bg-white p-8 shadow"
          >
            <h1 className="text-5xl font-bold">ID: {item.id}</h1>
            <h1 className=" rounded-2xl text-2xl font-bold">{item.status}</h1>
          </li>
        ))}
      </ul>
    </div>
  )
}
