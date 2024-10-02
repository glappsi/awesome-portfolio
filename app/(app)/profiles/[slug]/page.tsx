import React from "react";
import { getCareerSteps, getProfileBySlug, getSkills } from '@/actions';
import { Navigation } from '../../components/nav';
import { Card, CardDescription, CardHeadline } from '../../components/card';
import Globe from '@/components/ui/globe';

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
  console.log(JSON.stringify(profile, null, 2));

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
        </div>
      </div>
    </div>
  );
}
