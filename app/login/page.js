'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaArrowLeft, FaFacebook, FaGoogle } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  function handleLogin () {
    const users   = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [] //ambil data users dari ls klw gaada array ksg 
    let user = users.filter((data) => data.email == email )

    if (user.length == 0) {
      alert('Login gagal!')

      return null
    }

    user = user[0]

    if (user.password != password) {
      alert('Login gagal!')

      return null
    }

    localStorage.setItem('current_user', JSON.stringify(user))

    window.location.href = '/home';
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
        <h2 className="text-xl font-bold text-center text-blue-600 mb-6">Login</h2>

        <div className="flex items-center border-2 border-blue-600 rounded-md px-3 py-2 mb-4">
          <FaEnvelope className="text-blue-600 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent outline-none placeholder-blue-500 text-blue-600"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="flex items-center border-2 border-blue-600 rounded-md px-3 py-2 mb-4">
          <FaLock className="text-blue-600 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent outline-none placeholder-blue-500 text-blue-600"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>

        <button onClick={ handleLogin } className="w-full focus:outline-none bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-2">
          Login
        </button>

        <div className="text-right mb-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgotten Password?</a>
        </div>

        <p className="text-sm text-center text-blue-600 mb-2">
          Don’t have any account?{' '}
          <Link href="/register" className="text-blue-700 underline">Register</Link>
        </p>

        <p className="text-sm text-center text-blue-600 mb-2">or Continue With</p>
        <div className="flex justify-center gap-4 text-blue-600 text-xl">
          <FaFacebook className="cursor-pointer hover:text-blue-800" />
          <FaGoogle className="cursor-pointer hover:text-blue-800" />
        </div>
      </div>
    </div>
  );
}
