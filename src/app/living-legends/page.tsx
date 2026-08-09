import type { Metadata } from "next";
import { LivingLegendsView } from "@/components/MuseumViews";

const socialImage = "https://wfkohcwxxsrhcxhepfql.supabase.co/storage/v1/object/public/museum-public/museums/living-legends/site/living_hero.webp";

export const metadata: Metadata = {
  title: "Living Legends — Give Them Their Flowers",
  description: "An immersive annual museum celebrating living cultural icons through story, art, artifacts, sound and recognition. The featured collection changes every year and is revealed inside.",
  keywords: ["Living Legends museum", "Scented Flowers", "cultural museum", "urban culture museum", "immersive museum", "touring museum"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Living Legends — Give Them Their Flowers",
    description: "A new annual museum collection. Different stories every year. The full lineup is discovered inside.",
    type: "website",
    images: [{ url: socialImage, width: 1600, height: 900, alt: "Living Legends museum experience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Legends — Give Them Their Flowers",
    description: "Different every year. Revealed when you enter.",
    images: [socialImage],
  },
};

export default function LivingLegendsPage() {
  return <LivingLegendsView />;
}
