'use client'

import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ky from 'ky'
import React from 'react'
import toast from 'react-hot-toast'
import { useQuery, useQueryClient, useMutation } from 'react-query'

interface DeleteProductButtonProps {
  orderId: number
  onDelete: () => void
}

type OrderType = {
  id: number
  status: string
}

const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({
  orderId,
  onDelete,
}) => {
  const deleteOrderMutation = useMutation<void, unknown, number>(
    async () => {
      await ky.delete(
        `https://localhost:7056/api/Order/DeleteOrder?orderId=${orderId}`,
        {
          json: {},
        }
      )
    },
    {
      onSuccess: () => {
        onDelete()
        toast.success(`Заказ удалён.`)
      },
    }
  )

  return (
    <IconButton
      onClick={() => {
        deleteOrderMutation.mutate()
      }}
    >
      <DeleteIcon />
    </IconButton>
  )
}

export default function AdminOrders() {
  // Fetch data using useQuery
  const { data, isLoading, isError } = useQuery<OrderType[]>(
    'orders',
    async (): Promise<OrderType[]> =>
      ky.get('https://localhost:7056/api/Order/GetOrders').json<OrderType[]>()
  )

  // Check loading and error states
  if (isLoading) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>

  // Initialize query client
  const queryClient = useQueryClient()

  // Delete order function
  const deleteOrder = async (orderId: number) => {
    try {
      await ky.delete(
        `https://localhost:7056/api/Order/DeleteOrder/${orderId}`,
        {
          json: {},
        }
      )

      // Invalidate query on success
      queryClient.invalidateQueries('orders')
      toast.success(`Заказ удалён.`)
    } catch (error) {}
  }

  return (
    <div className="h-full w-full p-5 px-32">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="py-3 text-2xl font-extrabold text-neutral-900">
          Заказы:
        </h1>
      </div>
      <ul className="flex w-full flex-col gap-10">
        {data?.map((item) => (
          <li
            key={item.id}
            className="flex h-32 w-full items-center justify-between rounded-2xl bg-white p-8 shadow"
          >
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">ID: {item.id}</p>
              <h1 className="text-2xl font-bold">Status: {item.status}</h1>
            </div>
            <div className="flex gap-5">
              <Button
                variant="outlined"
                endIcon={<CheckIcon />}
                onClick={async () => {
                  await ky
                    .put(`https://localhost:7056/api/Order/UpdateOrder`, {
                      json: { id: item.id, status: 'EXECUTED' },
                    })
                    .json()
                  toast.success('Заказ выполнен.')
                }}
              >
                Выполнен
              </Button>
              <DeleteProductButton
                orderId={item.id}
                onDelete={() => deleteOrder(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
