'use client'

import { getDictionaryUseClient } from '@/dictionaries/default-dictionary-use-client'
import { Locale } from '@/config/i18n.config'
import { useRouter } from 'next/navigation'

export default function Admin({ params }: { params: { lang: Locale } }) {
  const router = useRouter()

  const { dictionary, interpolation } = getDictionaryUseClient(params.lang)

  return (
    <main className={`p-4 bg-gray-100 dark:bg-gray-900`}>
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        {dictionary.site.name}
      </h1>
      <h5 className="text-3xl font-bold mb-4 dark:text-white">
        {interpolation(dictionary['Welcome {{name}}'], { name: 'Hiago' })}
      </h5>

      <div className="mt-3">
        <select
          className="form-select border-primary text-primary"
          //   value={router.locale}
          //   onChange={changeLanguage}
        >
          <option value="pt">Português</option>
          <option value="en">English</option>
        </select>
      </div>

      <button
        type="button"
        onClick={() => router.push('/')}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Ir para inicio
      </button>
    </main>
  )
}
