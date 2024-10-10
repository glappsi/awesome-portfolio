import { getInjection } from '@/di/container';
import { Effect } from 'effect';
import { TestimonialsNotFoundError } from '../../entities/errors/testimonials-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import {
  Testimonial,
  testimonialListSchema,
} from '../../entities/models/testimonial';

export function getTestimonialsUseCase(): Effect.Effect<
  Array<Testimonial>,
  TestimonialsNotFoundError | ZodParseError
> {
  const repository = getInjection('IProfilesRepository');

  const program = Effect.tryPromise({
    async try() {
      const testimonials = await repository.getTestimonials();
      if (!testimonials?.length) {
        throw new TestimonialsNotFoundError();
      }

      return testimonials;
    },
    catch(error: unknown) {
      return new TestimonialsNotFoundError({
        originalError: error && JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });
    },
  });

  const parseTestimonialsEffect = (testimonials: unknown) =>
    Effect.try({
      try() {
        return testimonialListSchema.parse(testimonials);
      },
      catch(_error: unknown) {
        return new ZodParseError('Testimonials', {
          originalError: _error && JSON.stringify(_error, Object.getOwnPropertyNames(_error)),
          data: testimonials,
        });
      },
    });

  return program.pipe(Effect.flatMap(parseTestimonialsEffect));
}
