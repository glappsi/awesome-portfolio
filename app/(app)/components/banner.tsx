/* eslint-disable @next/next/no-img-element */
"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RainbowButton } from '../../../components/ui/rainbow-button';
import { cn } from '../../../lib/utils';

type Props = {
  url?: string;
  className?: string;
}

export function Banner({
  url,
  className
}: Props) {
  const t = useTranslations('Banner');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 5000);
  }, []);

  return (
    <div className={cn("transition-[top] absolute top-0 w-full border-b border-zinc-800 text-zinc-100", {
      '!absolute top-[-60px]': !isVisible
    }, className)}>
      <div className="container mx-auto flex items-center justify-between px-6 py-2">
        <b className="text-sm">{t('title')}</b>

        {!!url && <Link className='flex shrink-0' href={url} target='_blank'>
          <RainbowButton className='h-[30px] px-[20px]'>{t('cta')}</RainbowButton>
        </Link>}

        <a
          href="https://www.buymeacoffee.com/glapps"
          target="_blank"
          className='shrink-0'>
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            style={{ height: 35, width: 126.6 }} />
        </a>
      </div>
    </div>
  )
}