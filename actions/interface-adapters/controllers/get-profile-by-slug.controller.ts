import { Effect } from 'effect';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Profile } from '../../entities/models/profile';
import { ProfileNotFoundError } from '../../entities/errors/profile-not-found.error';
import { getProfileBySlugUseCase } from '../../application/use-cases/get-profile-by-slug.use-case';
import { staticImage } from '@/lib/images';

function presenter(profile: Profile) {
  return {
    ...profile,
    image: staticImage(profile.image),
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
