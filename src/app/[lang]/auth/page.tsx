'use client'

import { getDictionaryUseClient } from '@/dictionaries/default-dictionary-use-client'
import { Locale } from '@/config/i18n.config'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import './style.css'

const LoginForm = () => {
  const { lang } = useParams()
  const { dictionary } = getDictionaryUseClient(lang as Locale)

  const signUp = () => {
    const container = document.querySelector('.login--container')
    container!.classList.add('login--sign-up-mode')
  }

  const signIn = () => {
    const container = document.querySelector('.login--container')
    container!.classList.remove('login--sign-up-mode')
  }

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData.get('email'))
  }

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData.get('newName'), formData.get('newEmail'))
  }

  return (
    <div className="login--container">
      <div className="login--forms-container">
        <div className="login--signin-signup">
          <form onSubmit={login} className="login--sign-in-form">
            <h2 className="login--title">{dictionary.auth.login}</h2>
            <div className="login--input-field">
              <i className="login--fas login--fa-user"></i>
              <input
                type="email"
                name="email"
                placeholder={dictionary.auth.form.email}
              />
            </div>
            <div className="login--input-field">
              <i className="login--fas login--fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder={dictionary.auth.form.password}
              />
            </div>
            <input
              type="submit"
              value={dictionary.auth.loginButton}
              className="login--btn login--solid"
            />
          </form>
          <form onSubmit={register} className="login--sign-up-form">
            <h2 className="login--title">{dictionary.auth.register}</h2>
            <div className="login--input-field">
              <i className="login--fas login--fa-user"></i>
              <input
                type="text"
                name="newName"
                placeholder={dictionary.auth.form.name}
              />
            </div>
            <div className="login--input-field">
              <i className="login--fas login--fa-envelope"></i>
              <input type="email" placeholder={dictionary.auth.form.email} />
            </div>
            <div className="login--input-field">
              <i className="login--fas login--fa-lock"></i>
              <input
                type="password"
                name="newPassword"
                placeholder={dictionary.auth.form.password}
              />
            </div>
            <div className="login--input-field">
              <i className="login--fas login--fa-lock"></i>
              <input
                type="password"
                name="confirmPassword"
                placeholder={dictionary.auth.form.confirmPassword}
              />
            </div>
            <input
              type="submit"
              className="login--btn"
              value={dictionary.auth.registerButton}
            />
          </form>
        </div>
      </div>

      <div className="login--panels-container">
        <div className="login--panel login--left-panel">
          <div className="login--content">
            <h3>{dictionary.auth.registerTitle}</h3>
            <p>{dictionary.auth.registerDescription}</p>
            <button
              className="login--btn login--transparent"
              id="sign-up-btn"
              onClick={signUp}
            >
              {dictionary.auth.register}
            </button>
          </div>
          <Image
            src="/login.svg"
            className="login--image"
            alt=""
            width={100}
            height={100}
          />
        </div>
        <div className="login--panel login--right-panel">
          <div className="login--content">
            <h3>{dictionary.auth.loginTitle}</h3>
            <p>{dictionary.auth.loginDescription}</p>
            <button
              className="login--btn login--transparent"
              id="sign-in-btn"
              onClick={signIn}
            >
              {dictionary.auth.login}
            </button>
          </div>
          <Image
            src="/register.svg"
            className="login--image"
            alt=""
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginForm
