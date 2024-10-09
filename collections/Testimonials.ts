import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  fields: [
    {
      name: 'quote',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'avatar',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'author',
  },
};
