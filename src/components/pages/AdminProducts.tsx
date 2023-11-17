'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import ky from 'ky'
import React from 'react'
import toast from 'react-hot-toast'
import { useQuery, useQueryClient, useMutation } from 'react-query'

import CreateModalEditProducts from '@/components/layout/AdminProducts/CreateModalEditProducts'
import CreateModalProducts from '@/components/layout/AdminProducts/CreateModalProducts'
import { ProductType } from '@/shared/ProductType'

interface DeleteProductButtonProps {
  productId: number
  onDelete: () => void
}

const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({
  productId,
  onDelete,
}) => {
  const deleteProductMutation = useMutation<void, unknown, number>(
    async () => {
      await ky.delete(
        `https://localhost:7056/api/Product/DeleteProduct/${productId}`,
        {
          json: {},
        }
      )
    },
    {
      onSuccess: () => {
        onDelete()
        toast.success(`Продукт удалён.`)
      },
      onError: () => {
        toast.error(`Ошибка при удалении продукта.`)
      },
    }
  )

  return (
    <IconButton
      onClick={() => {
        deleteProductMutation.mutate()
      }}
    >
      <DeleteIcon />
    </IconButton>
  )
}

export default function AdminProducts() {
  // Fetch data using useQuery
  const { data, isLoading, isError } = useQuery<ProductType[]>(
    'products',
    async (): Promise<ProductType[]> =>
      ky
        .get('https://localhost:7056/api/Product/GetProducts')
        .json<ProductType[]>()
  )

  // Check loading and error states
  if (isLoading) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>

  // Initialize query client
  const queryClient = useQueryClient()

  // Delete product function
  const deleteProduct = async (productId: number) => {
    try {
      await ky.delete(
        `https://localhost:7056/api/Product/DeleteProduct/${productId}`,
        {
          json: {},
        }
      )

      // Invalidate query on success
      queryClient.invalidateQueries('products')
      toast.success(`Продукт удалён.`)
    } catch (error) {
      toast.error(`Ошибка при удалении продукта.`)
    }
  }

  return (
    <div className="h-full w-full p-5 px-32">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="py-3 text-2xl font-extrabold text-neutral-900">
          Продукты:
        </h1>
        <CreateModalProducts />
      </div>
      <ul className="flex w-full flex-col gap-10">
        {data?.map((item) => (
          <li
            key={item.id}
            className="flex h-32 w-full items-center justify-between rounded-2xl bg-white p-8 shadow"
          >
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">ID: {item.id}</p>
              <h1 className="text-2xl font-bold">Name: {item.name}</h1>
            </div>
            <div className="flex gap-5">
              <CreateModalEditProducts productId={item.id} />
              <DeleteProductButton
                productId={item.id}
                onDelete={() => deleteProduct(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
