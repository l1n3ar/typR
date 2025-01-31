"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, CircleCheckBig, Hourglass, Timer, ArrowRightToLine } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { generate } from 'random-words';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface AnalyticsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <div className="p-4 rounded-lg border border-dashed font-mono">
      <div className='flex items-start justify-between'>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-gray-400">{title}</h3>
          <p className="text-3xl font-light">{value}</p>
        </div>
        <Icon size={24} />
      </div>
    </div>
  );
}

interface TypingLessonProps {
  lessonText: string;
  timeLimit?: number | undefined; // in seconds
}

const calculateWpm = (userInput: string, startTime: Date, endTime: Date) => {
  const timeElapsed = (endTime.getTime() - startTime.getTime()) / 60000; // in minutes
  const wordsTyped = userInput.trim().split(/\s+/).length;
  return Math.round(wordsTyped / timeElapsed);
};

const calculateAccuracy = (userInput: string, lessonText: string) => {
  let correct = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === lessonText[i]) {
      correct++;
    }
  }
  return Math.round((correct / userInput.length) * 100);
};

const TypingLesson: React.FC<TypingLessonProps> = ({ lessonText, timeLimit }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const restartLesson = useCallback(() => {
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(null);
    setUserInput('');
    setShowAnalytics(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (startTime && timeLimit !== null && !endTime) {
      const timer = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const remaining = timeLimit !== undefined ? Math.max(timeLimit - elapsed, 0) : null;
        setTimeLeft(remaining);
        if (remaining === 0) {
          clearInterval(timer);
          setEndTime(now);
          setShowAnalytics(true);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, timeLimit, endTime]);

  useEffect(() => {
    if (endTime && startTime) {
      setWpm(calculateWpm(userInput, startTime, endTime));
      setAccuracy(calculateAccuracy(userInput, lessonText));
    }
  }, [endTime, startTime, lessonText, userInput]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    if (!startTime) {
      setStartTime(new Date());
      if (timeLimit !== null && timeLimit !== undefined) {
        setTimeLeft(timeLimit);
      }
    }
    setUserInput(newInput);
    setCurrentIndex(newInput.length);
    if (newInput.length === lessonText.length) {
      setEndTime(new Date());
      setShowAnalytics(true);
    }
  }, [lessonText, startTime, timeLimit]);

  return (
    <div className={`flex flex-col items-center justify-start min-h-screen bg-black text-white p-4 overflow-y-hidden gap-48`}>
      <div className='flex w-full p-4 items-center justify-between'>
        <div className='absolute top-4 right-4'>
          <button
            onClick={restartLesson}
            className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-neutral-900 transition-colors duration-200 shadow-sm"
          >
            <RefreshCw className="mr-2" size={16} />
            <span className='font-mono font-light text-muted'>Restart</span>
          </button>
        </div>
      </div>
      {!showAnalytics && 
      <div className="relative w-screen max-w-4xl text-2xl font-mono leading-relaxed flex flex-col gap-2">
        {timeLeft !== null && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-400">
            {timeLeft}s
          </div>
        )}
        <div className="absolute pointer-events-none whitespace-pre-wrap p-4 rounded-lg">
          {lessonText.split('').map((char, index) => (
            <span
              key={index}
              className={`transition-all duration-150 ${index === currentIndex && index < userInput.length
                ? 'border-r-2 border-white'
                : index < userInput.length
                  ? userInput[index] === char ? 'text-green-300' : 'text-red-300'
                  : 'text-white'
                }`}
            >
              {char}
            </span>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="w-full flex-1 max-h-screen bg-transparent text-transparent caret-transparent resize-none focus:outline-none overflow-y-hidden"
          value={userInput}
          onChange={handleInput}
          rows={3}
          spellCheck="false"
        />
      </div>
      }
      {showAnalytics && (
        <div className="mt-8 w-full max-w-4xl animate-fadeIn">
          <div className="grid grid-cols-3 gap-4">
            <AnalyticsCard title="Words Per Minute" value={wpm.toString()} icon={Hourglass} />
            <AnalyticsCard title="Accuracy" value={`${accuracy}%`} icon={CircleCheckBig} />
            <AnalyticsCard title="Time (seconds)" value={timeLimit ? (timeLimit - (timeLeft ?? 0)).toString() : Math.round((endTime!.getTime() - startTime!.getTime()) / 1000).toString()} icon={Timer} />
          </div>
          <div className='mt-10 p-4 bg-white text-black font-mono rounded-lg w-1/5 flex items-center justify-between cursor-pointer hover:bg-neutral-200'> 
            <span>Next Lesson</span>
            <ArrowRightToLine />
          </div>
        </div>
      )}
    </div>
  );
};

const Main = () => {
  const [paragraph, setParagraph] = useState('');
  const [selectedTime, setSelectedTime] = useState<number | null>(null); // default to null (off)

  useEffect(() => {
    setParagraph(generate({ min: 20, max: 30, join: " " }));
  }, []);

  const handleTimeSelect = (value: string) => {
    setSelectedTime(value === 'off' ? null : Number(value));
  };

  return (
    <div className='bg-black h-full w-screen p-4 relative'>
      <div className='absolute top-[4rem] left-[60rem]'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex items-center font-mono text-white p-2 rounded-lg g px-4 cursor-pointer hover:bg-neutral-900'>
              <div>Timer </div>
              <div className={`h-[0.5rem] w-[0.5rem] rounded-full ${selectedTime === null ? 'bg-gray-500' : 'bg-green-400'}`}></div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Seconds</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={selectedTime?.toString() || 'off'} onValueChange={handleTimeSelect}>
              <DropdownMenuRadioItem value="off">Off</DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="30">30</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="60">60</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="120">120</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TypingLesson
        lessonText={paragraph}
        timeLimit={selectedTime || undefined}      />
    </div>
  );
}

export default Main;
