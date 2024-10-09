// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import {
  defaultEditorConfig,
  defaultEditorFeatures,
  lexicalEditor,
  LexicalEditorProps,
} from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { BlogParagraphs } from './collections/BlogParagraphs';
import { Blogs } from './collections/Blogs';
import { CareerSteps } from './collections/CareerSteps';
import { Categories } from './collections/Categories';
import { FAQs } from './collections/FAQs';
import { Legals } from './collections/Legals';
import { Links } from './collections/Links';
import { Media } from './collections/Media';
import { Messages } from './collections/Messages';
import { Profiles } from './collections/Profiles';
import { Projects } from './collections/Projects';
import { Skills } from './collections/Skills';
import { Testimonials } from './collections/Testimonials';
import { Tools } from './collections/Tools';
import { Users } from './collections/Users';
import { availableLocales } from './i18n/utils';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const customEditorConfig: LexicalEditorProps = {};

export const lexicalEditorConfig = {
  ...defaultEditorConfig,
  features: [...defaultEditorFeatures],
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Tools,
    Categories,
    BlogParagraphs,
    Blogs,
    Projects,
    Skills,
    CareerSteps,
    Profiles,
    Links,
    Testimonials,
    Messages,
    FAQs,
    Legals,
  ],
  localization: {
    locales: [...availableLocales],
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
        forcePathStyle: true,
      },
    }),
  ],
});
