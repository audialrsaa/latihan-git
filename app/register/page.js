'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaUser, FaPhoneAlt, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  function handleRegistration () {
    if (!email || !name || !phoneNumber || !password) {
      alert('Semua data harus diisi!')
      return
    }

    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [] 

    const user = {
      name,
      email,
      phoneNumber,
      password
    }

    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))

    window.location.href = '/login';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-blue-600 mr-10">
          <FaArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-blue-600 text-5xl mr-15 font-bold leading-tight">MongStore</h1>
      </div>

      <div className="border-2 border-blue-600 rounded-2xl p-8 w-full max-w-sm shadow-md">
        <h2 className="text-center text-xl font-bold mb-6 text-blue-600">Register</h2>

        <div className="flex items-center border-2 border-blue-600 rounded-md px-3 py-2 mb-4">
          <FaEnvelope className="text-blue-600 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="outline-none flex-1 bg-transparent placeholder-blue-500 text-blue-600"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="flex items-center border-2 border-blue-600 rounded-md px-3 py-2 mb-4">
          <FaUser className="text-blue-600 mr-2" />
          <input
            type="text"
            placeholder="Name"
            className="outline-none flex-1 bg-transparent placeholder-blue-500 text-blue-600"
            onChange={ (e) => setName(e.target.value) }
          />
        </div>

        <div className="flex items-center border-2 border-blue-600 rounded-md px-3 py-2 mb-4">
          <FaPhoneAlt className="text-blue-600 mr-2" />
          <input
            type="text"
            placeholder="Phone Number"
            className="outline-none flex-1 bg-transparent placeholder-blue-500 text-blue-600"
            onChange={ (e) => setPhoneNumber(e.target.value) }
          />
        </div>

        <div className="flex items-center border-2 border-blue-600 rounded-md px-3 py-2 mb-4">
          <FaLock className="text-blue-600 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="outline-none flex-1 bg-transparent placeholder-blue-500 text-blue-600"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>

        <button
          onClick={ handleRegistration }
          className="w-full focus:outline-none bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-2"
        >
          Register
        </button>

        <p className="text-sm text-center text-blue-600">
          Already have an account? <a href="/login" className="text-blue-700 underline">Login</a>
        </p>

        <p className="text-sm text-center my-2 text-blue-600">or Register With</p>
        <div className="flex justify-center gap-4 text-blue-600 text-xl">
          <FaFacebook className="cursor-pointer" />
          <FaGoogle className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
