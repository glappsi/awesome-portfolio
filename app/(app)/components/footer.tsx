import { getLegals } from '@/actions'
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function Footer() {
  const t = await getTranslations('LegalsPage')
  const legals = await getLegals();

  return (
    <footer className="border-t-8 w-screen p-8 flex justify-center gap-4">
      {legals.map(l => (
        <Link
          href={`/legals/${l.type}`}
          target="_blank"
          aria-label={l.type}>
          <span className="text-sm text-zinc-400">{t(l.type)}</span>
        </Link>
      ))}
    </footer>
  )
}