import Image from "next/image"
import { getBlogBySlug } from '@/actions';
import { Card } from '../../../components/card';
import { BlogParagraph } from '../../paragraph';

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({
  params
}: Props) {
  const blog = await getBlogBySlug((await params).slug);

  return (
    <Card className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-zinc-800 shadow-lg rounded-lg overflow-hidden">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{blog.title}</h1>
        <div className="flex items-center">
          {blog.authorImage && (<Image
            src={blog.authorImage.url}
            alt={blog.authorImage.alt}
            width={48}
            height={48}
            className="rounded-full mr-4"
          />)}
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{blog.author}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{blog.date.toLocaleDateString()}</p>
          </div>
        </div>
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
  )
}