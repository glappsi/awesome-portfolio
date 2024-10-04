import { lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { lexicalMarkdown, lexicalMarkdownHook, MarkdownConverterFeature } from '../payload/converter/markdown'

export const BlogParagraphs: CollectionConfig = {
  slug: 'blog-paragraphs',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    // {
    //   name: 'content',
    //   type: 'richText',
    //   localized: true,
    //   editor: lexicalEditor({
    //     features: ({ defaultFeatures }) => [
    //       ...defaultFeatures,
    //       // The HTMLConverter Feature is the feature which manages the HTML serializers.
    //       // If you do not pass any arguments to it, it will use the default serializers.
    //       MarkdownConverterFeature(),
    //     ],
    //   }),
    //   // admin: {
    //   //   components: {
    //   //     Field: '/components/payload/markdown-richtext#MarkdownRichTextField',
    //   //   },
    //   // }
    // },
    ...lexicalMarkdown('content', 'markdown'),
    lexicalHTML('content', { name: 'html', hidden: false, storeInDB: true }),
    // {
    //   name: '_content',
    //   label: 'Content as Markdown',
    //   type: 'textarea',
    //   localized: true,
    // },
  ],
  ...lexicalMarkdownHook('content', 'markdown'),
  admin: {
    useAsTitle: 'name',
  },
}
