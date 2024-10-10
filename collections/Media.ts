import { url, useRemoteImages } from '@/lib/env';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'needsLightBackground',
      defaultValue: false,
      type: 'checkbox',
    },
  ],
  hooks: {
    afterRead: [async ({ doc }) => {
      if (doc.url && useRemoteImages) {
        doc.url = `${url}${doc.url}`;
      }
      return doc;
    }],
  },
  upload: true,
};
