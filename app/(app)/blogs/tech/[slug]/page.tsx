import Image from "next/image"
import { getBlogBySlug, getProjects } from '@/actions';
import { Card } from '../../../components/card';
import { DynamicContent } from '../../../components/content';
import { Redis } from "@upstash/redis";
import { ReportView } from '../../view';
import { Header } from './header';
import { Eye } from 'lucide-react';
import { filter, map } from 'lodash';
import Gallery from '../../gallery';
import { generateMetadata as generateBaseMetadata } from '../../../layout';
import { merge } from 'lodash';
import { generateBlog } from '@/lib/google-structured-data';
import Script from 'next/script';

export async function generateMetadata({ params }: {
  params: Promise<{
    slug: string
  }>
}) {
  const baseMetadata = await generateBaseMetadata();
  const blog = await getBlogBySlug((await params).slug);

  const metadata = merge(baseMetadata, {
    title: blog.title,
    description: blog.summary,
    alternates: {
      canonical: `https://${process.env.APP_URL}/blogs/${blog.type}/${blog.slug}`
    },
    openGraph: {
      title: blog.title,
      description: blog.summary,
      url: `https://${process.env.APP_URL}/blogs/${blog.type}/${blog.slug}`
    },
  });

  if (blog.thumbnail) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: `https://${process.env.APP_URL}${blog.thumbnail.url}`,
          width: blog.thumbnail.width,
          height: blog.thumbnail.height,
        }
      ]
    }
  }

  return metadata;
}

export const revalidate = 60;

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();

  return map(filter(
    projects,
    p => !!p.blog
  ), p => ({
    slug: p.blog!.slug
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const redis = Redis.fromEnv();

export default async function BlogPage({
  params
}: Props) {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug);
  const blogData = generateBlog(blog);

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  return (
    <>
      {blogData && <Script
        id={`project_structured_data_${blogData.headline.replaceAll(' ', '_')}`}
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogData),
        }}
      />}
      <div className="min-h-screen">
        <Header blog={blog} />
        <ReportView slug={slug} />

        <div className="flex flex-col-reverse lg:flex-col">
          {!!blog.gallery?.length && (
            <div className="w-full lg:border-b-8">
              <Gallery className='pt-[0.5rem] lg:pt-0 lg:pb-0 lg:mb-0 lg:max-w-min' images={blog.gallery} />
            </div>
          )}
          <Card
            className="max-w-full lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:mb-20 md:mt-20 py-8"
            isFullscreen>
            <header className="mb-8 flex justify-between items-start">
              <h1 className="seo-hidden">
                {blog.title}
              </h1>
              <div className="flex items-center">
                {blog.authorImage && (<Image
                  src={blog.authorImage.url}
                  alt={blog.authorImage.alt}
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />)}
                <div>
                  <address rel="author" className="text-lg font-medium text-gray-900 dark:text-white">{blog.author}</address>
                  <time dateTime={blog.date.toISOString()} className="text-sm text-gray-500 dark:text-gray-400">{blog.date.toLocaleDateString()}</time>
                </div>
              </div>
              <span
                title="View counter for this page"
                className='duration-200 hover:font-medium flex items-center gap-1 text-zinc-600 hover:text-zinc-900'
              >
                <Eye className="w-5 h-5" />{" "}
                {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                  views,
                )}
              </span>
            </header>
            <div
              className="prose prose-lg prose-gray max-w-none dark:prose-invert"
            >
              {blog.paragraphs.map((paragraph, index) => (
                <DynamicContent
                  key={index}
                  content={paragraph}
                ></DynamicContent>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}