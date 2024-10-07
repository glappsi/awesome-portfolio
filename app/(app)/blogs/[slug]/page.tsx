import { getBlogBySlug, getProjects } from '@/actions';
import { filter, map } from 'lodash';
import { redirect } from 'next/navigation';

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

export default async function BlogPage({
  params
}: Props) {
  const blog = await getBlogBySlug((await params).slug);

  redirect(`./${blog.type}/${blog.slug}`);
}