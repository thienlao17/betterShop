'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import ky from 'ky'
import React from 'react'
import toast from 'react-hot-toast'
import { useQuery, useQueryClient, useMutation } from 'react-query'

import CreateModalEditUsers from '@/components/layout/AdminUsers/CreateModalEditUsers'
import CreateModalUsers from '@/components/layout/AdminUsers/CreateModalUsers'

interface DeleteProductButtonProps {
  userId: number
  onDelete: () => void
}

type UsersType = {
  id: number
  name: string
  email: string
  address: string
  password: string
}

const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({
  userId,
  onDelete,
}) => {
  const deleteProductMutation = useMutation<void, unknown, number>(
    async () => {
      await ky.delete(`https://localhost:7056/api/User/DeleteUser/${userId}`, {
        json: {},
      })
    },
    {
      onSuccess: () => {
        onDelete()
        toast.success(`Пользователь удалён.`)
      },
      onError: () => {
        toast.error(`Ошибка при удалении пользователя.`)
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

export default function AdminUsers() {
  // Fetch data using useQuery
  const { data, isLoading, isError } = useQuery<UsersType[]>(
    'users',
    async (): Promise<UsersType[]> =>
      ky.get('https://localhost:7056/api/User/GetUsers').json<UsersType[]>()
  )

  // Check loading and error states
  if (isLoading) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>

  // Initialize query client
  const queryClient = useQueryClient()

  // Delete product function
  const deleteProduct = async (userId: number) => {
    try {
      await ky.delete(
        `https://localhost:7056/api/Product/DeleteProduct/${userId}`,
        {
          json: {},
        }
      )

      // Invalidate query on success
      queryClient.invalidateQueries('products')
      toast.success(`Пользователь удалён.`)
    } catch (error) {
      toast.error(`Ошибка при удалении пользователя.`)
    }
  }

  return (
    <div className="h-full w-full p-5 px-32">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="py-3 text-2xl font-extrabold text-neutral-900">
          Пользователи:
        </h1>
        <CreateModalUsers />
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
              <CreateModalEditUsers userId={item.id} />
              <DeleteProductButton
                userId={item.id}
                onDelete={() => deleteProduct(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
