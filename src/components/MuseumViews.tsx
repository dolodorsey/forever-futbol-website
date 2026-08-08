"use client";

import { MuseumPage, museumConfigs } from "./MuseumPortfolio";
import { MuseumEnhancements } from "./MuseumEnhancements";

function EnhancedMuseum({ slug }: { slug: "living-legends" | "fallen-stars" | "women-make-the-world-go-round" }) {
  const config = museumConfigs[slug];
  return <>
    <MuseumPage config={config} />
    <MuseumEnhancements
      museumSlug={config.slug}
      museumName={config.name}
      honorees={config.honorees}
      cities={config.cities}
      accent={config.accent}
      accent2={config.accent2}
    />
  </>;
}

export function LivingLegendsView() {
  return <EnhancedMuseum slug="living-legends" />;
}

export function FallenStarsView() {
  return <EnhancedMuseum slug="fallen-stars" />;
}

export function WomenMuseumView() {
  return <EnhancedMuseum slug="women-make-the-world-go-round" />;
}
