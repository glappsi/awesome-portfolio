import type { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'displayName',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  admin: {
    useAsTitle: 'name',
    description: 'Rendered in project details.'
  },
};
