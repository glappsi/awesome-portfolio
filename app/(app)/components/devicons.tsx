'use client';

import 'devicon/devicon.min.css';
import clsx from 'clsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { Tool } from '@/actions/entities/models/tool';
import { filter, map, uniqBy } from 'lodash';

type Props = {
  tools: Tool[];
  withTooltips?: boolean;
  variant?: 'gray' | 'colored';
  withWordmark?: boolean;
  asCard?: boolean;
  className?: string;
  size?: 'defautl' | 'xl';
  onClick?: (name: string) => void;
  value?: string;
};

export const Devicons: React.FC<Props> = ({
  tools,
  withTooltips,
  variant,
  withWordmark,
  asCard,
  className,
  size,
  value,
  onClick,
}) => {
  const [openTooltip, setOpenTooltip] = useState<string>();
  const supportedTools = uniqBy(
    filter(tools, (t) => !t.noIcon),
    (t) => t.name,
  );
  const icons = map(supportedTools, (t) => t.name);
  const tooltips = map(supportedTools, (t) => t.displayName);

  if (tooltips?.length && withTooltips) {
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
            }}
          >
            <TooltipTrigger asChild>
              <i
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setOpenTooltip(i);
                  return false;
                }}
                className={clsx(
                  {
                    [`devicon-${i}-plain`]: !withWordmark,
                    [`devicon-${i}-plain devicon-${i}-plain-wordmark`]:
                      withWordmark,
                    'text-6xl': size === 'xl',
                    'text-3xl': size !== 'xl',
                    'rounded-sm border bg-zinc-800 p-2': asCard,
                    'cursor-pointer hover:border-primary': !!onClick,
                    'border-primary !bg-zinc-700': value === i,
                    colored: variant === 'colored',
                  },
                  className,
                )}
              />
            </TooltipTrigger>
            <TooltipContent
              side={
                index < icons.length - 2 || icons.length < 2 ? 'right' : 'left'
              }
            >
              <p>{tooltips[index]}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    );
  }

  return icons.map((i) => (
    <i
      onClick={onClick ? () => onClick?.(i) : undefined}
      key={i}
      className={clsx(
        {
          [`devicon-${i}-plain`]: !withWordmark,
          [`devicon-${i}-plain devicon-${i}-plain-wordmark`]: withWordmark,
          'text-6xl': size === 'xl',
          'text-3xl': size !== 'xl',
          'cursor-pointer hover:border-primary': !!onClick,
          'rounded-sm border bg-zinc-800 p-2': asCard,
          'border-primary !bg-zinc-700': value === i,
          colored: variant === 'colored',
        },
        className,
      )}
    />
  ));
};
