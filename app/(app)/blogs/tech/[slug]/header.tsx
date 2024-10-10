import { BlogWithDetails } from '@/actions/entities/models/blog';
import { Icon } from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type Props = {
  blog?: BlogWithDetails;
  hideBorder?: boolean;
};
export const Header: React.FC<Props> = ({ blog, hideBorder }) => {
  return (
    <header
      className={cn(
        'relative isolate overflow-hidden border-b-8 bg-gradient-to-tl from-black via-zinc-900 to-black pt-[calc(var(--navbar-height)/2)] md:pt-0',
        {
          'md:border-b-0': hideBorder,
        },
      )}
    >
      <div className='container relative isolate mx-auto overflow-hidden py-24 md:py-32'>
        <div className='mx-auto flex max-w-7xl flex-col items-center px-6 text-center lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            {!!blog ? (
              <h1 className='font-display text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                {blog.title}
              </h1>
            ) : (
              <Skeleton className='h-[120px] w-[500px] max-w-full rounded' />
            )}
            {!!blog ? (
              !!blog.summary && (
                <p className='mt-6 text-lg leading-8 text-zinc-300'>
                  {blog.summary}
                </p>
              )
            ) : (
              <Skeleton className='h-[128px] w-[600px] max-w-full rounded' />
            )}
          </div>

          {!!blog && !!blog.links?.length && (
            <div className='mx-auto mt-6 max-w-2xl lg:mx-0 lg:max-w-none'>
              <div className='grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'>
                {blog.links.map((link) =>
                  link.link ? (
                    <Link
                      className="flex items-center gap-2"
                      target='_blank'
                      key={link.title}
                      href={link.link}>
                      <Icon type={link.icon} className='shrink-0 size-4' /> {link.title}{' '}
                      <span aria-hidden='true'>&rarr;</span>
                    </Link>
                  ) : (
                    <Link
                      className="flex items-center gap-2"
                      target='_blank'
                      key={link.title}
                      href={link.download!.url}
                      download={link.download!.filename}
                    >
                      <Icon type={link.icon} className='shrink-0 size-4' /> {link.title}{' '}
                      <span aria-hidden='true'>&darr;</span>
                    </Link>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
