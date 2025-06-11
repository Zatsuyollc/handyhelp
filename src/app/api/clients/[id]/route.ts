import { NextRequest } from 'next/server'
import type { RouteHandlerContext } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: NextRequest,
  context: RouteHandlerContext
) {
  const id = context.params.id
  const client = await prisma.client.findUnique({ where: { id } })
  return Response.json(client)
}

export async function PUT(
  req: NextRequest,
  context: RouteHandlerContext
) {
  const id = context.params.id
  const body = await req.json()

  const updated = await prisma.client.update({
    where: { id },
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
    },
  })

  return Response.json(updated)
}

export async function DELETE(
  req: NextRequest,
  context: RouteHandlerContext
) {
  const id = context.params.id

  await prisma.client.delete({ where: { id } })

  return new Response(null, { status: 204 })
}
