import { getBlogBySlug } from '@/actions';
import { redirect } from 'next/navigation';

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

  redirect(`./${blog.type}/${blog.slug}`);
}