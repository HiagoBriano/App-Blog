'use client'

import { useState, createContext, useContext, useEffect } from 'react'
import { ContextType } from './interface'

const MyContext = createContext<ContextType>({} as ContextType)

const LoadTheme = () => {
  const db = {
    navbar_BgColor: '#FFFFFF',
    navbar_TextColor: '#15803d',
    navbar_UnderlineColor: '#00f585',
    background: '#e2e8f0',
  }

  Object.keys(db).forEach((key) => {
    document.documentElement.style.setProperty(
      `--${key}`,
      db[key as keyof typeof db]
    )
  })
}

function Provider({ children }: { children: React.ReactNode }) {
  const [isDark, setDark] = useState('light')

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme === 'light' || theme === 'dark') {
      const root = document.documentElement
      root.classList.add(theme)
      setDark(theme)
    }

    LoadTheme()
  }, [])

  const chargeDark = () => {
    const root = document.documentElement

    if (isDark === 'light') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      root.classList.remove('light')
      setDark('dark')
    } else {
      root.classList.add('light')
      localStorage.setItem('theme', 'light')
      root.classList.remove('dark')
      setDark('light')
    }
  }

  const contextValue = {
    isDark,
    chargeDark,
  }

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  )
}

function useMyContext() {
  const context = useContext(MyContext)
  return context
}

export { Provider, useMyContext, MyContext }
