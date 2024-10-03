import { injectable } from 'inversify';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { IProfilesRepository } from '../../application/repositories/profiles.repository.interface';
import { Profile } from '../../entities/models/profile';
import { Skill } from '../../entities/models/skill';
import { CareerStep } from '../../entities/models/career-step';
import { Link } from '../../entities/models/link';

@injectable()
export class PayloadProfilesRepository implements IProfilesRepository {
  _getPayload() {
    return getPayloadHMR({ config });
  }

  constructor() {}

  async getActiveProfile(): Promise<Profile> {
    const payload = await this._getPayload();
    const blog = await payload.find({
      collection: 'profiles',
      active: true
    });

    return blog.docs?.[0] as Profile;
  }

  async getProfile(slug: string): Promise<Profile> {
    const payload = await this._getPayload();
    const blog = await payload.find({
      collection: 'profiles',
      slug
    });

    return blog.docs?.[0] as Profile;
  }

  async getSkills(): Promise<Array<Skill>> {
    const payload = await this._getPayload();
    const skills = await payload.find({
      collection: 'skills',
    });

    return skills.docs as Array<Skill>;
  }

  async getCareerSteps(): Promise<Array<CareerStep>> {
    const payload = await this._getPayload();
    const careerSteps = await payload.find({
      collection: 'career-steps',
      sort: '-start'
    });

    return careerSteps.docs as Array<CareerStep>;
  }

  async getLinks(): Promise<Array<Link>> {
    const payload = await this._getPayload();
    const links = await payload.find({
      collection: 'links',
    });

    return links.docs as Array<Link>;
  }
}