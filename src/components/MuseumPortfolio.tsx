"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { FAMILY_HERO } from "./museumVisualsFamily";
import { LIVING_HERO, LIVING_GALLERY } from "./museumVisualsLiving";
import { FALLEN_HERO, FALLEN_GALLERY } from "./museumVisualsFallen";
import { WOMEN_HERO, WOMEN_GALLERY } from "./museumVisualsWomen";

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
  heroVisual: string;
  galleryVisual: string;
  visualKicker: string;
  visualTitle: string;
  visualCopy: string;
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
    slug: "living-legends", name: "Living Legends", eyebrow: "A Scented Flowers Museum",
    tagline: "Giving them their flowers while they can smell them.",
    description: "A living tribute to the people whose talent, leadership and cultural influence helped shape the world we know today.",
    mission: "Living Legends celebrates remarkable achievements in real time — sharing stories, creating gratitude and inspiring future generations while the honorees are still here to receive the appreciation.",
    accent: "#d8a62d", accent2: "#f4d77c", ink: "#070707", paper: "#f4eee2", mark: "/portfolio/living-legends.svg",
    heroVisual: LIVING_HERO, galleryVisual: LIVING_GALLERY,
    visualKicker: "THE HALL OF HONOR", visualTitle: "Greatness, still in the room.",
    visualCopy: "Black and white marble, living gold florals, archival objects, cultural category wings and a monumental centerpiece turn recognition into an environment visitors can walk through.",
    honorees: ["Shaq", "Drake", "Lil Wayne", "Nicki Minaj", "Tyler Perry", "Dave Chappel", "Will Smith", "Michael Vick", "Deion Sanders", "Michael Jordan", "Lebron James", "Mike Tyson", "Katt Williams", "Timberland", "Kirk Franklin", "Diana Ross", "Gladys Knight", "Martin Lawerence", "Obama"],
    experiences: ["Letters of Appreciation", ...commonExperiences],
    cities: ["Miami", "Orlando", "Houston", "Tampa", "Atlanta", "Memphis", "Savannah", "Dallas", "New York", "Denver", "Washington, D.C.", "Las Vegas", "Los Angeles", "Charlotte", "Nashville"],
  },
  "fallen-stars": {
    slug: "fallen-stars", name: "Fallen Stars", eyebrow: "A Scented Flowers Museum",
    tagline: "The stars still shine.",
    description: "A respectful, immersive memorial to cultural icons whose lives ended, but whose work, influence and memory continue to move generations.",
    mission: "Fallen Stars preserves stories and memories through art, artifacts and multimedia — helping visitors understand the achievements, challenges and lasting cultural impact of the people we lost.",
    accent: "#d7aa45", accent2: "#f8edcf", ink: "#05070a", paper: "#f5efe2", mark: "/portfolio/fallen-stars.svg",
    heroVisual: FALLEN_HERO, galleryVisual: FALLEN_GALLERY,
    visualKicker: "THE WALK OF LEGENDS", visualTitle: "Memory made monumental.",
    visualCopy: "Halo light, celestial architecture, black marble, white remembrance florals and archival galleries create a memorial atmosphere that feels luminous, dignified and alive with legacy.",
    honorees: ["Kobe Bryant", "Pop Smoke", "Trouble", "Takeoff", "DMX", "PnB Rock", "King Von", "Virgil Abloh", "Chadwick Boseman", "Bankroll Fresh", "Bernie Mack", "Gangsta Boo", "Left Eye", "Aaliyah", "Paul Walker"],
    experiences: commonExperiences,
    cities: ["Miami", "Orlando", "Houston", "Tampa", "Atlanta", "New York", "Denver", "Nashville", "Memphis", "Savannah", "Dallas", "Birmingham", "Los Angeles", "Las Vegas", "Washington, D.C.", "Charlotte"],
  },
  "women-make-the-world-go-round": {
    slug: "women-make-the-world-go-round", name: "Women Make the World Go Round", eyebrow: "A Scented Flowers Museum",
    tagline: "Celebrating the women who move culture forward.",
    description: "A museum dedicated to women’s history, achievement, perspective and influence — with a flagship focus on Black women and urban culture.",
    mission: "The museum honors women who overcame barriers, shaped culture and opened doors for others. Its interactive storytelling is designed to make influence visible, challenge underrepresentation and leave visitors with a deeper understanding of women’s impact.",
    accent: "#d8949a", accent2: "#e7bd64", ink: "#0b0809", paper: "#f7e7e4",
    heroVisual: WOMEN_HERO, galleryVisual: WOMEN_GALLERY,
    visualKicker: "HER STORY · OUR WORLD", visualTitle: "Influence you can walk through.",
    visualCopy: "Blush, black and gold galleries organize leadership, music, media, fashion, business, activism and community into a contemporary museum language built around women’s impact.",
    honorees: ["Beyonce", "Janet Jackson", "Erykah Badu", "Lauryn Hill", "Angela Bassett", "Whitney Houston", "Halle Berry", "Michelle Obama", "Oprah Winfrey", "Viola Davis", "Venus and Serena Williams"],
    experiences: commonExperiences,
    cities: ["Miami", "Orlando", "Houston", "Tampa", "Atlanta", "New York", "Denver", "Nashville", "Memphis", "Savannah", "Dallas", "Charlotte", "Los Angeles", "Las Vegas", "Washington, D.C.", "Birmingham"],
    seasonNote: "Plus a rotating city-specific talent spotlight in every market.",
  },
};

