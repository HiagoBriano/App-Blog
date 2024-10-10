import { getDictionaryServerOnly } from '@/dictionaries/default-dictionary-server-only'
import { i18n, Locale } from '@/config/i18n.config'
import { ToastContainer } from 'react-toastify'
import { Provider } from '@/context/context'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import Navbar from '@/components/navbar'

export async function generateStaticParams() {
  const languages = i18n.locales.map((lang) => ({ lang }))
  return languages
}

export function generateMetadata({ params }: { params: { lang: string } }) {
  const { dictionary } = getDictionaryServerOnly(params.lang as Locale)

  return {
    title: dictionary.site.name,
    description: dictionary.site.description,
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  getDictionaryServerOnly(params.lang as Locale)

  return (
    <html lang={`${params.lang}`}>
      <body className="bg-background">
        <Provider>
          <>
            <Navbar />
            <ToastContainer style={{ zIndex: 999 }} />
            {children}
          </>
        </Provider>
      </body>
    </html>
  )
}
