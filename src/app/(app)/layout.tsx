import { ReactNode } from 'react'

import MainHeader from '@/components/layout/MainHeader'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full w-full flex-col">
      <MainHeader />
      <main className="mx-auto flex h-full w-full max-w-screen-2xl grow">
        {children}
      </main>
    </div>
  )
}
