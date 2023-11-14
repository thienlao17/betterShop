'use client'

import ky from 'ky'
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

type FormValues = {
  id: number
  name: string
}
export default function CategoryForm({
  closeDialog,
}: {
  closeDialog: () => void
}) {
  const { register, handleSubmit } = useForm<FormValues>()
  const queryClient = useQueryClient()

  // Define the mutation function
  const addCategoryMutation = useMutation<void, unknown, FormValues>(
    async (data) => {
      await ky
        .post(`https://localhost:7056/api/Category/AddCategory`, {
          json: { id: 0, name: data.name },
        })
        .json()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories')
        closeDialog()
        toast.success(`Категория добавлена`)
      },
      onError: (error: unknown) => {
        toast.error(`Ошибка при добавлении категории: ${String(error)}`)
      },
    }
  )

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Call the mutation function with form data
      await addCategoryMutation.mutateAsync(data)
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
      <h1>Создать категорию</h1>
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
          <p className="text-sm text-white">Create</p>
        </button>
      </form>
    </>
  )
}
