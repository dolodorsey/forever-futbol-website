"use client";

import { MuseumPage, museumConfigs } from "./MuseumPortfolio";

export function LivingLegendsView() {
  return <MuseumPage config={museumConfigs["living-legends"]} />;
}

export function FallenStarsView() {
  return <MuseumPage config={museumConfigs["fallen-stars"]} />;
}

export function WomenMuseumView() {
  return <MuseumPage config={museumConfigs["women-make-the-world-go-round"]} />;
}
