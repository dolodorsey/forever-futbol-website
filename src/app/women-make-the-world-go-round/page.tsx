import type { Metadata } from "next";
import { WomenMuseumView } from "@/components/MuseumViews";

export const metadata: Metadata = {
  title: "Women Make the World Go Round — Scented Flowers",
  description: "A museum celebrating women’s history, achievement, influence and cultural impact.",
};

export default function WomenMuseumPage() {
  return <WomenMuseumView />;
}
