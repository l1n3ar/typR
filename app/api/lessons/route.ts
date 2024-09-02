import prisma from "@/lib/prisma"
import { Lesson } from "@prisma/client"
import { currentUser, response } from "@/utils/helpers"

export async function GET(req: Request) {
    try {

        const userId = await currentUser()

        if (!userId) {
            return response(false, null, "Unauthorized", "Unauthorized",401)
        }

        const lessons = await prisma.lesson.findMany()
        return response(true, lessons, "Lessons retrieved successfully", "Lessons retrieved successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message)
    }
}

export async function POST(req: Request) {
    try {
        const userId = await currentUser()

        if (!userId) {
            return response(false, null, "Unauthorized", "Unauthorized",401)
        }

        const { lessons, lessonPlanId } = await req.json()

        const dbLessons = await prisma.lesson.createMany({
            data: lessons.map((lesson: Lesson) => ({
                name: lesson.name,
                content: lesson.content,
        
                lessonPlanId,
                createdBy: userId,
                createdAt: new Date()
            }))
        })

        return response(true, dbLessons, "Lessons created successfully", "Lessons created successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message,400)
    }
}