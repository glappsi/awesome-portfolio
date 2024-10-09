import { Effect } from 'effect';
import { getActiveProfileUseCase } from '../../application/use-cases/get-active-profile.use-case';
import { ProfileNotFoundError } from '../../entities/errors/profile-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Profile } from '../../entities/models/profile';

function presenter(profile: Profile) {
  return {
    ...profile,
  };
}

export function getActiveProfileController(): Effect.Effect<
  ReturnType<typeof presenter>,
  ProfileNotFoundError | ZodParseError
> {
  return Effect.map(getActiveProfileUseCase(), (profile) => presenter(profile));
}
