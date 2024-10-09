import { Effect } from 'effect';
import { getTestimonialsUseCase } from '../../application/use-cases/get-testimonials.use-case';
import { TestimonialsNotFoundError } from '../../entities/errors/testimonials-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Testimonial } from '../../entities/models/testimonial';

function presenter(testimonials: Array<Testimonial>) {
  return [
    ...testimonials
  ];
}

export function getTestimonialsController(): Effect.Effect<
  ReturnType<typeof presenter>,
  TestimonialsNotFoundError | ZodParseError
> {
  return Effect.map(getTestimonialsUseCase(), (testimonials) =>
    presenter(testimonials),
  );
}
