"use server";

import { Effect } from "effect";
import { initializeContainer } from '../di/container';
import { getHeroPageController } from './interface-adapters/controllers/get-hero-page.controller';
import { getProjectsController } from './interface-adapters/controllers/get-projects.controller';
import { getBlogBySlugController } from './interface-adapters/controllers/get-blog-by-slug.controller';

initializeContainer();

export async function getHeroPage() {
  return await Effect.runPromise(getHeroPageController());
}

export async function getProjects() {
  return await Effect.runPromise(getProjectsController());
}

export async function getBlogBySlug(slug: string) {
  return await Effect.runPromise(getBlogBySlugController(slug));
}