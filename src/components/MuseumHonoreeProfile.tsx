import { notFound } from "next/navigation";
import { FALLEN_HERO, FALLEN_GALLERY } from "./museumVisualsFallen";
import { LIVING_HERO, LIVING_GALLERY } from "./museumVisualsLiving";
import { WOMEN_HERO, WOMEN_GALLERY } from "./museumVisualsWomen";

const SUPABASE_URL = "https://wfkohcwxxsrhcxhepfql.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indma29oY3d4eHNyaGN4aGVwZnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMzMxODUsImV4cCI6MjA4MjkwOTE4NX0.e78lphH3WlRtWP0M9egyvFCLNVW9rgJiOBy9-ZZC9Ao";

type Profile = {
  museum_slug: string;
  slug: string;
  display_name: string;
  season: string;
  overview: string;
  timeline: Array<{label:string;body:string}>;
  accomplishments: string[];
  artifacts: string[];
  awards: string[];
  media: string[];
  quotes: string[];
  impact: string[];
  did_you_know: string[];
  related_people: string[];
  gallery: string[];
  curatorial_status: string;
  metadata: Record<string, unknown>;
};

const museumTheme: Record<string, {name:string; eyebrow:string; accent:string; accent2:string; paper:string; hero:string; gallery:string; note:string}> = {
  "living-legends": { name:"Living Legends", eyebrow:"GIVING THEM THEIR FLOWERS", accent:"#d8a62d", accent2:"#f4d77c", paper:"#f4eee2", hero:LIVING_HERO, gallery:LIVING_GALLERY, note:"A living archive. Recognition in real time." },
  "fallen-stars": { name:"Fallen Stars", eyebrow:"LEGENDS LIVE FOREVER", accent:"#d7aa45", accent2:"#f8edcf", paper:"#f5efe2", hero:FALLEN_HERO, gallery:FALLEN_GALLERY, note:"A remembrance archive built around legacy, impact and cultural memory." },
  "women-make-the-world-go-round": { name:"Women Make the World Go Round", eyebrow:"HER STORY · OUR WORLD", accent:"#d8949a", accent2:"#e7bd64", paper:"#f7e7e4", hero:WOMEN_HERO, gallery:WOMEN_GALLERY, note:"Influence, achievement, leadership and the doors opened for others." },
};

