import { url } from '@/lib/env';
import { generateBlogs } from '@/lib/google-structured-data';
import { merge } from 'lodash';
import { getTranslations } from 'next-intl/server';
import Script from 'next/script';
import { generateMetadata as generateBaseMetadata } from '../layout';

export async function generateMetadata() {
  const t = await getTranslations('ProjectsPage');
  const baseMetadata = await generateBaseMetadata();

  return merge(baseMetadata, {
    title: t('seo.title'),
    description: t('seo.description'),
    alternates: {
      canonical: `${url}/projects`,
    },
    openGraph: {
      title: t('seo.title'),
      description: t('seo.description'),
      url: `${url}/projects`,
    },
  });
}

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogs = await generateBlogs();

  return (
    <>
      {blogs && (
        <Script
          id='projects_structured_data'
          strategy='beforeInteractive'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogs),
          }}
        />
      )}
      <div className='relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900'>
        {children}
      </div>
    </>
  );
}
