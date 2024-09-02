import prisma from "@/lib/prisma"
import { currentUser, response } from "@/utils/helpers"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const lesson = await prisma.lesson.findUnique({
            where: { id: params.id }
        })

        if (!lesson) {
            return response(false, null, "Lesson not found", "No lesson found with the given ID",404)
        }

        return response(true, lesson, "lesson retrieved successfully", "lesson retrieved successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message,500)
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await currentUser()

        if (!user) {
            return response(false, null, "Unauthorized", "Unauthorized", 401)
        }

        const { name, content, type, lessonPlanId } = await req.json()

        const existingLesson = await prisma.lesson.findUnique({
            where: { id: params.id }
        })

        if (!existingLesson) {
            return response(false, null, "Lesson not found", "No lesson found with the given ID",404)
        }

        const lesson = await prisma.lesson.update({
            where: { id: params.id },
            data: {
                name,
                content,
         
                lessonPlanId,
                updatedBy: user?.id,
                updatedAt: new Date()
            }
        })
        return response(true, lesson, "lesson updated successfully", "lesson updated successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message,500)
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await currentUser()

        if (!user) {
            return response(false, null, "Unauthorized", "Unauthorized", 401)
        }

        const existingLesson = await prisma.lesson.findUnique({
            where: { id: params.id }
        })

        if (!existingLesson) {
            return response(false, null, "Lesson not found", "No lesson found with the given ID")
        }

        const lesson = await prisma.lesson.update({
            where: { id: params.id },
            data: {
                isActive: false,
                updatedBy: user?.id,
                updatedAt: new Date()
            }
        })
        return response(true, lesson, "lesson deactivated successfully", "lesson deactivated successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message,500)
    }
}