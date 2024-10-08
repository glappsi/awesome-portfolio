import { Effect } from "effect";
import { TestimonialsNotFoundError } from '../../entities/errors/testimonials-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Testimonial } from '../../entities/models/testimonial';
import { getTestimonialsUseCase } from '../../application/use-cases/get-testimonials.use-case';
import { staticImage } from '@/lib/images';

function presenter(testimonials: Array<Testimonial>) {
  return [
    ...testimonials.map(t => ({
      ...t,
      avatar: staticImage(t.avatar)
    }))
  ];
}

export function getTestimonialsController(): Effect.Effect<ReturnType<typeof presenter>, TestimonialsNotFoundError | ZodParseError> {
  return Effect.map(
    getTestimonialsUseCase(), 
    (testimonials) => presenter(testimonials)
  );
}