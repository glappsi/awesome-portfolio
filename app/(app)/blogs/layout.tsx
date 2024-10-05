import { Navigation } from '../components/nav';
import { getActiveProfile, getLinks } from '@/actions';

export const revalidate = 6000; 

export default async function BlogLayout({
	children,
}: { children: React.ReactNode }) {
  const profilePromise = getActiveProfile();
  const linksPromise = getLinks();

  const [profile, links] = await Promise.all([profilePromise, linksPromise]);


	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
      <div className="relative pb-16">
        <Navigation 
          profileSlug={profile.slug} 
          links={links} />
        <main>
          {children}
        </main>
      </div>
		</div>
	);
}
