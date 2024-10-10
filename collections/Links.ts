import type { CollectionConfig } from 'payload';

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
      name: 'symbol',
      type: 'text',
      localized: true,
      admin: {
        description: 'Show in the navigation instead of an icon. Only for downloads.'
      },
    },
    {
      name: 'showInNavigation',
      defaultValue: false,
      type: 'checkbox',
      admin: {
        description: 'Show this link or download in the navigation.'
      },
    },
    {
      name: 'hideOnMobile',
      defaultValue: false,
      type: 'checkbox',
      admin: {
        description: 'Only relevant if showInNavigation is active, hidden in the mobile navigation if enabled.'
      }
    },
    {
      name: 'isExternal',
      defaultValue: true,
      type: 'checkbox',
    },
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
      type: 'text',
    },
  ],
  admin: {
    useAsTitle: 'title'
  },
};
