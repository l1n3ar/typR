"use client";

import React, { useState, useEffect } from 'react';
import useModuleStore from '@/store/moduleStore';
import { TypographyH3, TypographyMuted } from '@/components/ui/typography';
import { Basic } from '@/components/Badges';
import { Button } from '@/components/ui/button';
import { ArrowRight, MoveRight, RefreshCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Lesson = ({ params }: { params: { id: string } }) => {
    const [lessonPlan, setLessonPlan] = useState<any | undefined>(undefined);
    const { findLessonPlan } = useModuleStore();
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [text, setText] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(100);

    useEffect(() => {
        const fetchLesson = async () => {
            const fetchedLessonPlan = findLessonPlan(params.id);
            setLessonPlan(fetchedLessonPlan);
            if (fetchedLessonPlan && fetchedLessonPlan.lessons && fetchedLessonPlan.lessons.length > 0) {
                setText(fetchedLessonPlan.lessons[currentLessonIndex]);
            }
        };

        fetchLesson();
    }, [params.id, currentLessonIndex]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const { key } = event;
        if (key.length === 1 || key === ' ') {
            event.preventDefault(); // Prevent default behavior for space
            setUserInput((prev) => {
                const newInput = prev + key;
                updateAccuracy(newInput);
                return newInput;
            });
            setCurrentIndex((prev) => prev + 1);
        } else if (key === 'Backspace') {
            setUserInput((prev) => {
                const newInput = prev.slice(0, -1);
                updateAccuracy(newInput);
                return newInput;
            });
            setCurrentIndex((prev) => Math.max(0, prev - 1));
        }
    };

    const updateAccuracy = (input: string) => {
        let correct = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === text[i]) correct++;
        }
        setAccuracy(input.length > 0 ? (correct / input.length) * 100 : 100);
    };

    const restartLesson = () => {
        setUserInput('');
        setCurrentIndex(0);
        setAccuracy(100);
    };

    const nextLesson = () => {
        if (lessonPlan && lessonPlan.lessons && currentLessonIndex < lessonPlan.lessons.length - 1) {
            setCurrentLessonIndex(prev => prev + 1);
            restartLesson();
        }
    };

    return (
        <div className='bg-white w-full rounded-lg flex flex-col items-center gap-20 p-4' onKeyDown={handleKeyPress} tabIndex={0}>
            <div className='h-full w-full flex items-center justify-between '>
                <div className='flex flex-col gap-2'>
                    <TypographyH3>{lessonPlan?.id}</TypographyH3>
                    <TypographyMuted>{lessonPlan?.name}</TypographyMuted>
                </div>
                <div>
                    <Basic />
                </div>
                <Button variant='outline' onClick={restartLesson}>
                    <RefreshCcw className="mr-2 h-4 w-4" /> Restart
                </Button>
            </div>
    
            <div className='flex-1 h-full w-5/6 flex flex-wrap items-center justify-start mb-20 gap-4'>
                {text.split('').map((char, index) => {
                    let borderColor = 'border-b';
                    let textColor = 'text-gray-500';

                    if (index < userInput.length) {
                        if (userInput[index] === char) {
                            borderColor = 'border-green-200';
                            textColor = 'text-green-500';
                        } else {
                            borderColor = 'border-red-200';
                            textColor = 'text-red-500';
                        }
                    } else if (index === userInput.length) {
                        borderColor = 'border-gray-800';
                    }

                    return (
                        <span key={index} className={`font-mono text-5xl border-b-4 ${borderColor} p-2 ${textColor}`}>
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    );
                })}
            </div>
            <div className='h-full w-full flex items-center justify-center'>
                Image
            </div>
            <div className='flex justify-end items-center w-full'>
                <Button variant='outline' className='max-w-fit items-center flex gap-2' onClick={nextLesson}>
                    Next Lesson <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default Lesson;
