"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Basic, Intermediate, Advanced } from "@/components/Badges"

export type Lesson = {
    id: string
    name: string
    type: string
    level: 'Basic' | 'Intermediate' | 'Advanced'
}
const levelOrder = ['Basic', 'Intermediate', 'Advanced'];

export const columns: ColumnDef<Lesson>[] = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
       
    },
    {
        accessorKey: "level",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell : ({row}) => {
            return (
                row.original.level == "Basic" && <Basic /> ||  row.original.level == "Intermediate" && <Intermediate /> ||  row.original.level == "Advanced" && <Advanced /> 
            )
        },
        sortingFn: (rowA, rowB, columnId) => {
            const levelA = rowA.getValue(columnId) as string;
            const levelB = rowB.getValue(columnId) as string;
            return levelOrder.indexOf(levelA) - levelOrder.indexOf(levelB);
        }

    },
    {
        id: "start",
        cell: ({ row }) => {
            const lesson = row.original

            return (
                <Link href= {`/lessons/${row.original.id}`}>
                    <Button> Start</Button>
                </Link>
            )
        }
    }


]
