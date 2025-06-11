'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) router.push('/login')
    else alert('Registration failed')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <input name="name" type="text" onChange={handleChange} placeholder="Name" className="w-full p-2 border" />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full p-2 border" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Sign Up</button>
    </form>
  )
}
