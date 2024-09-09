import {create} from 'zustand'

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
    lessons: string[]
}

interface ModuleStore {
    modules: Module[]
    setModules: (modules: Module[]) => void
    findLessonPlan: (id: string) => LessonPlan | undefined
}

const modules: Module[] = [
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
        { id: "L1", name: "Finger Placement", isLocked: false, type: "PRACTICE", lessons: ["Place your fingers on the home row keys: ASDF for the left hand, JKL; for the right hand."] },
        { id: "L2", name: "ASDF Practice", isLocked: false, type: "PRACTICE", lessons: ["Practice typing: a s d f as as ad af fd sa sf da"] },
        { id: "L3", name: "JKL; Practice", isLocked: false, type: "PRACTICE", lessons: ["Practice typing: j k l ; jk kl l; ;j lk kj ;l"] },
        { id: "L4", name: "Combined Home Row", isLocked: true, type: "PRACTICE", lessons: ["Type the following: ask dad fad jak lass fall"] },
        { id: "L5", name: "Speed Drill", isLocked: true, type: "PRACTICE", lessons: [
          "Type as fast as you can: the quick brown fox jumps over the lazy dog",
          "Now try this: pack my box with five dozen liquor jugs",
          "And finally: how vexingly quick daft zebras jump"
        ]},
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
        { id: "L6", name: "Upper Row Intro", isLocked: false, type: "INSTRUCTIONAL", lessons: ["Learn the upper row keys: QWERTY UIOP"] },
        { id: "L7", name: "Lower Row Intro", isLocked: false, type: "INSTRUCTIONAL", lessons: ["Learn the lower row keys: ZXCVBNM"] },
        { id: "L8", name: "Upper Row Practice", isLocked: true, type: "PRACTICE", lessons: ["Practice typing: quiet type your way up"] },
        { id: "L9", name: "Lower Row Practice", isLocked: true, type: "PRACTICE", lessons: ["Practice typing: zoom down to the bottom row"] },
        { id: "L10", name: "Full Keyboard Drill", isLocked: true, type: "PRACTICE", lessons: ["Use all rows: The five boxing wizards jump quickly"] },
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
        { id: "L11", name: "Advanced Finger Placement", isLocked: true, type: "INSTRUCTIONAL", lessons: ["Learn to reach for number keys and symbols efficiently"] },
        { id: "L12", name: "Speed and Accuracy", isLocked: false, type: "PRACTICE", lessons: ["Type the following paragraph as fast and accurately as you can: The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!"] },
        { id: "L13", name: "Typing Games", isLocked: true, type: "PRACTICE", lessons: ["Play the typing game: Race against time to type falling words"] },
        { id: "L14", name: "Typing Tests", isLocked: true, type: "PRACTICE", lessons: ["Take a 3-minute typing test to measure your WPM and accuracy"] },
        { id: "L15", name: "Custom Lessons", isLocked: true, type: "INSTRUCTIONAL", lessons: ["Create your own custom typing lessons based on your weaknesses"] },
      ]
    },
  ]

const useModuleStore = create<ModuleStore>((set) => ({
    modules: modules,
    setModules: (modules: Module[]) => set({ modules }),
    findLessonPlan: (id: string): LessonPlan | undefined => {
        const module = useModuleStore.getState().modules.find((module: Module) => module.lessonPlans.some((lessonPlan: LessonPlan) => lessonPlan.id === id))
        return module?.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.id === id)
    }
}))

export default useModuleStore