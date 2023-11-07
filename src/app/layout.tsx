import type { Metadata } from 'next'
import './styles.css'
import { ReactNode } from 'react'

import Providers from '@/Providers'

export const metadata: Metadata = {
  title: 'My shop',
  description: 'Digital shop',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
