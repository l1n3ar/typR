import prisma from "@/lib/prisma";
import { Lesson } from "@prisma/client";
import {currentUser,response} from "@/utils/helpers"
import { NextApiRequest } from "next";

export async function GET(req: Request) {
  try {
    const lessons = await prisma.lesson.findMany();
    return response(true, lessons, "Lessons retrieved successfully", "Lessons retrieved successfully");
  } catch (error: any) {
    return response(false, null, "An error occurred", error instanceof Error ? error.message : "Unknown error");
  }
}

export async function POST(req: NextApiRequest) {
  try {
    const userId = await currentUser();
    const { lessons, lessonPlanId } = await req.body;

    const dbLessons = await prisma.lesson.createMany({
      data: lessons.map((lesson: Lesson) => ({
        name: lesson.name,
        content: lesson.content,
        type: lesson.type,
        lessonPlanId,
        createdBy: userId,
        createdAt: new Date()
      }))
    });

    return response(true, dbLessons, "Lessons created successfully", "Lessons created successfully");
  } catch (error : any) {
    return response(false, null, "An error occurred", error.message);
  }
}