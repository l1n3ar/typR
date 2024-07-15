import React from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { CircleCheckBig, Hourglass, Timer } from 'lucide-react'

const ProgressAnalytics = () => {
  return (

    <div className='flex flex-col gap-4 mt-8'>

<Card className='w-full h-[7rem] flex items-center justify-center p-4'>
        <div className='flex flex-col justify-around w-full'>
          <CardTitle className='text-5xl'>28 <div className='text-sm tracking-normal mt-1 font-semibold text-neutral-500'>% Accuracy</div></CardTitle>
        </div>
       <CircleCheckBig />
      </Card>

      <Card className='w-full h-[7rem] flex items-center justify-center p-4'>
        <div className='flex flex-col justify-around w-full'>
          <CardTitle className='text-5xl '>22 <div className='text-sm tracking-normal mt-1 font-semibold text-neutral-500'>Words Per Minute</div></CardTitle>
        </div>
        <Timer />
      </Card>
      <Card className='w-full h-[7rem] flex items-center justify-center p-4'>
        <div className='flex flex-col justify-around w-full'>
          <CardTitle className='text-5xl '>45 <div className='text-sm tracking-normal mt-1 font-semibold text-neutral-500'>Hours Spent</div></CardTitle>
        </div>
       <Hourglass/>
      </Card>
    </div>

  )
}

export default ProgressAnalytics