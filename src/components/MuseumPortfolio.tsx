"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

type MuseumConfig = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  mission: string;
  accent: string;
  accent2: string;
  ink: string;
  paper: string;
  mark?: string;
  motif: "flowers" | "stars" | "orbit";
  honorees: string[];
  experiences: string[];
  cities: string[];
  seasonNote?: string;
};

const commonExperiences = [
  "Champagne", "Art", "Biographies", "Plaques / Awards / Accolades",
  "What You Didn’t Know", "Related Family", "Speeches / Music / Video Clips",
  "Silent Headphones for Audio", "Lifesize Statues", "Life Journey Map",
  "Fun Fact", "Souvenir Shop",
];

export const museumConfigs: Record<string, MuseumConfig> = {
  "living-legends": {
    slug: "living-legends",
    name: "Living Legends",
    eyebrow: "A Scented Flowers Museum",
    tagline: "Giving them their flowers while they can smell them.",
    description: "A living tribute to the people whose talent, leadership and cultural influence helped shape the world we know today.",
    mission: "Living Legends celebrates remarkable achievements in real time — sharing stories, creating gratitude and inspiring future generations while the honorees are still here to receive the appreciation.",
    accent: "#e0aa2f", accent2: "#f5df95", ink: "#0a0907", paper: "#f8f1dc",
    mark: "/portfolio/living-legends.svg", motif: "flowers",
    honorees: ["Shaq", "Drake", "Lil Wayne", "Nicki Minaj", "Tyler Perry", "Dave Chappel", "Will Smith", "Michael Vick", "Deion Sanders", "Michael Jordan", "Lebron James", "Mike Tyson", "Katt Williams", "Timberland", "Kirk Franklin", "Diana Ross", "Gladys Knight", "Martin Lawerence", "Obama"],
    experiences: ["Letters of Appreciation", ...commonExperiences],
    cities: ["Miami", "Orlando", "Houston", "Tampa", "Atlanta", "Memphis", "Savannah", "Dallas", "New York", "Denver", "Washington, D.C.", "Las Vegas", "Los Angeles", "Charlotte", "Nashville"],
  },
  "fallen-stars": {
    slug: "fallen-stars",
    name: "Fallen Stars",
    eyebrow: "A Scented Flowers Museum",
    tagline: "The stars still shine.",
    description: "A respectful, immersive memorial to cultural icons whose lives ended, but whose work, influence and memory continue to move generations.",
    mission: "Fallen Stars preserves stories and memories through art, artifacts and multimedia — helping visitors understand the achievements, challenges and lasting cultural impact of the people we lost.",
    accent: "#e9c34c", accent2: "#65c8ef", ink: "#06111e", paper: "#e9f7ff",
    mark: "/portfolio/fallen-stars.svg", motif: "stars",
    honorees: ["Kobe Bryant", "Pop Smoke", "Trouble", "Takeoff", "DMX", "PnB Rock", "King Von", "Virgil Abloh", "Chadwick Boseman", "Bankroll Fresh", "Bernie Mack", "Gangsta Boo", "Left Eye", "Aaliyah", "Paul Walker"],
    experiences: commonExperiences,
    cities: ["Miami", "Orlando", "Houston", "Tampa", "Atlanta", "New York", "Denver", "Nashville", "Memphis", "Savannah", "Dallas", "Birmingham", "Los Angeles", "Las Vegas", "Washington, D.C.", "Charlotte"],
  },
  "women-make-the-world-go-round": {
    slug: "women-make-the-world-go-round",
    name: "Women Make the World Go Round",
    eyebrow: "A Scented Flowers Museum",
    tagline: "Celebrating the women who move culture forward.",
    description: "A museum dedicated to women’s history, achievement, perspective and influence — with a flagship focus on Black women and urban culture.",
    mission: "The museum honors women who overcame barriers, shaped culture and opened doors for others. Its interactive storytelling is designed to make influence visible, challenge underrepresentation and leave visitors with a deeper understanding of women’s impact.",
    accent: "#f1378c", accent2: "#f2a228", ink: "#2a0d1c", paper: "#fff5f8", motif: "orbit",
    honorees: ["Beyonce", "Janet Jackson", "Erykah Badu", "Lauryn Hill", "Angela Bassett", "Whitney Houston", "Halle Berry", "Michelle Obama", "Oprah Winfrey", "Viola Davis", "Venus and Serena Williams"],
    experiences: commonExperiences,
    cities: ["Miami", "Orlando", "Houston", "Tampa", "Atlanta", "New York", "Denver", "Nashville", "Memphis", "Savannah", "Dallas", "Charlotte", "Los Angeles", "Las Vegas", "Washington, D.C.", "Birmingham"],
    seasonNote: "Plus a rotating city-specific talent spotlight in every market.",
  },
};

