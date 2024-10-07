// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, defaultEditorConfig, defaultEditorFeatures, LexicalEditorProps } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import {s3Storage} from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tools } from './collections/Tools'
import { Categories } from './collections/Categories'
import { BlogParagraphs } from './collections/BlogParagraphs'
import { Blogs } from './collections/Blogs'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { CareerSteps } from './collections/CareerSteps'
import { Profiles } from './collections/Profiles'
import { Links } from './collections/Links'
import { Testimonials } from './collections/Testimonials'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const customEditorConfig: LexicalEditorProps = {};

export const lexicalEditorConfig = {
  ...defaultEditorConfig,
  features: [
    ...defaultEditorFeatures,
  ]
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Tools, Categories, BlogParagraphs, Blogs, Projects, Skills, CareerSteps, Profiles, Links, Testimonials],
  localization: {
    locales: ['en'],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(customEditorConfig),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true
      },
    }),
  ],
})
