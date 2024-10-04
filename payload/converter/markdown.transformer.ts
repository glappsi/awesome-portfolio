import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { UploadServerNode } from '@payloadcms/richtext-lexical';
import { filter } from 'lodash';

export const BUILD_UPLOAD_TRANSFORMER = async (nodes: any) => {
  const uploadNodes = filter(nodes, n => n.type === 'upload');
  const documents: {[key: string]: any} = {};

  const payload = await getPayloadHMR({ config });
  for (const node of uploadNodes) {
    const uploadDocument = await payload.findByID({
      id: node.value,
      collection: node.relationTo,
    });
    documents[node.value] = uploadDocument;
  }

  return {
    type: "element",
    dependencies: [UploadServerNode],
    export: (node: any) => {
      if (node.getType() !== 'upload') {
        return null;
      }

      const { value } = node.getData();
      const document = documents?.[value?.toString()];
      if (!document) {
        return;
      }
  
      const url = (payload?.config?.serverURL || '') + document?.url
  
      if (!(document?.mimeType as string)?.startsWith('image')) {
        // Only images can be serialized as HTML
        return ``
      }
  
      return `<img src="${url}" alt="${document?.filename}" width="${document?.width}"  height="${document?.height}"/>`
    },
  }
}
