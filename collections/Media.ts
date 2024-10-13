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
      name: 'mobile',
      type: 'upload',
      relationTo: 'media',
      hasMany: false
    },
    {
      name: 'needsLightBackground',
      defaultValue: false,
      type: 'checkbox',
      admin: {
        description: 'Relevant when used as a badge. The badge will color its background accordingly.'
      },
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
