import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { FAQsNotFoundError } from '../../entities/errors/faqs-not-found.error';
import { FAQ, faqListSchema } from '../../entities/models/faq';

export function getFAQsUseCase(): Effect.Effect<Array<FAQ>, FAQsNotFoundError> {
  const repository = getInjection('IProfilesRepository');

  const program = Effect.tryPromise({
    async try() {
      const faqs = await repository.getFAQs();
      if (!faqs) {
        return [] as Array<FAQ>;
      }

      return faqs;
    },
    catch(error: unknown) {
      return new FAQsNotFoundError({
        originalError: error && JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
    },
  });

  return program.pipe(Effect.map(faqListSchema.parse));
}
