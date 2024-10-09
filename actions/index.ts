'use server';

import { Effect } from 'effect';
import { initializeContainer } from '../di/container';
import { getProjectsController } from './interface-adapters/controllers/get-projects.controller';
import { getBlogBySlugController } from './interface-adapters/controllers/get-blog-by-slug.controller';
import { getProfileBySlugController } from './interface-adapters/controllers/get-profile-by-slug.controller';
import { getSkillsController } from './interface-adapters/controllers/get-skills.controller';
import { getCareerStepsController } from './interface-adapters/controllers/get-career-steps.controller';
import { getLinksController } from './interface-adapters/controllers/get-links.controller';
import { getActiveProfileController } from './interface-adapters/controllers/get-active-profile.controller';
import { getTestimonialsController } from './interface-adapters/controllers/get-testimonials.controller';
import { createMessageController } from './interface-adapters/controllers/create-message.controller';
import { CreateMessageDto } from './entities/models/message';
import { getFAQsController } from './interface-adapters/controllers/get-faqs.controller';
import { getLegalsController } from './interface-adapters/controllers/get-legals.controller';
import { getLegalByTypeController } from './interface-adapters/controllers/get-legal-by-type.controller';
import { LegalDto } from './entities/models/legal';

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

export async function getTestimonials() {
  return await Effect.runPromise(getTestimonialsController());
}

export async function getLegals() {
  return await Effect.runPromise(getLegalsController());
}

export async function getLegalByType(type: LegalDto['type']) {
  return await Effect.runPromise(getLegalByTypeController(type));
}

export async function getFAQs() {
  return await Effect.runPromise(getFAQsController());
}

export async function createMessage(message: CreateMessageDto) {
  return await Effect.runPromise(createMessageController(message));
}
