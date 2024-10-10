import { url } from '@/lib/app-url';
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
      if (doc.url && process.env.REMOTE_IMAGES) {
        doc.url = `${url}${doc.url}`;
      }
      return doc;
    }],
  },
  upload: true,
};
