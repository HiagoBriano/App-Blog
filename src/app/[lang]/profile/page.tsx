'use client'

import UploadImage from '@/components/uploadImage'
import { Locale } from '@/config/i18n.config'
import { redirect } from 'next/navigation'
import { IUser } from '@/interfaces/user'
import { useEffect, useState } from 'react'
import { getDictionaryUseClient } from '@/dictionaries/default-dictionary-use-client'
import { getCookie } from 'cookies-next'
import { GetDataUserAPI } from '@/services/api/get-data-user'
import { toast } from 'react-toastify'
import { UpdateUserAPI } from '@/services/api/update-user'

export default function Profile({ params }: { params: { lang: Locale } }) {
  const userCookie = getCookie('user')

  if (!userCookie) {
    redirect(`/${params.lang}/auth`)
  }

  const { dictionary } = getDictionaryUseClient(params.lang)
  const userData: IUser = JSON.parse(userCookie)

  const [isName, setName] = useState('')
  const [isEmail, setEmail] = useState('')
  const [isPhone, setPhone] = useState('')

  function phoneMask(value: string) {
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')
    return value
  }

  useEffect(() => {
    const get = async () => {
      const response = await GetDataUserAPI(userData.access_token, userData.id)

      if (response.success) {
        setName(response.data!.name)
        setEmail(response.data!.email)
        if (response.data!.phone) setPhone(phoneMask(response.data!.phone))
      }
    }

    get()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isName.length < 3) {
      toast.error(dictionary.form.errorName)
      return
    }

    if (isPhone.length < 10 || isPhone.length > 11) {
      toast.error(dictionary.form.errorPhone)
      return
    }

    const response = await UpdateUserAPI(userData.access_token, userData.id, {
      name: isName,
      phone: isPhone,
    })

    if (!response.success) {
      toast.error(dictionary.error.error)
    }

    toast.success('Informações atualizadas com sucesso!')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      <UploadImage
        isStyle=""
        styleBorder="border-4 border-navbarUnderlineColor"
        defaultImage={userData.photo || '/avatar.png'}
      />
      <form className="w-4/5 md:w-2/5 md:max-w-[700px] flex flex-col items-center justify-center">
        <div className="relative z-0 w-full mb-7 mt-6 group">
          <input
            type="text"
            name="floating_name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-navbarTextColor peer"
            placeholder=" "
            required
            value={isName}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-navbarTextColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {dictionary.form.name}
          </label>
        </div>
        <div className="relative z-0 w-full mb-7 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-navbarTextColor peer"
            readOnly
            value={isEmail}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-navbarTextColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {dictionary.form.email}
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-navbarTextColor peer"
            placeholder=""
            required
            value={isPhone}
            onChange={(e) => setPhone(phoneMask(e.target.value))}
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-navbarTextColor  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {dictionary.form.phone}
          </label>
        </div>

        <button
          type="button"
          onClick={updateUser}
          className="text-white bg-blue-800 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {dictionary.form.save}
        </button>
      </form>
    </div>
  )
}
