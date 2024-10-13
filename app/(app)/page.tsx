import { getActiveProfile, getLinks } from '@/actions';
import { NavigationDock } from './components/nav';
import Particles from './components/particles';
import { ResponsiveImage } from './components/responsive-image';

export const revalidate = 60;

export default async function Home() {
  const profilePromise = getActiveProfile();
  const linksPromise = getLinks();

  const [profile, links] = await Promise.all([profilePromise, linksPromise]);

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
      {profile.image && (
        <>
          <ResponsiveImage
            media={profile.image}
            width={200}
            height="auto"
            className='mb-8'
            imageClassName='size-[200px] rounded-full border p-1'
          />
        </>
      )}
      <div className='animate-glow hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block' />
      <Particles
        className='absolute inset-0 -z-10 animate-fade-in'
        quantity={100}
      />

      <h1 className='text-edge-outline z-10 animate-title cursor-default whitespace-nowrap bg-white bg-clip-text px-0.5 pb-8 font-display text-4xl text-transparent duration-1000 sm:text-6xl md:text-8xl lg:text-9xl'>
        {profile.name}
      </h1>

      <div className='animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block' />
      {profile?.description && (
        <div className='animate-fade-in px-4 text-center md:my-8 lg:whitespace-pre'>
          <h2 className='text-zinc-500'>{profile?.description}</h2>
        </div>
      )}

      <nav className='animate-fade-in pt-8'>
        <NavigationDock profileSlug={profile.slug} links={links} />
      </nav>
    </div>
  );
}
