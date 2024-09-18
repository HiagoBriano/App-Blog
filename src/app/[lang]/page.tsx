'use client'

import { useMyContext } from '@/context/context'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Home() {
  const router = useRouter()

  const { isName, setName, isDark, chargeDark } = useMyContext()

  return (
    <main className={`p-4 bg-gray-100 dark:bg-gray-900`}>
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        Você está no Blog ionik
      </h1>
      <h2 className="text-xl mb-2 dark:text-gray-300">Meu nome é {isName}</h2>
      <h2 className="text-xl mb-2 dark:text-gray-300">
        Tema atual é dark? {`${isDark}`}
      </h2>
      <input
        type="text"
        value={isName}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
        placeholder="Digite seu nome"
      />

      <button
        className="bg-blue-500 text-white p-2 rounded mt-4"
        onClick={chargeDark}
      >
        Mudar tema
      </button>
      <div>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Ir para admin
        </button>
      </div>
    </main>
  )
}
