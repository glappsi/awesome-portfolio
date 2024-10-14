import { getLegals } from '@/actions';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function Footer() {
  const t = await getTranslations('LegalsPage');
  const legals = await getLegals();

  return (
    <footer className='flex w-screen items-center justify-center gap-4 border-t-8 p-8'>
      {legals.map((l) => (
        <Link
          key={l.type}
          href={`/legals/${l.type}`}
          target='_blank'
          aria-label={l.type}
        >
          <span className='text-sm text-zinc-400'>{t(l.type)}</span>
        </Link>
      ))}
      <a href="https://www.producthunt.com/posts/awesome-portfolio-template?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-awesome&#0045;portfolio&#0045;template" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=501651&theme=light" alt="Awesome&#0032;Portfolio&#0032;Template - Launch&#0032;your&#0032;Next&#0046;js&#0032;portfolio&#0032;&#0045;&#0032;fast&#0044;&#0032;flexible&#0044;&#0032;powerful&#0033; | Product Hunt" style={{ width: 250, height: 54 }} width="250" height="54" /></a>
    </footer>
  );
}
