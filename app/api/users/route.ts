import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to create user' }, { status: 400 })
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        lastLogin: true,
        createdAt: true,
        isActive: true,
      },
    })
    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch users' }, { status: 400 })
  }
}