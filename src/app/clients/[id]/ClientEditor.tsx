'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type ClientForm = {
  name: string
  email: string
  phone: string
  address: string
}

export default function ClientEditor({ id }: { id: string }) {
  const router = useRouter()
  const [form, setForm] = useState<ClientForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch(`/api/clients/${id}`)
      const data = await res.json()
      setForm(data)
    }
    fetchClient()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    await fetch(`/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    router.push('/clients')
  }

  const handleDelete = async () => {
    await fetch(`/api/clients/${id}`, { method: 'DELETE' })
    router.push('/clients')
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Edit Client</h1>
      {(['name', 'email', 'phone', 'address'] as (keyof ClientForm)[]).map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full p-2 border"
        />
      ))}
      <div className="flex gap-2 mt-4">
        <button className="bg-blue-600 text-white px-4 py-2" onClick={handleSave}>
          Save
        </button>
        <button className="bg-red-600 text-white px-4 py-2" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}
