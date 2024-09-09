"use client"

import React, { useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Table from '@/components/Table'

import { Button } from '@/components/ui/button'

import Activity from '@/components/Activity'

import { DatePickerWithRange } from '@/components/Progress/DateRange'
import ProgressAnalytics from '@/components/Progress/ProgressAnalytics'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

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

const AnnouncementCard = ({ title, description }: { title: string, description: string }) => (
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

const InfoCard = ({ title, description }: { title: string, description: string }) => (
    <Card className='col-span-full sm:col-span-1 row-span-1 sm:row-span-2'>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <CardContent className='flex items-center justify-center h-[15rem] sm:h-[25rem]'>
                <div className='bg-gray-50 rounded-full w-full sm:w-1/2 text-gray-600 font-semibold p-4 text-center'>Coming soon</div>
            </CardContent>
        </CardHeader>
    </Card>
)

const Dashboard = () => {
    // const { data: session, status } = useSession();
    // const router = useRouter();
    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.replace('/');
    //     }
    // }, [status, router]);
    return (
        <div className='grid gap-4 w-full min-h-screen grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto sm:grid-rows-4'>
            <Card className='col-span-full lg:col-span-3 row-span-auto sm:row-span-2'>
                <CardHeader>
                    <CardTitle>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                            <p className='mb-2 sm:mb-0'>Modules</p>
                            <Link href='/modules'>
                                <Button>See More</Button>
                            </Link>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className='overflow-auto max-h-[30rem]'>
                    <Table />
                </CardContent>
            </Card>

            <Card className='col-span-full sm:col-span-1 row-span-auto sm:row-span-2 '>
                <CardHeader>
                    <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent className='overflow-auto mt-4 flex items-center justify-center'>
                    {/* <div className='flex flex-col sm:flex-row gap-2'>
                        <DatePickerWithRange />
                        <Button variant='secondary' className='cursor-pointer w-full sm:w-auto'>Search</Button>
                    </div>
                    <ProgressAnalytics /> */}
                      <div className='bg-gray-50 rounded-full w-full sm:w-1/2 text-gray-600 font-semibold p-4 text-center'>Coming soon</div>
                </CardContent>
            </Card>

            <div className='col-span-full  lg:col-span-2 row-span-auto sm:row-span-2 grid gap-4 grid-cols-1 sm:grid-cols-2'>
                <Card className='col-span-full sm:col-span-2 row-span-1'>
                    <CardHeader>
                        <CardTitle>Activity</CardTitle>
                    </CardHeader>
                    <CardContent className='flex items-center justify-center'>
                        {/* <Activity /> */}
                        <div className='bg-gray-50 rounded-full w-full sm:w-1/2 text-gray-600 font-semibold p-4 text-center'>Coming soon</div>
                    </CardContent>
                </Card>

                <Card className='col-span-full sm:col-span-2 row-span-1'>
                    <CardHeader>
                        <CardTitle>Certificates</CardTitle>
                    </CardHeader>
                    <CardContent className='flex items-start justify-center h-full'>
                        <div className='bg-gray-50 rounded-full w-full sm:w-1/2 text-gray-600 font-semibold p-4 text-center'>Coming soon</div>
                    </CardContent>
                </Card>
            </div>

            <InfoCard title="Competitions" description="" />

            <Card className='col-span-full sm:col-span-1 row-span-auto sm:row-span-2'>
                <CardHeader className='mb-4'>
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription className=''>Our latest updates</CardDescription>
                </CardHeader>
                <CardContent className=" gap-1 flex items-center justify-center">
                <div className='bg-gray-50 rounded-full w-full sm:w-1/2 text-gray-600 font-semibold p-4 text-center'>Coming soon</div>
                    {/* {announcements.map((announcement, index) => (
                        <AnnouncementCard
                            key={index}
                            title={announcement.title}
                            description={announcement.description}
                        />
                    ))} */}
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
