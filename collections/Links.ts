import type { CollectionConfig } from 'payload'

export const Links: CollectionConfig = {
  slug: 'links',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'showInNavigation',
      defaultValue: false,
      type: 'checkbox',
    },
    // TODO: This is a bug in payload currently
    // ui type values can't be persisted, so we need the _icon workaround
    // Report this to GitHub
    {
      name: '_icon',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/payload/icon-select#IconSelectComponent',
          Cell: '/components/payload/icon-select#IconUIComponent',
        },
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    {
      name: 'download',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'link',
      type: 'text'
    },
  ],
}