async function getProfile(museumSlug:string, slug:string): Promise<Profile | null> {
  const url = `${SUPABASE_URL}/rest/v1/museum_honoree_profiles?select=*&museum_slug=eq.${encodeURIComponent(museumSlug)}&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`;
  const res = await fetch(url, { headers:{ apikey:SUPABASE_ANON, Authorization:`Bearer ${SUPABASE_ANON}` }, cache:"no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) && data[0] ? data[0] : null;
}

function ListSection({number,title,items,empty}:{number:string;title:string;items:string[];empty:string}) {
  return <section className="profile-section"><div className="section-no">{number}</div><div><h2>{title}</h2>{items?.length ? <ul>{items.map((x,i)=><li key={`${x}-${i}`}>{x}</li>)}</ul> : <p className="archive-note">{empty}</p>}</div></section>;
}

export async function MuseumHonoreeProfile({ museumSlug, slug }:{museumSlug:string;slug:string}) {
  const profile = await getProfile(museumSlug, slug);
  const theme = museumTheme[museumSlug];
  if (!profile || !theme) notFound();
  const archiveNote = typeof profile.metadata?.archive_note === "string" ? profile.metadata.archive_note : "This profile is live while source-cleared archival material continues to be added.";
  return <main className="honoree-profile" style={{"--accent":theme.accent,"--accent2":theme.accent2,"--paper":theme.paper} as React.CSSProperties}>
    <style>{css}</style>
    <nav><a href="/scented-flowers">SCENTED FLOWERS</a><a className="museum" href={`/${museumSlug}`}>{theme.name}</a><a href={`/${museumSlug}#digital-exhibits`}>SEASON ONE</a></nav>
    <header className="profile-hero">
      <img src={theme.hero} alt="" aria-hidden="true"/>
      <div className="shade"/>
      <div className="hero-copy"><span>{theme.eyebrow}</span><small>{profile.season} · DIGITAL EXHIBIT</small><h1>{profile.display_name}</h1><p>{profile.overview}</p><div className="hero-actions"><a href="#journey">Enter the Story ↓</a><a href={`/${museumSlug}#visit`}>Plan a Visit</a></div></div>
    </header>

    <section className="profile-intro"><div><span>THE PROFILE</span><h2>A permanent digital doorway into the museum archive.</h2></div><div><p>{theme.note}</p><p className="archive-note">{archiveNote}</p><div className="status"><b>CURATORIAL STATUS</b><span>{profile.curatorial_status.replaceAll("_"," ")}</span></div></div></section>

    <section className="timeline" id="journey"><div className="timeline-head"><span>01 / LIFE JOURNEY</span><h2>The journey, built in layers.</h2></div><div className="timeline-grid">{profile.timeline?.map((x,i)=><article key={x.label}><small>{String(i+1).padStart(2,"0")}</small><h3>{x.label}</h3><p>{x.body}</p></article>)}</div></section>

    <section className="visual"><img src={theme.gallery} alt={`${theme.name} gallery concept`}/><div><span>THE PHYSICAL + DIGITAL ARCHIVE</span><h2>Biography becomes atmosphere.</h2><p>The digital exhibit mirrors the museum model: biography, artifacts, media, accolades, relationships, discovery and impact are organized into one evolving story rather than a single static plaque.</p></div></section>

    <div className="profile-sections">
      <ListSection number="02" title="Accomplishments" items={profile.accomplishments} empty="Verified accomplishments are being source-checked before publication."/>
      <ListSection number="03" title="Artifacts + Memorabilia" items={profile.artifacts} empty="Artifact records are in rights and provenance review."/>
      <ListSection number="04" title="Awards + Accolades" items={profile.awards} empty="Awards are published after source verification."/>
      <ListSection number="05" title="Audio + Video" items={profile.media} empty="Media is added only when exhibition and digital rights are cleared."/>
      <ListSection number="06" title="Words + Quotes" items={profile.quotes} empty="Direct quotes remain unpublished until a source and usage basis are attached."/>
      <ListSection number="07" title="Impact" items={profile.impact} empty="Impact notes are being curated."/>
      <ListSection number="08" title="What You Didn’t Know" items={profile.did_you_know} empty="Facts in this section require editorial verification before publication."/>
      <ListSection number="09" title="Family + Connected People" items={profile.related_people} empty="Family, collaborators and connected figures are mapped after verification."/>
      <ListSection number="10" title="Gallery" items={profile.gallery} empty="Gallery assets are being cleared and cataloged."/>
    </div>

    <section className="profile-close"><div><span>CONTINUE THE EXPERIENCE</span><h2>{profile.display_name}</h2><p>{theme.note}</p></div><div><a className="primary" href={`/${museumSlug}#visit`}>Plan Your Visit</a><a href={`/${museumSlug}#digital-exhibits`}>Explore Season One</a></div></section>
  </main>;
}

const css = `
*{box-sizing:border-box}body{margin:0}.honoree-profile{background:#08080a;color:#fff;font-family:Arial,Helvetica,sans-serif;min-height:100vh}.honoree-profile nav{position:fixed;z-index:90;top:0;left:0;right:0;height:70px;padding:0 clamp(18px,5vw,70px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;background:rgba(5,5,6,.78);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.1)}.honoree-profile nav a{color:#fff;text-decoration:none;font-size:8px;font-weight:800;letter-spacing:.22em}.honoree-profile nav a:last-child{text-align:right}.honoree-profile nav .museum{font:18px Georgia,serif;letter-spacing:0}.profile-hero{height:100svh;min-height:700px;position:relative;display:flex;align-items:end;overflow:hidden}.profile-hero>img{position:absolute;inset:-3%;width:106%;height:106%;object-fit:cover;animation:push 18s ease-in-out infinite alternate}.profile-hero .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,5,6,.94),rgba(5,5,6,.65) 42%,rgba(5,5,6,.18)),linear-gradient(0deg,rgba(5,5,6,.96),transparent 60%)}.hero-copy{position:relative;z-index:2;padding:130px clamp(22px,6vw,96px) 90px;max-width:1100px}.hero-copy>span,.profile-intro span,.timeline-head span,.visual>div>span,.profile-close span{font-size:9px;letter-spacing:.34em;font-weight:800;color:var(--accent)}.hero-copy small{display:block;margin-top:18px;font-size:9px;letter-spacing:.18em;opacity:.55}.hero-copy h1{font:400 clamp(64px,10vw,150px)/.82 Georgia,serif;letter-spacing:-.055em;margin:22px 0}.hero-copy p{max-width:720px;font:20px/1.6 Georgia,serif;color:rgba(255,255,255,.72)}.hero-actions{display:flex;gap:10px;margin-top:28px}.hero-actions a,.profile-close a{min-height:48px;padding:0 24px;display:inline-flex;align-items:center;border:1px solid rgba(255,255,255,.3);color:#fff;text-decoration:none;font-size:9px;letter-spacing:.14em;text-transform:uppercase}.hero-actions a:first-child,.profile-close .primary{background:var(--accent);border-color:var(--accent);color:#0a0908}.profile-intro{padding:105px clamp(22px,6vw,96px);background:var(--paper);color:#15110c;display:grid;grid-template-columns:1fr 1fr;gap:8vw}.profile-intro h2,.timeline-head h2,.visual h2,.profile-close h2{font:400 clamp(45px,6vw,88px)/.95 Georgia,serif;letter-spacing:-.045em;margin:14px 0}.profile-intro>div:last-child>p:first-child{font:26px/1.45 Georgia,serif}.archive-note{font-size:13px;line-height:1.75;opacity:.58}.status{margin-top:24px;padding:16px 0;border-top:1px solid rgba(0,0,0,.16);display:flex;justify-content:space-between;gap:20px}.status b,.status span{font-size:8px;letter-spacing:.18em;text-transform:uppercase}.status span{color:#8d6925}.timeline{padding:105px clamp(22px,6vw,96px)}.timeline-head{max-width:900px;margin-bottom:45px}.timeline-grid{display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(255,255,255,.12);border-top:1px solid rgba(255,255,255,.12)}.timeline-grid article{min-height:260px;padding:26px;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12)}.timeline-grid small{color:var(--accent);font-size:9px}.timeline-grid h3{font:32px Georgia,serif;margin:75px 0 14px}.timeline-grid p{font-size:13px;line-height:1.75;color:rgba(255,255,255,.58)}.visual{height:min(85vh,850px);min-height:620px;position:relative;overflow:hidden}.visual>img{width:100%;height:100%;object-fit:cover}.visual:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,5,6,.88),rgba(5,5,6,.18) 65%)}.visual>div{position:absolute;z-index:2;left:clamp(22px,6vw,96px);bottom:80px;max-width:700px}.visual h2{font-size:clamp(45px,5vw,76px);margin:15px 0}.visual p{max-width:620px;line-height:1.8;color:rgba(255,255,255,.62)}.profile-sections{background:var(--paper);color:#17120d}.profile-section{padding:62px clamp(22px,6vw,96px);display:grid;grid-template-columns:120px 1fr;border-bottom:1px solid rgba(0,0,0,.13)}.section-no{font-size:9px;letter-spacing:.2em;color:#946d25}.profile-section h2{font:42px Georgia,serif;margin:0 0 20px}.profile-section ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.profile-section li{padding:17px;border:1px solid rgba(0,0,0,.12);font-size:13px;line-height:1.5;background:rgba(255,255,255,.42)}.profile-close{padding:100px clamp(22px,6vw,96px);display:flex;align-items:end;justify-content:space-between;gap:40px}.profile-close p{font:italic 22px Georgia,serif;color:var(--accent2)}.profile-close>div:last-child{display:flex;gap:10px;flex-wrap:wrap}@keyframes push{from{transform:scale(1)}to{transform:scale(1.055)}}@media(max-width:900px){.profile-intro{grid-template-columns:1fr}.timeline-grid{grid-template-columns:repeat(2,1fr)}.profile-section{grid-template-columns:1fr;gap:18px}.profile-close{align-items:flex-start;flex-direction:column}.honoree-profile nav{grid-template-columns:1fr auto}.honoree-profile nav .museum{display:none}}@media(max-width:620px){.hero-copy{padding:110px 18px 65px}.hero-copy h1{font-size:58px}.hero-copy p{font-size:17px}.hero-actions{flex-direction:column}.hero-actions a{width:100%;justify-content:center}.profile-intro,.timeline,.profile-close{padding:78px 18px}.timeline-grid,.profile-section ul{grid-template-columns:1fr}.timeline-grid article{min-height:190px}.timeline-grid h3{margin-top:45px}.visual{min-height:580px}.visual>div{left:18px;right:18px;bottom:55px}.profile-section{padding:48px 18px}.profile-close>div:last-child{width:100%}.profile-close a{width:100%;justify-content:center}}
`;
