import { IconKeys, IconType } from '@/components/ui/icon';
import { z } from 'zod';
import { mediaSchema } from './media';

export const linkSchema = z.object({
  id: z.number(),
  title: z.string(),
  symbol: z.string().optional().nullable(),
  icon: z.enum(IconKeys as [IconType, ...IconType[]]),
  link: z.string().optional().nullable(),
  showInNavigation: z.boolean().optional().nullable(),
  hideOnMobile: z.boolean().optional().nullable(),
  isExternal: z.boolean().optional().nullable(),
  download: mediaSchema
    .optional()
    .nullable(),
});
export const linkListSchema = z.array(linkSchema);

export type Link = z.infer<typeof linkSchema>;
export type LinkDto = z.input<typeof linkSchema>;
