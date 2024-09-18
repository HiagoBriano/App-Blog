'use client'

import { Provider } from '@/context/context'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
