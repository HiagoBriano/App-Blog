import API_URL from './API_URL'

export interface IResponseRegister {
  success: boolean
  message: string
  data: {
    id: string
    name: string
    email: string
    photo: string | null
    phone: string | null
    role: string
    status: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    access_token: string
  } | null
}

const Register = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email: email.toLowerCase(), password }),
      cache: 'no-store',
    })

    const data = await response.json()

    return data as IResponseRegister
  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: 'Internal Server Error',
      data: null,
    }
  }
}

export default Register
