import API_URL from './API_URL'

export interface IResponseLogin {
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
  }
}

const Login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    })
    const data = await response.json()

    return data as IResponseLogin
  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: 'Internal Server Error',
      data: null,
    }
  }
}

export default Login
