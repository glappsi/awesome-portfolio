"use server";

import { Effect } from "effect";
import { initializeContainer } from '../di/container';
import { getHeroPageController } from './interface-adapters/controllers/get-hero-page.controller';

initializeContainer();

export async function getHeroPage() {
  return await Effect.runPromise(getHeroPageController());
}