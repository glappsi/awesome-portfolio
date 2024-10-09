'use client';
import { createMessage } from '@/actions';
import { Link as TLink } from '@/actions/entities/models/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dock, DockIcon } from '@/components/ui/dock';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ArchiveIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
import { filter } from 'lodash';
import { ArrowLeft, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { ContactButton } from './contact-form';

const DATA = {
  navbar: (profileSlug: string) => [
    { href: '/', icon: HomeIcon, label: 'home' },
    { href: `/profiles/${profileSlug}`, icon: PersonIcon, label: 'profile' },
    { href: '/projects', icon: ArchiveIcon, label: 'projects' },
  ],
};

export type NavigationProps = {
  profileSlug: string;
  links: Array<TLink>;
  closable?: boolean;
};

export const NavigationDock: React.FC<NavigationProps> = ({
  profileSlug,
  links,
}) => {
  const t = useTranslations('Navigation');
  const redirects = filter(
    links,
    (l) => !!l.link && l.showInNavigation,
  ) as TLink[];
  const downloads = filter(
    links,
    (l) => !!l.download && l.showInNavigation,
  ) as TLink[];

  return (
    <TooltipProvider>
      <Dock direction='middle'>
        {DATA.navbar(profileSlug).map((item) => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  aria-label={t(item.label)}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'size-12 min-w-min md:px-3 rounded-full',
                  )}
                >
                  <item.icon className='shrink-0 size-4 md:mr-2' />
                  <span className="hidden md:block">{t(item.label)}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className='md:hidden'>
                <p>{t(item.label)}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation='vertical' className='h-full' />
        {redirects.map(({ link, title, icon, isExternal, hideOnMobile }) => (
          <DockIcon
            key={title}
            className={cn({
              'hidden md:flex': hideOnMobile,
            })}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={link!}
                  target={isExternal ? '_blank' : '_self'}
                  aria-label={title}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'size-12 rounded-full',
                  )}
                >
                  <Icon type={icon} className='size-4' />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <DockIcon className='hidden md:flex'>
          <Tooltip>
            <TooltipTrigger asChild>
              <ContactButton
                className='max-w-full size-12 rounded-full'
                onSubmit={createMessage}
                iconOnly
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('contact')}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <Separator style={downloads?.length ? {} : { display: 'none' }} orientation='vertical' className='h-full' />
        {downloads.map(({ download, hideOnMobile, title, icon, symbol }) => (
          <DockIcon
            key={title}
            className={cn({
              'hidden md:flex': hideOnMobile,
            })}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={download!.url}
                  download={download!.filename}
                  target='_blank'
                  aria-label={title}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'size-12 min-w-min md:px-3 rounded-full',
                  )}
                >
                  {symbol ? symbol : <Icon type={icon} className='size-4' />}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </TooltipProvider>
  );
};

export const Navigation: React.FC<NavigationProps> = (props) => {
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur duration-200 ${isIntersecting
          ? 'border-transparent bg-zinc-900/0'
          : 'bg-zinc-900/500 border-zinc-800'
          }`}
      >
        <div className={cn('container mx-auto flex items-center justify-between p-6', {
          'flex-row-reverse': !props.closable
        })}>
          <div className='flex justify-between gap-8'>
            <NavigationDock {...props} />
          </div>

          {props.closable
            ? <Button variant="ghost" onClick={() => window.close()}>
              <X className='size-6' />
            </Button>
            : <Link
              href='#'
              onClick={async () => {
                await scrollToTop();
                router.back();
              }}
              className='text-zinc-300 duration-200 hover:text-zinc-100'
            >
              <ArrowLeft className='size-6' />
            </Link>}
        </div>
      </div>
    </header>
  );
};

function scrollToTop() {
  return new Promise((resolve) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Listen for the scroll event to detect when scrolling stops
    const checkIfScrollingStopped = () => {
      // If user has scrolled to the top, resolve the promise
      if (window.scrollY === 0) {
        window.removeEventListener('scroll', checkIfScrollingStopped);
        resolve({});
      }
    };

    // Add a scroll event listener to check when scrolling ends
    window.addEventListener('scroll', checkIfScrollingStopped);
    checkIfScrollingStopped();
  });
}
