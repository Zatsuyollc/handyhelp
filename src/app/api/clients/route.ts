import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const clients = await prisma.client.findMany()
  return Response.json(clients)
}

export async function POST(req: Request) {
  const body = await req.json()

  const newClient = await prisma.client.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
    },
  })

  return Response.json(newClient)
}
