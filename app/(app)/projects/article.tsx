"use client";

import Link from "next/link";
import { Eye, View } from "lucide-react";
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
    <div className="p-4 md:p-8">
      <div className="flex justify-between gap-2 items-center">
        <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
          {project.start ? (
            <time dateTime={new Date(project.start).toISOString()}>
              {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                new Date(project.start),
              )}
            </time>
          ) : (
            <span>{t('soon')}</span>
          )}
          <span>&nbsp;-&nbsp;</span>
          {project.end ? (
            <time dateTime={new Date(project.end).toISOString()}>
              {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                new Date(project.end),
              )}
            </time>
          ) : (
            <span>{t('today')}</span>
          )}
        </span>
        {views !== undefined && <span className="text-zinc-500 text-xs  flex items-center gap-1">
          <Eye className="w-4 h-4" />{" "}
          {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
        </span>}
      </div>
      <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
        {project.title}
      </h2>
      <p className={clsx("text-ellipsis overflow-hidden z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200 leading-6", {
        'max-h-[72px] line-clamp-3': !isHighlight
      })}>
        {project.description}
      </p>
      {isHighlight && (<>
        <div className="flex flex-col gap-4 mt-4 p-4 bg-zinc-900 rounded-sm">
          <div aria-label={t('tools')} className="flex flex-wrap gap-2">
            <Devicons
              tools={project.tools}
              variant="colored"
              withTooltips
              asCard />
          </div>

          <div aria-label={t('categories')} className="flex flex-wrap gap-2">
            {project.categories.map((c) => (
              <Badge variant="outline">#{c.displayName}</Badge>
            ))}
          </div>
        </div>

        {!!project.blog && (<div className="flex justify-end">
          <Link href={project.blog?.slug ? `/blogs/${project.blog?.slug}` : '#'}>
            <Button className='mt-8' variant="secondary">
              {t('readMore')}&nbsp;<span aria-hidden="true">&rarr;</span>
            </Button>
          </Link>
        </div>)}
      </>)}
    </div>
  );
};
