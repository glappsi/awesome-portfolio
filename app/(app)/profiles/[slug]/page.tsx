import React from "react";
import { getCareerSteps, getProfileBySlug, getSkills } from '@/actions';
import { Navigation } from '../../components/nav';
import { Card, CardDescription, CardHeadline } from '../../components/card';
import Globe from '@/components/ui/globe';
import { Devicons } from '../../components/devicons';
import { chunk, filter, flatMap, uniq } from 'lodash';
import Marquee from '@/components/ui/marquee';
import { CheckCircledIcon } from "@radix-ui/react-icons"

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;

export default async function ProfilePage({
  params
}: Props) {
  const profilePromise = getProfileBySlug((await params).slug);
  const skillsPromise = getSkills();
  const careerStepsPromise = getCareerSteps();
  const [profile, skills, careerSteps] = await Promise.all([profilePromise, skillsPromise, careerStepsPromise]);
  console.log(JSON.stringify(skills, null, 2));

  const profSkills = filter(skills, s => s.type === 'profession');
  const softSkills = filter(skills, s => s.type === 'soft');
  const skillTools = chunk(filter(uniq(flatMap(profSkills, skill => skill.tools).map(t => t.name))), 3);
  console.log(skillTools);
  const skillCategories = filter(uniq(flatMap(skills, skill => skill.categories).map(t => t.displayName)));

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-3 ">
          <div>
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
          </div>
          {!!(profile.latitude && profile.longitude) && (<div>
            <Card className="aspect-square w-full">
              {!!profile.location && (<CardDescription className="absolute bottom-[5px] right-[5px] z-10">{profile.location}</CardDescription>)}
              <Globe 
                className="absolute left-[-12.5%] top-[-25%] w-[150%] h-[150%]"
                markers={[{
                  location: [profile.latitude, profile.longitude],
                  size: 0.1
                }]}/>
            </Card>
          </div>)}

          <div>
            <Card
              className="p-4 md:p-8"
              background={<div className="flex flex-col gap-4 p-2">
                {skillTools.map((tools, index) => (
                  <Marquee
                    key={index}
                    pauseOnHover
                    delay={`${500*index}ms`}
                  >
                    <Devicons 
                      className='text-6xl mx-2'
                      icons={tools}
                      variant='colored' />
                  </Marquee>
                  ))}
                </div>
              }>
              <div className="flex flex-col gap-2">
                  {profSkills.map((skill) => (
                    <div className="flex gap-2 items-center" key={skill.id}>
                      <CheckCircledIcon className="text-zinc-100 !stroke-2 !h-[25px] !2-[25px]" />
                      <span className="font-bold text-zinc-100 text-lg">{skill.title}</span>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}