function Nav({ config }: { config: MuseumConfig }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 52);
    fn(); window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <nav className={`museum-nav ${solid ? "solid" : ""}`}>
    <a className="parent" href="/scented-flowers">SCENTED FLOWERS</a>
    <a className="brand" href="#top">{config.name}</a>
    <div><a href="#story">Story</a><a href="#season">Season One</a><a href="#experience">Experience</a><a href="#tour">Tour</a></div>
  </nav>;
}

function BrandMark({ config }: { config: MuseumConfig }) {
  if (config.mark) return <img className="hero-mark" src={config.mark} alt={`${config.name} logo`} />;
  return <div className="women-mark"><strong>WOMEN</strong><span>MAKE THE WORLD GO ROUND</span></div>;
}

export function MuseumPage({ config }: { config: MuseumConfig }) {
  const vars = { "--accent": config.accent, "--accent2": config.accent2, "--ink": config.ink, "--paper": config.paper } as CSSProperties;
  return <main id="top" className={`museum-page museum-${config.slug}`} style={vars}>
    <style>{css}</style><Nav config={config}/>

    <section className="museum-hero">
      <img className="hero-visual" src={config.heroVisual} alt="" aria-hidden="true" />
      <div className="hero-shade"/><div className="hero-orbit" aria-hidden="true"><i/><i/><i/></div>
      <div className="hero-content">
        <div className="hero-copy"><span className="eyebrow">{config.eyebrow}</span><h1>{config.name}</h1><p className="tagline">{config.tagline}</p><p className="descriptor">{config.description}</p><div className="actions"><a className="button primary" href="#season">Enter Season One</a><a className="button ghost" href="#experience">See the Experience</a></div></div>
        <div className="hero-brand"><BrandMark config={config}/><small>SCENTED FLOWERS PRESENTS</small></div>
      </div>
      <div className="scroll">SCROLL TO ENTER ↓</div>
    </section>

    <section id="story" className="section story"><div className="section-label">01 / WHY IT EXISTS</div><div className="story-grid"><h2>Culture deserves more than a memory.</h2><div><p className="lead">{config.mission}</p><p className="support">This is designed as a touring museum world — physical, cinematic, archival and interactive — where biography becomes atmosphere.</p></div></div></section>

    <section className="visual-break"><img src={config.galleryVisual} alt={`${config.name} museum visual concept`} /><div className="visual-overlay"><span>{config.visualKicker}</span><h2>{config.visualTitle}</h2><p>{config.visualCopy}</p></div></section>

    <section id="season" className="section season"><div className="section-head"><div><span className="section-label">02 / CURRENT COLLECTION</span><h2>Season One</h2></div><p>{config.seasonNote ?? "The opening class of featured honorees."}</p></div><div className="honoree-grid">{config.honorees.map((name, i) => <article key={name}><span>{String(i + 1).padStart(2,"0")}</span><h3>{name}</h3><i/></article>)}</div></section>

    <section id="experience" className="section experience"><div className="section-head"><div><span className="section-label">03 / INSIDE THE MUSEUM</span><h2>Built to be experienced.</h2></div><p>A layered environment of physical, audio, visual and interactive storytelling — not a hallway of posters.</p></div><div className="experience-grid">{config.experiences.map((item, i) => <div key={item}><span>{String(i + 1).padStart(2,"0")}</span><strong>{item}</strong></div>)}</div></section>

    <section id="tour" className="section tour"><div className="tour-inner"><span className="section-label">04 / TOURING PLATFORM</span><h2>Designed to move city to city.</h2><p>These markets come directly from the current museum plans. Dates and venues will be announced by the brand when confirmed.</p><div className="city-grid">{config.cities.map((city, i) => <div key={city}><span>{String(i + 1).padStart(2,"0")}</span><strong>{city}</strong></div>)}</div></div></section>

    <section className="section close"><div><span className="section-label">SCENTED FLOWERS PRESENTS</span><h2>{config.name}</h2><p>{config.tagline}</p></div><div className="actions"><a className="button primary" href="/scented-flowers">Museum Family</a><a className="button ghost dark" href="#top">Back to Top</a></div></section>
  </main>;
}

