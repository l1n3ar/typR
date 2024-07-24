"use client"
// import { UserButton } from "@clerk/nextjs"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "./ui/button"
import { Mail, SquareArrowOutUpRight } from "lucide-react"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between border-b w-full h-1/3 p-4 bg-white'>
      <div className="flex items-center justify-between gap-10">

        <div className="text-5xl font-bold">.typR</div>
        <div>
        </div>

      </div>
      <div className="flex gap-14 items-center">

        <div className="flex items-center justify-around" >
      <Button variant='link'>
      Practice<SquareArrowOutUpRight className="ml-1 h-3 w-3" /> 
    </Button>
    <TooltipProvider >
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" disabled>
               Competitions
               </Button>
               </TooltipTrigger>
            <TooltipContent>
             Coming soon
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider >
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" disabled>
               Request a certificate
               </Button>
               </TooltipTrigger>
            <TooltipContent>
             Coming soon
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      
        
        </div>

        {/* <UserButton /> */}
      </div>

    </div>
  )
}

export default Navbar