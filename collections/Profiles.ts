import type { CollectionConfig } from 'payload';

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Description on the intro page.'
      },
    },
    {
      name: 'keywords',
      type: 'text',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        description: 'If the latitude or longitude are missing, the globe won\'t be shown.',
        step: 6,
      },
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'latitude',
      type: 'number',
      admin: {
        description: 'If the latitude or longitude are missing, the globe won\'t be shown.',
        step: 6,
      },
    },
    {
      name: 'aboutMe',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Description in profile tile on the about me page.'
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Active profile will be rendered and linked onto the intro page. Also will be used as content for said intro page.'
      },
    },
    {
      name: 'openForWork',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Renders a section in the about me pages profile tile with extra CTA for contact.'
      }
    },
    {
      name: 'badge',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
  ],
  admin: {
    useAsTitle: 'slug',
  },
};
