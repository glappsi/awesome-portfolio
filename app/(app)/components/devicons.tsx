"use client";

import 'devicon/devicon.min.css';
import clsx from 'clsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

type Props = {
  icons: string[];
  tooltips?: string[];
  variant?: 'gray' | 'colored';
  withWordmark?: boolean;
  asCard?: boolean;
  className?: string;
  size?: 'defautl' | 'xl';
  onClick?: (name: string) => void;
  value?: string;
}

export const Devicons: React.FC<Props> = ({ icons, tooltips, variant, withWordmark, asCard, className, size, value, onClick }) => {
  const [openTooltip, setOpenTooltip] = useState<string>();

  if (tooltips?.length) {
    return (
      <TooltipProvider>
        {icons.map((i, index) => (
            <Tooltip 
              key={i}
              open={openTooltip === i}
              onOpenChange={(isOpen) => {
                if (isOpen) {
                  setOpenTooltip(i);
                  return;
                }

                if (!isOpen && openTooltip === i) {
                  setOpenTooltip(undefined);
                }
              }}>
              <TooltipTrigger asChild>
                <i
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
    
                    setOpenTooltip(i);
                    return false;
                  }}
                  className={clsx({
                    [`devicon-${i}-plain`]: !withWordmark,
                    [`devicon-${i}-plain devicon-${i}-plain-wordmark`]: withWordmark,
                    'text-6xl': size === 'xl',
                    'text-3xl': size !== 'xl',
                    'p-2 border rounded-sm bg-zinc-800': asCard,
                    'hover:border-primary cursor-pointer': !!onClick,
                    'border-primary !bg-zinc-700': value === i,
                    'colored': variant === 'colored'
                  }, className)}
                />
              </TooltipTrigger>
              <TooltipContent side={(index < (icons.length - 2) || icons.length < 2) ? 'right': 'left'}>
                <p>{tooltips[index]}</p>
              </TooltipContent>
            </Tooltip>
        ))}
      </TooltipProvider>
    )
  }

  return icons.map((i) => (<i
    onClick={onClick ? () => onClick?.(i) : undefined}
    key={i}
    className={clsx({
      [`devicon-${i}-plain`]: !withWordmark,
      [`devicon-${i}-plain devicon-${i}-plain-wordmark`]: withWordmark,
      'text-6xl': size === 'xl',
      'text-3xl': size !== 'xl',
      'hover:border-primary cursor-pointer': !!onClick,
      'p-2 border rounded-sm bg-zinc-800': asCard,
      'border-primary !bg-zinc-700': value === i,
      'colored': variant === 'colored'
    }, className)}
  />));
}