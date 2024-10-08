"use client";
import clsx from 'clsx';
import {
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";

import React, { MouseEventHandler, PropsWithChildren, useState } from "react";
import ShimmerButton from '@/components/ui/shimmer-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ShineBorder from '@/components/ui/shine-border';

export const CardBorder: React.FC<PropsWithChildren & { className?: string, children?: React.ReactNode, isFullscreen?: boolean, onMouseMove?: MouseEventHandler, onClick?: () => void }> = ({ children, className, onClick, onMouseMove, isFullscreen }) => {
  return (
    <div
      onMouseMove={onMouseMove}
      onClick={onClick}
      className={clsx(className, 'relative duration-700 rounded-xl hover:bg-zinc-800/10 group md:gap-8', {
        'border hover:border-zinc-400/50 border-zinc-600': !isFullscreen,
        'md:border hover:border-zinc-400/50 border-zinc-600': !!isFullscreen,
      })}
    >
      {children}
    </div>
  )
}

export const Card: React.FC<PropsWithChildren & { className?: string, background?: React.ReactNode, badge?: React.ReactNode, badgeTooltip?: React.ReactNode, badgeLight?: boolean, isFullscreen?: boolean, isHighlight?: boolean, onClick?: () => void }> = ({ children, className, background, badge, badgeTooltip, badgeLight, isFullscreen, isHighlight, onClick }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  const [badgeTooltipOpen, setIsBadgeTooltipOpen] = useState(false);

  const onMouseMove: MouseEventHandler = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  const BorderComponent = isHighlight ? ShineBorder : CardBorder;

  return (
    <BorderComponent
      color="white"
      isFullscreen={isFullscreen}
      onMouseMove={onMouseMove}
      onClick={onClick}
      className={className}>
      {!!background && <div className="opacity-25 absolute top-0 left-0 right-0 bottom-0 z-[-1]">{background}</div>}
      {!!badge && (
        <TooltipProvider>
          <Tooltip
            open={badgeTooltipOpen}
            onOpenChange={setIsBadgeTooltipOpen}>
            <TooltipTrigger className="absolute max-h-[45px] top-[-22.5px] right-5 z-1">
              <ShimmerButton
                className="max-h-[45px]"
                background={badgeLight ? 'rgba(255, 255, 255, 1)' : undefined}
                shimmerColor={badgeLight ? '#000000' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setIsBadgeTooltipOpen(true);
                  return false;
                }}>{badge}</ShimmerButton>
            </TooltipTrigger>
            <TooltipContent>
              {badgeTooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>)}
      <div className={clsx("rounded-xl overflow-hidden pointer-events-none", {
        'hidden md:block': !!isFullscreen
      })}>
        <div className="absolute rounded-xl inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute rounded-xl inset-0 z-10  bg-gradient-to-br opacity-100  via-zinc-100/10  transition duration-1000 group-hover:opacity-50 "
          style={style}
        />
        <motion.div
          className="absolute rounded-xl inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
      </div>

      <article className="rounded-xl overflow-hidden">
        {children}
      </article>
    </BorderComponent>
  );
};

export const CardHeadline: React.FC<PropsWithChildren & { className?: string }> = ({ children, className }) => {
  return (<h2
    className={clsx('mb-4 md:mb-8 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display', className)}
  >
    {children}
  </h2>);
}

export const CardSubHeadline: React.FC<PropsWithChildren & { className?: string }> = ({ children, className }) => {
  return (<h3
    className={clsx('mb-2 md:mb-4 text-lg font-bold text-zinc-100 group-hover:text-white sm:text-xl font-display', className)}
  >
    {children}
  </h3>);
}

export const CardDescription: React.FC<PropsWithChildren & { className?: string }> = ({ children, className }) => {
  return (<p className={clsx('mb-2 md:mb-4 mt-[-1rem] leading-6 duration-150 text-zinc-400 group-hover:text-zinc-300', className)}>
    {children}
  </p>);
}