import prisma from "@/lib/prisma"
import { currentUser, response } from "@/utils/helpers"

export async function GET(req: Request) {
    try {
        const user = await currentUser()

        if (!user) {
            return response(false, null, "Unauthorized", "Unauthorized", 401)
        }

        const modules = await prisma.module.findMany()
        return response(true, modules, "Modules retrieved successfully", "Modules retrieved successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message,500)
    }
}

export async function POST(req: Request) {
    try {
        const user = await currentUser()

        if (!user) {
            return response(false, null, "Unauthorized", "Unauthorized", 401)
        }

        const { name, description } = await req.json()
        const module = await prisma.module.create({
            data: {
                name,
                description,
                createdBy: user?.id,
                createdAt: new Date()
            }
        })
        return response(true, module, "Module created successfully", "Module created successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message,500)
    }
}