import { Effect } from "effect"
import { getInjection } from '@/di/container';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { LinksNotFoundError } from '../../entities/errors/links-not-found.error';
import { Link, linkListSchema } from '../../entities/models/link';

export function getLinksUseCase(): Effect.Effect<Array<Link>, LinksNotFoundError | ZodParseError> {
  const repository = getInjection('IProfilesRepository');

  const program = Effect.tryPromise({
    async try() {
      const links = await repository.getLinks();
      if (!links) {
        throw new LinksNotFoundError();
      }

      return links;
    },
    catch(error: unknown) {
      return new LinksNotFoundError({
        originalError: error
      })
    }
  });

  const parseLinksEffect = (links: unknown) =>
    Effect.try({
      try() {
        return linkListSchema.parse(links);
      },
      catch(_error: unknown) {
        return new ZodParseError('Links', {
          originalError: _error,
          data: links
        });
      },
    });

  return program.pipe(Effect.flatMap(parseLinksEffect));
}