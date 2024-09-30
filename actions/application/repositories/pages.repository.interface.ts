import { Page } from '../../entities/models/page';

export interface IPagesRepository {
  getHero(): Promise<Page>;
}