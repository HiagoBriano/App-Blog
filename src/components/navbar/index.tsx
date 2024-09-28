'use client'

import { getDictionaryUseClient } from '@/dictionaries/default-dictionary-use-client'
import { IMenu } from '@/dictionaries/default-language-collections/interface'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Locale, TextOfThePlaces } from '@/config/i18n.config'
import { useMyContext } from '@/context/context'
import React, { useEffect, useRef, useState } from 'react'
import Night from '@/public/night'
import Logo from '@/public/logo'
import Flag from '../flags/flag'
import Sun from '@/public/sun'
import Link from 'next/link'
import './style.css'

export default function Navbar() {
  const [isLocalOpen, setIsLocalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScroll, setScroll] = useState(false)
  const { isDark, chargeDark } = useMyContext()
  const pathname = usePathname()
  const { lang } = useParams()
  const router = useRouter()

  const { dictionary } = getDictionaryUseClient(lang as Locale)

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLocalOpen(false)
      }
    }

    if (isLocalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLocalOpen])

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleToggleLocal = () => {
    setIsLocalOpen(!isLocalOpen)
  }

  const getPathname = (lng: string) => {
    const path = pathname.split('/' + lang).join('')
    return '/' + lng + path
  }

  const menu: IMenu = {
    dev: '/dev',
    administrator: '/admin',
    curious: '/curious',
  }

  return (
    <nav
      className={`bg-white dark:bg-gray-800 ${
        isScroll
          ? 'md:bg-white md:dark:bg-gray-800'
          : 'md:bg-transparent md:dark:bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div
        className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto transition ${
          isScroll ? 'p-1' : 'p-4'
        } `}
      >
        <Link href="/" className="flex items-center rtl:space-x-reverse">
          <Logo
            width={90}
            height={48}
            color={isDark === 'dark' ? 'white' : 'black'}
          />
        </Link>

        {/* Customization buttons */}
        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          <div ref={dropdownRef}>
            <button
              onClick={handleToggleLocal}
              type="button"
              className="inline-flex items-center w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-label="Toggle language selection"
              aria-expanded={isLocalOpen}
              aria-controls="language-dropdown-menu"
            >
              <Flag code={lang as string} width={33} height={33} />
            </button>

            <div
              className={`${
                isLocalOpen ? '' : 'hidden'
              } absolute z-50 my-2 ml-[-35px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
              id="language-dropdown-menu"
            >
              <ul className="py-2 font-medium" role="menu">
                {Object.keys(TextOfThePlaces).map((key) => {
                  if (key === lang) return null

                  return (
                    <li key={key} role="none">
                      <button
                        onClick={() => router.push(getPathname(key))}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        <div className="inline-flex items-center gap-2">
                          <Flag code={key} width={20} height={20} />
                          {TextOfThePlaces[key as keyof typeof TextOfThePlaces]}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <button
            onClick={chargeDark}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-label="Toggle dark mode"
          >
            {isDark === 'dark' ? <Night /> : <Sun />}
          </button>

          <button
            onClick={handleToggleMenu}
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
              isMenuOpen && 'active'
            }`}
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="header--hamburguer" />
          </button>
        </div>

        {/* Menu options */}
        <div
          className={`items-center justify-between w-[93%] md:flex  md:w-auto md:order-1 ${
            isMenuOpen ? 'absolute z-50 mr-28 mt-52' : 'hidden'
          }`}
          id="navbar-sticky"
          role="navigation"
          aria-label="Main menu"
        >
          <ul
            className={`${
              isMenuOpen &&
              'bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900'
            } flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700`}
          >
            {Object.keys(menu).map((key) => (
              <li key={key}>
                <Link
                  href={`/${lang}${menu[key as keyof typeof menu]}`}
                  className={`block py-2 px-3 relative group text-green-700 rounded  md:p-0  dark:text-green-300 dark:border-gray-700`}
                  aria-current={
                    pathname.split('/' + lang).join('') ===
                    menu[key as keyof typeof menu]
                      ? 'page'
                      : undefined
                  }
                >
                  {dictionary.menu[key as keyof typeof dictionary.menu]}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 md:bg-[#00F585] dark:md:bg-[#b6edd4] transition-all duration-300 ${
                      pathname.split('/' + lang).join('') ===
                      menu[key as keyof typeof menu]
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
