import type { CollectionConfig } from 'payload';

export const Tools: CollectionConfig = {
  slug: 'tools',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'The name is used for mapping to the matching icon, using Devicon (https://devicon.dev/). Tools without icons won\'t be shown, but will count into the Top Skills (About me page).'
      }
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
      admin: {
        description: 'The short name is used in Top Skills, if provided, otherwise display name.'
      }
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
