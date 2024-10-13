import API_URL from './API_URL'

export interface IResponseDataUser {
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

export async function GetDataUserAPI(token: string, id: string) {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    const data: IResponseDataUser = await response.json()

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
