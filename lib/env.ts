console.log('[Startup]: If you are running this for the first time, please have a look into the README.md.');

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isTesting = process.env.NODE_ENV === 'test';
export const isProduction = process.env.NODE_ENV === 'production';
export const isSandboxed = process.env.DISABLE_SANDBOX !== '1';

export const host = process.env.APP_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || (!isProduction ? 'localhost:3000' : undefined);
export const isLocalhost = host?.includes('localhost');

if (!host) {
  throw new Error('[ENV missing]: configure APP_URL (hostname). If you are building it locally, you can use localhost:3000.');
}

export const protocol = isLocalhost ? 'http' : 'https';

export const url = isLocalhost ? `${protocol}://${host}` : `${protocol}://${host}`;

export const payloadSecret = process.env.PAYLOAD_SECRET;

function removeParams(postgresUrl: string) {
  console.warn('[POSTGRES_URL]: unsafe ssl handling, remove this (env.ts) and use a real certificate on production environments.');
  const url = new URL(postgresUrl);
  url.search = ''; // Remove the search parameters
  return url.toString();
}
export const databaseUri = process.env.POSTGRES_URL ? removeParams(process.env.POSTGRES_URL) : process.env.POSTGRES_URL;

export const payloadEnabled = !!(process.env.POSTGRES_URL && process.env.PAYLOAD_SECRET);

if (!payloadEnabled) {
  console.warn('[ENV missing]: POSTGRES_URL and PAYLOAD_SECRET not configured. Running in test mode.')
}

export const s3Enabled = !!(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY && process.env.S3_ENDPOINT);
export const s3Config = {
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
};
export const s3Bucket = process.env.S3_BUCKET;

export const useRemoteImages = process.env.REMOTE_IMAGES === '1' && !isLocalhost;

export const smtpEnabled = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

export const smtpTransportOptions = {
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

if (smtpEnabled && !process.env.EMAIL_RECIPIENT) {
  console.warn('[ENV missing]: Skipping Email feature, configure EMAIL_RECIPIENT to send notifications.');
}

export const smtpFrom = process.env.EMAIL_FROM || `info@${host}`;
export const smtpFromName = process.env.EMAIL_FROM_NAME || host;
export const smtpRecipient = process.env.EMAIL_RECIPIENT;

export const upstashEnabled = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

export const bannerUrl = process.env.BANNER_URL;