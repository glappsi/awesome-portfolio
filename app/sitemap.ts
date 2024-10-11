import { getActiveProfile, getProjects } from '@/actions';
import { url } from '@/lib/env';
import { filter } from 'lodash';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profile = await getActiveProfile();
  const projects = await getProjects();
  const blogProjects = filter(projects, (p) => !!p.blog?.published);

  return [
    {
      url: `${url}/`,
      lastModified: new Date(),
    },
    {
      url: `${url}/profiles/${profile.slug}`,
      lastModified: new Date(),
    },
    {
      url: `${url}/projects`,
      lastModified: new Date(),
    },
    ...blogProjects.map(({ blog }) => {
      return {
        url: `${url}/blogs/${blog!.type}/${blog!.slug}`,
        lastModified: new Date(),
        images: blog!.thumbnail?.url
          ? [`${url}${blog!.thumbnail!.url}`]
          : undefined,
      };
    }),
  ];
}
