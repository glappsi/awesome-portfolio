import React from "react";
import { getCareerSteps, getProfileBySlug, getSkills } from '@/actions';
import { Navigation } from '../../components/nav';
import { Card, CardDescription, CardHeadline } from '../../components/card';

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
        </div>
      </div>
    </div>
  );
}
