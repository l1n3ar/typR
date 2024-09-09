"use client";

import React, { useState, useEffect } from 'react';
import useModuleStore from '@/store/moduleStore';
import { TypographyH3, TypographyMuted } from '@/components/ui/typography';
import { Basic } from '@/components/Badges';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCcw, Keyboard, Target, Zap, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { calculateErrors, calculateAccuracy } from '@/utils/errorCalculation';
import { ErrorCalculation } from '@prisma/client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';

const Lesson = ({ params }: { params: { id: string } }) => {
    const [lessonPlan, setLessonPlan] = useState<any | undefined>(undefined);
    const { findLessonPlan } = useModuleStore();
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [text, setText] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(100);
    const [errorCalculationType, setErrorCalculationType] = useState<ErrorCalculation>(ErrorCalculation.NORMAL);
    const [errors, setErrors] = useState<{ full: number; half: number } | null>(null);
    const [isLessonComplete, setIsLessonComplete] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<number>(0);
    const [isLessonPlanComplete, setIsLessonPlanComplete] = useState(false);

    useEffect(() => {
        const fetchLesson = async () => {
            const fetchedLessonPlan = findLessonPlan(params.id);
            setLessonPlan(fetchedLessonPlan);
            if (fetchedLessonPlan && fetchedLessonPlan.lessons && fetchedLessonPlan.lessons.length > 0) {
                setText(fetchedLessonPlan.lessons[currentLessonIndex]);
            }
        };

        fetchLesson();

        const storedCalculationType = localStorage.getItem('errorCalculationType');
        if (storedCalculationType) {
            setErrorCalculationType(storedCalculationType as ErrorCalculation);
        }
    }, [params.id, currentLessonIndex]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isLessonComplete) return;

        if (!startTime) {
            setStartTime(Date.now());
        }

        const { key } = event;
        if (key.length === 1 || key === ' ') {
            event.preventDefault();
            setUserInput((prev) => {
                const newInput = prev + key;
                updateAccuracy(newInput);
                checkLessonCompletion(newInput);
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
        const newAccuracy = calculateAccuracy(input, text, errorCalculationType);
        setAccuracy(newAccuracy);
    };

    const checkLessonCompletion = (input: string) => {
        if (input.length === text.length) {
            setIsLessonComplete(true);
            const calculatedErrors = calculateErrors(input, text, errorCalculationType);
            setErrors(calculatedErrors);
            
            if (startTime) {
                const timeElapsed = (Date.now() - startTime) / 60000;
                const wordsTyped = input.trim().split(/\s+/).length;
                setWpm(Math.round(wordsTyped / timeElapsed));
            }

            if (currentLessonIndex === lessonPlan.lessons.length - 1) {
                setIsLessonPlanComplete(true);
            }
        }
    };

    const restartLesson = () => {
        setUserInput('');
        setCurrentIndex(0);
        setAccuracy(100);
        setErrors(null);
        setIsLessonComplete(false);
        setStartTime(null);
        setWpm(0);
    };

    const nextLesson = () => {
        if (lessonPlan && lessonPlan.lessons && currentLessonIndex < lessonPlan.lessons.length - 1) {
            setCurrentLessonIndex(prev => prev + 1);
            restartLesson();
        } else {
            // Navigate to next lesson plan
            const nextLessonPlanId = findNextLessonPlanId(params.id);
            if (nextLessonPlanId) {
                window.location.href = `/lesson/${nextLessonPlanId}`;
            }
        }
    };

    const findNextLessonPlanId = (currentId: string) => {
        // Implement logic to find the next lesson plan ID
        // This is a placeholder and should be replaced with actual logic
        return null;
    };

    return (
        <Card className='w-full p-8' onKeyDown={handleKeyPress} tabIndex={0}>
            <CardHeader className='mb-8'>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle>{lessonPlan?.id}</CardTitle>
                        <TypographyMuted>{lessonPlan?.name}</TypographyMuted>
                    </div>
                    <Basic />
                    <Button variant='outline' onClick={restartLesson}>
                        <RefreshCcw className="mr-2 h-4 w-4" /> Restart
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col items-center'>
                <div className='flex flex-wrap items-center justify-center mb-12 gap-4 max-w-3xl'>
                    {text.split('').map((char, index) => {
                        let borderColor = 'border-gray-200';
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
                            <span key={index} className={`font-mono text-3xl border-b-4 ${borderColor} p-2 ${textColor}`}>
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        );
                    })}
                </div>
                {!isLessonComplete && (
                    <div className='flex items-center justify-center p-6 mb-8'>
                        <Keyboard className="h-24 w-24 text-gray-400" />
                    </div>
                )}
                {isLessonPlanComplete && errors && (
                    <Card className='w-full mt-8'>
                        <CardHeader>
                            <CardTitle>Performance Summary</CardTitle>
                            <CardDescription>Your typing performance for this lesson</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='flex justify-between gap-4'>
                                <Card className='flex-1'>
                                    <CardHeader>
                                        <CardTitle className='flex items-center text-sm'>
                                            <Target className="mr-2 h-4 w-4" /> Accuracy
                                        </CardTitle>
                                        <CardDescription>How precise your typing was</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-xl font-bold'>{accuracy.toFixed(2)}%</p>
                                    </CardContent>
                                </Card>
                                <Card className='flex-1'>
                                    <CardHeader>
                                        <CardTitle className='flex items-center text-sm'>
                                            <Zap className="mr-2 h-4 w-4" /> WPM
                                        </CardTitle>
                                        <CardDescription>Words per minute typed</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-xl font-bold'>{wpm}</p>
                                    </CardContent>
                                </Card>
                                {errorCalculationType === ErrorCalculation.NORMAL ? (
                                    <Card className='flex-1'>
                                        <CardHeader>
                                            <CardTitle className='flex items-center text-sm'>
                                                <AlertTriangle className="mr-2 h-4 w-4" /> Mistakes
                                            </CardTitle>
                                            <CardDescription>Total errors made</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className='text-xl font-bold'>{errors.full + Math.ceil(errors.half / 2)}</p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <>
                                        <Card className='flex-1'>
                                            <CardHeader>
                                                <CardTitle className='flex items-center text-sm'>
                                                    <AlertTriangle className="mr-2 h-4 w-4" /> Full
                                                </CardTitle>
                                                <CardDescription>Major typing errors</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className='text-xl font-bold'>{errors.full}</p>
                                            </CardContent>
                                        </Card>
                                        <Card className='flex-1'>
                                            <CardHeader>
                                                <CardTitle className='flex items-center text-sm'>
                                                    <AlertTriangle className="mr-2 h-4 w-4" /> Half
                                                </CardTitle>
                                                <CardDescription>Minor typing errors</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className='text-xl font-bold'>{errors.half}</p>
                                            </CardContent>
                                        </Card>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
            <CardFooter className='flex justify-end mt-8'>
                <Button variant='outline' className='max-w-fit items-center flex gap-2' onClick={nextLesson}>
                    {isLessonPlanComplete ? 'Next Lesson Plan' : 'Next Lesson'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Lesson;
