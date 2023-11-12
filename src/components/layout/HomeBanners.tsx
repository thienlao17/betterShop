'use client'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import TaskIcon from '@mui/icons-material/Task'
import Button from '@mui/material/Button'
import Link from 'next/link'

import Iphone from '@/images/png.monster-234.webp'

export default function HomeBanners() {
  function saveBooleanToLocalStorage(key: string, value: boolean): void {
    localStorage.setItem(key, String(value))
  }

  // Получение булевого значения из localStorage
  function getBooleanFromLocalStorage(key: string): boolean | null {
    const storedValue = localStorage.getItem(key)

    // Преобразование строкового значения обратно в булево
    return storedValue !== null ? storedValue === 'true' : null
  }

  const myBooleanValue = true

  saveBooleanToLocalStorage('isAuthenticated', myBooleanValue)

  const retrievedBooleanValue = getBooleanFromLocalStorage('isAuthenticated')
  console.log(retrievedBooleanValue)
  return (
    <div className="grid h-full w-full grid-rows-[1fr_1fr] gap-5">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-900 p-5">
        <div className=" text-7xl font-black text-neutral-200">
          BIG SALE 20%
        </div>
        <div>
          <h1 className="pb-5  pt-10 text-5xl font-extrabold text-neutral-200">
            IPHONE 15
          </h1>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            SHOP NOW
          </Button>
        </div>
        <div className="absolute  right-0 top-0 h-full w-72">
          <img src={Iphone.src} alt="iphone" className="h-full w-full" />
        </div>
      </div>
      <div className="flex h-full w-full gap-10 ">
        <div className="h-full w-full rounded-2xl bg-neutral-900 p-5">
          <h1 className="pb-4 text-5xl font-extrabold text-neutral-200">
            Продукты
          </h1>
          <p className="  pb-4 text-2xl font-bold text-neutral-200">
            Ознакомтесь с ассортиментом нашего магазина!
          </p>
          <Link href="/products" className="font-bold text-neutral-200">
            <Button
              variant="outlined"
              size="large"
              endIcon={<ProductionQuantityLimitsIcon />}
            >
              Перейти
            </Button>
          </Link>
        </div>
        <div className="h-full w-full rounded-2xl">
          {getBooleanFromLocalStorage('isAuthenticated') ? (
            <div className="item flex h-full w-full items-center gap-10">
              <div className="flex h-4/5 w-full flex-col items-center justify-center gap-5 rounded-2xl bg-neutral-900 p-5">
                <h1 className=" pb-4 text-2xl font-extrabold text-neutral-200">
                  Мой профиль
                </h1>
                <Link href="/profile" className="font-bold text-neutral-200">
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PersonOutlineIcon />}
                  >
                    Перейти
                  </Button>
                </Link>
              </div>
              <div className="flex h-4/5 w-full flex-col items-center justify-center gap-5 rounded-2xl bg-neutral-900 p-5">
                <h1 className=" pb-4 text-2xl font-extrabold text-neutral-200">
                  Мои заказы
                </h1>
                <Link href="/orders" className="font-bold text-neutral-200">
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<TaskIcon />}
                  >
                    Перейти
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="flex flex-col">Авторизируйся</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
