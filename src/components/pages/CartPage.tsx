'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ky from 'ky'

import CartStore from '@/states/CartStore'

export default function CartPage() {
  const { cart, removeProduct, addProduct } = CartStore()

  const handleRemoveProduct = (productId: number) => {
    removeProduct(productId)
  }

  return (
    <div className=" h-full  w-full p-5 px-32">
      <div className="flex justify-between">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Назад
        </Button>
        <Button
          variant="outlined"
          endIcon={<LocalMallIcon />}
          onClick={async () => {
            const postData: number[][] = []

            cart.map((item) => {
              postData.push([item.id, item.quantity])
            })
            await ky
              .post(
                `https://localhost:7056/api/Order/AddOrder?Id=0&Status=OK&userId=1`,
                {
                  json: { postData },
                }
              )
              .json()
          }}
        >
          Сделать заказ
        </Button>
      </div>
      <h1 className=" py-3 text-2xl font-extrabold text-neutral-900">
        Корзина
      </h1>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className="flex h-full w-full flex-col gap-2">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex h-72 w-full items-center justify-between rounded-2xl p-5 shadow"
            >
              <div className="flex h-full w-full p-10">
                <div
                  className="h-full w-1/5"
                  style={{
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${item.image}`,
                  }}
                />
                <div className="flex w-1/2 flex-col gap-10">
                  <h1 className="pb text-5xl font-bold">{item.name}</h1>
                  <p className="text-2xl font-bold">{item.price} рублей</p>
                  <p>{item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <IconButton
                  onClick={() => {
                    addProduct(item)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleRemoveProduct(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
