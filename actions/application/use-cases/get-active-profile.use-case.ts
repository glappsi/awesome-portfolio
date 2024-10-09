import { Effect } from 'effect';
import { getInjection } from '@/di/container';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { ProfileNotFoundError } from '../../entities/errors/profile-not-found.error';
import { Profile, profileSchema } from '../../entities/models/profile';

export function getActiveProfileUseCase(): Effect.Effect<
  Profile,
  ProfileNotFoundError | ZodParseError
> {
  const repository = getInjection('IProfilesRepository');

  const program = Effect.tryPromise({
    async try() {
      const profile = await repository.getActiveProfile();
      if (!profile) {
        throw new ProfileNotFoundError();
      }

      return profile;
    },
    catch(error: unknown) {
      return new ProfileNotFoundError({
        originalError: error,
      });
    },
  });

  const parseProfileEffect = (profile: unknown) =>
    Effect.try({
      try() {
        return profileSchema.parse(profile);
      },
      catch(_error: unknown) {
        return new ZodParseError('Profile', {
          originalError: _error,
          data: profile,
        });
      },
    });

  return program.pipe(Effect.flatMap(parseProfileEffect));
}
