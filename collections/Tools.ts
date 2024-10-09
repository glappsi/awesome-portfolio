import type { CollectionConfig } from 'payload';

export const Tools: CollectionConfig = {
  slug: 'tools',
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
    {
      name: 'shortName',
      type: 'text',
      localized: true,
    },
    {
      name: 'noIcon',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'hideInTopSkills',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
};
