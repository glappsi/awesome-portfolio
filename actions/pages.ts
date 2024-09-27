"use server";

import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export async function getHeroPage() {
  const payload = await getPayloadHMR({ config });
  return await payload.findByID({
    id: 1,
    collection: 'pages',
  }) as {
    id: string;
    title: string;
  };
}