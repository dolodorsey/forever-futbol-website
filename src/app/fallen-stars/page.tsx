import type { Metadata } from "next";
import { MuseumPage, museumConfigs } from "@/components/MuseumPortfolio";

export const metadata: Metadata = {
  title: "Fallen Stars — Scented Flowers",
  description: "A museum preserving the stories, achievements and cultural impact of icons who have passed away.",
};

export default function FallenStarsPage() {
  return <MuseumPage config={museumConfigs["fallen-stars"]} />;
}
