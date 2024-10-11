import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Dashboard({
  params,
}: {
  params: { lang: string }
}) {
  const cookieStore = cookies()
  const user = cookieStore.get('user')

  if (!user) {
    redirect(`/${params.lang}/auth`)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Dashboard</h1>
    </div>
  )
}
