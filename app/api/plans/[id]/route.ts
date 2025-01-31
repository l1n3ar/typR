import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { currentUser, response } from "@/utils/helpers";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const plan = await prisma.lessonPlan.findUnique({
      where: { id: params.id },
      include: { lessons: true }
    });

    if (!plan) {
      return response(false, null, "Plan not found", "No plan found with the given ID");
    }

    return response(true, plan, "Plan retrieved successfully", "Plan retrieved successfully");
  } catch (error: any) {
    return response(false, null, "An error occurred", error.message);
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await currentUser();
    const { title, level, moduleId, lessons } = await req.json();

    const existingPlan = await prisma.lessonPlan.findUnique({
      where: { id: params.id }
    });

    if (!existingPlan) {
      return response(false, null, "Plan not found", "No plan found with the given ID");
    }

    const plan = await prisma.lessonPlan.update({
      where: { id: params.id },
      data: {
        title,
        level,
        moduleId,
        updatedAt: new Date(),
        updatedBy: user?.id,
        lessons: {
          deleteMany: {},
          create: lessons.map((lesson: any) => ({
            content: lesson.content,
            order: lesson.order
          }))
        }
      },
      include: { lessons: true }
    });

    return response(true, plan, "Plan updated successfully", "Plan updated successfully");
  } catch (error: any) {
    return response(false, null, "An error occurred", error.message);
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const user = await currentUser();

    const existingPlan = await prisma.lessonPlan.findUnique({
      where: { id: params.id }
    });

    if (!existingPlan) {
      return response(false, null, "Plan not found", "No plan found with the given ID");
    }

    const plan = await prisma.lessonPlan.update({
      where: { id: params.id },
      data: {
        isActive: false,
        updatedAt: new Date(),
        updatedBy: user?.id,
        lessons: {
          updateMany: {
            where: { lessonPlanId: params.id },
            data: { isActive: false }
          }
        }
      },
      include: { lessons: true }
    });

    return response(true, plan, "Plan deleted successfully", "Plan deleted successfully");
  } catch (error: any) {
    return response(false, null, "An error occurred", error.message);
  }
}