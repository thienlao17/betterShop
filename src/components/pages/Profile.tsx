'use client'

import useAuthStore from '@/states/AuthStore'

export default function Profile() {
  const user = useAuthStore((state) => state.user)
  return (
    <div className=" h-full  w-full p-5 px-32">
      <div className="flex h-full w-full flex-col   gap-10 rounded-2xl">
        <p className="text-5xl font-extrabold">Личный кабинет</p>
        <h1 className="text-2xl font-bold">Имя пользователя: {user?.name}</h1>
        <p className="text-2xl font-bold">Почта: {user?.email}</p>
        <p className="text-2xl font-bold">
          Адресс пользователя:{user?.address}
        </p>
      </div>
    </div>
  )
}