function Motif({ config }: { config: MuseumConfig }) {
  if (config.motif === "stars") return <div className="motif stars" aria-hidden="true">{Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 88}%`, fontSize: `${12 + (i % 5) * 7}px`, opacity: .18 + (i % 5) * .11 }}>✦</i>)}</div>;
  if (config.motif === "orbit") return <div className="motif orbit" aria-hidden="true"><i/><i/><i/></div>;
  return <div className="motif petals" aria-hidden="true">{Array.from({ length: 13 }).map((_, i) => <i key={i} style={{ transform: `rotate(${i * 28}deg) translateY(-${120 + (i % 3) * 34}px)` }}/>)}</div>;
}

function MuseumNav({ config }: { config: MuseumConfig }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 48);
    fn(); window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <nav className={`museum-nav ${solid ? "solid" : ""}`}><a className="parent" href="/scented-flowers">SCENTED FLOWERS</a><a className="brand" href="#top">{config.name}</a><div><a href="#story">Story</a><a href="#season">Season One</a><a href="#experience">Experience</a><a href="#tour">Tour</a></div></nav>;
}

function BrandArt({ config }: { config: MuseumConfig }) {
  if (config.mark) return <div className="brand-art mark"><img src={config.mark} alt={`${config.name} logo`} /></div>;
  return <div className="brand-art women-art"><b>WOMEN</b><span>MAKE THE WORLD</span><b>GO ROUND</b></div>;
}

export function MuseumPage({ config }: { config: MuseumConfig }) {
  const vars = { "--accent": config.accent, "--accent2": config.accent2, "--ink": config.ink, "--paper": config.paper } as CSSProperties;
  return <main id="top" className={`museum-page museum-${config.slug}`} style={vars}>
    <style>{css}</style><MuseumNav config={config}/>
    <section className="museum-hero"><div className="hero-wash"/><Motif config={config}/><div className="hero-grid"><div className="hero-copy"><span className="eyebrow">{config.eyebrow}</span><h1>{config.name}</h1><p className="tagline">{config.tagline}</p><p className="descriptor">{config.description}</p><div className="actions"><a className="button primary" href="#season">Explore Season One</a><a className="button ghost" href="#tour">Tour Markets</a></div></div><BrandArt config={config}/></div><div className="scroll">SCROLL TO ENTER ↓</div></section>
    <section id="story" className="section story"><span className="section-label">01 / WHY IT EXISTS</span><div className="story-grid"><h2>Culture deserves more than a memory.</h2><div><p className="lead">{config.mission}</p><p>Every room is designed to turn biography into atmosphere — something visitors can learn, feel, photograph and carry with them.</p></div></div></section>
    <section id="season" className="section season"><div className="section-head"><div><span className="section-label">02 / CURRENT COLLECTION</span><h2>Season One</h2></div><p>{config.seasonNote ?? "The opening class of featured honorees."}</p></div><div className="honoree-grid">{config.honorees.map((name, i) => <article key={name}><span>{String(i + 1).padStart(2,"0")}</span><h3>{name}</h3><i/></article>)}</div></section>
    <section id="experience" className="section experience"><div className="section-head"><div><span className="section-label">03 / INSIDE THE MUSEUM</span><h2>Built to be experienced.</h2></div><p>A layered environment of physical, audio, visual and interactive storytelling — not a hallway of posters.</p></div><div className="experience-grid">{config.experiences.map((item, i) => <div key={item}><span>{String(i + 1).padStart(2,"0")}</span><strong>{item}</strong></div>)}</div></section>
    <section id="tour" className="section tour"><div className="tour-inner"><span className="section-label">04 / TOURING PLATFORM</span><h2>Designed to move city to city.</h2><p>These markets come directly from the current museum plans. Dates and venues will be announced by the brand when confirmed.</p><div className="city-grid">{config.cities.map((city, i) => <div key={city}><span>{String(i + 1).padStart(2,"0")}</span><strong>{city}</strong></div>)}</div></div></section>
    <section className="section close"><div><span className="section-label">SCENTED FLOWERS PRESENTS</span><h2>{config.name}</h2><p>{config.tagline}</p></div><div className="actions"><a className="button primary" href="/scented-flowers">Museum Family</a><a className="button ghost dark" href="#top">Back to Top</a></div></section>
  </main>;
}

export function ScentedFlowersHome() {
  const cards = [
    ["Forever Futbol", "/", "Global Football Culture", "Past. Present. Eternal.", "#1aadad", "#d4a832"],
    ["Living Legends", "/living-legends", "Living Cultural Icons", "Give them their flowers now.", "#e0aa2f", "#f5df95"],
    ["Fallen Stars", "/fallen-stars", "Legacy & Memory", "The stars still shine.", "#65c8ef", "#e9c34c"],
    ["Women Make the World Go Round", "/women-make-the-world-go-round", "Women, Culture & Influence", "Celebrating the women who move culture forward.", "#f1378c", "#f2a228"],
  ];
  return <main className="sf-home"><style>{css}</style><nav className="sf-nav"><a className="sf-brand" href="#top">SCENTED FLOWERS</a><div><a href="#museums">Museums</a><a href="#mission">Mission</a><a href="#model">Model</a></div></nav>
    <section id="top" className="sf-hero"><div className="sf-glow"/><div className="sf-flora">{Array.from({ length: 15 }).map((_,i)=><i key={i} style={{transform:`rotate(${i*24}deg) translateY(-${175+(i%3)*28}px)`}}/>)}</div><div className="sf-hero-copy"><span>A HOUSE OF CULTURAL MUSEUMS</span><img src="/portfolio/scented-flowers.svg" alt="Scented Flowers"/><h1>Give them their flowers.<br/>Preserve the legacy.</h1><p>Scented Flowers is the mother brand for a growing family of touring cultural museums — each with its own identity, story and audience, all united by one idea: culture should be honored while it is happening and preserved when the moment is gone.</p><a href="#museums">Enter the collection ↓</a></div></section>
    <section id="museums" className="sf-museums"><header><span>THE COLLECTION</span><h2>Four museums. Four worlds.</h2><p>Every property stays distinct. Scented Flowers provides the parent identity, touring system and cultural standard.</p></header><div className="sf-cards">{cards.map((c,i)=><a key={c[0]} href={c[1]} className="sf-card" style={{"--a":c[4],"--b":c[5]} as CSSProperties}><span>0{i+1}</span><small>{c[2]}</small><h3>{c[0]}</h3><p>{c[3]}</p><b>↗</b></a>)}</div></section>
    <section id="mission" className="sf-manifesto"><div className="sf-word">FLOWERS</div><div><span>THE MISSION</span><h2>Honor people. Protect stories. Build experiences that outlive the moment.</h2><p>The collection spans celebration, remembrance, sport and women’s cultural influence. Scented Flowers does not flatten those stories into one generic museum. Each property gets its own visual language and emotional temperature.</p></div></section>
    <section id="model" className="sf-model"><header><span>THE SYSTEM</span><h2>One parent platform. Independent museum brands.</h2></header><div>{[["01","Distinct identities","Each museum keeps its own logo, color world, voice and visitor experience."],["02","Tour-ready","A shared operating model makes each property capable of moving market to market."],["03","Seasonal collections","Honoree lineups can rotate by season without rebuilding the whole experience."],["04","One cultural house","Scented Flowers becomes the trusted umbrella audiences recognize across the portfolio."]].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>
    <footer className="sf-footer"><strong>SCENTED FLOWERS</strong><p>Living Legends · Fallen Stars · Women Make the World Go Round · Forever Futbol</p></footer>
  </main>;
}

const css = `
*{box-sizing:border-box}html{scroll-behavior:smooth}.museum-page,.sf-home{min-height:100vh;margin:0}.museum-page{--line:rgba(255,255,255,.12);background:var(--ink);color:var(--paper);font-family:Arial,Helvetica,sans-serif;overflow:hidden}.museum-nav{position:fixed;z-index:50;inset:0 0 auto;height:74px;padding:0 clamp(20px,4vw,58px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;transition:.3s}.museum-nav.solid{background:rgba(5,5,7,.91);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.1)}.museum-nav a{text-decoration:none;color:var(--paper)}.museum-nav .parent{font-size:9px;font-weight:800;letter-spacing:.3em}.museum-nav .brand{font-family:Georgia,serif;font-size:20px}.museum-nav>div{display:flex;justify-content:flex-end;gap:24px}.museum-nav>div a{font-size:9px;letter-spacing:.16em;text-transform:uppercase;opacity:.65}.museum-hero{min-height:100vh;position:relative;display:grid;align-items:center;padding:118px clamp(24px,6vw,96px) 70px;isolation:isolate}.hero-wash{position:absolute;inset:0;z-index:-3;background:radial-gradient(circle at 74% 50%,color-mix(in srgb,var(--accent) 20%,transparent),transparent 35%),radial-gradient(circle at 24% 22%,color-mix(in srgb,var(--accent2) 10%,transparent),transparent 30%),linear-gradient(145deg,var(--ink),#050507)}.hero-grid{max-width:1500px;width:100%;margin:auto;display:grid;grid-template-columns:1.1fr .9fr;gap:7vw;align-items:center}.eyebrow,.section-label,.sf-hero-copy>span,.sf-museums header>span,.sf-manifesto span,.sf-model header>span{font-size:9px;letter-spacing:.34em;text-transform:uppercase;font-weight:800;color:var(--accent)}.hero-copy h1{font-family:Georgia,serif;font-weight:400;font-size:clamp(62px,8.3vw,138px);line-height:.86;letter-spacing:-.055em;margin:20px 0 24px}.museum-women-make-the-world-go-round .hero-copy h1{font-size:clamp(52px,7vw,110px)}.tagline{font-family:Georgia,serif;font-style:italic;font-size:clamp(21px,2.4vw,34px);color:var(--accent2);margin:0 0 24px}.descriptor{max-width:670px;font-size:15px;line-height:1.8;opacity:.7}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:36px}.button{display:inline-flex;min-height:50px;padding:0 28px;align-items:center;justify-content:center;text-decoration:none;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;transition:.25s}.button.primary{background:var(--accent);color:var(--ink);border:1px solid var(--accent)}.button.ghost{border:1px solid rgba(255,255,255,.28);color:var(--paper)}.button.dark{color:var(--ink);border-color:rgba(0,0,0,.25)}.button:hover{transform:translateY(-2px)}.brand-art{justify-self:center;width:min(520px,100%);aspect-ratio:1;display:grid;place-items:center}.brand-art.mark{border-radius:50%;border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);background:radial-gradient(circle,rgba(255,255,255,.06),transparent 67%);box-shadow:0 0 100px color-mix(in srgb,var(--accent) 13%,transparent)}.brand-art img{width:92%;height:92%;object-fit:contain;filter:drop-shadow(0 22px 40px rgba(0,0,0,.35))}.women-art{min-height:470px;transform:rotate(-4deg);border:1px solid rgba(255,255,255,.13);background:radial-gradient(circle,color-mix(in srgb,var(--accent) 20%,transparent),transparent 64%);text-align:center;align-content:center}.women-art b{display:block;font-family:Georgia,serif;font-size:clamp(46px,5.5vw,82px);color:var(--accent);font-weight:400}.women-art span{display:block;font-size:11px;letter-spacing:.42em;color:var(--accent2);margin:14px 0}.scroll{position:absolute;bottom:25px;left:clamp(24px,6vw,96px);font-size:8px;letter-spacing:.25em;opacity:.45}.motif{position:absolute;inset:0;z-index:-2;pointer-events:none}.stars i{position:absolute;color:var(--accent2);font-style:normal}.orbit{display:grid;place-items:center;transform:translateX(28%)}.orbit i{position:absolute;width:70vw;height:36vw;border:1px solid color-mix(in srgb,var(--accent) 34%,transparent);border-radius:50%;transform:rotate(-18deg)}.orbit i:nth-child(2){width:54vw;height:27vw;transform:rotate(22deg);border-color:color-mix(in srgb,var(--accent2) 36%,transparent)}.orbit i:nth-child(3){width:36vw;height:18vw;transform:rotate(-54deg)}.petals{display:grid;place-items:center;transform:translate(29%,4%)}.petals i{position:absolute;width:58px;height:135px;border-radius:100% 0 100% 0;background:var(--accent);opacity:.11;transform-origin:center 250px}.section{padding:110px clamp(24px,6vw,96px)}.story{background:var(--paper);color:var(--ink)}.story .section-label,.experience .section-label{color:var(--accent)}.story-grid{max-width:1450px;margin:28px auto 0;display:grid;grid-template-columns:1fr 1fr;gap:8vw}.story h2,.section-head h2,.tour h2,.close h2,.sf-museums h2,.sf-manifesto h2,.sf-model h2{font-family:Georgia,serif;font-weight:400;font-size:clamp(48px,6vw,94px);line-height:.96;letter-spacing:-.045em;margin:0}.story .lead{font-family:Georgia,serif;font-size:clamp(20px,2.3vw,32px);line-height:1.45;margin:0}.story-grid>div>p:last-child{font-size:14px;line-height:1.8;opacity:.6;margin-top:28px}.season{background:#08080b}.section-head{max-width:1450px;margin:0 auto 46px;display:flex;justify-content:space-between;gap:50px;align-items:flex-end}.section-head h2{margin-top:14px}.section-head>p{max-width:470px;line-height:1.7;opacity:.58;margin:0}.honoree-grid{max-width:1450px;margin:auto;display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid var(--line);border-top:1px solid var(--line)}.honoree-grid article{min-height:205px;padding:26px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid var(--line);border-bottom:1px solid var(--line);transition:.25s}.honoree-grid article:hover{background:color-mix(in srgb,var(--accent) 9%,transparent)}.honoree-grid span,.city-grid span,.experience-grid span{font-size:9px;letter-spacing:.18em;color:var(--accent)}.honoree-grid h3{font-family:Georgia,serif;font-size:clamp(24px,2.3vw,38px);font-weight:400;line-height:1.05;margin:0}.honoree-grid i{width:38px;height:2px;background:var(--accent)}.experience{background:var(--paper);color:var(--ink)}.experience-grid{max-width:1450px;margin:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(0,0,0,.14);border:1px solid rgba(0,0,0,.14)}.experience-grid>div{min-height:145px;padding:25px;background:var(--paper);display:flex;flex-direction:column;justify-content:space-between}.experience-grid strong{font-family:Georgia,serif;font-size:26px;font-weight:400}.tour{background:linear-gradient(160deg,var(--ink),color-mix(in srgb,var(--accent2) 10%,var(--ink)))}.tour-inner{max-width:1450px;margin:auto}.tour h2{max-width:980px;margin:16px 0 24px}.tour-inner>p{max-width:670px;line-height:1.75;opacity:.62}.city-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:54px;border-top:1px solid var(--line);border-left:1px solid var(--line)}.city-grid>div{min-height:105px;padding:22px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);display:flex;flex-direction:column;justify-content:space-between}.city-grid strong{font-family:Georgia,serif;font-size:24px;font-weight:400}.close{background:var(--paper);color:var(--ink);display:flex;align-items:flex-end;justify-content:space-between;gap:50px}.close h2{margin:14px 0 10px}.close>div>p{font-family:Georgia,serif;font-size:24px;font-style:italic;color:var(--accent);margin:0}.close .actions{margin:0}.sf-home{background:#090806;color:#f4eee2;font-family:Arial,Helvetica,sans-serif}.sf-nav{position:fixed;z-index:50;inset:0 0 auto;height:74px;padding:0 clamp(22px,5vw,72px);display:flex;align-items:center;justify-content:space-between;background:rgba(9,8,6,.78);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.08)}.sf-nav a{text-decoration:none;color:#f4eee2;font-size:9px;letter-spacing:.18em;text-transform:uppercase}.sf-nav .sf-brand{font-family:Georgia,serif;font-size:18px;letter-spacing:.08em}.sf-nav>div{display:flex;gap:28px}.sf-hero{min-height:100vh;position:relative;display:grid;place-items:center;text-align:center;padding:110px 24px 70px;overflow:hidden}.sf-glow{position:absolute;width:70vw;height:70vw;border-radius:50%;background:radial-gradient(circle,rgba(212,172,76,.18),rgba(212,172,76,.05) 36%,transparent 68%);filter:blur(18px)}.sf-flora{position:absolute;inset:0;display:grid;place-items:center;opacity:.5}.sf-flora i{position:absolute;width:68px;height:165px;border:1px solid rgba(217,179,79,.28);border-radius:100% 0 100% 0;transform-origin:center 360px}.sf-hero-copy{position:relative;z-index:2;max-width:1120px}.sf-hero-copy>span,.sf-museums header>span,.sf-manifesto span,.sf-model header>span{color:#d4ac4c}.sf-hero-copy img{display:block;width:min(310px,66vw);height:270px;object-fit:contain;margin:0 auto -10px;filter:drop-shadow(0 28px 48px rgba(0,0,0,.4))}.sf-hero h1{font-family:Georgia,serif;font-size:clamp(54px,7vw,110px);line-height:.92;letter-spacing:-.05em;font-weight:400;margin:0 0 26px}.sf-hero p{max-width:800px;margin:auto;font-size:15px;line-height:1.9;color:rgba(244,238,226,.67)}.sf-hero-copy>a{display:inline-block;margin-top:36px;color:#d4ac4c;text-decoration:none;font-size:9px;letter-spacing:.22em;text-transform:uppercase}.sf-museums{padding:120px clamp(24px,6vw,96px);background:#f4eee2;color:#16120b}.sf-museums header,.sf-model header{max-width:920px;margin-bottom:50px}.sf-museums h2,.sf-model h2{margin:14px 0 18px}.sf-museums header p{max-width:630px;line-height:1.8;opacity:.6}.sf-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.sf-card{min-height:440px;position:relative;padding:34px;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;text-decoration:none;color:#fff;background:radial-gradient(circle at 82% 15%,color-mix(in srgb,var(--a) 42%,transparent),transparent 33%),linear-gradient(145deg,#111,var(--b));transition:.3s}.sf-card:before{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.78),rgba(0,0,0,.03) 72%)}.sf-card>*{position:relative;z-index:1}.sf-card:hover{transform:translateY(-5px)}.sf-card>span{position:absolute;top:-335px;font-size:10px;color:var(--a)}.sf-card small{font-size:9px;text-transform:uppercase;letter-spacing:.2em;opacity:.65}.sf-card h3{font-family:Georgia,serif;font-size:clamp(38px,4.5vw,68px);line-height:.94;letter-spacing:-.04em;font-weight:400;margin:12px 0}.sf-card p{font-family:Georgia,serif;font-size:20px;font-style:italic;color:var(--a);margin:0}.sf-card b{position:absolute;right:0;top:-340px;font-size:28px}.sf-manifesto{min-height:760px;padding:130px clamp(24px,6vw,96px);display:grid;grid-template-columns:.75fr 1.25fr;gap:7vw;align-items:center;overflow:hidden}.sf-word{font-family:Georgia,serif;font-size:clamp(88px,14vw,235px);writing-mode:vertical-rl;transform:rotate(180deg);color:rgba(212,172,76,.1);line-height:.76}.sf-manifesto h2{margin:14px 0 24px}.sf-manifesto p{max-width:650px;line-height:1.9;color:rgba(244,238,226,.64)}.sf-model{padding:120px clamp(24px,6vw,96px);background:#120f0a}.sf-model>div{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.12);border-left:1px solid rgba(255,255,255,.12)}.sf-model article{min-height:280px;padding:28px;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12)}.sf-model article>span{font-size:9px;color:#d4ac4c}.sf-model h3{font-family:Georgia,serif;font-size:30px;font-weight:400;margin:78px 0 12px}.sf-model p{font-size:13px;line-height:1.7;color:rgba(244,238,226,.58)}.sf-footer{padding:70px clamp(24px,6vw,96px);display:flex;justify-content:space-between;gap:30px;border-top:1px solid rgba(255,255,255,.1)}.sf-footer strong{font-family:Georgia,serif;font-size:28px;color:#d4ac4c;font-weight:400}.sf-footer p{font-size:11px;letter-spacing:.08em;opacity:.5}
@media(max-width:980px){.museum-nav{grid-template-columns:1fr auto}.museum-nav .brand,.museum-nav>div{display:none}.hero-grid,.story-grid{grid-template-columns:1fr}.brand-art{max-width:390px}.honoree-grid{grid-template-columns:repeat(2,1fr)}.experience-grid{grid-template-columns:repeat(2,1fr)}.city-grid{grid-template-columns:repeat(2,1fr)}.section-head,.close{align-items:flex-start;flex-direction:column}.sf-cards{grid-template-columns:1fr}.sf-manifesto{grid-template-columns:.3fr 1fr}.sf-model>div{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.hero-copy h1{font-size:52px}.museum-women-make-the-world-go-round .hero-copy h1{font-size:46px}.section{padding:82px 20px}.story h2,.section-head h2,.tour h2,.close h2,.sf-museums h2,.sf-manifesto h2,.sf-model h2{font-size:44px}.honoree-grid,.experience-grid,.city-grid{grid-template-columns:1fr}.honoree-grid article{min-height:150px}.museum-hero{padding-left:20px;padding-right:20px}.actions{flex-direction:column;width:100%}.button{width:100%}.sf-nav{padding:0 18px}.sf-nav>div{display:none}.sf-hero h1{font-size:50px}.sf-hero-copy img{height:200px}.sf-museums,.sf-model{padding:88px 18px}.sf-card{min-height:360px;padding:26px}.sf-manifesto{grid-template-columns:1fr;padding:90px 18px}.sf-word{writing-mode:initial;transform:none;font-size:22vw}.sf-model>div{grid-template-columns:1fr}.sf-footer{padding:50px 18px;flex-direction:column}}
`;
