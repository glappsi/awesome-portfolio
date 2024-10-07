import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          await req.payload.sendEmail({
            to: process.env.EMAIL_RECIPIENT,
            from: doc.email,
            subject: 'New Message!',
            html: `<p>A new entry has been created with the following data: ${JSON.stringify(doc)}</p>`,
          });
        }
      },
    ],
  },
  admin: {
    useAsTitle: 'email'
  }
}
