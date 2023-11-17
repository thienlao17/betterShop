'use client'

import AccountBoxIcon from '@mui/icons-material/AccountBox'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from 'next/link'
import HeaderFunctions from '@/components/layout/HeaderFunctions'
import useAuthStore from '@/states/AuthStore'
import Button from '@mui/material/Button'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import TaskIcon from '@mui/icons-material/Task'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import React from 'react'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'
export default function MainHeader() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const handleLogout = () => {
    logout() // Вызываем функцию logout при выходе из системы
  }

  return (
    <header className=" z-40 flex justify-center  px-5">
      <div className="flex h-16 w-full max-w-screen-xl items-center justify-between">
        <Link href="/">
          <p className="text-2xl font-bold">Better</p>
        </Link>
        <nav className="flex flex-row items-center">
          <ul className="inline-flex items-center space-x-2 md:space-x-4">
            {user ? (
              <div>
                <HeaderFunctions />
              </div>
            ) : (
              <p className="hidden">Пожалуйста, войдите в систему.</p>
            )}
            <div>
              <Link href="/cart">
                <ShoppingCartIcon />
              </Link>
            </div>
            <div></div>
            {!user ? (
              <Link href="/login">
                <AccountBoxIcon />
              </Link>
            ) : (
              <IconButton onClick={handleLogout}>
                <ExitToAppIcon />
              </IconButton>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
