import { MetadataRoute } from 'next';
import { getProjects } from '@/actions';
import { filter } from 'lodash';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const blogProjects = filter(projects, p => !!p.blog);

  return blogProjects.map(({blog}) => {
    return {
      url: `https://${process.env.APP_URL}/blogs/${blog!.type}/${blog!.slug}`,
      lastModified: new Date(),
      images: blog!.thumbnail?.url ? [`https://${process.env.APP_URL}${blog!.thumbnail!.url}`] : undefined
    }
  });
}