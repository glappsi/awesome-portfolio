import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
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
          label: 'Soft',
          value: 'soft',
        }
      ],
      defaultValue: 'profession',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        step: 0,
      },
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
    useAsTitle: 'title'
  }
}
