import { Module, Level, LessonPlan } from "@prisma/client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Lock } from "lucide-react"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"
import { TypographyH2, TypographyMuted } from "@/components/ui/typography"
import { Advanced, Basic, Intermediate } from "@/components/Badges"

async function getData(): Promise<any[]> {
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
        { id: "L1", name: "Finger Placement", isLocked: false },
        { id: "L2", name: "ASDF Practice", isLocked: false },
        { id: "L3", name: "JKL; Practice", isLocked: false },
        { id: "L4", name: "Combined Home Row", isLocked: true },
        { id: "L5", name: "Speed Drill", isLocked: true },
        { id: "L1", name: "Finger Placement", isLocked: false },
        { id: "L2", name: "ASDF Practice", isLocked: false },
        { id: "L3", name: "JKL; Practice", isLocked: false },
        { id: "L4", name: "Combined Home Row", isLocked: true },
        { id: "L5", name: "Speed Drill", isLocked: true },
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
        { id: "L6", name: "Upper Row Intro", isLocked: false },
        { id: "L7", name: "Lower Row Intro", isLocked: false },
        { id: "L8", name: "Upper Row Practice", isLocked: true },
        { id: "L9", name: "Lower Row Practice", isLocked: true },
        { id: "L10", name: "Full Keyboard Drill", isLocked: true },
      ]
    },
    {
      id: "B-002",
      name: "Upper and Lower Rows",
      level: "ADVANCED" as Level,
      description: "Expand your typing skills to the upper and lower rows of the keyboard",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      isActive: true,
      lessonPlans: [
        { id: "L6", name: "Upper Row Intro", isLocked: true },
        { id: "L7", name: "Lower Row Intro", isLocked: false },
        { id: "L8", name: "Upper Row Practice", isLocked: true },
        { id: "L9", name: "Lower Row Practice", isLocked: true },
        { id: "L10", name: "Full Keyboard Drill", isLocked: true },
        { id: "L6", name: "Upper Row Intro", isLocked: false },
        { id: "L7", name: "Lower Row Intro", isLocked: false },
        { id: "L8", name: "Upper Row Practice", isLocked: true },
        { id: "L9", name: "Lower Row Practice", isLocked: true },
        { id: "L10", name: "Full Keyboard Drill", isLocked: true },
        { id: "L6", name: "Upper Row Intro", isLocked: false },
        { id: "L7", name: "Lower Row Intro", isLocked: false },
        { id: "L8", name: "Upper Row Practice", isLocked: true },
        { id: "L9", name: "Lower Row Practice", isLocked: true },
        { id: "L10", name: "Full Keyboard Drill", isLocked: true },
        { id: "L6", name: "Upper Row Intro", isLocked: false },
        { id: "L7", name: "Lower Row Intro", isLocked: false },
        { id: "L8", name: "Upper Row Practice", isLocked: true },
        { id: "L9", name: "Lower Row Practice", isLocked: true },
        { id: "L10", name: "Full Keyboard Drill", isLocked: true },
      ]
    },
  ]
}

export default async function Lessons() {
  const data = await getData()

  return (
    <div className="h-full w-full bg-white rounded-lg flex flex-col gap-8 p-4">
      
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
              {module.lessonPlans.map((lessonPlan: { id: Key | null | undefined; isLocked: any; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }, index: number) => (
                <div key={lessonPlan.id} className="relative border rounded-lg p-4 flex flex-col items-center">
                  <span className="absolute top-2 left-2 text-sm font-semibold">{index + 1}</span>
                  {lessonPlan.isLocked && <Lock className="absolute top-2 right-2 w-4 h-4 text-red-400" />}
                  <Avatar className="w-16 h-16 mb-2">
                    <AvatarFallback>{module.name.split(' ').map((word: any[]) => word[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="w-full pt-2 border-t text-center">
                    <p className="text-sm">{lessonPlan.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
   
    </div>
  )
}
