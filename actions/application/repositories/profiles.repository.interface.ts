import { CareerStep } from '../../entities/models/career-step';
import { Profile } from '../../entities/models/profile';
import { Skill } from '../../entities/models/skill';

export interface IProfilesRepository {
  getProfile(slug: string): Promise<Profile>;
  getSkills(): Promise<Array<Skill>>;
  getCareerSteps(): Promise<Array<CareerStep>>;
}