import type { Metadata } from "next";
import { ScentedFlowersHome } from "@/components/MuseumPortfolio";

export const metadata: Metadata = {
  title: "Scented Flowers — A House of Cultural Museums",
  description: "The parent platform for Living Legends, Fallen Stars, Women Make the World Go Round, and Forever Futbol.",
};

export default function ScentedFlowersPage() {
  return <ScentedFlowersHome />;
}
