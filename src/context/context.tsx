'use client'

import { useState, createContext, useContext, useEffect } from 'react'
import { ContextType } from './interface'

const MyContext = createContext<ContextType>({} as ContextType)

function Provider({ children }: { children: React.ReactNode }) {
  const [isName, setName] = useState('')
  const [isDark, setDark] = useState('light')
  const [islanguage, setlanguage] = useState('light')

  useEffect(() => {
    const root = document.documentElement
    root.classList.add(isDark)
    return () => root.classList.remove(isDark)
  }, [isDark])

  const chargeDark = () => {
    if (isDark === 'light') setDark('dark')
    if (isDark !== 'light') setDark('light')
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
