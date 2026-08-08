import type { Metadata } from "next";
import { MuseumPage, museumConfigs } from "@/components/MuseumPortfolio";

export const metadata: Metadata = {
  title: "Women Make the World Go Round — Scented Flowers",
  description: "A museum celebrating women’s history, achievement, influence and cultural impact.",
};

export default function WomenMuseumPage() {
  return <MuseumPage config={museumConfigs["women-make-the-world-go-round"]} />;
}
