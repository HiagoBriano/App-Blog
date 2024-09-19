import { Provider } from '@/context/context'
import { i18n } from '@/config/i18n.config'
import Navbar from '@/components/navbar'
import './globals.css'

export async function generateStaticParams() {
  const languages = i18n.locales.map((lang) => ({ lang }))
  return languages
}

export const metadata = {
  title: 'Ionik - Blog',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={`${params.lang}`}>
      <body>
        <Provider>
          <>
            <Navbar />
            {children}
          </>
        </Provider>
      </body>
    </html>
  )
}
