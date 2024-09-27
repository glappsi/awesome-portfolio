"use server";

import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

const payload = await getPayloadHMR({ config })

export async function getHeroPage() {
  return await payload.findByID({
    id: 1,
    collection: 'pages',
  }) as {
    id: string;
    title: string;
  };
}