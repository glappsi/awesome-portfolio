'use client';

import { Project } from '@/actions/entities/models/project';
import { filter, indexOf, some } from 'lodash';
import { useState } from 'react';
import { Tool } from '../../../actions/entities/models/tool';
import { Card } from '../components/card';
import { ResponsiveImage } from '../components/responsive-image';
import { Article } from './article';
import { useArticleFilterStore } from './article-filter';

type Props = {
  projects: Array<Project>;
  views: Record<string, number>;
  isHighlight?: boolean;
};

export const ArticleGrid: React.FC<Props> = ({
  projects,
  views,
  isHighlight,
}) => {
  const [highlightId, setHighlightId] = useState(0);
  const selection = useArticleFilterStore((state) => state.selection);

  const filteredProjects = filter(
    projects,
    (p) => !selection || some(p.tools, (t: Tool) => t.name === selection),
  );
  const evenIndexed = filter(
    filteredProjects,
    (p: Project, index: number) => index % 2 === 0,
  ) as Array<Project>;
  const oddIndexed = filter(
    filteredProjects,
    (p: Project, index: number) => index % 2 !== 0,
  ) as Array<Project>;

  return (
    <>
      <div className='mx-auto hidden grid-cols-2 gap-8 lg:grid'>
        <div className='flex flex-col gap-8'>
          {evenIndexed.map((project) => (
            <Card
              key={project.id}
              isHighlight={isHighlight && indexOf(projects, project) === 0}
              isSelected={highlightId === indexOf(projects, project)}
              onClick={() => setHighlightId(indexOf(projects, project))}
              badge={
                !!project.badge && (
                  <ResponsiveImage
                    media={project.badge!}
                    height={30}
                    width={30 * (project.badge!.width / project.badge!.height)}
                  />
                )
              }
              badgeTooltip={!!project.badge && project.badge!.alt}
              badgeLight={
                !!project.badge && !!project.badge!.needsLightBackground
              }
            >
              <Article
                project={project}
                views={project.blog ? views[project.blog!.slug] : undefined}
                isHighlight={highlightId === indexOf(projects, project)}
              />
            </Card>
          ))}
        </div>
        <div className='flex flex-col gap-8'>
          {oddIndexed.map((project) => (
            <Card
              key={project.id}
              onClick={() => setHighlightId(indexOf(projects, project))}
              isSelected={highlightId === indexOf(projects, project)}
              badge={
                !!project.badge && (
                  <ResponsiveImage
                    media={project.badge!}
                    height={30}
                    width={30 * (project.badge!.width / project.badge!.height)}
                  />
                )
              }
              badgeTooltip={!!project.badge && project.badge!.alt}
              badgeLight={
                !!project.badge && !!project.badge!.needsLightBackground
              }
            >
              <Article
                project={project}
                views={project.blog ? views[project.blog!.slug] : undefined}
                isHighlight={highlightId === indexOf(projects, project)}
              />
            </Card>
          ))}
        </div>
      </div>
      <div className='mx-auto flex flex-wrap gap-8 lg:hidden'>
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            isHighlight={isHighlight && indexOf(projects, project) === 0}
            onClick={() => setHighlightId(indexOf(projects, project))}
            isSelected={highlightId === indexOf(projects, project)}
            badge={
              !!project.badge && (
                <ResponsiveImage
                  media={project.badge!}
                  height={30}
                  width={30 * (project.badge!.width / project.badge!.height)}
                />
              )
            }
            badgeTooltip={!!project.badge && project.badge!.alt}
            badgeLight={
              !!project.badge && !!project.badge!.needsLightBackground
            }
          >
            <Article
              project={project}
              views={project.blog ? views[project.blog!.slug] : undefined}
              isHighlight={highlightId === indexOf(projects, project)}
            />
          </Card>
        ))}
      </div>
    </>
  );
};
