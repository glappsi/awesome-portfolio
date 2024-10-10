import { getActiveProfile, getLinks, getPageViews, getProjects } from '@/actions';
import { Blog } from '@/actions/entities/models/blog';
import { Project } from '@/actions/entities/models/project';
import { countBy, filter, map, orderBy, uniqBy } from 'lodash';
import { getTranslations } from 'next-intl/server';
import { Navigation } from '../components/nav';
import { ArticleToolFilter } from './article-filter';
import { ArticleGrid } from './article-grid';

export const revalidate = 60;

export const dynamic = 'force-static';

export default async function ProjectsPage() {
  const t = await getTranslations('ProjectsPage');
  const profilePromise = getActiveProfile();
  const linksPromise = getLinks();
  const allProjectsPromise = getProjects();

  const [allProjects, profile, links] = await Promise.all([
    allProjectsPromise,
    profilePromise,
    linksPromise,
  ]);

  const blogs = filter(map(allProjects, (p) => p.blog)) as Array<Blog>;
  const views = await getPageViews(blogs);

  const publishedProjects = filter(
    allProjects,
    (p: Project) => p.published,
  ) as Project[];
  const highlightProjects = filter(
    publishedProjects,
    (p: Project) => p.highlight,
  ) as Project[];
  const professionalProjects = filter(
    publishedProjects,
    (p: Project) => p.type === 'profession' && !p.highlight,
  ) as Project[];
  const hobbyProjects = filter(
    publishedProjects,
    (p: Project) => p.type === 'hobby' && !p.highlight,
  ) as Project[];

  const allTools = publishedProjects.flatMap((p) => p.tools);
  const toolsCount = countBy(allTools, (t) => t.name); // lodash method to count occurrences of each tool by name
  const tools = orderBy(
    uniqBy(allTools, (t) => t.name), // ensure tools are unique by name
    (t) => toolsCount[t.name], // sort by the count of each tool
    'desc', // sort in descending order
  );

  return (
    <div className='relative pb-16'>
      <Navigation profileSlug={profile.slug} links={links} />
      <div className='mx-auto max-w-7xl space-y-8 px-6 pt-[var(--navbar-height)] md:space-y-16 lg:px-8 lg:pt-32'>
        <div className='mx-auto lg:max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl'>
            {t('title')}
          </h2>
          <p className='mt-4 text-zinc-400'>{t('description')}</p>
        </div>
        <div>
          <ArticleToolFilter tools={tools} />
        </div>

        {!!highlightProjects?.length && (
          <>
            <div className='flex items-center gap-6'>
              <h3 className='shrink-0 text-2xl font-bold text-zinc-100'>
                {t('highlight')}
              </h3>
              <div className='flex h-px w-full bg-zinc-800'></div>
            </div>
            <div className='flex flex-col gap-6'>
              <ArticleGrid
                projects={highlightProjects}
                views={views}
                isHighlight
              />
            </div>
          </>
        )}

        <div className='flex items-center gap-6'>
          <h3 className='shrink-0 text-2xl font-bold text-zinc-100'>
            {t('profession')}
          </h3>
          <div className='flex h-px w-full bg-zinc-800'></div>
        </div>

        <div className='flex flex-col gap-6'>
          <ArticleGrid projects={professionalProjects} views={views} />
        </div>

        {!!hobbyProjects?.length && (
          <>
            <div className='flex items-center gap-6'>
              <h3 className='shrink-0 text-2xl font-bold text-zinc-100'>
                {t('hobby')}
              </h3>
              <div className='flex h-px w-full bg-zinc-800'></div>
            </div>

            <div className='flex flex-col gap-2'>
              <ArticleGrid projects={hobbyProjects} views={views} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
