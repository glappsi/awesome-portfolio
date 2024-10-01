import type { CollectionConfig } from 'payload'

export const BlogParagraphs: CollectionConfig = {
  slug: 'blog-paragraphs',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    }
  ],
}
