'use client'

import React, { useState, useRef } from 'react'
import 'cropperjs/dist/cropper.css'
import Cropper from 'react-cropper'
import Image from 'next/image'
import './style.css'

interface UploadProps {
  width?: number
  height?: number
  isRound?: boolean
  isStyle?: string
  styleBorder?: string
  isImage: string
  action: (image: string) => void
}

export default function UploadImage({
  width = 150,
  height = 150,
  isRound = false,
  isStyle = '',
  styleBorder = '',
  isImage,
  action,
}: UploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
  }

  const cropperRef = useRef(null)

  const [isOpenCropper, setOpenCropper] = useState(false)
  const [isImageCropper, setImageCropper] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeImage = (e: any) => {
    e.preventDefault()

    let files

    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }

    if (files.length === 0) return

    const reader = new FileReader()

    setOpenCropper(true)

    reader.onload = () => {
      setImageCropper(reader.result as string)
    }

    reader.readAsDataURL(files[0])
  }

  const imageCropper = () => {
    const imageElement = cropperRef?.current
    const cropper = imageElement?.cropper
    const img = cropper.getCroppedCanvas().toDataURL()
    setOpenCropper(false)
    action(img)
  }

  return (
    <>
      <div className={`flex items-center justify-center ${isStyle}`}>
        <div className="relative" style={containerStyle}>
          <div
            className={`w-full h-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden ${styleBorder} ${isRound ? 'rounded-full' : ''}`}
            onClick={handleClick}
          >
            <Image
              src={isImage}
              alt="Uploaded avatar"
              className="w-full h-full object-cover"
              width={width}
              height={height}
            />
          </div>
          <div
            className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-2 cursor-pointer"
            onClick={handleClick}
          >
            <svg
              className="fill-light opacity-80"
              height="12"
              viewBox="0 0 14 12"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6665 2.64585H11.2232C11.0873 2.64749 10.9538 2.61053 10.8382 2.53928C10.7225 2.46803 10.6295 2.36541 10.5698 2.24335L10.0448 1.19918C9.91266 0.931853 9.70808 0.707007 9.45438 0.550249C9.20068 0.393491 8.90806 0.311121 8.60984 0.312517H5.38984C5.09162 0.311121 4.799 0.393491 4.5453 0.550249C4.2916 0.707007 4.08701 0.931853 3.95484 1.19918L3.42984 2.24335C3.37021 2.36541 3.27716 2.46803 3.1615 2.53928C3.04584 2.61053 2.91234 2.64749 2.7765 2.64585H2.33317C1.90772 2.64585 1.49969 2.81486 1.19885 3.1157C0.898014 3.41654 0.729004 3.82457 0.729004 4.25002V10.0834C0.729004 10.5088 0.898014 10.9168 1.19885 11.2177C1.49969 11.5185 1.90772 11.6875 2.33317 11.6875H11.6665C12.092 11.6875 12.5 11.5185 12.8008 11.2177C13.1017 10.9168 13.2707 10.5088 13.2707 10.0834V4.25002C13.2707 3.82457 13.1017 3.41654 12.8008 3.1157C12.5 2.81486 12.092 2.64585 11.6665 2.64585ZM6.99984 9.64585C6.39413 9.64585 5.80203 9.46624 5.2984 9.12973C4.79478 8.79321 4.40225 8.31492 4.17046 7.75532C3.93866 7.19572 3.87802 6.57995 3.99618 5.98589C4.11435 5.39182 4.40602 4.84613 4.83432 4.41784C5.26262 3.98954 5.80831 3.69786 6.40237 3.5797C6.99644 3.46153 7.61221 3.52218 8.1718 3.75397C8.7314 3.98576 9.2097 4.37829 9.54621 4.88192C9.88272 5.38554 10.0623 5.97765 10.0623 6.58335C10.0608 7.3951 9.73765 8.17317 9.16365 8.74716C8.58965 9.32116 7.81159 9.64431 6.99984 9.64585Z"
                fill=""
              ></path>
              <path
                d="M7 8.77087C8.20812 8.77087 9.1875 7.7915 9.1875 6.58337C9.1875 5.37525 8.20812 4.39587 7 4.39587C5.79188 4.39587 4.8125 5.37525 4.8125 6.58337C4.8125 7.7915 5.79188 8.77087 7 8.77087Z"
                fill=""
              ></path>
            </svg>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpg, image/jpeg, image/png"
            className="hidden"
            onChange={onChangeImage}
          />
        </div>
      </div>

      {isOpenCropper && (
        <div className="fixed  z-50 flex items-center justify-center bg-black bg-opacity-80 w-screen h-screen">
          <div
            className={`bg-white rounded-lg shadow-lg relative w-11/12 h-auto md:w-[50%] h-max-[500px] p-8 flex flex-col justify-center items-center ${isRound ? 'rounded-full' : ''}`}
          >
            <Cropper
              src={isImageCropper!}
              guides={false}
              ref={cropperRef}
              className="max-h-96 md:w-auto"
              zoomable={true}
              //
              aspectRatio={1} // Proporção opcional para manter a imagem dentro dos limites
              viewMode={1} // Controla o modo de visualização da imagem dentro do cropper
              autoCropArea={1} // Ajusta a área automaticamente para cobrir a maior parte da imagem
            />
            <div className="flex w-full flex-col md:flex-row md:justify-between mt-5">
              <button
                type="button"
                onClick={imageCropper}
                className="w-full md:w-28 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Cortar
              </button>
              <button
                type="button"
                onClick={() => setOpenCropper(false)}
                className="w-full md:w-28 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
