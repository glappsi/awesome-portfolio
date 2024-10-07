import { CareerStepDto } from '../../entities/models/career-step';
import { LinkDto } from '../../entities/models/link';
import { ProfileDto } from '../../entities/models/profile';
import { SkillDto } from '../../entities/models/skill';
import { TestimonialDto } from '../../entities/models/testimonial';

export interface IProfilesRepository {
  getActiveProfile(): Promise<ProfileDto>;
  getProfile(slug: string): Promise<ProfileDto>;
  getSkills(): Promise<Array<SkillDto>>;
  getCareerSteps(): Promise<Array<CareerStepDto>>;
  getLinks(): Promise<Array<LinkDto>>;
  getTestimonials(): Promise<Array<TestimonialDto>>;
}