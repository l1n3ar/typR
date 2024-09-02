"use client";

import React, { useState, useEffect } from 'react';
import useModuleStore from '@/store/moduleStore';
import { TypographyH3, TypographyMuted } from '@/components/ui/typography';
import { Basic } from '@/components/Badges';
import { Button } from '@/components/ui/button';
import { ArrowRight, MoveRight, RefreshCcw } from 'lucide-react';


const Lesson = ({ params }: { params: { id: string } }) => {
    const [lessonPlan, setLessonPlan] = useState<any | undefined>(undefined);
    const { findLessonPlan } = useModuleStore();
    const [text, setText] = useState<string>('');

    useEffect(() => {
        const fetchLesson = async () => {

            const fetchedLessonPlan = findLessonPlan(params.id);
            setLessonPlan(fetchedLessonPlan);
            setText('jkhasgdkuasGHDIKausgdfuioasfguayiosfguiasdyasiudyfsiaudygasiduyfgasiudyfiasudgfasiduyg')

        };

        fetchLesson();
    }, [params.id]);

    return (
        <div className='bg-white w-full rounded-lg flex flex-col items-center gap-10  p-4'>

            <div className='h-full w-full flex items-center justify-between '>
                
                <div className='flex flex-col gap-2'>

                    <TypographyH3>{lessonPlan?.id}</TypographyH3>
                    <TypographyMuted>{lessonPlan?.name}</TypographyMuted>
                </div>
                {/* TODO Fetch module ID here */}
                <div>
                    <Basic />
                </div>
             
                <Button variant='outline'>
                    <RefreshCcw className="mr-2 h-4 w-4" /> Restart
                </Button>
               
            </div>
            <div className='h-3 rounded-full bg-gray-100 w-1/4'>
                    <div className='w-1/2 h-full rounded-full bg-green-200'>
                    </div>
                </div>
            <div className='flex-1 h-full w-full flex flex-wrap items-center justify-start mb-20 gap-4'>


                {
               
                    text.split('').map((char: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                        
                        <span key={index} className='text-gray-500 font-mono text-5xl border p-2 rounded-md '>
                            {char}
                        </span>
                    ))
                    
                }
            
            </div>
            <div className='h-full w-full flex items-center justify-center'>
                Image
            </div>
            <div className='flex justify-end items-center  w-full'>
        
                <Button variant='outline' className='max-w-fit items-center flex gap-2 p'>
                    Next Lesson  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
            </div>


        </div>
    );
};

export default Lesson;
