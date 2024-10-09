'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  duration = 200,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      }
    }, duration);
  }, [duration, i]);

  return (
    <h1
      className={cn(
        'text-center font-display tracking-[-0.02em] drop-shadow-sm',
        className,
      )}
    >
      {displayedText ? displayedText : ''}
    </h1>
  );
}
