'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import useAuthStore from '@/states/AuthStore'
import toast from 'react-hot-toast'

interface LoginForm {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>()

  const login = useAuthStore((state) => state.login)

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password)
      toast.success('Вы успешно вошли')
    } catch (error) {
      console.error('Authentication failed:', error)
    }
  }

  return (
    <div className="flex h-screen w-full ">
      <div className="m-auto w-96">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold">Вход</h2>
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
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