export function ScentedFlowersHome() {
  const cards = [
    {name:"Forever Futbol",href:"/",label:"Global Football Culture",line:"Past. Present. Eternal.",tone:"futbol"},
    {name:"Living Legends",href:"/living-legends",label:"Living Cultural Icons",line:"Give them their flowers now.",tone:"living"},
    {name:"Fallen Stars",href:"/fallen-stars",label:"Legacy & Memory",line:"The stars still shine.",tone:"fallen"},
    {name:"Women Make the World Go Round",href:"/women-make-the-world-go-round",label:"Women, Culture & Influence",line:"Celebrating the women who move culture forward.",tone:"women"},
  ];
  return <main className="sf-home"><style>{css}</style>
    <nav className="sf-nav"><a className="sf-brand" href="#top">SCENTED FLOWERS</a><div><a href="#museums">Museums</a><a href="#mission">Mission</a><a href="#model">Model</a></div></nav>

    <section id="top" className="sf-hero">
      <img className="sf-family-visual" src={FAMILY_HERO} alt="Scented Flowers museum family concept" />
      <div className="sf-hero-shade"/>
      <div className="sf-hero-copy"><span>THE MOTHER MUSEUM</span><img src="/portfolio/scented-flowers.svg" alt="Scented Flowers"/><h1>One cultural house.<br/>Independent museum worlds.</h1><p>Scented Flowers is the mother platform for four distinct museum properties — honoring people, protecting stories and turning culture into experiences that can travel city to city.</p><a href="#museums">Enter the museum family ↓</a></div>
    </section>

    <section id="museums" className="sf-museums"><header><span>THE COLLECTION</span><h2>Four museums. Four worlds.</h2><p>Each museum has its own visual language, emotional temperature and audience. Scented Flowers provides the cultural standard and touring system without flattening the brands together.</p></header><div className="sf-cards">{cards.map((c,i)=><a key={c.name} href={c.href} className={`sf-card ${c.tone}`}><span>0{i+1}</span><small>{c.label}</small><h3>{c.name}</h3><p>{c.line}</p><b>↗</b></a>)}</div></section>

    <section id="mission" className="sf-manifesto"><div className="sf-crest"><img src="/portfolio/scented-flowers.svg" alt=""/></div><div><span>THE MISSION</span><h2>Give people their flowers. Preserve what they changed.</h2><p>The museum family spans celebration, remembrance, sport and women’s cultural influence. The mother brand connects the properties operationally while every museum remains creatively independent.</p></div></section>

    <section id="model" className="sf-model"><header><span>THE SYSTEM</span><h2>Built like a museum district.</h2></header><div>{[["01","Distinct identities","Separate logos, palettes, stories and visitor experiences."],["02","Tour-ready","A common operating model that can travel market to market."],["03","Seasonal collections","Rotating honorees and exhibits without rebuilding the whole property."],["04","One cultural house","A recognizable parent platform that strengthens every museum beneath it."]].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>

    <footer className="sf-footer"><strong>SCENTED FLOWERS</strong><p>Living Legends · Fallen Stars · Women Make the World Go Round · Forever Futbol</p></footer>
  </main>;
}

const css = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0}.museum-page,.sf-home{min-height:100vh;margin:0}.museum-page{--line:rgba(255,255,255,.12);background:var(--ink);color:var(--paper);font-family:Arial,Helvetica,sans-serif;overflow:hidden}.museum-nav,.sf-nav{position:fixed;z-index:80;inset:0 0 auto;height:72px;padding:0 clamp(20px,4vw,58px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;transition:.35s}.museum-nav.solid,.sf-nav{background:rgba(5,5,7,.82);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.1)}.museum-nav a,.sf-nav a{text-decoration:none;color:#fff}.museum-nav .parent,.sf-brand{font-size:9px;font-weight:800;letter-spacing:.3em}.museum-nav .brand{font-family:Georgia,serif;font-size:20px}.museum-nav>div,.sf-nav>div{display:flex;justify-content:flex-end;gap:24px}.museum-nav>div a,.sf-nav>div a{font-size:9px;letter-spacing:.16em;text-transform:uppercase;opacity:.68}
.museum-hero{height:100svh;min-height:720px;position:relative;display:grid;align-items:end;isolation:isolate;overflow:hidden;background:#070707}.hero-visual{position:absolute;inset:-3%;width:106%;height:106%;object-fit:cover;z-index:-4;animation:slowPush 18s ease-in-out infinite alternate;filter:saturate(.92) contrast(1.05)}.hero-shade{position:absolute;inset:0;z-index:-3;background:linear-gradient(90deg,rgba(4,4,5,.9) 0%,rgba(4,4,5,.66) 38%,rgba(4,4,5,.14) 72%),linear-gradient(0deg,rgba(4,4,5,.94),transparent 58%)}.hero-orbit{position:absolute;right:-12vw;top:15%;width:56vw;height:56vw;z-index:-2;opacity:.34}.hero-orbit i{position:absolute;inset:15%;border:1px solid var(--accent);border-radius:50%;transform:rotate(26deg)}.hero-orbit i:nth-child(2){inset:24% 10%;transform:rotate(-22deg)}.hero-orbit i:nth-child(3){inset:34% 16%;transform:rotate(62deg);border-color:var(--accent2)}.hero-content{width:min(1500px,100%);margin:0 auto;padding:130px clamp(24px,6vw,96px) clamp(70px,9vh,120px);display:grid;grid-template-columns:1.05fr .6fr;gap:5vw;align-items:end}.eyebrow,.section-label,.visual-overlay>span,.sf-hero-copy>span,.sf-museums header>span,.sf-manifesto span,.sf-model header>span{font-size:9px;letter-spacing:.34em;text-transform:uppercase;font-weight:800;color:var(--accent)}.hero-copy h1{font-family:Georgia,serif;font-size:clamp(58px,8vw,126px);line-height:.86;letter-spacing:-.055em;font-weight:400;margin:20px 0 22px;max-width:980px}.museum-women-make-the-world-go-round .hero-copy h1{font-size:clamp(50px,6.6vw,104px)}.tagline{font-family:Georgia,serif;font-size:clamp(20px,2.4vw,34px);font-style:italic;color:var(--accent2);margin:0 0 20px}.descriptor{max-width:650px;font-size:15px;line-height:1.8;color:rgba(255,255,255,.68)}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}.button{min-height:50px;padding:0 28px;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-size:9px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;transition:.25s}.button.primary{background:var(--accent);color:#090909;border:1px solid var(--accent)}.button.ghost{color:#fff;border:1px solid rgba(255,255,255,.34)}.button.dark{color:var(--ink);border-color:rgba(0,0,0,.25)}.button:hover{transform:translateY(-3px)}.hero-brand{justify-self:end;text-align:center;width:min(330px,80vw);padding:25px;border:1px solid rgba(255,255,255,.16);background:rgba(0,0,0,.32);backdrop-filter:blur(12px)}.hero-mark{width:100%;height:240px;object-fit:contain}.hero-brand small{font-size:8px;letter-spacing:.22em;opacity:.55}.women-mark{padding:35px 10px}.women-mark strong{display:block;font-family:Georgia,serif;font-size:55px;color:#dda0a3;font-weight:400}.women-mark span{font-size:9px;letter-spacing:.22em;color:#e7bd64}.scroll{position:absolute;left:clamp(24px,6vw,96px);bottom:24px;font-size:8px;letter-spacing:.22em;opacity:.45}
.section{padding:112px clamp(24px,6vw,96px)}.story{background:var(--paper);color:var(--ink)}.story-grid{max-width:1450px;margin:28px auto 0;display:grid;grid-template-columns:1fr 1fr;gap:8vw}.story h2,.section-head h2,.tour h2,.close h2,.visual-overlay h2,.sf-museums h2,.sf-manifesto h2,.sf-model h2{font-family:Georgia,serif;font-weight:400;font-size:clamp(48px,6vw,92px);line-height:.95;letter-spacing:-.045em;margin:0}.story .lead{font-family:Georgia,serif;font-size:clamp(21px,2.3vw,32px);line-height:1.45;margin:0}.support{font-size:14px;line-height:1.8;opacity:.6;margin-top:28px}.visual-break{height:min(88vh,880px);min-height:620px;position:relative;overflow:hidden;background:#050505}.visual-break>img{width:100%;height:100%;object-fit:cover;filter:saturate(.92) contrast(1.04);transform:scale(1.02)}.visual-break:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,5,5,.84),rgba(5,5,5,.12) 62%),linear-gradient(0deg,rgba(5,5,5,.72),transparent 50%)}.visual-overlay{position:absolute;z-index:2;left:clamp(24px,6vw,96px);bottom:clamp(55px,9vw,120px);max-width:680px;color:#fff}.visual-overlay h2{margin:14px 0 20px;font-size:clamp(46px,5vw,78px)}.visual-overlay p{max-width:610px;line-height:1.8;color:rgba(255,255,255,.68)}
.season{background:#08080a}.section-head{max-width:1450px;margin:0 auto 46px;display:flex;align-items:end;justify-content:space-between;gap:45px}.section-head h2{margin-top:14px}.section-head>p{max-width:480px;line-height:1.7;opacity:.58}.honoree-grid{max-width:1450px;margin:auto;display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid var(--line);border-top:1px solid var(--line)}.honoree-grid article{min-height:190px;padding:25px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid var(--line);border-bottom:1px solid var(--line);transition:.25s}.honoree-grid article:hover{background:color-mix(in srgb,var(--accent) 9%,transparent);transform:translateY(-2px)}.honoree-grid span,.experience-grid span,.city-grid span{font-size:9px;letter-spacing:.18em;color:var(--accent)}.honoree-grid h3{font-family:Georgia,serif;font-size:clamp(24px,2.2vw,36px);font-weight:400;line-height:1.04;margin:0}.honoree-grid i{width:38px;height:2px;background:var(--accent)}.experience{background:var(--paper);color:var(--ink)}.experience-grid{max-width:1450px;margin:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(0,0,0,.13);border:1px solid rgba(0,0,0,.13)}.experience-grid>div{min-height:140px;padding:25px;background:var(--paper);display:flex;flex-direction:column;justify-content:space-between}.experience-grid strong{font-family:Georgia,serif;font-size:25px;font-weight:400}.tour{background:linear-gradient(145deg,var(--ink),color-mix(in srgb,var(--accent) 8%,var(--ink)))}.tour-inner{max-width:1450px;margin:auto}.tour h2{max-width:950px;margin:15px 0 23px}.tour-inner>p{max-width:680px;line-height:1.75;opacity:.62}.city-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:52px;border-left:1px solid var(--line);border-top:1px solid var(--line)}.city-grid>div{min-height:105px;padding:21px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);display:flex;flex-direction:column;justify-content:space-between}.city-grid strong{font-family:Georgia,serif;font-size:23px;font-weight:400}.close{background:var(--paper);color:var(--ink);display:flex;align-items:end;justify-content:space-between;gap:40px}.close h2{margin:14px 0 10px}.close>div>p{font-family:Georgia,serif;font-size:23px;font-style:italic;color:var(--accent)}.close .actions{margin:0}
.sf-home{background:#080706;color:#f6efe1;font-family:Arial,Helvetica,sans-serif}.sf-nav{display:grid;grid-template-columns:1fr 1fr}.sf-nav .sf-brand{font-family:Georgia,serif;font-size:18px;letter-spacing:.08em}.sf-hero{height:100svh;min-height:720px;position:relative;display:grid;place-items:center;overflow:hidden}.sf-family-visual{position:absolute;inset:-3%;width:106%;height:106%;object-fit:cover;animation:slowPush 20s ease-in-out infinite alternate}.sf-hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,6,5,.85),rgba(7,6,5,.35) 52%,rgba(7,6,5,.52)),linear-gradient(0deg,rgba(7,6,5,.82),transparent 55%)}.sf-hero-copy{position:relative;z-index:2;text-align:center;max-width:1080px;padding:100px 24px 50px}.sf-hero-copy>span,.sf-museums header>span,.sf-manifesto span,.sf-model header>span{color:#d3aa4a}.sf-hero-copy>img{width:min(260px,58vw);height:220px;object-fit:contain;filter:drop-shadow(0 18px 40px rgba(0,0,0,.5));margin-bottom:-12px}.sf-hero-copy h1{font-family:Georgia,serif;font-size:clamp(54px,7.3vw,112px);font-weight:400;line-height:.91;letter-spacing:-.05em;margin:0 0 25px}.sf-hero-copy p{max-width:790px;margin:auto;line-height:1.85;color:rgba(255,255,255,.7)}.sf-hero-copy>a{display:inline-block;margin-top:34px;text-decoration:none;color:#d3aa4a;font-size:9px;letter-spacing:.2em;text-transform:uppercase}.sf-museums{padding:120px clamp(24px,6vw,96px);background:#f3ede2;color:#16120b}.sf-museums header{max-width:900px;margin-bottom:48px}.sf-museums h2{margin:13px 0 18px}.sf-museums header p{max-width:680px;line-height:1.8;opacity:.62}.sf-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.sf-card{min-height:430px;position:relative;overflow:hidden;padding:34px;display:flex;flex-direction:column;justify-content:end;text-decoration:none;color:#fff;background:#111;border:1px solid rgba(0,0,0,.1);transition:.3s}.sf-card:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 80% 15%,rgba(220,180,75,.28),transparent 35%),linear-gradient(145deg,#0d0d0f,#2a2115)}.sf-card.women:before{background:radial-gradient(circle at 80% 15%,rgba(221,148,154,.42),transparent 34%),linear-gradient(145deg,#120b0d,#4b292d)}.sf-card.fallen:before{background:radial-gradient(circle at 80% 15%,rgba(250,239,208,.3),transparent 35%),linear-gradient(145deg,#07090d,#2b2418)}.sf-card.futbol:before{background:radial-gradient(circle at 80% 15%,rgba(26,173,173,.32),transparent 35%),linear-gradient(145deg,#071011,#342915)}.sf-card>*{position:relative;z-index:1}.sf-card:hover{transform:translateY(-5px)}.sf-card>span{position:absolute;top:-328px;font-size:10px;color:#d8ad50}.sf-card small{font-size:9px;letter-spacing:.2em;text-transform:uppercase;opacity:.66}.sf-card h3{font-family:Georgia,serif;font-size:clamp(38px,4.3vw,66px);font-weight:400;letter-spacing:-.04em;line-height:.94;margin:12px 0}.sf-card p{font-family:Georgia,serif;font-size:20px;font-style:italic;color:#e4c16e}.sf-card b{position:absolute;right:0;top:-330px;font-size:28px}.sf-manifesto{min-height:700px;padding:120px clamp(24px,6vw,96px);display:grid;grid-template-columns:.7fr 1.3fr;gap:7vw;align-items:center}.sf-crest{display:grid;place-items:center}.sf-crest img{width:min(440px,80vw);height:440px;object-fit:contain;filter:drop-shadow(0 40px 80px rgba(214,172,76,.18))}.sf-manifesto h2{margin:14px 0 24px}.sf-manifesto p{max-width:650px;line-height:1.9;color:rgba(255,255,255,.62)}.sf-model{padding:120px clamp(24px,6vw,96px);background:#110e0a}.sf-model header{max-width:920px;margin-bottom:48px}.sf-model h2{margin-top:14px}.sf-model>div{display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(255,255,255,.12);border-top:1px solid rgba(255,255,255,.12)}.sf-model article{min-height:260px;padding:28px;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12)}.sf-model article>span{font-size:9px;color:#d3aa4a}.sf-model h3{font-family:Georgia,serif;font-size:29px;font-weight:400;margin:74px 0 12px}.sf-model p{font-size:13px;line-height:1.7;color:rgba(255,255,255,.56)}.sf-footer{padding:65px clamp(24px,6vw,96px);display:flex;justify-content:space-between;gap:30px;border-top:1px solid rgba(255,255,255,.1)}.sf-footer strong{font-family:Georgia,serif;font-size:28px;color:#d3aa4a;font-weight:400}.sf-footer p{font-size:11px;letter-spacing:.08em;opacity:.5}
@keyframes slowPush{from{transform:scale(1)}to{transform:scale(1.055)}}
@media(max-width:980px){.museum-nav{grid-template-columns:1fr auto}.museum-nav .brand,.museum-nav>div{display:none}.hero-content,.story-grid,.sf-manifesto{grid-template-columns:1fr}.hero-brand{justify-self:start;width:260px}.hero-mark{height:180px}.honoree-grid{grid-template-columns:repeat(2,1fr)}.experience-grid{grid-template-columns:repeat(2,1fr)}.city-grid{grid-template-columns:repeat(2,1fr)}.section-head,.close{align-items:flex-start;flex-direction:column}.sf-cards{grid-template-columns:1fr}.sf-model>div{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.museum-hero,.sf-hero{min-height:760px}.hero-content{padding:110px 20px 74px}.hero-copy h1{font-size:50px}.museum-women-make-the-world-go-round .hero-copy h1{font-size:44px}.hero-brand{display:none}.hero-shade{background:linear-gradient(0deg,rgba(4,4,5,.95) 0%,rgba(4,4,5,.48) 70%,rgba(4,4,5,.38))}.section{padding:82px 20px}.story h2,.section-head h2,.tour h2,.close h2,.visual-overlay h2,.sf-museums h2,.sf-manifesto h2,.sf-model h2{font-size:43px}.honoree-grid,.experience-grid,.city-grid{grid-template-columns:1fr}.honoree-grid article{min-height:145px}.visual-break{min-height:600px}.visual-break:after{background:linear-gradient(0deg,rgba(5,5,5,.9),rgba(5,5,5,.15) 75%)}.visual-overlay{left:20px;right:20px;bottom:55px}.actions{flex-direction:column}.button{width:100%}.sf-nav{padding:0 18px}.sf-nav>div{display:none}.sf-hero-copy h1{font-size:48px}.sf-hero-copy>img{height:180px}.sf-museums,.sf-model,.sf-manifesto{padding:86px 18px}.sf-card{min-height:350px;padding:25px}.sf-model>div{grid-template-columns:1fr}.sf-crest img{height:300px}.sf-footer{padding:48px 18px;flex-direction:column}}
`;
