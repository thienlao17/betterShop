'use client'

import ky from 'ky'
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

interface CategoryEditFormProps {
  productId: number
  closeDialog: () => void
}
type FormValues = {
  id: number
  name: string
  description: string
  image: string
  quantity: number
  price: number
}
export default function ProductEditForm({
  productId,
  closeDialog,
}: CategoryEditFormProps) {
  const { register, handleSubmit } = useForm<FormValues>()
  const queryClient = useQueryClient()

  // Define the mutation function
  const updateCategoryMutation = useMutation<void, unknown, FormValues>(
    async (data) => {
      await ky
        .put(`https://localhost:7056/api/Product/UpdateProduct`, {
          json: {
            id: productId,
            name: data.name,
            description: data.description,
            image: data.image,
            quantity: data.quantity,
            price: data.price,
          },
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
      <h1>Изменить продукт</h1>
      <form
        className="mt-4 flex h-full w-full flex-col gap-5"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <label htmlFor="name">
          <div className="mt-1 flex flex-col gap-5">
            <input
              id="title"
              placeholder="NAME"
              type="text"
              {...register('name', {
                required: { value: true, message: 'Name is required' },
              })}
              className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
            />
            <input
              id="title"
              placeholder="description"
              type="text"
              {...register('description', {
                required: { value: true, message: 'Name is required' },
              })}
              className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
            />
            <input
              id="title"
              placeholder="Image(url)"
              type="text"
              {...register('image', {
                required: { value: true, message: 'Image is required' },
              })}
              className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
            />
            <input
              id="title"
              placeholder="Quantity"
              type="number"
              {...register('quantity', {
                required: { value: true, message: 'Quantity is required' },
              })}
              className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
            />
            <input
              id="title"
              placeholder="Price"
              type="number"
              {...register('price', {
                required: { value: true, message: 'Price is required' },
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
