"use client"

import { Level, Type } from "@prisma/client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Lock, BookOpen, Code } from "lucide-react"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"
import {  TypographyMuted } from "@/components/ui/typography"
import { Advanced, Basic, Intermediate } from "@/components/Badges"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

function getData() {
  // Simulating fetching modules with lessons TODO
  return [
    {
      id: "B-001",
      name: "Home Row Mastery",
      level: "BASIC" as Level,
      description: "Learn to type efficiently using the home row keys",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      isActive: true,
      lessonPlans: [
        { id: "L1", name: "Finger Placement", isLocked: false, type: "PRACTICE" as Type },
        { id: "L2", name: "ASDF Practice", isLocked: false, type: "PRACTICE" as Type },
        { id: "L3", name: "JKL; Practice", isLocked: false, type: "PRACTICE" as Type },
        { id: "L4", name: "Combined Home Row", isLocked: true, type: "PRACTICE" as Type },
        { id: "L5", name: "Speed Drill", isLocked: true, type: "PRACTICE" as Type },
      ]
    },
    {
      id: "B-002",
      name: "Upper and Lower Rows",
      level: "INTERMEDIATE" as Level,
      description: "Expand your typing skills to the upper and lower rows of the keyboard",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      isActive: true,
      lessonPlans: [
        { id: "L6", name: "Upper Row Intro", isLocked: false, type: "INSTRUCTIONAL" as Type },
        { id: "L7", name: "Lower Row Intro", isLocked: false, type: "INSTRUCTIONAL" as Type },
        { id: "L6", name: "Upper Row Practice", isLocked: true, type: "PRACTICE" as Type },
        { id: "L9", name: "Lower Row Practice", isLocked: true, type: "PRACTICE" as Type },
        { id: "L10", name: "Full Keyboard Drill", isLocked: true, type: "PRACTICE" as Type },
      ]
    },
    {
      id: "B-003",
      name: "Advanced Typing Techniques",
      level: "ADVANCED" as Level,
      description: "Master advanced typing techniques",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      isActive: true,
      lessonPlans: [
        { id: "L11", name: "Advanced Finger Placement", isLocked: true, type: "INSTRUCTIONAL" as Type },
        { id: "L12", name: "Speed and Accuracy", isLocked: false, type: "PRACTICE" as Type },
        { id: "L13", name: "Typing Games", isLocked: true, type: "PRACTICE" as Type },
        { id: "L14", name: "Typing Tests", isLocked: true, type: "PRACTICE" as Type },
        { id: "L15", name: "Custom Lessons", isLocked: true, type: "INSTRUCTIONAL" as Type },
      ]
    },
  ]
}

export default function Lessons() {
  const data = getData()
  const router = useRouter()

  const goToLesson = (lessonPlanId: Key | null | undefined) => {
    router.push(`/lesson/${lessonPlanId}`)
  }

  return (
    <div className="h-full w-full bg-white rounded-lg flex flex-col gap-8 p-4" >
      
        {data.map((module) => (
          <div key={module.id} className="mb-12 flex gap-2 flex-col">

              <div className="text-4xl font-semibold">{module.name}</div>
              <TypographyMuted>{module.description}</TypographyMuted>

            <div> 
            {module.level == 'BASIC' && (<Basic />)}
              {module.level == 'INTERMEDIATE' && (<Intermediate />)}
              {module.level == 'ADVANCED' && (<Advanced />)}

            </div>

            <div className="grid grid-cols-5 gap-6 mt-10 w-full">
              {module.lessonPlans.map((lessonPlan: { id: Key | null | undefined; isLocked: any; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, type: Type }, index: number) => (
                <div key={lessonPlan.id} className="relative border rounded-lg p-4 flex flex-col items-center hover:shadow-md duration-300" >
                  <div className="flex justify-between w-full">
                    <span className="text-sm font-semibold">{index + 1}</span>
                    <div className="flex items-center gap-1">
                      {lessonPlan.type === "INSTRUCTIONAL" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <BookOpen className="w-6 h-6 text-muted-foreground hover:bg-gray-100 rounded-md p-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>Instructional Lesson</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {lessonPlan.type === "PRACTICE" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Code className="w-6 h-6 hover:bg-gray-100 rounded-md p-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>Practice Lesson</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {lessonPlan.isLocked && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Lock className="w-6 h-6 text-red-600 hover:bg-red-100 rounded-md p-1 mr-2" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>This lesson is locked</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                  <Avatar className="w-16 h-16 mb-2">
                    <AvatarFallback>{module.name.split(' ').map((word: string) => word[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="w-full pt-2 border-t mt-4 text-center">
                    <Button className="text-sm" variant='outline' onClick={() => goToLesson(lessonPlan.id)}>{lessonPlan.name}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
   
    </div>
  )
}
