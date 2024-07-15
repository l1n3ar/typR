"use client"

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Table from '@/components/Table'
import SubscriptionCard from '@/components/SubscriptionCard'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
    return (
        <div className='grid gap-4 w-full h-screen grid-cols-4 grid-rows-4'>

            <Card className='col-span-3 row-span-2'>
                <CardHeader>
                    <CardTitle>
                        <div className='flex justify-between items-start -mb-4'>
                        <p>Lesson Plans</p>
                        <Button>See More</Button>
                        </div>
                        </CardTitle>
                    <CardDescription>Find your current lesson plans</CardDescription>
                </CardHeader>
                <CardContent className= 'overflow-auto max-h-[25rem]'>
                   <Table />
                </CardContent>
     
            </Card>

            <div className='col-span-1 row-span-2 grid gap-4 grid-rows-1'>
                <Card className='row-span-1'>
                    <CardHeader>
                        <CardTitle>Progress</CardTitle>
                        <CardDescription>Your daily, weekly, and monthly analytics</CardDescription>
                    </CardHeader>
     
                </Card>


            </div>

            <Card className='col-span-4 row-span-2'>
                <CardHeader>
                    <CardTitle>More Info</CardTitle>
                    <CardDescription>Additional information or content</CardDescription>
                </CardHeader>
     
            </Card>
        </div>
    )
}

export default Dashboard
