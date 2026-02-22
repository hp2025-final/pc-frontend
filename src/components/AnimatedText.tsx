'use client';

import { useState, useEffect } from 'react';

interface AnimatedTextProps {
    words: string[];
}

export default function AnimatedText({ words }: AnimatedTextProps) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
        return () => clearTimeout(timeout);
    }, [blink]);

    // Typing effect
    useEffect(() => {
        if (words.length === 0) return;

        if (subIndex === words[index].length + 1 && !isDeleting) {
            const timeout = setTimeout(() => setIsDeleting(true), 2000); // Wait 2s before deleting
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && isDeleting) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length); // Move to next word
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? 40 : 100); // Delete faster than typing

        return () => clearTimeout(timeout);
    }, [subIndex, index, isDeleting, words]);

    // Render the current substring
    const currentWord = words[index] || '';
    const displayText = currentWord.substring(0, subIndex);

    return (
        <span style={{ color: '#555', display: 'inline-flex', alignItems: 'center' }}>
            <span>{displayText}</span>
            <span style={{
                opacity: blink ? 1 : 0,
                width: '0.6em',
                display: 'inline-block',
                marginLeft: '4px'
            }}>_</span>
        </span>
    );
}
