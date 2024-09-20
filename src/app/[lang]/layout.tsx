import { getDictionaryServerOnly } from '@/dictionaries/default-dictionary-server-only'
import { i18n, Locale } from '@/config/i18n.config'
import { Provider } from '@/context/context'
import Navbar from '@/components/navbar'
import './globals.css'

export async function generateStaticParams() {
  const languages = i18n.locales.map((lang) => ({ lang }))
  return languages
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}) {
  const { dictionary } = await getDictionaryServerOnly(params.lang as Locale)

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
      <body className="bg-slate-200 dark:bg-slate-700">
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
