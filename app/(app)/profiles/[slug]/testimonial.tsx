"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { Testimonial } from '@/actions/entities/models/testimonial'
import { useEffect, useState } from 'react';
import { findIndex } from 'lodash';
import TypingAnimation from '@/components/ui/typing-animation';

type Props = {
  testimonials: Array<Testimonial>;
}

export default function TestimonialShuffle({ testimonials }: Props) {
  const [currentTestimonial, setTestimonial] = useState(testimonials[0]);
  const [currentquote, setQuote] = useState<string | undefined>(testimonials[0].quote);
  const { quote, author, avatar, description } = currentTestimonial;

  useEffect(() => {
    const interval = setTimeout(() => {
      const currentIndex = findIndex(testimonials, currentTestimonial);
      // if (currentIndex === (testimonials.length - 1)) {
      //   return;
      // }
      // const nextIndex = currentIndex + 1;
      const nextIndex = currentIndex === (testimonials.length - 1) ? 0 : currentIndex + 1;
      setTestimonial(testimonials[nextIndex]);
      setQuote(undefined);
      setTimeout(() => {
        setQuote(testimonials[nextIndex].quote);
      }, 800);
    }, 10000);

    return () =>  {
      clearTimeout(interval);
    }
  }, [currentTestimonial]);

  return (
    <>
      <Quote className="w-10 h-10 text-primary mb-4" />
      <blockquote className="mb-4">
        {!!currentquote && <TypingAnimation
          className="italic text-zinc-100 hidden lg:block"
          text={currentquote}
          duration={25}
        />}
        <span className="italic text-zinc-100 lg:hidden">{quote}</span>
      </blockquote>
      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={avatar?.url} alt={avatar?.alt || author} />
          <AvatarFallback>{author.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <cite className="font-semibold text-zinc-100 not-italic">{author}</cite>
          <p className="text-zinc-400">{description}</p>
        </div>
      </div>
    </>
  )
}