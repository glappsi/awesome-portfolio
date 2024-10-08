import { getTranslations } from 'next-intl/server';
import { generateMetadata as generateBaseMetadata } from '../../layout';
import { merge } from 'lodash';
import { getProfileBySlug } from '@/actions';
import Script from 'next/script';
import { generateFAQs } from '@/lib/google-structured-data';

export async function generateMetadata({ params }: {
  params: Promise<{
    slug: string
  }>
}) {
  const t = await getTranslations('ProfilePage');
  const baseMetadata = await generateBaseMetadata();
  const profile = await getProfileBySlug((await params).slug);

  return merge(baseMetadata, {
    title: t('seo.title'),
    description: t('seo.description'),
    alternates: {
      canonical: `https://${process.env.APP_URL}/profiles/${profile.slug}`
    },
    openGraph: {
      title: t('seo.title'),
      description: t('seo.description'),
      url: `https://${process.env.APP_URL}/profiles/${profile.slug}`
    },
  });
}

export default async function ProfileLayout({
	children,
}: { children: React.ReactNode }) {
  const faqs = await generateFAQs();

	return (
    <>
      {faqs && <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqs),
        }}
      />}
      <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
        {children}
      </div>
    </>
	);
}
