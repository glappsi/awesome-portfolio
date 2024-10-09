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
