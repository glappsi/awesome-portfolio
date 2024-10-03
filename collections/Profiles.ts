import type { CollectionConfig } from 'payload'

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
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
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        step: 6,
      },
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'latitude',
      type: 'number',
      admin: {
        step: 6,
      },
    },
    {
      name: 'aboutMe',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false
    },
  ],
  admin: {
    useAsTitle: 'slug',
  },
}
