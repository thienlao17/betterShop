import type { Metadata } from 'next'
import './styles.css'
import { ReactNode } from 'react'

import Providers from '@/Providers'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'My shop',
  description: 'Digital shop',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children} <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}
