import { readdirSync } from 'fs';
import { getLocale } from 'next-intl/server';
import { join } from 'path';

const messagesPath = join(process.cwd(), 'messages');
const localeFiles = readdirSync(messagesPath);

const availableLocales = ['en'] as const;

const translateLocales = localeFiles
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.replace('.json', ''));

if (availableLocales.some(l => !translateLocales.includes(l))) {
  throw new Error('Locale specified which is not supported');
}

export type TAvailableLocale = typeof availableLocales[number];
export type TAvailableLocales = Array<TAvailableLocale>;

const defaultLocale = availableLocales[0];

export async function getSafeLocale(): Promise<TAvailableLocale> {
  try {
    return await getLocale() as TAvailableLocale;
  } catch (err) {
    console.warn(err);
    return defaultLocale;
  }
}

export {
  availableLocales,
  defaultLocale
};
