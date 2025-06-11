import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) return <div className="text-red-500 p-4">Unauthorized</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.email}!</h1>
    </div>
  )
}
