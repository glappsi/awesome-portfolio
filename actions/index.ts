"use server";

import { Effect } from "effect";
import { initializeContainer } from '../di/container';
import { getProjectsController } from './interface-adapters/controllers/get-projects.controller';
import { getBlogBySlugController } from './interface-adapters/controllers/get-blog-by-slug.controller';
import { getProfileBySlugController } from './interface-adapters/controllers/get-profile-by-slug.controller';
import { getSkillsController } from './interface-adapters/controllers/get-skills.controller';
import { getCareerStepsController } from './interface-adapters/controllers/get-career-steps.controller';
import { getLinksController } from './interface-adapters/controllers/get-links.controller';
import { getActiveProfileController } from './interface-adapters/controllers/get-active-profile.controller';

initializeContainer();

export async function getActiveProfile() {
  return await Effect.runPromise(getActiveProfileController());
}

export async function getProjects() {
  return await Effect.runPromise(getProjectsController());
}

export async function getBlogBySlug(slug: string) {
  return await Effect.runPromise(getBlogBySlugController(slug));
}

export async function getProfileBySlug(slug: string) {
  return await Effect.runPromise(getProfileBySlugController(slug));
}

export async function getSkills() {
  return await Effect.runPromise(getSkillsController());
}

export async function getCareerSteps() {
  return await Effect.runPromise(getCareerStepsController());
}

export async function getLinks() {
  return await Effect.runPromise(getLinksController());
}