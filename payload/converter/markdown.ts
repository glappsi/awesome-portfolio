import { createServerFeature, getEnabledNodes, HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig, Field, FieldAffectingData, FieldBase, GlobalAfterReadHook } from 'payload'
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';
import { LexicalEditor } from 'lexical';
import { createHeadlessEditor } from '@lexical/headless'
import { get, isEqual } from 'lodash';
import { BUILD_UPLOAD_TRANSFORMER } from './markdown.transformer';

export const MarkdownConverterFeature = createServerFeature({
  feature: {},
  key: 'markdownConverter'
});

type LexicalEditorField = Field & {
  editor?: LexicalEditor & {
    editorConfig?: any;
  };
}

export const lexicalMarkdown = (contentName: string, markdownName: string): Field[] => {
  return [{
    name: contentName,
    type: 'richText',
    localized: true,
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [
        ...defaultFeatures,
        // The HTMLConverter Feature is the feature which manages the HTML serializers.
        // If you do not pass any arguments to it, it will use the default serializers.
        MarkdownConverterFeature(),
        HTMLConverterFeature({}),
      ],
    })
  }, {
    name: markdownName,
    type: 'code',
    admin: {
      language: 'markdown',
    }
  }]
}

export const lexicalMarkdownHook = (contentName: string, markdownName: string): Pick<CollectionConfig, 'hooks'> => {
  return {
    hooks: {
      beforeChange: [async ({
        collection,
        data,
        originalDoc,
        operation,
      }) => {
        console.log('before change triggered', originalDoc, data);
        const lexicalField = collection.fields.find(field => 'name' in field && field.name === contentName) as LexicalEditorField;
       if (!lexicalField?.editor) {
          console.error('[LEXICAL MD HOOK]: No Editor found!');
          return data;
        }
        if (!lexicalField?.editor?.editorConfig?.resolvedFeatureMap?.has('markdownConverter')) {
          console.error('[LEXICAL MD HOOK]: No markdownConverter found!');
          return data;
        }

        if ((!originalDoc || !isEqual(originalDoc[contentName], data?.[contentName])) && data?.[contentName]) {
          console.log('content changed', JSON.stringify(data[contentName], null, 2));
          const headlessEditor = createHeadlessEditor({
            nodes: getEnabledNodes({
              editorConfig: lexicalField?.editor?.editorConfig
            }),
          });
          const transformers = lexicalField.editor.editorConfig.features?.markdownTransformers || TRANSFORMERS;
          try {
            headlessEditor.setEditorState(headlessEditor.parseEditorState(data[contentName])) // This should commit the editor state immediately
            const UPLOAD_TRANSFORMER = await BUILD_UPLOAD_TRANSFORMER(get(data[contentName], 'root.children'));
            const markdown = await new Promise(resolve => headlessEditor.getEditorState().read(() => {
              resolve($convertToMarkdownString([...transformers, UPLOAD_TRANSFORMER]));
            }));
            data[markdownName] = markdown;
          } catch (e) {
            console.error({ err: e }, 'ERROR parsing editor state');
            return data;
          }
        } else if ((!originalDoc || originalDoc[markdownName] !== data?.[markdownName]) && data?.[markdownName]) {
          console.log('markdown changed', data[contentName]);
          const headlessEditor = createHeadlessEditor({
            nodes: getEnabledNodes({
              editorConfig: lexicalField?.editor?.editorConfig
            }),
          });
          const transformers = lexicalField.editor.editorConfig.features?.markdownTransformers || TRANSFORMERS;
          console.log('parse', getEnabledNodes({
            editorConfig: lexicalField?.editor?.editorConfig
          }), transformers);
          headlessEditor.update(() => { $convertFromMarkdownString(data[markdownName] || '', transformers); }, { discrete: true });

          // Do this if you then want to get the editor JSON
          const editorJSON = headlessEditor.getEditorState().toJSON();
          console.log('editorJSON', editorJSON, 'from', data[markdownName]);

          if (editorJSON?.root?.children?.length) {
            data[contentName] = editorJSON;
          }
        }

        return data;
      }]
    }
  };
};