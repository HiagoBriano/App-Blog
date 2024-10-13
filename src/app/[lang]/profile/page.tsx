'use client'

import { getDictionaryUseClient } from '@/dictionaries/default-dictionary-use-client'
import { UpdateUserImageAPI } from '@/services/api/update-user-image'
import { GetDataUserAPI } from '@/services/api/get-data-user'
import { UpdateUserAPI } from '@/services/api/update-user'
import UploadImage from '@/components/uploadImage'
import { Locale } from '@/config/i18n.config'
import { useEffect, useState } from 'react'
import { IUser } from '@/interfaces/user'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function Profile({ params }: { params: { lang: Locale } }) {
  const userCookie = getCookie('user')
  const router = useRouter()
  let userData: IUser

  try {
    userData = JSON.parse(userCookie as string) as IUser
  } catch (error) {
    console.log(error)
    router.push(`/${params.lang}/auth`)
  }

  const { dictionary } = getDictionaryUseClient(params.lang)

  const [isName, setName] = useState('')
  const [isEmail, setEmail] = useState('')
  const [isPhone, setPhone] = useState('')
  const [isImage, setImage] = useState<string | null>(null)

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
        setImage(response.data!.photo)
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

    const phone = isPhone.replace(/[^0-9]/g, '')

    if (phone.length < 10 || phone.length > 11) {
      toast.error(dictionary.form.errorPhone)
      return
    }

    const response = await UpdateUserAPI(userData.access_token, userData.id, {
      name: isName,
      phone: phone,
    })

    if (!response.success) {
      toast.error(dictionary.error.error)
    }

    toast.success('Informações atualizadas com sucesso!')
  }

  const updateUserImage = async (image: string) => {
    const response = await UpdateUserImageAPI(
      userData.access_token,
      userData.id,
      image
    )

    if (!response.success) return toast.error(dictionary.error.error)

    setImage(image)

    toast.success('Imagem atualizada com sucesso!')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      <UploadImage
        isRound={true}
        styleBorder="border-4 border-navbarUnderlineColor"
        isImage={isImage || '/avatar.png'}
        action={updateUserImage}
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
          className="w-full md:w-28 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          {dictionary.form.save}
        </button>
      </form>
    </div>
  )
}
