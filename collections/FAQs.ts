import { CollectionConfig } from 'payload';

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  admin: {
    description: 'This is used to render google structured data FAQs.'
  }
};
