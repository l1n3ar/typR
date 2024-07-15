"use client"
import { UserButton } from "@clerk/nextjs"
const Navbar = () => {
  return (
    <div className='flex items-center justify-between border-b w-full h-1/3 p-4 bg-white'>
    <div>Logo here</div>
    <UserButton />
    </div>
  )
}

export default Navbar