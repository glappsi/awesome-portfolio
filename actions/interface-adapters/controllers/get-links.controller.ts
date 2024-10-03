import { Effect } from "effect";
import { LinksNotFoundError } from '../../entities/errors/links-not-found.error';
import { ZodParseError } from '../../entities/errors/zod-parse.error';
import { Link } from '../../entities/models/link';
import { getLinksUseCase } from '../../application/use-cases/get-links.use-case';
import { IconType } from '@/components/ui/icon';

function presenter(links: Array<Link>) {
  return [
    ...links.map(l => ({
      ...l,
      icon: l.icon as IconType
    }))
  ];
}

export function getLinksController(): Effect.Effect<ReturnType<typeof presenter>, LinksNotFoundError | ZodParseError> {
  return Effect.map(
    getLinksUseCase(), 
    (links) => presenter(links)
  );
}