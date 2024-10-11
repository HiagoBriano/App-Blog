'use client'

import { getDictionaryUseClient } from '@/dictionaries/default-dictionary-use-client'
import { IMenu } from '@/dictionaries/default-language-collections/interface'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Locale, TextOfThePlaces } from '@/config/i18n.config'
import React, { useEffect, useRef, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import { IUser } from '@/interfaces/user'
import Flag from '../flags/flag'
import Image from 'next/image'
import Link from 'next/link'
import './style.css'

export default function Navbar() {
  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false)
  const [isLocalOpen, setIsLocalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScroll, setScroll] = useState(false)
  const pathname = usePathname()
  const { lang } = useParams()
  const router = useRouter()

  const { dictionary } = getDictionaryUseClient(lang as Locale)
  const userCookie = getCookie('user')
  const userData: IUser | null = userCookie ? JSON.parse(userCookie) : null

  const dropdownUserRef = useRef<HTMLDivElement | null>(null)
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null)
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownUserRef.current &&
        !dropdownUserRef.current.contains(event.target as Node)
      ) {
        setIsMenuUserOpen(false)
      }
    }

    if (isMenuUserOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuUserOpen])

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

  const handleToggleLocal = () => {
    setIsLocalOpen(!isLocalOpen)
  }

  const handleToggleMenu = () => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (!isMenuOpen) {
      setIsMenuOpen(true)
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      setIsMenuOpen(false)
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }

  const getPathname = (lng: string) => {
    const path = pathname.split('/' + lang).join('')
    return '/' + lng + path
  }

  const signOut = () => {
    deleteCookie('user', { path: '/' })
    router.push(`/${lang}`)
  }

  const menu: IMenu = {
    dev: '/dev',
    administrator: '/administrator',
    curious: '/curious',
  }

  return (
    <nav
      className={`bg-navbarBgColor ${
        isScroll || pathname.split('/' + lang).join('') === '/auth'
          ? 'md:bg-navbarBgColor'
          : 'md:bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div
        className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto transition ${
          isScroll || pathname.split('/' + lang).join('') === '/auth'
            ? 'p-1'
            : 'p-4'
        } `}
      >
        <Link
          href={`/${lang}`}
          className="flex items-center rtl:space-x-reverse"
        >
          <div
            className="w-8 h-8 rounded-full logo"
            style={{
              backgroundImage: 'var(--logo-url)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '90px',
              height: '48px',
            }}
          />
        </Link>

        <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
          {/* Idioma */}
          <div ref={dropdownRef}>
            <button
              onClick={handleToggleLocal}
              type="button"
              className="inline-flex items-center w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Toggle language selection"
              aria-expanded={isLocalOpen}
              aria-controls="language-dropdown-menu"
            >
              <Flag code={lang as string} width={33} height={33} />
            </button>

            <div
              className={`${
                !isLocalOpen && 'hidden'
              } absolute z-50 my-2 ml-[-35px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
              id="language-dropdown-menu"
            >
              <ul className="py-2 font-medium" role="menu">
                {Object.keys(TextOfThePlaces).map((key) => {
                  if (key === lang) return null

                  return (
                    <li key={key} role="none">
                      <button
                        onClick={() => {
                          router.push(getPathname(key))
                          setIsLocalOpen(false)
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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

          {/* Botão de dark mode */}
          {/* <button
            onClick={chargeDark}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-label="Toggle dark mode"
          >
            {isDark === 'dark' ? <Night /> : <Sun />}
          </button> */}

          {/* Usuario */}
          <div
            ref={dropdownUserRef}
            className="flex flex-col items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
          >
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => setIsMenuUserOpen(!isMenuUserOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <Image
                className="w-8 h-8 rounded-full"
                src={
                  userData && userData.photo ? userData.photo : '/avatar.png'
                }
                alt="user photo"
                width={48}
                height={48}
              />
            </button>
            {/* Dropdown menu */}
            <div
              className={`absolute mt-10 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${!isMenuUserOpen && 'hidden'}`}
              style={{ marginRight: '40px' }}
              id="user-dropdown"
            >
              {userData ? (
                <>
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {userData.name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {userData.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        href={`/${lang}/dashboard`}
                        onClick={() => setIsMenuUserOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {dictionary.navbar.user.Profile}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${lang}/dashboard`}
                        onClick={() => setIsMenuUserOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {dictionary.navbar.user.dashboard}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          signOut()
                          setIsMenuUserOpen(false)
                        }}
                        className="flex justify-start items-start w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {dictionary.navbar.user.signOut}
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      href={`/${lang}/auth`}
                      onClick={() => setIsMenuUserOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      {dictionary.navbar.user.signIn}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* menu hamburguer */}
          <button
            onClick={handleToggleMenu}
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ${isMenuOpen && 'active'}`}
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="header--hamburguer" />
          </button>
        </div>

        {/* Menu options */}
        <div
          className={`items-center justify-between w-[93%] md:flex md:w-auto md:order-1 ${
            isMenuOpen ? 'absolute z-50 mr-28 mt-52' : 'hidden'
          }`}
          id="navbar-sticky"
          role="navigation"
          aria-label="Main menu"
          ref={dropdownMenuRef}
        >
          <ul
            className={`${
              isMenuOpen && 'bg-gray-50 md:bg-white'
            } flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0`}
          >
            {Object.keys(menu).map((key) => {
              return (
                <li key={key}>
                  <Link
                    href={`/${lang}${menu[key as keyof typeof menu]}`}
                    className={`block py-2 px-3 relative group text-navbarTextColor rounded  md:p-0`}
                    aria-current={
                      pathname.split('/' + lang).join('') ===
                      menu[key as keyof typeof menu]
                        ? 'page'
                        : undefined
                    }
                  >
                    {
                      dictionary.navbar.menu[
                        key as keyof typeof dictionary.navbar.menu
                      ]
                    }
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 md:bg-navbarUnderlineColor transition-all duration-300 ${
                        pathname.split('/' + lang).join('') ===
                        menu[key as keyof typeof menu]
                          ? 'w-full'
                          : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
