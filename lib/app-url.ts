export const isLocal = process.env.APP_URL?.includes('localhost');

export const protocol = isLocal ? 'http' : 'https';

export const url = isLocal ? `${protocol}://${process.env.APP_URL}:3000` : `${protocol}://${process.env.APP_URL}`;
