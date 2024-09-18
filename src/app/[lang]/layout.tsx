import { Provider } from '@/context/context'
import { i18n } from '@/config/i18n.config'
import './globals.css'

export async function generateStaticParams() {
  const languages = i18n.locales.map((lang) => ({ lang }))
  return languages
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
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
