import { Module } from '@prisma/client'
import {create} from 'zustand'

interface ModuleStore {
    modules: Module[]
    setModules: (modules: Module[]) => void
}

const useModuleStore = create<ModuleStore>((set) => ({
    modules: [],
    setModules: (modules: Module[]) => set({ modules }),
}))

export default useModuleStore