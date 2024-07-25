"use client";

import React, { useState, useEffect } from 'react';
import { TypingLesson } from '@/app/practice/page';

type Lesson = {
    id: string;
    content: string;
    name: string;
    level : string
};

const Lesson = ({ params }: { params: { id: string } }) => {
    const [lesson, setLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        
        const fetchLesson = async () => {
            // API call
            const fetchedLesson = {
                id: "B-001",
                name: "Learning the basics",
                content: "Lorem ipsum dolor sit amet. The quick brown fox jumps over the lazy dog.",
                level : 'basic'
            };
            setLesson(fetchedLesson);
        };

        fetchLesson();
    }, [params.id]);

    return (
        <div className='bg-black h-full w-full rounded-lg'>
            {/* TODO: Fetch the details from API here */}
            {lesson && (
                <TypingLesson
                    lessonText={lesson.content}
                    name={lesson.name}
                    id={lesson.id}
                    level={lesson.level}
                    rounded={true}
                />
            )}
        </div>
    );
};

export default Lesson;
