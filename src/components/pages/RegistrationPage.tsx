'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import useAuthStore from '@/states/AuthStore'
import toast from 'react-hot-toast'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'
import { useMutation, useQueryClient } from 'react-query'
import ky from 'ky'
import { useRouter } from 'next/dist/client/components/navigation'

type FormValues = {
  id: number
  name: string
  email: string
  address: string
  password: string
}

const RegistrationPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>()
  const queryClient = useQueryClient()
  const router = useRouter()
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
      router.push('/')
    } catch (error) {
      // Errors are handled by the mutation's onError callback
      console.error('Error during mutation:', error)
    }
  }

  return (
    <div className="flex h-screen w-full ">
      <div className="m-auto w-96">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold">Регистрация</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-1 flex flex-col gap-5">
              <input
                id="title"
                placeholder="email"
                type="text"
                {...register('email', {
                  required: { value: true, message: 'email is required' },
                })}
                className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
              />
              <input
                id="title"
                placeholder="name"
                type="text"
                {...register('name', {
                  required: { value: true, message: 'name is required' },
                })}
                className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
              />
              <input
                id="title"
                placeholder="address"
                type="text"
                {...register('address', {
                  required: { value: true, message: 'address is required' },
                })}
                className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
              />
              <input
                id="title"
                placeholder="password"
                type="password"
                {...register('password', {
                  required: { value: true, message: 'email is required' },
                })}
                className="h-8 w-full overflow-hidden rounded-lg  px-2 text-sm shadow focus:ring-0 "
              />
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded bg-blue-500 p-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Зарегестрироваться
            </button>
            <div className="mt-5 flex items-center justify-center">
              <Link href="/registration" className="font-bold text-neutral-900">
                <Button variant="outlined">Войти в аккаунт</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
