if (!process.env.APP_URL) {
  throw new Error('[ENV missing]: configure APP_URL');
}

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('[ENV missing]: configure PAYLOAD_SECRET');
}

if (!process.env.DATABASE_URI) {
  throw new Error('[ENV missing]: configure DATABASE_URI');
}

export const isDevelopment = process.env.NODE_ENV === 'development';

export const isTesting = process.env.NODE_ENV === 'test';

export const useSandbox = process.env.ENABLE_SANDBOX === '1';

export const appUrl = process.env.APP_URL;

export const isLocal = process.env.APP_URL?.includes('localhost');

export const protocol = isLocal ? 'http' : 'https';

export const url = isLocal ? `${protocol}://${process.env.APP_URL}:3000` : `${protocol}://${process.env.APP_URL}`;

export const payloadSecret = process.env.PAYLOAD_SECRET;

export const databaseUri = process.env.DATABASE_URI;

export const s3Configured = process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY && process.env.S3_ENDPOINT;

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

export const useRemoteImages = process.env.REMOTE_IMAGES === '1';

export const smtpEnabled = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

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

export const smtpFrom = process.env.EMAIL_FROM || `info@${appUrl}`;
export const smtpFromName = process.env.EMAIL_FROM_NAME || appUrl;
export const smtpRecipient = process.env.EMAIL_RECIPIENT;