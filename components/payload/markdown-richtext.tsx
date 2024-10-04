"use client";

import './icon-select.scss';
import * as React from 'react';
import { useField } from '@payloadcms/ui';
import { RichTextField } from '@payloadcms/richtext-lexical/client';
import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { createHeadlessEditor } from '@lexical/headless';
import {
  getEnabledNodes,
} from '@payloadcms/richtext-lexical'

type MarkdownRichTextFieldProps = {
  field: { name: string };
}

export const MarkdownRichTextField: React.FC<MarkdownRichTextFieldProps> = ({ field, ...props }) => {
  console.log(JSON.stringify(field, null, 2));
  const markdownField = `_${field?.name}`;
  const { value: markdownValue, setValue: setMarkdownValue, ...rest } = useField<string>({ path: field?.name });
  const { value: richTextValue, setValue: setRichTextValue } = useField<any>({ path: markdownField });
  // const headlessEditor = createHeadlessEditor({
  //   nodes: getEnabledNodes({
  //     editorConfig: sanitizeClient
  //   }),
  // })

  // React.useEffect(() => {
  //   if (!markdownValue) {
  //     return;
  //   }

  //   setRichTextValue($convertFromMarkdownString(markdownValue, TRANSFORMERS));
  // }, [markdownValue]);

  // React.useEffect(() => {
  //   setMarkdownValue($convertToMarkdownString(TRANSFORMERS));
  // }, [richTextValue]);

  return (
    <RichTextField field={field as any} {...(props as any)} />
  );
}
