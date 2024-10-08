import { MetadataRoute } from 'next';
import { getActiveProfile } from '@/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profile = await getActiveProfile();

 return [{
    url: `https://${process.env.APP_URL}/`,
    lastModified: new Date(),
  },{
    url: `https://${process.env.APP_URL}/profiles/${profile.slug}`,
    lastModified: new Date(),
  },{
    url: `https://${process.env.APP_URL}/projects`,
    lastModified: new Date(),
  }];
}