import {create} from 'zustand'

const modules = [
    {
      id: "B-001",
      name: "Home Row Mastery",
      level: "BASIC",
      description: "Learn to type efficiently using the home row keys",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      isActive: true,
      lessonPlans: [
        { id: "L1", name: "Finger Placement", isLocked: false, type: "PRACTICE" },
        { id: "L2", name: "ASDF Practice", isLocked: false, type: "PRACTICE" },
        { id: "L3", name: "JKL; Practice", isLocked: false, type: "PRACTICE" },
        { id: "L4", name: "Combined Home Row", isLocked: true, type: "PRACTICE" },
        { id: "L5", name: "Speed Drill", isLocked: true, type: "PRACTICE" },
      ]
    },
    {
      id: "B-002",
      name: "Upper and Lower Rows",
      level: "INTERMEDIATE",
      description: "Expand your typing skills to the upper and lower rows of the keyboard",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      isActive: true,
      lessonPlans: [
        { id: "L6", name: "Upper Row Intro", isLocked: false, type: "INSTRUCTIONAL" },
        { id: "L7", name: "Lower Row Intro", isLocked: false, type: "INSTRUCTIONAL" },
        { id: "L6", name: "Upper Row Practice", isLocked: true, type: "PRACTICE" },
        { id: "L9", name: "Lower Row Practice", isLocked: true, type: "PRACTICE" },
        { id: "L10", name: "Full Keyboard Drill", isLocked: true, type: "PRACTICE" },
      ]
    },
    {
      id: "B-003",
      name: "Advanced Typing Techniques",
      level: "ADVANCED",
      description: "Master advanced typing techniques",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      isActive: true,
      lessonPlans: [
        { id: "L11", name: "Advanced Finger Placement", isLocked: true, type: "INSTRUCTIONAL" },
        { id: "L12", name: "Speed and Accuracy", isLocked: false, type: "PRACTICE" },
        { id: "L13", name: "Typing Games", isLocked: true, type: "PRACTICE" },
        { id: "L14", name: "Typing Tests", isLocked: true, type: "PRACTICE" },
        { id: "L15", name: "Custom Lessons", isLocked: true, type: "INSTRUCTIONAL" },
      ]
    },
  ]

type Module = {
    id: string
    name: string
    level: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    updatedBy: string | null
    isActive: boolean
    lessonPlans: LessonPlan[]
}

type LessonPlan = {
    id: string
    name: string
    isLocked: boolean
    type: string
}

interface ModuleStore {
    modules: Module[]
    setModules: (modules: Module[]) => void
    findLessonPlan: (id: string) => LessonPlan | undefined
}

const useModuleStore = create<ModuleStore>((set) => ({
    modules: modules,
    setModules: (modules: Module[]) => set({ modules }),
    findLessonPlan: (id: string): LessonPlan | undefined => {
        const module = useModuleStore.getState().modules.find((module: Module) => module.lessonPlans.some((lessonPlan: LessonPlan) => lessonPlan.id === id))
        return module?.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.id === id)
    }
}))

export default useModuleStore