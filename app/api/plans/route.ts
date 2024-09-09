import prisma from "@/lib/prisma"
import { LessonPlan } from "@prisma/client"
import { currentUser, response } from "@/utils/helpers"

export async function GET(req: Request, res: Response) {
    try {
        const user = await currentUser()
        if (!user) {
            return response(false, null, "Unauthorized", "Unauthorized", 401)
        }

        const plans = await prisma.lessonPlan.findMany({
            include: { lessons: true }
        })
        return response(true, plans, "Lesson plans retrieved successfully", "Lesson plans retrieved successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message, 500)
    }
}

export async function POST(req: Request, res: Response) {
    try {
        const user = await currentUser()
        if (!user) {
            return response(false, null, "Unauthorized", "Unauthorized", 401)
        }

        const { moduleId, lessonPlans } = await req.json()

        const createdPlans = await prisma.lessonPlan.create({
            data: lessonPlans.map((plan: LessonPlan) => ({
                title: plan.title,
                level: plan.level,
                isLocked: plan.isLocked,
                createdBy: user.id,
                updatedBy: user.id,
                moduleId: moduleId,
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: plan.isActive,
               
            })),
            include: { lessons: true }
        })

        return response(true, createdPlans, "Lesson plans created successfully", "Lesson plans created successfully")
    } catch (error: any) {
        return response(false, null, "An error occurred", error.message, 500)
    }
}
