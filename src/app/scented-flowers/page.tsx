import type { Metadata } from "next";
import { ScentedFlowersFinal } from "@/components/MuseumExperienceFinal";

export const metadata: Metadata = {
  title: "Scented Flowers — The Mother Museum",
  description: "The cultural museum house connecting Living Legends, Fallen Stars, Women Make the World Go Round, and Forever Futbol through distinct museum worlds and evolving annual collections.",
};

export default function ScentedFlowersPage() {
  return <ScentedFlowersFinal />;
}
