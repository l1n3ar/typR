"use client"
import React from 'react'
import { Button } from './ui/button'
import { lessonPlans } from '@/data/lesson-plans'
import { Basic, Intermediate, Advanced } from './Badges'
import Dropdown from './Dropdown'

const Table = () => {
    return (
        <div className="relative overflow-x-auto max-h-full sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope='col' className='px-6 py-3'>ID</th>
                        <th scope="col" className="px-6 py-3">Module</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Level</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Start</span></th>
                    </tr>
                </thead>
                <tbody>
                    {lessonPlans.map((plan, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {plan.id}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {plan.lessonName}
                            </th>
                            <td className="px-6 py-4">{plan.type}</td>
                            <td className="px-6 py-4">

                                {
                                    plan.level == "Basic" && <Basic /> || plan.level == 'Intermediate' && <Intermediate /> || plan.level == 'Advanced' && <Advanced />
                                }

                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium ">
                                    <Button variant='secondary'>Start</Button>
                                </a>
                            </td>
                            {/* <td className="px-6 py-4 text-right">
                                <Dropdown />
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
