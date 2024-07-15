"use client"
import { UserButton } from "@clerk/nextjs"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between border-b w-full h-1/3 p-4 bg-white'>
      <div className="flex items-center justify-between gap-10">

        <div className="text-5xl font-bold">.typR</div>
        <div>
        </div>

      </div>
      <div className="flex gap-8 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger> <div className="flex items-center justify-center bg-gray-100 pl-4 pr-4 pt-3 pb-3 rounded-lg text-sm text-gray-400 font-light">Request a certificate</div></TooltipTrigger>
            <TooltipContent>
             Currently Disabled
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <UserButton />
      </div>

    </div>
  )
}

export default Navbar