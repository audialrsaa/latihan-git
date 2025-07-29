'use client'
import { useState, useEffect } from 'react'
import { Lock, Globe, Flag, ArrowLeft, ShoppingCart, Bell, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  })

  useEffect(() => {
    const userData = localStorage.getItem('current_user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setForm({
        fullName: parsedUser.name || '',
        phoneNumber: parsedUser.phoneNumber || '',
        email: parsedUser.email || '',
      })
    }
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleCancel() {
    const userData = localStorage.getItem('current_user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setForm({
        fullName: parsedUser.name || '',
        phoneNumber: parsedUser.phoneNumber || '',
        email: parsedUser.email || '',
      })
    }
    setIsEditing(false)
  }

  function handleSave() {
    const updatedUser = {
      name: form.fullName,
      phoneNumber: form.phoneNumber,
      email: form.email,
    }

    localStorage.setItem('current_user', JSON.stringify(updatedUser))
    setIsEditing(false)

    Swal.fire({
      title: 'Success',
      text: 'Your profile has been updated!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    })
  }

  function handleLogout() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-600 text-white px-4 py-2 rounded mx-2',
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded mx-2'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })

        setTimeout(() => {
          localStorage.clear()
          window.location.href = '/login'
        }, 1600)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: 'You are still logged in.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        })
      }
    })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-10">
      <header className="w-full max-w-md flex items-center justify-between mb-8 px-2">
        <Link href="/home" className="text-blue-600 flex items-center gap-1 font-semibold text-base hover:underline">
          <ArrowLeft />
          MongStore | Profile Page
        </Link>
        <div className="flex items-center gap-4 text-blue-600">
          <Link href="/cart">
            <ShoppingCart className="cursor-pointer" />
          </Link>
          <Bell className="cursor-pointer" />
        </div>
      </header>

      <div className="w-full max-w-md border-2 border-blue-600 rounded-xl shadow-md overflow-hidden">
        <section className="flex gap-4 p-6 border-b-2 border-blue-600 relative bg-white">
          <img
            src="https://i.pinimg.com/736x/59/9f/10/599f1071ab55b6edd41054163fa72ef4.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow"
          />
          <div className="flex-1 text-blue-600">
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-lg">Profile</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:underline text-sm font-medium"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-1 rounded-full transition shadow-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-4 py-1 rounded-full transition shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="mt-3 text-sm font-semibold space-y-3">
              <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} editable={isEditing} />
              <Field label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} editable={isEditing} />
              <Field label="Email" name="email" value={form.email} onChange={handleChange} editable={isEditing} />
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-xs text-red-500 hover:underline transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </section>

        <section className="p-6 bg-white">
          <h3 className="text-blue-600 font-bold text-lg mb-5">Settings</h3>
          <div className="flex flex-col gap-4">
            <SettingButton icon={<Lock />} label="Change Password" />
            <SettingButton icon={<Globe />} label="Select Language" />
            <SettingButton icon={<Flag />} label="Select Region" />
          </div>
        </section>
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, editable }) {
  return (
    <div className="flex sm:flex-row sm:justify-between sm:items-center justify-between items-center">
      <span>{label}</span>
      {editable ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="border border-blue-300 focus:outline-none rounded px-2 py-1 text-blue-600 font-normal text-right w-48 text-sm"
          type={name === 'email' ? 'email' : 'text'}
        />
      ) : (
        <span className="font-normal text-right text-sm">{value}</span>
      )}
    </div>
  )
}

function SettingButton({ icon, label }) {
  return (
    <div className="flex items-center gap-4 border border-blue-300 rounded-xl px-5 py-3 text-blue-600 cursor-pointer hover:bg-blue-50 transition">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="ml-auto text-lg font-semibold">{'>'}</span>
    </div>
  )
}
