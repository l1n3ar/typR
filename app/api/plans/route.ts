import prisma from "@/lib/prisma"
import { LessonPlan } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req: Request, res: Response) {
  const plans = await prisma.lessonPlan.findMany()
  return NextResponse.json(plans)
}


export async function POST(req: Request, res: Response) {
    const { moduleId, lessonPlans } = await req.json()


        const createdPlans = await prisma.lessonPlan.createManyAndReturn({
            data: lessonPlans.map((plan: LessonPlan) => ({
                title: plan.title,
                level: plan.level,
                moduleId: moduleId
            }))
        })

        return NextResponse.json(createdPlans)
    }
   



