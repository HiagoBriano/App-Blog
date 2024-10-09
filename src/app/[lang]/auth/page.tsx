'use client'

import { getDictionaryUseClient } from '@/dictionaries/default-dictionary-use-client'
import { zodResolver } from '@hookform/resolvers/zod'
import Register from '@/services/api/register'
import { Locale } from '@/config/i18n.config'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Login from '@/services/api/login'
import { toast } from 'react-toastify'
import Image from 'next/image'
import React from 'react'
import { z } from 'zod'
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

  const formRegisterSchema = z.object({
    name: z.string().min(3, dictionary.auth.error.name),
    email: z.string().email(dictionary.auth.error.email),
    password: z.string().min(6, dictionary.auth.error.password),
    confirmPassword: z.string().min(6, dictionary.auth.error.password),
  })

  const formRegister = useForm({
    resolver: zodResolver(formRegisterSchema),
  })

  const formLoginSchema = z.object({
    email: z.string().email(dictionary.auth.error.email),
    password: z.string().min(6, dictionary.auth.error.password),
  })

  const formLogin = useForm({
    resolver: zodResolver(formLoginSchema),
  })

  const login = formLogin.handleSubmit(async (data) => {
    const { email, password } = data

    const response = await Login(email, password)

    if (!response.success) {
      switch (response.message) {
        case 'Unauthorized':
          return toast.error(dictionary.auth.error.unauthorized)

        default:
          return toast.error(dictionary.auth.error.error)
      }
    }

    return toast.success('Usuário logado com sucesso')
  })

  const register = formRegister.handleSubmit(async (data) => {
    const { name, email, password, confirmPassword } = data

    if (password !== confirmPassword) {
      return toast.info(dictionary.auth.error.differentPasswords)
    }

    const response = await Register(name, email, password)

    if (!response.success) {
      switch (response.message) {
        case 'email already registered':
          return toast.error(dictionary.auth.error.emailAlreadyExists)

        default:
          return toast.error(dictionary.auth.error.error)
      }
    }

    return toast.success('Usuário criado com sucesso')
  })

  return (
    <div className="login--container">
      <div className="login--forms-container">
        <div className="login--signin-signup">
          <form onSubmit={login} className="login--sign-in-form">
            <h2 className="login--title dark:text-slate-200">
              {dictionary.auth.login}
            </h2>
            <div className="login--input-field">
              <i className="login--fas login--fa-user"></i>
              <input
                type="email"
                placeholder={dictionary.auth.form.email}
                {...formLogin.register('email')}
              />
            </div>
            {formLogin.formState.errors.email?.message && (
              <p className="text-sm text-red-600">
                {typeof formLogin.formState.errors.email.message === 'string' &&
                  formLogin.formState.errors.email.message}
              </p>
            )}
            <div className="login--input-field">
              <i className="login--fas login--fa-lock"></i>
              <input
                type="password"
                placeholder={dictionary.auth.form.password}
                {...formLogin.register('password')}
              />
            </div>
            {formLogin.formState.errors.password?.message && (
              <p className="text-sm text-red-600">
                {typeof formLogin.formState.errors.password.message ===
                  'string' && formLogin.formState.errors.password.message}
              </p>
            )}
            <input
              type="submit"
              value={dictionary.auth.loginButton}
              className="login--btn login--solid"
            />
          </form>
          <form onSubmit={register} className="login--sign-up-form">
            <h2 className="login--title dark:text-slate-200">
              {dictionary.auth.register}
            </h2>
            <div className="login--input-field">
              <i className="login--fas login--fa-user"></i>
              <input
                type="text"
                placeholder={dictionary.auth.form.name}
                {...formRegister.register('name')}
              />
            </div>
            {formRegister.formState.errors.name?.message && (
              <p className="text-sm text-red-600">
                {typeof formRegister.formState.errors.name.message ===
                  'string' && formRegister.formState.errors.name.message}
              </p>
            )}
            <div className="login--input-field">
              <i className="login--fas login--fa-envelope"></i>
              <input
                type="email"
                placeholder={dictionary.auth.form.email}
                {...formRegister.register('email')}
              />
            </div>
            {formRegister.formState.errors.email?.message && (
              <p className="text-sm text-red-600">
                {typeof formRegister.formState.errors.email.message ===
                  'string' && formRegister.formState.errors.email.message}
              </p>
            )}
            <div className="login--input-field">
              <i className="login--fas login--fa-lock"></i>
              <input
                type="password"
                placeholder={dictionary.auth.form.password}
                {...formRegister.register('password')}
              />
            </div>
            {formRegister.formState.errors.password?.message && (
              <p className="text-sm text-red-600">
                {typeof formRegister.formState.errors.password.message ===
                  'string' && formRegister.formState.errors.password.message}
              </p>
            )}
            <div className="login--input-field">
              <i className="login--fas login--fa-lock"></i>
              <input
                type="password"
                placeholder={dictionary.auth.form.confirmPassword}
                {...formRegister.register('confirmPassword')}
              />
            </div>
            {formRegister.formState.errors.confirmPassword?.message && (
              <p className="text-sm text-red-600">
                {typeof formRegister.formState.errors.confirmPassword
                  .message === 'string' &&
                  formRegister.formState.errors.confirmPassword.message}
              </p>
            )}
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
