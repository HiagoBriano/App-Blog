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
  }
}

export interface IDataUpdate {
  name?: string
  phone?: string
}

export async function UpdateUserAPI(
  token: string,
  id: string,
  { name, phone }: IDataUpdate
) {
  try {
    console.log('token', token)

    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, phone }),
      cache: 'no-store',
    })

    const data: IResponseLogin = await response.json()

    return data
  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: 'Internal Server Error',
      data: null,
    }
  }
}
