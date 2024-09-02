"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TypographyH1, TypographyH2 } from '@/components/ui/typography'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface CardProps {
  title: string;
  options: { label: string; path: string }[];
  isOpen: boolean;
  onClick: () => void;
  onOptionClick: (path: string) => void;
  selectedOption: string | null;
  onProceed: () => void;
}

const CardComponent: React.FC<CardProps> = ({ title, options, isOpen, onClick, onOptionClick, selectedOption, onProceed }) => {
  return (
    <Card className='w-1/3 h-1/2 p-2 items-center flex flex-col justify-center cursor-pointer shadow-lg'>
      <CardHeader className='text-center'  onClick={onClick}>
        <CardTitle className="text-4xl mb-10">{title}</CardTitle>
        {/* <CardDescription>Click to see options</CardDescription> */}
      </CardHeader>
      {isOpen && (
        <CardContent className='flex flex-col gap-8'>
          <RadioGroup className='flex flex-col gap-4'>
            {options.map((option, index) => (
              <Label key={index} className='flex w-full gap-2'>
                <RadioGroupItem value={option.path} onClick={() => onOptionClick(option.path)} />
                {option.label}
              </Label>
            ))}
          </RadioGroup>
       
        </CardContent>
      )}
        {
          isOpen && (
            <Button 
              className='max-w-sm' 
              variant='outline'
              onClick={onProceed}
              disabled={!selectedOption}
            >
              Proceed
            </Button>
          )
        } 
     
    </Card>
  )
}

const Landing = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [openCard, setOpenCard] = useState<string | null>(null)
  const router = useRouter()

  const learnOptions = [
    { label: 'With normal error calculation', path: '/learn/normal' },
    { label: 'With error calculation according to SSC DEST, Stenography, or other exams', path: '/learn/exam' }
  ]

  const practiceOptions = [
    { label: 'With normal error calculation', path: '/practice/normal' },
    { label: 'With error calculation according to SSC DEST, Stenography, or other exams', path: '/practice/exam' }
  ]

  const handleCardClick = (card: string) => {
    setOpenCard(openCard === card ? null : card)
  }

  const handleOptionClick = (path: string) => {
    setSelectedOption(path)
  }

  const handleProceed = () => {
    if (selectedOption) {
      router.push("/dashboard")
    }
  }

  return (
    <div className='h-screen w-screen bg-gray-50 p-4'>
      <div className='w-full h-full bg-white rounded-lg flex flex-col items-center justify-center py-4  '>
        <div className="text-5xl font-bold">.typR</div>
        <div className='flex flex-col items-center justify-center flex-1 w-full'>
          <div className='flex items-center justify-center gap-10 flex-1 w-full'>
         
            <CardComponent
              title="Learn Typing"
              options={learnOptions}
              isOpen={openCard === 'learn'}
              onClick={() => handleCardClick('learn')}
              onOptionClick={handleOptionClick}
              selectedOption={selectedOption}
              onProceed={handleProceed}
            />
            <CardComponent
              title="Practice Typing"
              options={practiceOptions}
              isOpen={openCard === 'practice'}
              onClick={() => handleCardClick('practice')}
              onOptionClick={handleOptionClick}
              selectedOption={selectedOption}
              onProceed={handleProceed}
            />
          </div>
          <div className='w-1/3 flex mt-4 bg-red-50'>
       
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing