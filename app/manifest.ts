import { getActiveProfile } from '@/actions';
import { MetadataRoute } from 'next';
import { getLocale } from 'next-intl/server';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = await getLocale();
  const profile = await getActiveProfile();

  return {
    name: profile.name,
    short_name: profile.name,
    description: profile.description,
    lang: locale,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
  }
}