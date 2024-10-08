import { Effect } from "effect";
import { getFAQsUseCase } from '../../application/use-cases/get-faqs.use-case';
import { FAQ } from '../../entities/models/faq';

function presenter(faqs: Array<FAQ>) {
  return [
    ...faqs
  ];
}

export function getFAQsController(): Effect.Effect<ReturnType<typeof presenter>> {
  return Effect.map(
    getFAQsUseCase(), 
    (faqs) => presenter(faqs)
  );
}