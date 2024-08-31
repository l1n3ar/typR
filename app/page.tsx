'use client'

import { getSession, signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'


export default function Home() {
  const router = useRouter()


  // useEffect(() => {
  //   const checkSession = async () => {
  //     const session = await getSession()
  //     console.log('Session:', session)
  //     if (session?.user.id) {
  //       console.log('Redirecting to dashboard')
  //       router.push('/dashboard')
  //     } else {
  //       console.log('No user session found')
  //     }
  //   }
  //   checkSession()
  // }, [router])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async (e: React.FormEvent) => {
  

    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.ok) {
      router.push('/dashboard')
    } else {
      // Handle error
      console.error('Login failed')
    }
  }

  return (
    <div className="w-screen h-screen overflow-y-hidden flex">
      <div className="bg-black w-1/2 h-full">
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <Card className="mx-auto ">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <Button 
              variant="outline" 
              className="w-full flex gap-2 items-center mt-4"
              onClick={() => signIn('google')}
            >
              <Image src= '/google.png' alt="Google-Logo" height={28} width={28} />
              <div>Login with Google</div>
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}