import { lexicalHTML } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';
import {
  lexicalMarkdown,
  lexicalMarkdownHook,
} from '../payload/converter/markdown';

export const BlogParagraphs: CollectionConfig = {
  slug: 'blog-paragraphs',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
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
        },
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
    useAsTitle: 'name',
  },
};
