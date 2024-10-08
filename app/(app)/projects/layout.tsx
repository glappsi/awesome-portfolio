import { getTranslations } from 'next-intl/server';
import { generateMetadata as generateBaseMetadata } from '../layout';
import { merge } from 'lodash';
import { generateBlogs } from '@/lib/google-structured-data';
import Script from 'next/script';

export async function generateMetadata() {
  const t = await getTranslations('ProjectsPage');
  const baseMetadata = await generateBaseMetadata();

  return merge(baseMetadata, {
    title: t('seo.title'),
    description: t('seo.description'),
    alternates: {
      canonical: `https://${process.env.APP_URL}/projects`
    },
    openGraph: {
      title: t('seo.title'),
      description: t('seo.description'),
      url: `https://${process.env.APP_URL}/projects`
    },
  });
}

export default async function ProjectsLayout({
	children,
}: { children: React.ReactNode }) {
  const blogs = await generateBlogs();

	return (
    <>
      {blogs && <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogs),
        }}
      />}
		<div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
			{children}
		</div>
    </>
	);
}
