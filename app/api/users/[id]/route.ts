import prisma from "@/lib/prisma"
import bcrypt from 'bcrypt'
import { currentUser, response } from "@/utils/helpers"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: params.id }
        })

        if (!user) {
            return response(false, null, "User not found", "No user found with the given ID", 404)
        }

        return response(true, user, "User retrieved successfully", "User retrieved successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message, 500)
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await currentUser()

        if (!user) {
            return response(false, null, "Unauthorized", "Unauthorized", 401)
        }

        const { firstName, lastName, email, password } = await req.json()

        const existingUser = await prisma.user.findUnique({
            where: { id: params.id }
        })

        if (!existingUser) {
            return response(false, null, "User not found", "No user found with the given ID", 404)
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : existingUser.password

        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                updatedBy: user.id,
                updatedAt: new Date()
            }
        })
        return response(true, updatedUser, "User updated successfully", "User updated successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message, 500)
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await currentUser()

        if (!user) {
            return response(false, null, "Unauthorized", "Unauthorized", 401)
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: params.id }
        })

        if (!existingUser) {
            return response(false, null, "User not found", "No user found with the given ID", 404)
        }

        await prisma.user.delete({
            where: { id: params.id }
        })

        return response(true, null, "User deleted successfully", "User deleted successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message, 500)
    }
}
