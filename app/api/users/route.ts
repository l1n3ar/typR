import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { currentUser, response } from "@/utils/helpers"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  
  const body = await request.json()
  const { firstName, lastName, email, password } = body

  if (!firstName || !lastName || !email || !password) {
    return response(false, null, "Missing fields", "All fields are required", 400)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
    })

    return response(true, user, "User created successfully", "User created successfully", 201)
  } catch (error: any) {
    return response(false, null, "An error occurred", error.message, 400)
  }
}

export async function GET() {
  try {
    const user = await currentUser()

    if (!user) {
      return response(false, null, "Unauthorized", "Unauthorized", 401)
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
      },
    })
    return response(true, users, "Users retrieved successfully", "Users retrieved successfully")
  } catch (error: any) {
    return response(false, null, "Unable to fetch users", error.message, 400)
  }
}