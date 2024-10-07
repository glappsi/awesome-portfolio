import React from "react";
import Particles from "./components/particles";
import { getActiveProfile, getLinks } from '@/actions';
import { NavigationDock } from './components/nav';

export const revalidate = 60; 

export default async function Home() {
  const profilePromise = getActiveProfile();
  const linksPromise = getLinks();

  const [profile, links] = await Promise.all([profilePromise, linksPromise]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">

      {profile.image && (
        <img
          src={profile.image.url}
          alt={profile.image.alt}
          className="h-[200px] w-[200px] mb-8 rounded-full border p-1"
        />
      )}
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      <h1 className="pb-8 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        {profile.name}
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      {profile?.description && (<div className="my-8 px-4 lg:whitespace-pre text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
        {profile?.description}
        </h2>
      </div>)}

      <nav className="animate-fade-in pt-8">
        <NavigationDock 
          profileSlug={profile.slug} 
          links={links} />
      </nav>
    </div>
  );

}
