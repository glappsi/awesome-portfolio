import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
      name: 'published',
      defaultValue: false,
      type: 'checkbox',
    },
    {
      name: 'author',
      required: true,
      type: 'text',
    },
    {
      name: 'authorImage',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'date',
      required: true,
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'paragraphs',
      type: 'relationship',
      relationTo: 'blog-paragraphs',
      // TODO find how to display other fields as title in dropdown
      // admin: {
      //   useAsTitle: 'headline'
      // },
      hasMany: true,
    },
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          label: 'Tech',
          value: 'tech',
        }
      ],
      defaultValue: 'tech',
      admin: {
        layout: 'horizontal',
      },
    },
  ],
  admin: {
    useAsTitle: 'slug'
  }
}
