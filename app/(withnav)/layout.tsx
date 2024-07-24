
import '../globals.css'
import Navbar from '@/components/Navbar'

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   

  
            <div className='w-full h-full flex flex-col bg-gray-50'>
            <Navbar />
            <div className='grow p-4'>{children}</div>
            </div>  

   

  )
}