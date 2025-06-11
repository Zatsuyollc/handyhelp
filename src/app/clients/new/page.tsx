'use client'

type ClientForm = {
  name: string
  email: string
  phone: string
  address: string
}

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewClientPage() {
  const fields: (keyof ClientForm)[] = ['name', 'email', 'phone', 'address']
  const router = useRouter()
  const [form, setForm] = useState<ClientForm>({ name: '', email: '', phone: '', address: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/clients')
    } else {
      alert('Failed to create client')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Add New Client</h1>
     {fields.map(field => (
  <input
    key={field}
    name={field}
    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
    value={form[field]}
    onChange={handleChange}
    className="w-full p-2 border"
  />
))}

      <button className="bg-blue-600 text-white px-4 py-2" type="submit">Save Client</button>
    </form>
  )
}
