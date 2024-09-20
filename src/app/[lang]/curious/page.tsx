import { getDictionaryServerOnly } from '@/dictionaries/default-dictionary-server-only'
import { Locale } from '@/config/i18n.config'

export default function Curious({ params }: { params: { lang: Locale } }) {
  const { dictionary, interpolation } = getDictionaryServerOnly(params.lang)

  return (
    <main className={`h-[150vh] flex items-center justify-center`}>
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        {interpolation(dictionary['Welcome {{name}}'], {
          name: 'Mariana',
        })}
      </h1>
    </main>
  )
}
