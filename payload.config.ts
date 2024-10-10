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

import { databaseUri, payloadSecret, s3Bucket, s3Config, s3Enabled, smtpEnabled, smtpFrom, smtpFromName, smtpTransportOptions } from '@/lib/env';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
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
  secret: payloadSecret || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  sharp,
  email: smtpEnabled ? nodemailerAdapter({
    defaultFromAddress: smtpFrom,
    defaultFromName: smtpFromName,
    // Nodemailer transportOptions
    transportOptions: smtpTransportOptions
  }) : undefined,
  plugins: [
    ...(s3Enabled ? [s3Storage({
      collections: {
        media: true,
      },
      bucket: s3Bucket!,
      config: s3Config,
    })] : []),
  ],
});
