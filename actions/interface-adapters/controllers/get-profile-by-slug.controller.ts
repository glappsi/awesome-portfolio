import { Effect } from 'effect';
import { getProfileBySlugUseCase } from '../../application/use-cases/get-profile-by-slug.use-case';
import { ProfileNotFoundError } from '../../entities/errors/profile-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Profile } from '../../entities/models/profile';

function presenter(profile: Profile) {
  return {
    ...profile
  };
}

export function getProfileBySlugController(
  slug: string,
): Effect.Effect<
  ReturnType<typeof presenter>,
  ProfileNotFoundError | ZodParseError
> {
  return Effect.map(getProfileBySlugUseCase(slug), (profile) =>
    presenter(profile),
  );
}
