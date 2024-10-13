import imageCompression from 'browser-image-compression'
import API_URL from './API_URL'

export interface IResponse {
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

export async function UpdateUserImageAPI(
  token: string,
  id: string,
  photo: string
) {
  try {
    const byteString = atob(photo.split(',')[1])
    const mimeString = photo.split(',')[0].split(':')[1].split(';')[0]

    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uintArray = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blob = new Blob([arrayBuffer], { type: mimeString }) as any

    const compressedBlob = await imageCompression(blob, {
      maxSizeMB: 1, // Limit to 1MB (adjust as needed)
      maxWidthOrHeight: 800, // Resize if necessary
    })

    const formData = new FormData()
    formData.append('photo', compressedBlob, 'photo.png')

    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: 'no-store',
    })

    const data: IResponse = await response.json()

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
