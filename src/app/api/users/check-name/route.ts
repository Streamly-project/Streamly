import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    // support both `name` and `username` query params for compatibility
    const username = searchParams.get('username') ?? searchParams.get('name')

    if (!username) {
      return NextResponse.json({ error: 'Missing username parameter' }, { status: 400 })
    }

    const exists = await prisma.user.count({ where: { username } })

    return NextResponse.json({ exists: exists > 0 })
  } catch (err) {
    console.error('check-name error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
