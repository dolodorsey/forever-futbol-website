import type { Metadata } from "next";
import { FallenStarsView } from "@/components/MuseumViews";

const socialImage = "https://wfkohcwxxsrhcxhepfql.supabase.co/storage/v1/object/public/museum-public/museums/fallen-stars/site/fallen_hero.webp";

export const metadata: Metadata = {
  title: "Fallen Stars — The Stars Still Shine",
  description: "An immersive annual remembrance museum preserving cultural legacy through story, artifacts, sound, art and reflection. Each year reveals a different collection inside.",
  keywords: ["Fallen Stars museum", "Scented Flowers", "memorial museum", "cultural legacy museum", "immersive museum", "touring museum"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Fallen Stars — The Stars Still Shine",
    description: "A different constellation of stories every year. The annual collection is discovered inside the museum.",
    type: "website",
    images: [{ url: socialImage, width: 1600, height: 900, alt: "Fallen Stars remembrance museum experience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fallen Stars — The Stars Still Shine",
    description: "Memory made monumental. Different every year. Revealed inside.",
    images: [socialImage],
  },
};

export default function FallenStarsPage() {
  return <FallenStarsView />;
}
