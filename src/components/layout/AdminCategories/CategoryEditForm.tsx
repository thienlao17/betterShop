'use client'

import ky from 'ky'
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

interface CategoryEditFormProps {
  categoryId: number
  closeDialog: () => void
}
type FormValues = {
  id: number
  name: string
}
export default function CategoryEditForm({
  categoryId,
  closeDialog,
}: CategoryEditFormProps) {
  const { register, handleSubmit } = useForm<FormValues>()
  const queryClient = useQueryClient()

  // Define the mutation function
  const updateCategoryMutation = useMutation<void, unknown, FormValues>(
    async (data) => {
      await ky
        .put(`https://localhost:7056/api/Category/UpdateCategory`, {
          json: { id: categoryId, name: data.name },
        })
        .json()
    },
    {
      onSuccess: () => {
        // Invalidate the 'categories' query to trigger a refetch
        queryClient.invalidateQueries('categories')
        closeDialog()
        toast.success(`Категория изменена`)
      },
      onError: (error: unknown) => {
        toast.error(`Ошибка при изменении категории: ${String(error)}`)
      },
    }
  )

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Call the mutation function with form data
      await updateCategoryMutation.mutateAsync(data)
    } catch (error) {
      // Errors are handled by the mutation's onError callback
      console.error('Error during mutation:', error)
    }
  }
  const onError = (errs: FieldErrors) => {
    Object.entries(errs).forEach((err) => {
      const errMsg = String(err[1]?.message ?? '')
      toast.error(errMsg)
    })
  }

  return (
    <>
      <h1>Изменить категорию</h1>
      <form
        className="mt-4 flex h-full w-full flex-col gap-5"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <label htmlFor="name">
          <div className="mt-1">
            <input
              id="title"
              placeholder="NAME"
              type="text"
              {...register('name', {
                required: { value: true, message: 'Name is required' },
              })}
              className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
            />
          </div>
        </label>

        <button
          type="submit"
          className="overflow-hidden rounded-lg border border-black/[.1] bg-sky-400 px-4 py-2 hover:bg-sky-300"
        >
          <p className="text-sm text-white">Изменить</p>
        </button>
      </form>
    </>
  )
}
