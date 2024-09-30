import type { CollectionConfig } from 'payload'

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
      name: 'blog',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: false,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      // TODO find how to display other fields as title in dropdown
      // admin: {
      //   useAsTitle: 'name'
      // },
      hasMany: true,
    },
    {
      name: 'tools',
      type: 'relationship',
      // TODO find how to display other fields as title in dropdown
      // admin: {
      //   useAsTitle: 'name'
      // },
      relationTo: 'tools',
      hasMany: true,
    }
  ],
}
