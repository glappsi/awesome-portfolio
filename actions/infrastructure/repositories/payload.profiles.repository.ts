import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { IProfilesRepository } from '../../application/repositories/profiles.repository.interface';
import { CareerStepDto } from '../../entities/models/career-step';
import { ProfileDto } from '../../entities/models/profile';
import { SkillDto } from '../../entities/models/skill';
import { LinkDto } from '../../entities/models/link';
import { TestimonialDto } from '../../entities/models/testimonial';

@injectable()
export class PayloadProfilesRepository implements IProfilesRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async getActiveProfile(): Promise<ProfileDto> {
    const payload = await this._getPayload();
    const blog = await payload.find({
      collection: 'profiles',
      where: {
        active: {
          equals: true
        }
      }
    });

    return blog.docs?.[0] as ProfileDto;
  }

  async getProfile(slug: string): Promise<ProfileDto> {
    const payload = await this._getPayload();
    const blog = await payload.find({
      collection: 'profiles',
      where: {
        slug: {
          equals: slug
        }
      }
    });

    return blog.docs?.[0] as ProfileDto;
  }

  async getSkills(): Promise<Array<SkillDto>> {
    const payload = await this._getPayload();
    const skills = await payload.find({
      collection: 'skills',
      sort: 'order',
      limit: 0
    });

    return skills.docs as Array<SkillDto>;
  }

  async getCareerSteps(): Promise<Array<CareerStepDto>> {
    const payload = await this._getPayload();
    const careerSteps = await payload.find({
      collection: 'career-steps',
      sort: '-start'
    });

    return careerSteps.docs as Array<CareerStepDto>;
  }

  async getLinks(): Promise<Array<LinkDto>> {
    const payload = await this._getPayload();
    const links = await payload.find({
      collection: 'links',
      where: {
        showInNavigation: {
          equals: true
        }
      }
    });

    return links.docs as Array<LinkDto>;
  }

  async getTestimonials(): Promise<Array<TestimonialDto>> {
    const payload = await this._getPayload();
    const skills = await payload.find({
      collection: 'testimonials',
    });

    return skills.docs as Array<TestimonialDto>;
  }
}