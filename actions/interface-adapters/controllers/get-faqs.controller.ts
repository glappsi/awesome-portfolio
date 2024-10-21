import { Effect } from 'effect';
import { getFAQsUseCase } from '../../application/use-cases/get-faqs.use-case';
import { FAQsNotFoundError } from '../../entities/errors/faqs-not-found.error';
import { FAQ } from '../../entities/models/faq';

function presenter(faqs: Array<FAQ>) {
  return [...faqs];
}

export function getFAQsController(): Effect.Effect<
  ReturnType<typeof presenter>,
  FAQsNotFoundError
> {
  return Effect.map(getFAQsUseCase(), (faqs) => presenter(faqs));
}
