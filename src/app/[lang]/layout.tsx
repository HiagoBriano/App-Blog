import { getDictionaryServerOnly } from '@/dictionaries/default-dictionary-server-only'
import { i18n, Locale } from '@/config/i18n.config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import API_URL from '@/services/api/API_URL'
import Navbar from '@/components/navbar'
import './globals.css'

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

// export const getServerSideProps = async () => {
//   const db = {
//     navbar_BgColor: '#FFFFFF',
//     navbar_TextColor: '#15803d',
//     navbar_UnderlineColor: '#00f585',
//     background: '#e2e8f0',
//   }

//   Object.keys(db).forEach((key) => {
//     document.documentElement.style.setProperty(
//       `--${key}`,
//       db[key as keyof typeof db]
//     )
//   })

//   fetch(`${API_URL}/`, {
//     method: 'GET',
//     cache: 'no-store',
//   })
// }

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  getDictionaryServerOnly(params.lang as Locale)

  // Iniciar back-end
  // Usado por enquanto porque o servidor leva um tempo para carregar

  fetch(`${API_URL}/`, {
    method: 'GET',
    next: { revalidate: 300 },
  })

  // As cores vão ser buscadas do banco de dados

  const db = {
    navbar_BgColor: '#FFFFFF',
    navbar_TextColor: '#15803d',
    navbar_UnderlineColor: '#00f585',
    background: '#e2e8f0',
    logoUrl:
      'https://szzdlumubcifnjrkoyah.supabase.co/storage/v1/object/public/blog/logo/ionik.png?t=2024-10-11T17%3A29%3A39.421Z',
  }

  // Gerar CSS dinâmico
  const dynamicStyles = `
   :root {
     --navbar_BgColor: ${db.navbar_BgColor};
     --navbar_TextColor: ${db.navbar_TextColor};
     --navbar_UnderlineColor: ${db.navbar_UnderlineColor};
     --background: ${db.background};
     --logo-url: url(${db.logoUrl});
   }
 `

  return (
    <html lang={`${params.lang}`}>
      <head>
        <style>{dynamicStyles}</style>
      </head>
      <body className="bg-background">
        <Navbar />
        <ToastContainer style={{ zIndex: 999 }} />
        {children}
      </body>
    </html>
  )
}
