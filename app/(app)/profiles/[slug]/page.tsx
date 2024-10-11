import {
  createMessage,
  getActiveProfile,
  getCareerSteps,
  getLinks,
  getProfileBySlug,
  getProjects,
  getSkills,
  getTestimonials,
} from '@/actions';
import { Link as TLink } from '@/actions/entities/models/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import Globe from '@/components/ui/globe';
import { Icon } from '@/components/ui/icon';
import IconCloud from '@/components/ui/icon-cloud';
import Marquee from '@/components/ui/marquee';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { filter, flatMap, uniq, uniqBy } from 'lodash';
import { getFormatter, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { NeonGradientCard } from '../../../../components/ui/neon-gradient-card';
import { Card, CardDescription, CardHeadline, CardSubHeadline } from '../../components/card';
import { ContactButton } from '../../components/contact-form';
import { Devicons } from '../../components/devicons';
import { Navigation } from '../../components/nav';
import { SkillChart } from './skill-chart';
import TestimonialShuffle from './testimonial';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;

export const dynamicParams = false;

export async function generateStaticParams() {
  const profile = await getActiveProfile();

  return [
    {
      slug: profile.slug,
    },
  ];
}

export default async function ProfilePage({ params }: Props) {
  const t = await getTranslations('ProfilePage');
  const format = await getFormatter();
  const profilePromise = getProfileBySlug((await params).slug);
  const skillsPromise = getSkills();
  const careerStepsPromise = getCareerSteps();
  const linksPromise = getLinks();
  const projectsPromise = getProjects();
  const testimonialsPromise = getTestimonials();
  const [profile, skills, careerSteps, links, projects, testimonials] =
    await Promise.all([
      profilePromise,
      skillsPromise,
      careerStepsPromise,
      linksPromise,
      projectsPromise,
      testimonialsPromise,
    ]);

  const profSkills = filter(skills, (s) => s.type === 'profession');
  const softSkills = filter(skills, (s) => s.type === 'soft');
  const skillTools = filter(
    uniq(flatMap(profSkills, (skill) => skill.tools).map((t) => t.name)),
  );
  // const skillCategories = filter(uniq(flatMap(skills, skill => skill.categories).map(t => t.displayName)));

  const contact = filter(
    links,
    (l) => !!l.link && l.showInNavigation,
  ) as TLink[];
  const downloads = filter(
    links,
    (l) => !!l.download && l.showInNavigation,
  ) as TLink[];

  return (
    <div className='relative pb-16'>
      <Navigation profileSlug={profile.slug} links={links} />
      <div className='mx-auto max-w-7xl space-y-8 px-6 pt-[var(--navbar-height)] md:space-y-16 lg:px-8 lg:pt-32'>
        <div className='mx-auto gap-8 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3'>
          <div className='order-2 lg:order-1 flex flex-col gap-8'>
            <Card className='p-4 md:p-8'>
              <CardHeadline>{t('career')}</CardHeadline>
              <Accordion type='single' collapsible className='w-full'>
                {careerSteps.map((step, index) => {
                  const tools = uniqBy(flatMap(step.projects, (p) => p.tools), (t) => t.name);
                  return (
                    <AccordionItem
                      key={step.id}
                      className={clsx({
                        '!border-0': index === careerSteps.length - 1,
                      })}
                      value={`item-${index}`}
                    >
                      <AccordionTrigger
                        className={clsx(
                          {
                            '!pt-0': index === 0,
                            '[&[data-state=closed]]:pb-0':
                              index === careerSteps.length - 1,
                          },
                          '!no-underline',
                        )}
                      >
                        <div className='text-left'>
                          <h3 className='text-zinc-100'>{step.title}</h3>
                          <span className='text-zinc-400'>
                            {step.company},{' '}
                            {format.dateTime(step.start, {
                              year: 'numeric',
                              month: 'short',
                            })}{' '}
                            -{' '}
                            {step.end
                              ? format.dateTime(step.end, {
                                year: 'numeric',
                                month: 'short',
                              })
                              : t('today')}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className='whitespace-break-spaces text-zinc-100'>
                          {step.description?.split('\n').map((line, index) => (
                            <li key={index} className='flex gap-2'>
                              <DotFilledIcon className='!h-[20px] !w-[20px] shrink-0' />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>

                        <Marquee style={{
                          '--duration': `${tools.length * 10}s`
                        } as CSSProperties} className='mt-4'>
                          <Devicons
                            tools={tools}
                            variant='colored'
                            withTooltips
                            asCard
                          />
                        </Marquee>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </Card>

            <Card className='p-4 md:p-8'>
              <CardHeadline>{t('projectSkills')}</CardHeadline>
              <SkillChart projects={projects} />
            </Card>
          </div>

          <div className='order-1 lg:order-2 flex flex-col gap-8'>
            <Card
              isHighlight={!!profile.openForWork}
              badge={profile.badge?.url}
              badgeLight={!!profile.badge?.needsLightBackground}
              className='p-4 text-center md:p-8'>
              <Image
                src={profile.image.url}
                alt={profile.image.alt}
                width={profile.image.width}
                height={profile.image.height}
                className='m-auto mb-4 size-[100px] rounded-full border p-1 md:mb-8'
              />
              <CardHeadline className='mb-8'>{profile.name}</CardHeadline>
              {!!profile.aboutMe && (
                <CardDescription className='italic'>{`"${profile.aboutMe}"`}</CardDescription>
              )}

              {profile.openForWork && (<div className="flex flex-col">
                <Separator className="my-4 md:my-8" />
                <CardSubHeadline className="!mb-1">{t('openForWork.title')}</CardSubHeadline>
                <CardDescription>{t('openForWork.description')}</CardDescription>
                <ContactButton isHighlight onSubmit={createMessage} />
              </div>)}
            </Card>

            {!!(profile.latitude && profile.longitude) && (
              <Card className='aspect-square w-full overflow-hidden'>
                {!!profile.location && (
                  <CardDescription className='absolute bottom-0 right-[15px] z-10 text-zinc-900'>
                    {t('locatedAt', { location: profile.location })}
                  </CardDescription>
                )}
                <Globe
                  className='absolute -top-1/4 left-[-12.5%] size-[150%]'
                  markers={[
                    {
                      location: [profile.latitude, profile.longitude],
                      size: 0.1,
                    },
                  ]}
                />
              </Card>
            )}

            <NeonGradientCard>
              <CardHeadline>{t('contactAndDownloads')}</CardHeadline>
              <CardDescription>{t('contact')}</CardDescription>

              <div className='flex flex-col gap-2'>
                {contact.map(({ link, title, icon, isExternal }) => (
                  <Link
                    key={title}
                    href={link!}
                    target={isExternal ? '_blank' : '_self'}
                    aria-label={title}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'rounded-full',
                    )}
                  >
                    <Icon type={icon} className='mr-2 size-4' />
                    {t('contactVia', { channel: title })}
                  </Link>
                ))}
                <ContactButton onSubmit={createMessage} />
              </div>
              <Separator className='my-3' />
              <div className='flex flex-col gap-2'>
                {downloads.map(({ download, title, icon }) => (
                  <Link
                    key={title}
                    href={download!.url}
                    download={download!.filename}
                    target='_blank'
                    aria-label={title}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'rounded-full',
                    )}
                  >
                    <Icon type={icon} className='mr-2 size-4' />
                    {t('download', { media: title })}
                  </Link>
                ))}
                <Link
                  href='/projects'
                  aria-label='projects'
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'rounded-full',
                  )}
                >
                  <Icon type={'ArchiveIcon'} className='mr-2 size-4' />
                  {t('myProjects')}
                </Link>
              </div>
            </NeonGradientCard>
          </div>

          <div className='order-3 md:col-span-2 lg:col-span-1 md:grid grid-cols-2 flex lg:flex flex-col gap-8'>
            <Card
              className='overflow-hidden p-4 md:p-8'
              background={<IconCloud iconSlugs={skillTools} />}
            >
              <CardHeadline>{t('professionalSkills')}</CardHeadline>
              <div className='flex flex-col gap-2'>
                {profSkills.map((skill) => (
                  <div className='flex items-start gap-2' key={skill.id}>
                    <ArrowRightIcon className='mt-px !h-[20px] !w-[20px] shrink-0 !stroke-2 text-zinc-100' />
                    <span className='text-zinc-100'>{skill.title}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className='p-4 md:p-8'>
              <CardHeadline>{t('softSkills')}</CardHeadline>
              <div className='flex flex-col gap-2'>
                {softSkills.map((skill) => (
                  <div className='flex items-start gap-2' key={skill.id}>
                    <ArrowRightIcon className='mt-px !h-[20px] !w-[20px] shrink-0 !stroke-2 text-zinc-100' />
                    <span className='text-zinc-100'>{skill.title}</span>
                  </div>
                ))}

                {/* <div className="flex flex-wrap gap-2 pt-4">
                  {skillCategories.map((c) => (
                    <Badge variant="outline">#{c}</Badge>
                  ))}
                </div> */}
              </div>
            </Card>

            {!!testimonials?.length && (
              <Card className='p-4 md:p-8'>
                <TestimonialShuffle testimonials={testimonials} />
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
