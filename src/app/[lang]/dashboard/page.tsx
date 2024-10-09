import React from 'react'
import { getCookie } from 'cookies-next'

export default function Dashboard() {
  const user = getCookie('user')

  console.log('olá')

  console.log(user)

  //   if (!user) {
  //     return null
  //   }

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Dashboard</h1>
    </div>
  )
}
