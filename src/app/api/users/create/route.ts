import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/password'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password, role } = body

    if (!username || !password) {
      return NextResponse.json({ message: 'username and password are required' }, { status: 400 })
    }

    const prismaRole = role && typeof role === 'string' ? (role.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER') : 'USER'

  const hashed = await hashPassword(password)
  const user = await prisma.user.create({ data: { username, password: hashed, role: prismaRole } })

  // do not return the password hash in the response
  const safeUser: Partial<typeof user> = { ...user }
  delete (safeUser as unknown as Record<string, unknown>).password
  return NextResponse.json({ user: safeUser })
  } catch (err) {
    console.error('create-user error', err)
    // handle unique constraint violation (username already exists)
    // Prisma error code P2002 may appear on unique constraint violation
    if (err && typeof err === 'object' && (err as { code?: string }).code === 'P2002') {
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 })
    }
    return NextResponse.json({ message: 'Internal error' }, { status: 500 })
  }
}
