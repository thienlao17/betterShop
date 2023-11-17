'use client'

import ky from 'ky'
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

type FormValues = {
  id: number
  name: string
  email: string
  address: string
  password: string
}
export default function UserForm({ closeDialog }: { closeDialog: () => void }) {
  const { register, handleSubmit } = useForm<FormValues>()
  const queryClient = useQueryClient()

  // Define the mutation function
  const addProductMutation = useMutation<void, unknown, FormValues>(
    async (data) => {
      await ky
        .post(`https://localhost:7056/api/User/AddUser`, {
          json: {
            id: 0,
            name: data.name,
            email: data.email,
            address: data.address,
            password: data.password,
          },
        })
        .json()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
        closeDialog()
        toast.success(`Пользователь добавлен`)
      },
      onError: (error: unknown) => {
        toast.error(`Ошибка при добавлении пользователя: ${String(error)}`)
      },
    }
  )

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Call the mutation function with form data
      await addProductMutation.mutateAsync(data)
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
      <h1>Создать юзера</h1>
      <form
        className="mt-4 flex h-full w-full flex-col gap-5"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <label htmlFor="name">
          <div className="mt-1 flex flex-col gap-5">
            <input
              id="title"
              placeholder="Name"
              type="text"
              {...register('name', {
                required: { value: true, message: 'Name is required' },
              })}
              className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
            />
            <input
              id="title"
              placeholder="Email"
              type="email"
              {...register('email', {
                required: { value: true, message: 'email is required' },
              })}
              className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
            />
            <input
              id="title"
              placeholder="Adress"
              type="text"
              {...register('address', {
                required: { value: true, message: 'Adress is required' },
              })}
              className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
            />
            <input
              id="title"
              placeholder="Password"
              type="password"
              {...register('password', {
                required: { value: true, message: 'Quantity is required' },
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
