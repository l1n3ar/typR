
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,

} from '@clerk/nextjs'
import './globals.css'
import Navbar from '@/components/Navbar'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className='w-full h-full flex flex-col bg-gray-50'>
            <Navbar />
            <div className='grow p-4'>{children}</div>
            </div>  
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}