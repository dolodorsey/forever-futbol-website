# Scented Flowers standalone production

Public app for the Scented Flowers museum family.

## Production architecture
- Vercel project: `scented-flowers` (`prj_o0jlBLIdWfgyXcNqZduQJvRaK95r`)
- Canonical production: `https://scented-flowers.vercel.app`
- Supabase project: KOLLECTIVE BOH (`wfkohcwxxsrhcxhepfql`)
- Public visual catalog: `museum_public_visuals_v2`
- Canonical public visual collection: `museum-v2`
- Legacy `/site/` and older source visuals are never selected for the public museum experience.
- Production visuals resolve from the verified Supabase V2 CDN catalog.

## Public content rules
- No public Season One / annual honoree roster.
- No spoiler directory or person-level current-edition pages.
- Positioning: different every year, discovered inside.
- Forever Futbol remains a separate production museum and is not modified by this app.

## Brand motion language
- Scented Flowers: botanical architecture / bloom / ceremonial gold.
- Living Legends: stone + gold growth / prestige / Hall of Honor.
- Fallen Stars: halo / celestial light / memorial stars.
- Women Make the World Go Round: orbit / ribbon / flowing pink-gold movement.

## Deployment QA
Confirm all four routes render, all V2 images return 200 from Supabase, no `/site/` image references remain in `app.js`, no current honoree names appear in public source, and `prefers-reduced-motion` disables decorative animation.
