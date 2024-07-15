"use client"
import { UserButton } from "@clerk/nextjs"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button"
import Sidebar from "./Sidebar"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between border-b w-full h-1/3 p-4 bg-white'>
      <div className="flex items-center justify-between gap-10">
     
        <div className="text-5xl font-bold">.typR</div>
        <div>
        </div>

      </div>
      <div className="flex gap-8 items-center">
      <Button variant='outline'>Request a certificate</Button>
        <UserButton />
      </div>

    </div>
  )
}

export default Navbar