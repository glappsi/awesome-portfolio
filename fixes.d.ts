// declare module '@payloadcms/next/utilities' {
//   const getPayloadHMR: any;
// }

declare module '@payloadcms/next/views' {
  const NotFoundPage: any;
  const generatePageMetadata: any;
  const RootPage: any;
}

declare module '@payloadcms/next/routes' {
  const REST_DELETE: any;
  const REST_GET: any;
  const REST_OPTIONS: any;
  const REST_PATCH: any;
  const REST_POST: any;
  const GRAPHQL_POST: any;
  const GRAPHQL_PLAYGROUND_GET: any;
}

declare module '@payloadcms/next/layouts' {
  const RootLayout: any;
}

declare module '@payloadcms/next/css' {
}

declare module '@payloadcms/richtext-lexical/client' {
  const RichTextCell: any;
  const RichTextField: any;
}