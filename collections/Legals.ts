import { lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { lexicalMarkdown, lexicalMarkdownHook } from '../payload/converter/markdown'

export const Legals: CollectionConfig = {
  slug: 'legals',
  fields: [
    {
      name: 'type',
      type: 'radio',
      unique: true,
      required: true,
      options: [
        {
          label: 'Imprint',
          value: 'imprint',
        },
        {
          label: 'Privacy',
          value: 'privacy',
        }
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'render',
      type: 'radio',
      options: [
        {
          label: 'HTML',
          value: 'html',
        },
        {
          label: 'Markdown',
          value: 'markdown',
        }
      ],
      defaultValue: 'html',
      admin: {
        layout: 'horizontal',
      },
    },
    ...lexicalMarkdown('content', 'markdown'),
    lexicalHTML('content', { name: 'html', hidden: false, storeInDB: true }),
  ],
  ...lexicalMarkdownHook('content', 'markdown'),
  admin: {
    useAsTitle: 'type',
  },
}
