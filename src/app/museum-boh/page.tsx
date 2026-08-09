import type { Metadata } from "next";
import MuseumBOH from "@/components/MuseumBOH";

export const metadata: Metadata = {
  title: "Museum Command Center — Internal",
  description: "Internal Scented Flowers museum operations.",
  robots: { index: false, follow: false, nocache: true },
};

export default function MuseumBOHPage(){
  return <MuseumBOH />;
}
