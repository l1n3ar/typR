import prisma from "@/lib/prisma"

import { currentUser, response } from "@/utils/helpers"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await currentUser()
        if (!user) {
            return response(false, null, "Unauthorized", "Unauthorized", 401)
        }

        const module = await prisma.module.findUnique({
            where: { id: params.id }
        })
        if (!module) {
            return response(false, null, "Module not found", "Module not found", 404)
        }

        return response(true, module, "Module retrieved successfully", "Module retrieved successfully")
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

        const existingModule = await prisma.module.findUnique({
            where: { id: params.id }
        })
        if (!existingModule) {
            return response(false, null, "Module not found", "Module not found", 404)
        }

        const { name, description, isActive } = await req.json()
        const module = await prisma.module.update({
            where: { id: params.id },
            data: {
                name,
                description,
                isActive,
                updatedBy: user.id,
                updatedAt: new Date()
            }
        })
        return response(true, module, "Module updated successfully", "Module updated successfully")
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

        const existingModule = await prisma.module.findUnique({
            where: { id: params.id }
        })
        if (!existingModule) {
            return response(false, null, "Module not found", "Module not found", 404)
        }

        const module = await prisma.module.update({
            where: { id: params.id },
            data: {
                isActive: false,
                updatedBy: user.id,
                updatedAt: new Date()
            }
        })
        return response(true, module, "Module deactivated successfully", "Module deactivated successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message, 500)
    }
}