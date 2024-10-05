import Image from "next/image"
import { getBlogBySlug } from '@/actions';
import { Card } from '../../../components/card';
import { BlogParagraph } from '../../paragraph';
import { Redis } from "@upstash/redis";
import { ReportView } from '../../view';
import { Header } from './header';
import { Eye } from 'lucide-react';

export const revalidate = 60;

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

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  return (
    <div className="min-h-screen">
      <Header blog={blog} views={views} />
      <ReportView slug={slug} />

      <div className="md:pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16">
      <Card 
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
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
            <BlogParagraph
              key={index}
              paragraph={paragraph}
            ></BlogParagraph>
          ))}
        </div>
      </Card>
      </div>
    </div>
  )
}