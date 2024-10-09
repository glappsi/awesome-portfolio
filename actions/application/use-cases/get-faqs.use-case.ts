import { Effect } from 'effect';
import { getInjection } from '@/di/container';
import { FAQ, faqListSchema } from '../../entities/models/faq';

export function getFAQsUseCase(): Effect.Effect<Array<FAQ>, never> {
  const repository = getInjection('IProfilesRepository');

  const program = Effect.promise(async () => {
    const faqs = await repository.getFAQs();
    if (!faqs) {
      return [] as Array<FAQ>;
    }

    return faqs;
  });

  return program.pipe(Effect.map(faqListSchema.parse));
}
