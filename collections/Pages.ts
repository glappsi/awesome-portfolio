import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      name: 'hero',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          label: 'Hero',
          value: 'hero',
        }
      ],
      defaultValue: 'hero',
      admin: {
        layout: 'horizontal',
      },
    },
  ],
}
