import { getRequestConfig } from 'next-intl/server';
import { availableLocales, TAvailableLocale } from './utils';

export default getRequestConfig(async () => {
  // With headers we cant statically create the page
  // const requestHeaders = headers();

  // Use Negotiator to negotiate the locale based on the Accept-Language header
  // const negotiator = new Negotiator({ headers: Object.fromEntries((await requestHeaders).entries()) });
  // const preferredLocales = negotiator.languages([...availableLocales]) as TAvailableLocales;
  
  const preferredLocales = [...availableLocales];

  // Choose the preferred locale or fallback to 'en' if no match is found
  const locale = (preferredLocales[0] || 'en') as TAvailableLocale;

  // Load the appropriate messages file for the negotiated locale
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
