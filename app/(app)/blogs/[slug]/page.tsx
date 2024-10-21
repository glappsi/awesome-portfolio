import { getBlogBySlug, getBlogs } from '@/actions';
import { map } from 'lodash';
import { redirect } from 'next/navigation';

export const revalidate = 60;

export const dynamicParams = false;

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return map(
    blogs,
    (b) => ({
      slug: b.slug,
    }),
  );
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({ params }: Props) {
  const blog = await getBlogBySlug((await params).slug);

  redirect(`./${blog.type}/${blog.slug}`);
}
