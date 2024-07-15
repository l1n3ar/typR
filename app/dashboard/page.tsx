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
import ProgressTabs from '@/components/Progress/ProgressTabs'
import Activity from '@/components/Activity'
import { Check } from 'lucide-react'

const announcements = [
    {
        title: "New lesson added - Learn all keys!",
        description: "1 hour ago",
    },
    {
        title: "Certificates is now in Alpha",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

const AnnouncementCard = ({ title, description } : {title : string, description : string}) => (
    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
        <div className="">
            <p className="text-sm font-medium leading-none">
                {title}
            </p>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
         
        </div>
    </div>
)

const InfoCard = ({ title, description } : {title : string, description : string}) => (
    <Card className='col-span-1 row-span-2'>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
    </Card>
)

const Dashboard = () => {
    return (
        <div className='grid gap-4 w-full h-screen grid-cols-4 grid-rows-4'>
            <Card className='col-span-3 row-span-2'>
                <CardHeader>
                    <CardTitle>
                        <div className='flex justify-between items-start '>
                            <p>Lesson Plans</p>
                            <Button>See More</Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className='overflow-auto max-h-[30rem]'>
                    <Table />
                </CardContent>
            </Card>

            <Card className='col-span-1 row-span-2 pr-2'>
                <CardHeader>
                    <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent className='overflow-auto mt-4'>
                    <ProgressTabs />
                </CardContent>
            </Card>

            <div className='row-span-2 col-span-2 grid gap-4 grid-rows-2'>
                <Card className='col-span-2 row-span-1'>
                    <CardHeader>
                        <CardTitle>Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Activity />
                    </CardContent>
                </Card>

                <Card className='col-span-2 row-span-1'>
                    <CardHeader>
                        <CardTitle>Some other metric</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            <InfoCard title="More Info" description="Additional information or content" />

            <Card className='col-span-1 row-span-2'>
                <CardHeader className='mb-4'>
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription className=''>Our latest updates</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1">
                    {announcements.map((announcement, index) => (
                        <AnnouncementCard
                            key={index}
                            title={announcement.title}
                            description={announcement.description}
                        />
                    ))}
                </CardContent>
                <CardFooter>
                    {/* <Button className="w-full">
                        <Check className="mr-2 h-4 w-4" /> Mark all as read
                    </Button> */}
                </CardFooter>
            </Card>
        </div>
    )
}

export default Dashboard
