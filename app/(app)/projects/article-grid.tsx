"use client";

import Image from "next/image"
import { Project } from '@/actions/entities/models/project';
import { Card } from '../components/card';
import { useState } from 'react';
import { Article } from './article';
import { filter, indexOf, some } from 'lodash';
import { useArticleFilterStore } from './article-filter';
import { Tool } from '../../../actions/entities/models/tool';

type Props = {
  projects: Array<Project>;
  views: Record<string, number>;
}

export const ArticleGrid: React.FC<Props> = ({ projects, views }) => {
  const [highlightId, setHighlightId] = useState(0);
  const selection = useArticleFilterStore((state) => state.selection);

  const filteredProjects = filter(projects, p => !selection || some(p.tools, (t: Tool) => t.name === selection));
  const evenIndexed = filter(filteredProjects, (p: Project, index: number) => index % 2 === 0);
  const oddIndexed = filter(filteredProjects, (p: Project, index: number) => index % 2 !== 0);

  return (
    <>
    <div className="hidden lg:grid grid-cols-2 gap-8 mx-auto">
      <div className="flex flex-col gap-8">
        {(evenIndexed as Array<Project>).map((project) => (
          <Card 
            onClick={() => setHighlightId(indexOf(projects, project))}
            badge={!!project.badge && <Image
              src={project.badge!.url}
              alt={project.badge!.alt}
              height={30}
              width={30 * (project.badge!.width / project.badge!.height)}
            />}
            badgeTooltip={!!project.badge && project.badge!.alt}
            badgeLight={!!project.badge && !!project.badge!.needsLightBackground}>
            <Article
              project={project}
              views={views[project.id]}
              isHighlight={highlightId === indexOf(projects, project)} />
          </Card>
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {(oddIndexed as Array<Project>).map((project) => (
          <Card 
            onClick={() => setHighlightId(indexOf(projects, project))}
            badge={!!project.badge && <Image
              src={project.badge!.url}
              alt={project.badge!.alt}
              height={30}
              width={30 * (project.badge!.width / project.badge!.height)}
            />}
            badgeTooltip={!!project.badge && project.badge!.alt}
            badgeLight={!!project.badge && !!project.badge!.needsLightBackground}>
            <Article
              project={project}
              views={views[project.id]}
              isHighlight={highlightId === indexOf(projects, project)} />
          </Card>
        ))}
      </div>
    </div>
    <div className="lg:hidden flex gap-8 flex-wrap mx-auto">
      {filteredProjects.map((project) => (
        <Card 
          onClick={() => setHighlightId(indexOf(projects, project))}
          badge={!!project.badge && <Image
            src={project.badge!.url}
            alt={project.badge!.alt}
            height={30}
            width={30 * (project.badge!.width / project.badge!.height)}
          />}
          badgeTooltip={!!project.badge && project.badge!.alt}
          badgeLight={!!project.badge && !!project.badge!.needsLightBackground}>
          <Article
            project={project}
            views={views[project.id]}
            isHighlight={highlightId === indexOf(projects, project)} />
        </Card>
      ))}
    </div>
    </>
  );
}