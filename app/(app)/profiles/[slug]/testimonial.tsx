'use client';

import { Testimonial } from '@/actions/entities/models/testimonial';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TypingAnimation from '@/components/ui/typing-animation';
import { findIndex } from 'lodash';
import { Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  testimonials: Array<Testimonial>;
};

export default function TestimonialShuffle({ testimonials }: Props) {
  const [currentTestimonial, setTestimonial] = useState(testimonials[0]);
  const [currentquote, setQuote] = useState<string | undefined>(
    testimonials[0].quote,
  );
  const { quote, author, avatar, description } = currentTestimonial;

  const blockquoteRef = useRef<HTMLQuoteElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('auto');
  useEffect(() => {
    const interval = setTimeout(() => {
      const currentIndex = findIndex(testimonials, currentTestimonial);
      // if (currentIndex === (testimonials.length - 1)) {
      //   return;
      // }
      // const nextIndex = currentIndex + 1;
      const nextIndex =
        currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
      setTestimonial(testimonials[nextIndex]);
      setQuote(undefined);
      setTimeout(() => {
        setQuote(testimonials[nextIndex].quote);
      }, 800);
    }, 10000);

    return () => {
      clearTimeout(interval);
    };
  }, [currentTestimonial]);

  useEffect(() => {
    if (!contentRef.current || !blockquoteRef.current) {
      return;
    }

    const blockquote = blockquoteRef.current;
    const content = contentRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (blockquote && content) {
        // Adjust the blockquote's height to the content's scrollHeight
        setHeight(`${content.scrollHeight}px`);
      }
    });

    // Start observing the content
    if (content) {
      resizeObserver.observe(content);
    }

    // Clean up observer on component unmount
    return () => {
      if (content) {
        resizeObserver.unobserve(content);
      }
    };
  }, []);

  return (
    <>
      <Quote className='mb-4 size-10 text-primary' />
      <blockquote ref={blockquoteRef} style={{ height }} className='transition-[height] mb-4'>
        <div ref={contentRef}>
          {!!currentquote && (
            <TypingAnimation
              className='hidden lg:block italic text-zinc-100'
              text={currentquote}
              duration={25}
            />
          )}
          <span className='italic text-zinc-100 lg:hidden'>{quote}</span>
        </div>
      </blockquote>
      <div className='flex items-center'>
        <Avatar className='mr-4 size-12'>
          <AvatarImage src={avatar?.url} alt={avatar?.alt || author} />
          <AvatarFallback>
            {author
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <cite className='font-semibold not-italic text-zinc-100'>
            {author}
          </cite>
          <p className='text-zinc-400'>{description}</p>
        </div>
      </div>
    </>
  );
}
