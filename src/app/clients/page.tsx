import Link from 'next/link'

type Client = {
  id: string
  name: string
  email?: string
  phone?: string
}

export default async function ClientsPage() {
  const res = await fetch('http://localhost:3000/api/clients', { cache: 'no-store' })
  const clients: Client[] = await res.json()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <Link href="/clients/new" className="text-blue-600 underline">+ Add New Client</Link>

      <ul className="mt-6 space-y-2">
        {clients.map(client => (
          <li key={client.id} className="border p-4 rounded">
            <Link href={`/clients/${client.id}`} className="text-lg font-semibold">{client.name}</Link>
            <div className="text-sm text-gray-600">{client.email} · {client.phone}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
