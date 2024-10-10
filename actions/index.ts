'use server';

import { generateBlogDetail, generateCareerSteps, generateCreatedMessage, generateFAQs, generateLegal, generateLegals, generateLinks, generateProfile, generateProjects, generateSkills, generateTestimonials, sandBoxPipe } from '@/mock/data';
import { Effect } from 'effect';
import { initializeContainer } from '../di/container';
import { Blog } from './entities/models/blog';
import { LegalDto } from './entities/models/legal';
import { CreateMessageDto } from './entities/models/message';
import { createMessageController } from './interface-adapters/controllers/create-message.controller';
import { getActiveProfileController } from './interface-adapters/controllers/get-active-profile.controller';
import { getBlogBySlugController } from './interface-adapters/controllers/get-blog-by-slug.controller';
import { getCareerStepsController } from './interface-adapters/controllers/get-career-steps.controller';
import { getFAQsController } from './interface-adapters/controllers/get-faqs.controller';
import { getLegalByTypeController } from './interface-adapters/controllers/get-legal-by-type.controller';
import { getLegalsController } from './interface-adapters/controllers/get-legals.controller';
import { getLinksController } from './interface-adapters/controllers/get-links.controller';
import { getPageViewsForBlogController } from './interface-adapters/controllers/get-page-views-for-blog.controller';
import { getPageViewsController } from './interface-adapters/controllers/get-page-views.controller';
import { getProfileBySlugController } from './interface-adapters/controllers/get-profile-by-slug.controller';
import { getProjectsController } from './interface-adapters/controllers/get-projects.controller';
import { getSkillsController } from './interface-adapters/controllers/get-skills.controller';
import { getTestimonialsController } from './interface-adapters/controllers/get-testimonials.controller';
import { incrementPageViewsForSlugController } from './interface-adapters/controllers/increment-page-views-for-slug.controller';

initializeContainer();

export async function getActiveProfile() {
  return await Effect.runPromise(
    getActiveProfileController()
      .pipe(sandBoxPipe(generateProfile))
  );
}

export async function getProjects() {
  return await Effect.runPromise(
    getProjectsController()
      .pipe(sandBoxPipe(generateProjects))
  );
}

export async function getBlogBySlug(slug: string) {
  return await Effect.runPromise(
    getBlogBySlugController(slug)
      .pipe(sandBoxPipe(generateBlogDetail))
  );
}

export async function getProfileBySlug(slug: string) {
  return await Effect.runPromise(
    getProfileBySlugController(slug)
      .pipe(sandBoxPipe(generateProfile))
  );
}

export async function getSkills() {
  return await Effect.runPromise(
    getSkillsController()
      .pipe(sandBoxPipe(generateSkills))
  );
}

export async function getCareerSteps() {
  return await Effect.runPromise(
    getCareerStepsController()
      .pipe(sandBoxPipe(generateCareerSteps))
  );
}

export async function getLinks() {
  return await Effect.runPromise(
    getLinksController()
      .pipe(sandBoxPipe(generateLinks))
  );
}

export async function getTestimonials() {
  return await Effect.runPromise(
    getTestimonialsController()
      .pipe(sandBoxPipe(generateTestimonials))
  );
}

export async function getLegals() {
  return await Effect.runPromise(
    getLegalsController()
      .pipe(sandBoxPipe(generateLegals))
  );
}

export async function getLegalByType(type: LegalDto['type']) {
  return await Effect.runPromise(
    getLegalByTypeController(type)
      .pipe(sandBoxPipe(() => generateLegal(type)))
  );
}

export async function getFAQs() {
  return await Effect.runPromise(
    getFAQsController()
      .pipe(sandBoxPipe(generateFAQs))
  );
}

export async function createMessage(message: CreateMessageDto) {
  return await Effect.runPromise(
    createMessageController(message)
      .pipe(sandBoxPipe(generateCreatedMessage))
  );
}

export async function getPageViews(blogs: Array<Blog>) {
  return await Effect.runPromise(getPageViewsController(blogs));
}

export async function getPageViewsForBlog(blog: Blog) {
  return await Effect.runPromise(getPageViewsForBlogController(blog));
}

export async function incrementPageViewsForSlug(slug: string, ip?: string | null) {
  return await Effect.runPromise(incrementPageViewsForSlugController(slug, ip ? ip : undefined));
}
