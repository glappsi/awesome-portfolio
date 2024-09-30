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
      type: 'checkbox',
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
}
