import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, res: Response) {
    const modules = await prisma.module.findMany()
    return NextResponse.json(modules)
}   


export async function POST(req: Request, res: Response) {
    const { name, description } = await req.json()
    const module = await prisma.module.create({
        data: {
            name,
            description
        }
    })
}