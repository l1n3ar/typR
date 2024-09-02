import { LessonPlan } from "@prisma/client"

export type lessonPlan = {
    id : string,
    lessonName : string,
    type : string,
    level : string,
    image : string,
}

export type Module = {
    id : string,
    name : string,
    level : string,
    description? : string,
    lessonPlans? : LessonPlan[]
}