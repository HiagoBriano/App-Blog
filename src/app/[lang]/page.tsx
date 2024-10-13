import { getDictionaryServerOnly } from '@/dictionaries/default-dictionary-server-only'
import { Locale } from '@/config/i18n.config'
import React from 'react'
import Navbar from '@/components/navbar'

export default function Home({ params }: { params: { lang: string } }) {
  const { dictionary } = getDictionaryServerOnly(params.lang as Locale)

  return (
    <>
      <Navbar />
      <main className={`h-[150vh] flex items-center justify-center`}>
        <h1 className="text-3xl font-bold mb-4 dark:text-white">
          {dictionary.greetings.welcome}
        </h1>
      </main>
    </>
  )
}
