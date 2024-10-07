import { Effect } from "effect";
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Profile } from '../../entities/models/profile';
import { ProfileNotFoundError } from '../../entities/errors/profile-not-found.error';
import { getActiveProfileUseCase } from '../../application/use-cases/get-active-profile.use-case';
import { staticImage } from '@/lib/server-utils';

function presenter(profile: Profile) {
  return {
    ...profile,
    image: staticImage(profile.image)
  }
}

export function getActiveProfileController(): Effect.Effect<ReturnType<typeof presenter>, ProfileNotFoundError | ZodParseError> {
  return Effect.map(
    getActiveProfileUseCase(),
    (profile) => presenter(profile)
  );
}