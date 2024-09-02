import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, res: Response, {params}: {params: {id: string}}) {
    const module = await prisma.module.findUnique({
        where: { id: params.id }
    })
    return NextResponse.json(module)
}

export async function PUT(req: Request, res: Response, {params}: {params: {id: string}}) {  
    const { name, description } = await req.json()
    const module = await prisma.module.update({
        where: { id: params.id },
        data: {
            name,
            description,
            updatedAt: new Date(),
        }
    })
    return NextResponse.json(module)
}

export async function DELETE(req: Request, res: Response, {params}: {params: {id: string}}) {
    const module = await prisma.module.update({
        where: { id: params.id },
        data : {
            isActive: false,
            updatedAt: new Date(),
        }
    })
    return NextResponse.json(module)
}