'use client';

import { Tool } from '@/actions/entities/models/tool';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import clsx from 'clsx';
import devicons from 'devicon/devicon.json';
import 'devicon/devicon.min.css';
import { filter, find, map } from 'lodash';
import { useState } from 'react';

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

export function getVersion(name: string, props: Pick<Props, 'withWordmark'>) {
  const icon = find(devicons, d => d.name === name);
  if (!icon) {
    return;
  }

  const hasPlain = icon.versions?.font?.some(f => f.includes(`plain${props.withWordmark ? '-wordmark' : ''}`));
  if (hasPlain) {
    return 'plain';
  }

  const hasOriginal = icon!.versions?.font?.some(f => f.includes(`original${props.withWordmark ? '-wordmark' : ''}`));
  if (hasOriginal) {
    return 'original';
  }
}

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
  const icons = filter(map(tools, (t) => ({
    name: t.name,
    displayName: t.displayName,
    version: getVersion(t.name, {
      withWordmark
    })
  })), i => !!i.version);

  if (withTooltips) {
    return (
      <TooltipProvider>
        {icons.map((i, index) => (
          <Tooltip
            key={i.name}
            open={openTooltip === i.name}
            onOpenChange={(isOpen) => {
              if (isOpen) {
                setOpenTooltip(i.name);
                return;
              }

              if (!isOpen && openTooltip === i.name) {
                setOpenTooltip(undefined);
              }
            }}
          >
            <TooltipTrigger asChild>
              <i
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setOpenTooltip(i.name);
                  return false;
                }}
                className={clsx(
                  {
                    [`devicon-${i.name}-${i.version}`]: !withWordmark,
                    [`devicon-${i.name}-${i.version} devicon-${i.name}-${i.version}-wordmark`]:
                      withWordmark,
                    'text-6xl': size === 'xl',
                    'text-3xl': size !== 'xl',
                    'rounded-sm border bg-zinc-800 p-2': asCard,
                    'cursor-pointer hover:border-primary': !!onClick,
                    'border-primary !bg-zinc-700': value === i.name,
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
              <p>{i.displayName || i.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    );
  }

  return icons.map((i) => (
    <i
      onClick={onClick ? () => onClick?.(i.name) : undefined}
      key={i.name}
      className={clsx(
        {
          [`devicon-${i.name}-${i.version}`]: !withWordmark,
          [`devicon-${i.name}-${i.version} devicon-${i.name}-${i.version}-wordmark`]: withWordmark,
          'text-6xl': size === 'xl',
          'text-3xl': size !== 'xl',
          'cursor-pointer hover:border-primary': !!onClick,
          'rounded-sm border bg-zinc-800 p-2': asCard,
          'border-primary !bg-zinc-700': value === i.name,
          colored: variant === 'colored',
        },
        className,
      )}
    />
  ));
};
