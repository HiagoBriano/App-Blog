import { Locale } from '@/config/i18n.config'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function ValidateLogin({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: Locale
}) {
  const cookieStore = cookies()
  const user = cookieStore.get('user')

  if (!user) {
    redirect(`/${lang}/auth`)
  }

  return children
}
