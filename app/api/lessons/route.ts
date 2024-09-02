import prisma from "@/lib/prisma"
import { Lesson } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req: Request, res: Response) {
    const lessons = await prisma.lesson.findMany()
    return NextResponse.json(lessons)
}

export async function POST(req: Request, res: Response) {
    const { lessons, lessonPlanId } = await req.json()
    const dbLessons = await prisma.lesson.createMany({
        data: lessons.map((lesson: Lesson) => ({
            name: lesson.name,
            content: lesson.content,
            type: lesson.type,
            lessonPlanId
        }))
    })
        

    return NextResponse.json(dbLessons, { status: 201 })
}


