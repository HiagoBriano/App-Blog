'use client'

import { useState, createContext, useContext, useEffect } from 'react'
import { ContextType } from './interface'

const MyContext = createContext<ContextType>({} as ContextType)

function Provider({ children }: { children: React.ReactNode }) {
  const [isName, setName] = useState('')
  const [isDark, setDark] = useState('light')
  const [islanguage, setlanguage] = useState('')

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme === 'light' || theme === 'dark') {
      const root = document.documentElement
      root.classList.add(theme)
      setDark(theme)
    }
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
    isName,
    setName,
    isDark,
    chargeDark,
    islanguage,
    setlanguage,
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
