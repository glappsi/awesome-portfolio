'use client';

import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Project } from '@/actions/entities/models/project';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import { Devicons } from '../components/devicons';

type Props = {
  project: Project;
  views?: number;
  isHighlight?: boolean;
};

export const Article: React.FC<Props> = ({ project, isHighlight, views }) => {
  const t = useTranslations('ProjectsPage');

  return (
    <div className='p-4 md:p-8'>
      <div className='flex items-center justify-between gap-2'>
        <span className='drop-shadow-orange text-xs text-zinc-200 duration-1000 group-hover:border-zinc-200 group-hover:text-white'>
          {project.start ? (
            <time dateTime={new Date(project.start).toISOString()}>
              {Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
                new Date(project.start),
              )}
            </time>
          ) : (
            <span>{t('soon')}</span>
          )}
          <span>&nbsp;-&nbsp;</span>
          {project.end ? (
            <time dateTime={new Date(project.end).toISOString()}>
              {Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
                new Date(project.end),
              )}
            </time>
          ) : (
            <span>{t('today')}</span>
          )}
        </span>
        {views !== undefined && (
          <span className='flex items-center gap-1 text-xs text-zinc-500'>
            <Eye className='size-4' />{' '}
            {Intl.NumberFormat('en-US', { notation: 'compact' }).format(views)}
          </span>
        )}
      </div>
      <h2 className='z-20 font-display text-xl font-medium text-zinc-200 duration-1000 group-hover:text-white lg:text-3xl'>
        {project.title}
      </h2>
      <p
        className={clsx(
          'z-20 mt-4 overflow-hidden text-ellipsis text-sm leading-6 text-zinc-400 duration-1000 group-hover:text-zinc-200',
          {
            'line-clamp-3 max-h-[72px]': !isHighlight,
          },
        )}
      >
        {project.description}
      </p>
      {isHighlight && (
        <>
          <div className='mt-4 flex flex-col gap-4 rounded-sm bg-zinc-900 p-4'>
            <div aria-label={t('tools')} className='flex flex-wrap gap-2'>
              <Devicons
                tools={project.tools}
                variant='colored'
                withTooltips
                asCard
              />
            </div>

            <div aria-label={t('categories')} className='flex flex-wrap gap-2'>
              {project.categories.map((c) => (
                <Badge key={c.name} variant='outline'>
                  #{c.displayName}
                </Badge>
              ))}
            </div>
          </div>

          {!!project.blog && (
            <div className='flex justify-end'>
              <Link href={`/blogs/${project.blog?.type}/${project.blog?.slug}`}>
                <Button className='mt-8' variant='secondary'>
                  {t('readMore')}&nbsp;<span aria-hidden='true'>&rarr;</span>
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};
