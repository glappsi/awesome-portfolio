import { CareerStep } from '../../entities/models/career-step';
import { Link } from '../../entities/models/link';
import { Profile } from '../../entities/models/profile';
import { Skill } from '../../entities/models/skill';

export interface IProfilesRepository {
  getActiveProfile(): Promise<Profile>;
  getProfile(slug: string): Promise<Profile>;
  getSkills(): Promise<Array<Skill>>;
  getCareerSteps(): Promise<Array<CareerStep>>;
  getLinks(): Promise<Array<Link>>;
}