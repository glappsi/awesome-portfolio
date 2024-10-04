/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    tools: Tool;
    categories: Category;
    'blog-paragraphs': BlogParagraph;
    blogs: Blog;
    projects: Project;
    skills: Skill;
    'career-steps': CareerStep;
    profiles: Profile;
    links: Link;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  locale: 'en';
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  needsLightBackground?: boolean | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tools".
 */
export interface Tool {
  id: number;
  name: string;
  displayName: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  name: string;
  displayName: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blog-paragraphs".
 */
export interface BlogParagraph {
  id: number;
  name: string;
  render?: ('html' | 'markdown') | null;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  markdown?: string | null;
  html?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogs".
 */
export interface Blog {
  id: number;
  title: string;
  slug: string;
  published?: boolean | null;
  author: string;
  authorImage?: (number | null) | Media;
  date: string;
  paragraphs?: (number | BlogParagraph)[] | null;
  type?: 'tech' | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
  id: number;
  title: string;
  description?: string | null;
  published?: boolean | null;
  start: string;
  end?: string | null;
  type?: ('profession' | 'hobby') | null;
  badge?: (number | null) | Media;
  blog?: (number | null) | Blog;
  categories?: (number | Category)[] | null;
  tools?: (number | Tool)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skills".
 */
export interface Skill {
  id: number;
  title: string;
  type?: ('profession' | 'soft') | null;
  categories?: (number | Category)[] | null;
  tools?: (number | Tool)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "career-steps".
 */
export interface CareerStep {
  id: number;
  title: string;
  company: string;
  description?: string | null;
  start: string;
  end?: string | null;
  projects?: (number | Project)[] | null;
  categories?: (number | Category)[] | null;
  tools?: (number | Tool)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "profiles".
 */
export interface Profile {
  id: number;
  name: string;
  description?: string | null;
  slug: string;
  image?: (number | null) | Media;
  longitude?: number | null;
  location?: string | null;
  latitude?: number | null;
  aboutMe?: string | null;
  active?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "links".
 */
export interface Link {
  id: number;
  title: string;
  icon: string;
  download?: (number | null) | Media;
  link?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'tools';
        value: number | Tool;
      } | null)
    | ({
        relationTo: 'categories';
        value: number | Category;
      } | null)
    | ({
        relationTo: 'blog-paragraphs';
        value: number | BlogParagraph;
      } | null)
    | ({
        relationTo: 'blogs';
        value: number | Blog;
      } | null)
    | ({
        relationTo: 'projects';
        value: number | Project;
      } | null)
    | ({
        relationTo: 'skills';
        value: number | Skill;
      } | null)
    | ({
        relationTo: 'career-steps';
        value: number | CareerStep;
      } | null)
    | ({
        relationTo: 'profiles';
        value: number | Profile;
      } | null)
    | ({
        relationTo: 'links';
        value: number | Link;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}