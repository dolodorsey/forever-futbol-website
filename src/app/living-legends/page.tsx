import type { Metadata } from "next";
import { LivingLegendsView } from "@/components/MuseumViews";

export const metadata: Metadata = {
  title: "Living Legends — Scented Flowers",
  description: "A museum honoring living cultural legends and giving people their flowers while they can still receive them.",
};

export default function LivingLegendsPage() {
  return <LivingLegendsView />;
}
