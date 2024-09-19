'use client'

import { getDictionaryUseClient } from '@/dictionaries/default-dictionary-use-client'
import { IMenu } from '@/dictionaries/default-language-collections/interface'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useMyContext } from '@/context/context'
import { Locale } from '@/config/i18n.config'
import LogoIonik from '@/public/logo-ionik'
import React, { useState } from 'react'
import Night from '@/public/night'
import Flag from '../flags/flag'
import Sun from '@/public/sun'
import Link from 'next/link'

export default function Navbar() {
  const [isLocalOpen, setIsLocalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { lang } = useParams()
  const router = useRouter()

  const { dictionary } = getDictionaryUseClient(lang as Locale)
  const { isDark, chargeDark } = useMyContext()

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

  const locales = {
    'en-US': 'English (US)',
    'pt-BR': 'Português (BR)',
  }

  const menu: IMenu = {
    Services: '/services',
    Process: '#',
    Portfolio: '#',
    Testimonials: '#',
    Contact: '/contact',
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <LogoIonik
            width={70}
            height={28}
            color={isDark === 'dark' ? 'white' : 'black'}
          />
        </a>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          <div>
            <button
              type="button"
              className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              data-dropdown-toggle="language-dropdown-menu"
              onClick={handleToggleLocal}
            >
              <Flag code={lang as string} />
              {locales[lang as keyof typeof locales]}
            </button>

            <div
              className={`${isLocalOpen ? '' : 'hidden'} absolute z-50 my-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
              id="language-dropdown-menu"
            >
              <ul className="py-2 font-medium" role="none">
                {Object.keys(locales).map((key) => (
                  <li key={key}>
                    <button
                      // href={getPathname(key)}
                      onClick={() => router.push(getPathname(key))}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      <div className="inline-flex items-center">
                        <Flag code={key} />
                        {locales[key as keyof typeof locales]}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={chargeDark}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
          >
            {/*  */}
            {isDark === 'dark' ? <Night /> : <Sun />}
          </button>

          <button
            onClick={handleToggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Opções de menu */}
        <div
          className={`items-center justify-between w-[93%] mr-28 md:flex md:w-auto md:order-1 ${
            isMenuOpen ? 'absolute mt-72 z-50' : 'hidden'
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {Object.keys(menu).map((key) => (
              <li key={key}>
                <Link
                  href={menu[key as keyof typeof menu]}
                  className={`block py-2 px-3 ${pathname.split('/')[2] === menu[key as keyof typeof menu] ? 'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}  `}
                  aria-current="page"
                >
                  {dictionary.menu[key as keyof typeof dictionary.menu]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
