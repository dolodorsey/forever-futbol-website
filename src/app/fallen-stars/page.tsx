import type { Metadata } from "next";
import { FallenStarsView } from "@/components/MuseumViews";

export const metadata: Metadata = {
  title: "Fallen Stars — Scented Flowers",
  description: "A museum preserving the stories, achievements and cultural impact of icons who have passed away.",
};

export default function FallenStarsPage() {
  return <FallenStarsView />;
}
