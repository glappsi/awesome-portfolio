import { generateCareerStepDtos, generateFAQs, generateLinkDtos, generateProfileDto, generateSkillDtos, generateTestimonialDtos } from '@/mock/data';
import { injectable } from 'inversify';
import { IProfilesRepository } from '../../application/repositories/profiles.repository.interface';
import { CareerStepDto } from '../../entities/models/career-step';
import { FAQDto } from '../../entities/models/faq';
import { LinkDto } from '../../entities/models/link';
import { ProfileDto } from '../../entities/models/profile';
import { SkillDto } from '../../entities/models/skill';
import { TestimonialDto } from '../../entities/models/testimonial';

@injectable()
export class MockProfilesRepository implements IProfilesRepository {
  async getActiveProfile(): Promise<ProfileDto> {
    return generateProfileDto();
  }

  async getProfile(slug: string): Promise<ProfileDto> {
    return generateProfileDto();
  }

  async getSkills(): Promise<Array<SkillDto>> {
    return generateSkillDtos();
  }

  async getCareerSteps(): Promise<Array<CareerStepDto>> {
    return generateCareerStepDtos();
  }

  async getLinks(): Promise<Array<LinkDto>> {
    return generateLinkDtos();
  }

  async getTestimonials(): Promise<Array<TestimonialDto>> {
    return generateTestimonialDtos();
  }

  async getFAQs(): Promise<Array<FAQDto>> {
    return generateFAQs();
  }
}
