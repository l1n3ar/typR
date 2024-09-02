import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { currentUser, response } from "@/utils/helpers";
import { NextApiRequest } from "next";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const plan = await prisma.lessonPlan.findUnique({
      where: { id: params.id }
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
    const userId = await currentUser();
    const { title, level, moduleId } = await req.json();

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
        updatedBy: userId
      }
    });

    return response(true, plan, "Plan updated successfully", "Plan updated successfully");
  } catch (error: any) {
    return response(false, null, "An error occurred", error.message);
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const userId = await currentUser();

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
        updatedBy: userId
      }
    });

    return response(true, plan, "Plan deleted successfully", "Plan deleted successfully");
  } catch (error: any) {
    return response(false, null, "An error occurred", error.message);
  }
}