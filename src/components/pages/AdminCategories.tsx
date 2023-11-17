'use client'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import ky from 'ky'
import toast from 'react-hot-toast'
import { useQuery, useQueryClient, useMutation } from 'react-query'

import CreateModalEditCategories from '@/components/layout/AdminCategories/CreateModalEditCategories'
import CreateModalCategories from '@/components/layout/AdminCategories/CreateModalСategories'
import { CategoryType } from '@/shared/CategoryType'

export default function AdminCategories() {
  const { data, isLoading, isError } = useQuery<CategoryType[]>(
    'categories',
    async (): Promise<CategoryType[]> =>
      ky
        .get('https://localhost:7056/api/Category/GetCategories')
        .json<CategoryType[]>()
  )

  // Check loading and error states
  if (isLoading) return <p>Is Loading</p>
  if (isError) return <p>Can not fetch data</p>

  // Initialize query client
  const queryClient = useQueryClient()

  // Delete category function
  const deleteCategory = async (categoryId: number) => {
    try {
      await ky.delete(
        `https://localhost:7056/api/Category/DeleteCategory/${categoryId}`,
        {
          json: {},
        }
      )

      // Invalidate query on success
      queryClient.invalidateQueries('categories')
      toast.success(`Категория удалена.`)
    } catch (error) {
      toast.error(`Ошибка при удалении категории.`)
    }
  }

  const deleteCategoryMutation = useMutation<void, unknown, number>(
    (categoryId) => deleteCategory(categoryId),
    {
      onSuccess: () => {
        toast.success(`Категория удалена.`)
      },
      onError: () => {
        toast.error(`Ошибка при удалении категории.`)
      },
    }
  )

  return (
    <div className="h-full w-full p-5 px-32">
      <div className="mb-5 flex items-center justify-between">
        <h1 className=" py-3 text-2xl font-extrabold text-neutral-900">
          Категории:
        </h1>
        <CreateModalCategories />
      </div>
      <ul className="flex w-full flex-col gap-10">
        {data?.map((item) => (
          <li
            key={item.id}
            className="flex h-32 w-full items-center justify-between rounded-2xl bg-white p-8 shadow"
          >
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">ID: {item.id}</p>
              <h1 className="text-2xl font-bold">{item.name}</h1>
            </div>
            <div className="flex gap-5">
              <CreateModalEditCategories categoryId={item.id} />
              <IconButton
                onClick={() => {
                  deleteCategoryMutation.mutate(item.id)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
