import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      admin: {
        description: 'Unpublished projects will be ignored.'
      },
    },
    {
      name: 'highlight',
      type: 'checkbox',
    },
    {
      name: 'start',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMMM yyyy',
        },
      },
    },
    {
      name: 'end',
      type: 'date',
      admin: {
        description: 'Projects will be sorted by end date descending. Empty end dates (project still running) will be first.',
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMMM yyyy',
        },
      },
    },
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          label: 'Profession',
          value: 'profession',
        },
        {
          label: 'Hobby',
          value: 'hobby',
        },
      ],
      defaultValue: 'profession',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'badge',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'blog',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: false,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'tools',
      type: 'relationship',
      relationTo: 'tools',
      hasMany: true,
    },
  ],
  admin: {
    useAsTitle: 'title',
  },
};
