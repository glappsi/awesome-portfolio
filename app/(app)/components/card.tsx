'use client';
import clsx from 'clsx';
import { motion, useMotionTemplate, useSpring } from 'framer-motion';

import ShimmerButton from '@/components/ui/shimmer-button';
import ShineBorder from '@/components/ui/shine-border';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React, { MouseEventHandler, PropsWithChildren, useState } from 'react';

export const CardBorder: React.FC<
  PropsWithChildren & {
    className?: string;
    children?: React.ReactNode;
    isFullscreen?: boolean;
    onMouseMove?: MouseEventHandler;
    onClick?: () => void;
  }
> = ({ children, className, onClick, onMouseMove, isFullscreen }) => {
  return (
    <div
      onMouseMove={onMouseMove}
      onClick={onClick}
      className={clsx(
        className,
        'group relative rounded-xl duration-700 hover:bg-zinc-800/10 md:gap-8',
        {
          'border border-zinc-600 hover:border-zinc-400/50': !isFullscreen,
          'border-zinc-600 hover:border-zinc-400/50 lg:border': !!isFullscreen,
        },
      )}
    >
      {children}
    </div>
  );
};

export const Card: React.FC<
  PropsWithChildren & {
    className?: string;
    background?: React.ReactNode;
    badge?: React.ReactNode;
    badgeTooltip?: React.ReactNode;
    badgeLight?: boolean;
    isFullscreen?: boolean;
    isHighlight?: boolean;
    onClick?: () => void;
  }
> = ({
  children,
  className,
  background,
  badge,
  badgeTooltip,
  badgeLight,
  isFullscreen,
  isHighlight,
  onClick,
}) => {
    const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
    const [badgeTooltipOpen, setIsBadgeTooltipOpen] = useState(false);

    const onMouseMove: MouseEventHandler = ({
      currentTarget,
      clientX,
      clientY,
    }) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    const BorderComponent = isHighlight ? ShineBorder : CardBorder;

    return (
      <BorderComponent
        color='white'
        isFullscreen={isFullscreen}
        onMouseMove={onMouseMove}
        onClick={onClick}
        className={className}
      >
        {!!background && (
          <div className='absolute inset-0 z-[-1] opacity-25'>{background}</div>
        )}
        {!!badge && (
          <TooltipProvider>
            <Tooltip open={badgeTooltipOpen} onOpenChange={setIsBadgeTooltipOpen}>
              <TooltipTrigger className='z-1 absolute right-5 top-[-22.5px] max-h-[45px]'>
                <ShimmerButton
                  className='max-h-[45px]'
                  background={badgeLight ? 'rgba(255, 255, 255, 1)' : undefined}
                  shimmerColor={badgeLight ? '#000000' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setIsBadgeTooltipOpen(true);
                    return false;
                  }}
                >
                  {badge}
                </ShimmerButton>
              </TooltipTrigger>
              <TooltipContent>{badgeTooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <div
          className={clsx('pointer-events-none overflow-hidden rounded-xl', {
            'hidden md:block': !!isFullscreen,
          })}
        >
          <div className='absolute inset-0 z-0 rounded-xl transition duration-1000 [mask-image:linear-gradient(black,transparent)]' />
          <motion.div
            className='absolute inset-0 z-10 rounded-xl bg-gradient-to-br via-zinc-100/10 opacity-100 transition duration-1000 group-hover:opacity-50'
            style={style}
          />
          <motion.div
            className='absolute inset-0 z-10 rounded-xl opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100'
            style={style}
          />
        </div>

        <article className={cn('overflow-hidden rounded-xl', {
          'relative': isHighlight
        })}>{children}</article>
      </BorderComponent>
    );
  };

export const CardHeadline: React.FC<
  PropsWithChildren & { className?: string }
> = ({ children, className }) => {
  return (
    <h2
      className={clsx(
        'mb-4 font-display text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl md:mb-8',
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const CardSubHeadline: React.FC<
  PropsWithChildren & { className?: string }
> = ({ children, className }) => {
  return (
    <h3
      className={clsx(
        'mb-2 font-display text-lg font-bold text-zinc-100 group-hover:text-white sm:text-xl md:mb-4',
        className,
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<
  PropsWithChildren & { className?: string }
> = ({ children, className }) => {
  return (
    <p
      className={clsx(
        'mb-2 leading-6 text-zinc-400 duration-150 group-hover:text-zinc-300 md:mb-4',
        className,
      )}
    >
      {children}
    </p>
  );
};
