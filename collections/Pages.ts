import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'hero',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    }
  ],
}