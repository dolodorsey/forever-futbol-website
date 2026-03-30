import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forever Futbol — The Museum of the Beautiful Game",
  description: "A premium museum-sport exploration experience. History, culture, and the art of football.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Museum",
              "name": "Forever Futbol Museum",
              "description": "Atlanta's first immersive soccer culture museum.",
              "url": "https://foreverfutbol.museum",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Atlanta",
                "addressRegion": "GA",
                "addressCountry": "US"
              },
              "openingHoursSpecification": [{
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Friday", "Saturday", "Sunday"],
                "opens": "12:00",
                "closes": "21:00",
                "validFrom": "2026-05-29",
                "validThrough": "2026-07-06"
              }],
              "organizer": {
                "@type": "Organization",
                "name": "The Kollective Hospitality Group",
                "url": "https://doctordorsey.com"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
