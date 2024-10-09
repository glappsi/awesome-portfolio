import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { IProfilesRepository } from '../../application/repositories/profiles.repository.interface';
import { CareerStepDto } from '../../entities/models/career-step';
import { ProfileDto } from '../../entities/models/profile';
import { SkillDto } from '../../entities/models/skill';
import { LinkDto } from '../../entities/models/link';
import { TestimonialDto } from '../../entities/models/testimonial';
import { getSafeLocale } from '@/i18n/utils';
import { FAQDto } from '../../entities/models/faq';

@injectable()
export class PayloadProfilesRepository implements IProfilesRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async getActiveProfile(): Promise<ProfileDto> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const blog = await payload.find({
      collection: 'profiles',
      locale,
      where: {
        active: {
          equals: true,
        },
      },
    });

    return blog.docs?.[0] as ProfileDto;
  }

  async getProfile(slug: string): Promise<ProfileDto> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const blog = await payload.find({
      collection: 'profiles',
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return blog.docs?.[0] as ProfileDto;
  }

  async getSkills(): Promise<Array<SkillDto>> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const skills = await payload.find({
      collection: 'skills',
      sort: 'order',
      limit: 0,
      locale,
    });

    return skills.docs as Array<SkillDto>;
  }

  async getCareerSteps(): Promise<Array<CareerStepDto>> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const careerSteps = await payload.find({
      collection: 'career-steps',
      sort: '-start',
      locale,
    });

    return careerSteps.docs as Array<CareerStepDto>;
  }

  async getLinks(): Promise<Array<LinkDto>> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const links = await payload.find({
      collection: 'links',
      locale,
      where: {
        showInNavigation: {
          equals: true,
        },
      },
    });

    return links.docs as Array<LinkDto>;
  }

  async getTestimonials(): Promise<Array<TestimonialDto>> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const skills = await payload.find({
      collection: 'testimonials',
      locale,
    });

    return skills.docs as Array<TestimonialDto>;
  }

  async getFAQs(): Promise<Array<FAQDto>> {
    const payload = await this._getPayload();
    const locale = await getSafeLocale();
    const faqs = await payload.find({
      collection: 'faqs',
      locale,
    });

    return faqs.docs as Array<FAQDto>;
  }
}
