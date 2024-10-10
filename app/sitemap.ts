import { getActiveProfile, getProjects } from '@/actions';
import { filter } from 'lodash';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profile = await getActiveProfile();
  const projects = await getProjects();
  const blogProjects = filter(projects, (p) => !!p.blog);

  return [
    {
      url: `${process.env.APP_PROTOCOL}://${process.env.APP_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.APP_PROTOCOL}://${process.env.APP_URL}/profiles/${profile.slug}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.APP_PROTOCOL}://${process.env.APP_URL}/projects`,
      lastModified: new Date(),
    },
    ...blogProjects.map(({ blog }) => {
      return {
        url: `${process.env.APP_PROTOCOL}://${process.env.APP_URL}/blogs/${blog!.type}/${blog!.slug}`,
        lastModified: new Date(),
        images: blog!.thumbnail?.url
          ? [`${process.env.APP_PROTOCOL}://${process.env.APP_URL}${blog!.thumbnail!.url}`]
          : undefined,
      };
    }),
  ];
}
