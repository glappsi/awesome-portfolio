import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'displayName',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  admin: {
    useAsTitle: 'name'
  },
}
