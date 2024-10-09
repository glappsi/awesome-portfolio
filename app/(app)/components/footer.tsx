import { getLegals } from '@/actions';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function Footer() {
  const t = await getTranslations('LegalsPage');
  const legals = await getLegals();

  return (
    <footer className='flex w-screen justify-center gap-4 border-t-8 p-8'>
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
    </footer>
  );
}
