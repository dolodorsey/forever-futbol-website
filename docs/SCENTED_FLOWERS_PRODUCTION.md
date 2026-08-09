# Scented Flowers production architecture

## Canonical public homes

- Scented Flowers: `https://scented-flowers.vercel.app/`
- Living Legends: `https://scented-flowers.vercel.app/living-legends`
- Fallen Stars: `https://scented-flowers.vercel.app/fallen-stars`
- Women Make the World Go Round: `https://scented-flowers.vercel.app/women-make-the-world-go-round`
- Forever Futbol remains standalone at `https://foreverfutbolmuseum.com/`.

The duplicate museum-family routes on the Forever Futbol project permanently redirect to the canonical Scented Flowers production site. Do not rebuild the Scented Flowers family under the Forever Futbol brand.

## Public visual rule

Use **only** Supabase collection `museum-v2` for the four Scented Flowers-family public experiences. Legacy `/site/` derivatives and `brand-assets/source` visuals are superseded and must not be selected for future public builds.

Canonical visual mapping is stored in `config/museum-v2-visuals.json` and in Supabase view `public.museum_public_visuals_v2`.

## Annual collection rule

Never publish the annual honoree roster or individual honoree profile routes. Public positioning is an evolving annual collection: different every year, discovered inside the museum. Curatorial names and research remain internal.

## Product behavior

The Scented Flowers-family public experience should remain cinematic, image-led, responsive and conversion-ready. Each child museum must maintain its own visual language and emotional temperature rather than sharing a recolored template.
