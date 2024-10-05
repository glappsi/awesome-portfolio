import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getCareerSteps, getLinks, getProfileBySlug, getProjects, getSkills } from '@/actions';
import { Navigation } from '../../components/nav';
import { Card, CardDescription, CardHeadline } from '../../components/card';
import Globe from '@/components/ui/globe';
import { Devicons } from '../../components/devicons';
import { filter, flatMap, uniq } from 'lodash';
import Marquee from '@/components/ui/marquee';
import { CheckCircledIcon, DotFilledIcon } from "@radix-ui/react-icons"
import { getFormatter, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import IconCloud from '@/components/ui/icon-cloud';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/ui/icon';
import clsx from 'clsx';
import { SkillChart } from './skill-chart';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;

export default async function ProfilePage({
  params
}: Props) {
  const t = await getTranslations('ProfilePage');
  const format = await getFormatter();
  const profilePromise = getProfileBySlug((await params).slug);
  const skillsPromise = getSkills();
  const careerStepsPromise = getCareerSteps();
  const linksPromise = getLinks();
  const projectsPromise = getProjects();
  const [profile, skills, careerSteps, links, projects] = await Promise.all([profilePromise, skillsPromise, careerStepsPromise, linksPromise, projectsPromise]);

  const profSkills = filter(skills, s => s.type === 'profession');
  const softSkills = filter(skills, s => s.type === 'soft');
  const skillTools = filter(uniq(flatMap(profSkills, skill => skill.tools).map(t => t.name)));
  const skillCategories = filter(uniq(flatMap(skills, skill => skill.categories).map(t => t.displayName)));

  const contact = filter(links, l => !!l.link);
  const downloads = filter(links, l => !!l.download);

  return (
    <div className="relative pb-16">
      <Navigation
        profileSlug={profile.slug}
        links={links} />
      <div className="px-6 md:pt-20 pt-[106px] mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-3 ">
          <div className="flex flex-col gap-8">
            <Card
              className="p-4 md:p-8"
            >
              <CardHeadline>{t('career')}</CardHeadline>
              <Accordion type="single" collapsible className="w-full">
                {careerSteps.map((step, index) => (
                  <AccordionItem className={clsx({
                    '!border-0': index === (careerSteps.length - 1)
                  })} value={`item-${index}`}>
                    <AccordionTrigger className={clsx({
                      '!pt-0': index === 0,
                      '[&[data-state=closed]]:pb-0': index === (careerSteps.length - 1),
                    }, '!no-underline')}>
                      <div className="text-left">
                        <h3 className="text-xl text-zinc-100">{step.title}</h3>
                        <span className="text-zinc-400">{step.company}, {format.dateTime(step.start, { year: 'numeric', month: 'short' })} - {step.end ? format.dateTime(step.start, { year: 'numeric', month: 'short' }) : t('today')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="whitespace-break-spaces text-zinc-100">
                        {step.description?.split('\n').map((line) => (
                          <li className="flex gap-2">
                            <DotFilledIcon className="!h-[20px] !w-[20px]" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>

                      <Marquee className="mt-4">
                        <Devicons
                          icons={step.tools.map(t => t.name)}
                          tooltips={step.tools.map(t => t.displayName)}
                          variant="colored"
                          asCard />
                      </Marquee>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            <Card className="p-4 md:p-8">
              <CardHeadline>{t('projectSkills')}</CardHeadline>
              <SkillChart projects={projects} />
            </Card>
          </div>

          <div className="flex flex-col gap-8">
            <Card className="p-4 md:p-8 text-center">
              <img
                src={profile.image.url}
                alt={profile.image.alt}
                className="m-auto h-[100px] w-[100px] mb-8 rounded-full border p-1"
              />
              <CardHeadline className="mb-8">{profile.name}</CardHeadline>
              {!!profile.aboutMe && (
                <CardDescription className="italic">{`"${profile.aboutMe}"`}</CardDescription>
              )}
            </Card>

            <Card
              className="p-4 md:p-8"
            >
              <CardHeadline>{t('contactAndDownloads')}</CardHeadline>
              <CardDescription>{t('contact')}</CardDescription>

              <div className="flex gap-2">
                {contact.map(({ link, title, icon }) => (
                  <Link
                    href={link!}
                    target="_blank"
                    aria-label={title}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full",
                    )}
                  >
                    <Icon type={icon} className="size-4 mr-2" />
                    {t('contactVia', { channel: title })}
                  </Link>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex gap-2">
                {downloads.map(({ download, title, icon }) => (
                  <Link
                    href={download!.url}
                    download={download!.filename}
                    target='_blank'
                    aria-label={title}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full",
                    )}
                  >
                    <Icon type={icon} className="size-4 mr-2" />
                    {t('download', { media: title })}
                  </Link>
                ))}
              </div>
            </Card>
            {!!(profile.latitude && profile.longitude) && (<Card className="overflow-hidden aspect-square w-full">
              {!!profile.location && (<CardDescription className="text-zinc-900 absolute bottom-0 right-[15px] z-10">{t('locatedAt', { location: profile.location })}</CardDescription>)}
              <Globe
                className="absolute left-[-12.5%] top-[-25%] w-[150%] h-[150%]"
                markers={[{
                  location: [profile.latitude, profile.longitude],
                  size: 0.1
                }]} />
            </Card>)}
          </div>

          <div className="flex flex-col gap-8">
            <Card
              className="overflow-hidden p-4 md:p-8"
              // background={<div className="flex flex-col gap-4 p-2">
              //   {skillTools.map((tools, index) => (
              //     <Marquee
              //       key={index}
              //       pauseOnHover
              //       delay={`${500*index}ms`}
              //     >
              //       <Devicons 
              //         className='text-6xl mx-2'
              //         icons={tools}
              //         variant='colored' />
              //     </Marquee>
              //     ))}
              //   </div>
              // }>
              background={<IconCloud iconSlugs={skillTools} />}>
              <CardHeadline>{t('professionalSkills')}</CardHeadline>
              <div className="flex flex-col gap-2">
                {profSkills.map((skill) => (
                  <div className="flex gap-2 items-start" key={skill.id}>
                    <CheckCircledIcon className="text-zinc-100 !stroke-2 !h-[25px] !w-[25px] shrink-0 mt-[1px]" />
                    <span className="font-bold text-zinc-100 text-lg">{skill.title}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              className="p-4 md:p-8"
            >
              <CardHeadline>{t('softSkills')}</CardHeadline>
              <div className="flex flex-col gap-2">
                {softSkills.map((skill) => (
                  <div className="flex gap-2 items-start" key={skill.id}>
                    <CheckCircledIcon className="text-zinc-100 !stroke-2 !h-[25px] !w-[25px] shrink-0 mt-[1px]" />
                    <span className="font-bold text-zinc-100 text-lg">{skill.title}</span>
                  </div>
                ))}

                <div className="flex gap-2 pt-4">
                  {skillCategories.map((c) => (
                    <Badge variant="outline">#{c}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}