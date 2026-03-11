import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Forever Futbol — The Museum of the Beautiful Game", description: "A premium museum-sport exploration experience. History, culture, and the art of football." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
