"use client";

import type { CSSProperties } from "react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { FAMILY_HERO } from "./museumVisualsFamily";
import { LIVING_HERO, LIVING_GALLERY } from "./museumVisualsLiving";
import { FALLEN_HERO, FALLEN_GALLERY } from "./museumVisualsFallen";
import { WOMEN_HERO, WOMEN_GALLERY } from "./museumVisualsWomen";

const SUPABASE_URL = "https://wfkohcwxxsrhcxhepfql.supabase.co";
const SUPABASE_KEY = "sb_publishable_zKej0f4ql6VSR9rtHXaU0w_0yhVNAGL";
const SUPABASE_ANON_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWJhYmFzZSIsInJlZiI6Indma29oY3d4eHNyaGN4aGVwZnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMzMxODUsImV4cCI6MjA4MjkwOTE4NX0.e78lphH3WlRtWP0M9egyvFCLNVW9rgJiOBy9-ZZC9Ao";

const requestTypes = [
  ["notify", "Notify Me", "Be first to know when your market is announced."],
  ["tickets", "Tickets", "Get ticket and on-sale information for your city."],
  ["group_visit", "Groups", "Plan a group museum experience."],
  ["school_visit", "Schools", "Student, campus and educational visits."],
  ["private_event", "Private Events", "Receptions, buyouts and private experiences."],
  ["merchandise", "Merchandise", "Museum collection and merchandise updates."],
  ["press", "Press", "Media, editorial and interview requests."],
] as const;

const commonExperiences = [
  "Art + Installation", "Biographies", "Awards + Accolades", "What You Didn’t Know",
  "Related Family", "Audio + Video", "Silent Headphones", "Lifesize Statues",
  "Life Journey Maps", "Fun Facts", "Souvenir Shop"
];

type TourRow = {
  tour_city_id:string; museum_slug:string; city:string; region?:string|null; venue?:string|null;
  opens_on?:string|null; closes_on?:string|null; city_status:"announced"|"on_sale"; ticket_url?:string|null;
  offers?: Array<{offer_id:string;code:string;name:string;audience:string;offer_status:string;price_cents?:number|null;currency?:string;checkout_url?:string|null}>;
};

type Journey = { number:string; title:string; copy:string; tag:string };
type MuseumConfig = {
  slug:string; name:string; parentLabel:string; tagline:string; description:string; mission:string;
  hero:string; gallery:string; accent:string; accentSoft:string; paper:string; ink:string;
  mark?:string; heroPosition?:string; galleryPosition?:string; visualKicker:string; visualTitle:string;
  annualCopy:string; signature:string; experiences:string[]; cities:string[]; journey:Journey[];
};

const configs: Record<string, MuseumConfig> = {
  "living-legends": {
    slug:"living-legends", name:"Living Legends", parentLabel:"A SCENTED FLOWERS MUSEUM",
    tagline:"Giving them their flowers while they can smell them.",
    description:"A living tribute to the people whose talent, leadership and cultural influence helped shape the world we know today.",
    mission:"Living Legends turns recognition into an environment. Visitors move through achievement, influence, struggle, breakthrough and legacy while the people being honored are still here to receive the appreciation.",
    hero:LIVING_HERO, gallery:LIVING_GALLERY, accent:"#d6a93f", accentSoft:"#f3db92", paper:"#f3eee4", ink:"#080807",
    mark:"/portfolio/living-legends.svg", heroPosition:"center", galleryPosition:"center",
    visualKicker:"THE HALL OF HONOR", visualTitle:"Greatness, still in the room.",
    annualCopy:"A new class. New stories. New rooms. The collection changes every year, so the experience rewards curiosity instead of publishing the entire answer before you arrive.",
    signature:"Honor the impact while the story is still being written.",
    experiences:["Letters of Appreciation", "Champagne Welcome", ...commonExperiences],
    cities:["Miami","Orlando","Houston","Tampa","Atlanta","Memphis","Savannah","Dallas","New York","Denver","Washington, D.C.","Las Vegas","Los Angeles","Charlotte","Nashville"],
    journey:[
      {number:"01",title:"The Arrival",copy:"A ceremonial threshold designed to make recognition feel immediate, elevated and alive.",tag:"WELCOME"},
      {number:"02",title:"Hall of Honor",copy:"Monumental portraits, accolades, objects and stories establish why influence deserves preservation.",tag:"LEGACY"},
      {number:"03",title:"The Story Rooms",copy:"Biography unfolds through sound, film, milestones and the moments that changed the trajectory.",tag:"STORY"},
      {number:"04",title:"Impact Gallery",copy:"Culture, business, art, sport, fashion and community show how one life can move many worlds.",tag:"IMPACT"},
      {number:"05",title:"The Flowers Room",copy:"Gratitude becomes part of the exhibit through appreciation, reflection and a living record of influence.",tag:"HONOR"},
      {number:"06",title:"Carry It Forward",copy:"The visit closes by turning admiration into inspiration for the next generation.",tag:"FUTURE"},
    ]
  },
  "fallen-stars": {
    slug:"fallen-stars", name:"Fallen Stars", parentLabel:"A SCENTED FLOWERS MUSEUM",
    tagline:"The stars still shine.",
    description:"An immersive remembrance museum honoring cultural icons whose lives ended while their work, influence and memory continue to move generations.",
    mission:"Fallen Stars treats remembrance as more than loss. The museum preserves achievement, humanity, cultural impact and the echoes that remain after a life ends.",
    hero:FALLEN_HERO, gallery:FALLEN_GALLERY, accent:"#e3bd68", accentSoft:"#fff0c9", paper:"#f4f0e9", ink:"#08090b",
    mark:"/portfolio/fallen-stars.svg", heroPosition:"center", galleryPosition:"center",
    visualKicker:"THE WALK OF LEGENDS", visualTitle:"Memory made monumental.",
    annualCopy:"Each edition brings forward a different constellation of lives and cultural moments. The lineup stays unrevealed so remembrance is encountered as a journey, not reduced to a preview list.",
    signature:"Their light is not gone. It changed where we look for it.",
    experiences:["Memorial Garden", "Reflection Space", ...commonExperiences],
    cities:["Miami","Orlando","Houston","Tampa","Atlanta","New York","Denver","Nashville","Memphis","Savannah","Dallas","Birmingham","Los Angeles","Las Vegas","Washington, D.C.","Charlotte"],
    journey:[
      {number:"01",title:"Threshold of Light",copy:"The visit begins in luminosity, not darkness — a transition from absence into remembrance.",tag:"ARRIVAL"},
      {number:"02",title:"Walk of Legends",copy:"A procession of stories establishes the people, eras and cultural movements carried forward in memory.",tag:"MEMORY"},
      {number:"03",title:"The Archive",copy:"Artifacts, music, film, photographs and milestones make the person larger than the final headline.",tag:"ARCHIVE"},
      {number:"04",title:"Echoes",copy:"Visitors hear the work, voices and influence that still live inside culture today.",tag:"VOICE"},
      {number:"05",title:"Reflection Garden",copy:"A quieter space gives visitors room to remember, process and connect their own memories to the story.",tag:"REFLECT"},
      {number:"06",title:"Legacy Forward",copy:"The closing experience asks what survives, who was inspired and how culture keeps carrying the light.",tag:"ETERNAL"},
    ]
  },
  "women-make-the-world-go-round": {
    slug:"women-make-the-world-go-round", name:"Women Make the World Go Round", parentLabel:"A SCENTED FLOWERS MUSEUM",
    tagline:"Vision. Strength. Impact.",
    description:"A museum of women’s history, achievement, perspective and influence, with a flagship focus on Black women and urban culture.",
    mission:"Women Make the World Go Round makes women’s influence visible across leadership, culture, business, media, music, fashion, activism and community — showing not only what women accomplished, but what became possible because they did.",
    hero:WOMEN_HERO, gallery:WOMEN_GALLERY, accent:"#dc9ba2", accentSoft:"#efcf98", paper:"#f6e8e4", ink:"#0b0809",
    heroPosition:"center", galleryPosition:"center",
    visualKicker:"HER STORY · OUR WORLD", visualTitle:"Influence you can walk through.",
    annualCopy:"Every year introduces a different collection of women, industries, eras and impact. City-specific stories can appear along the tour, making each edition feel discovered rather than pre-announced.",
    signature:"The world moves differently because women moved it first.",
    experiences:["Leadership Galleries", "Culture Archive", ...commonExperiences],
    cities:["Miami","Orlando","Houston","Tampa","Atlanta","New York","Denver","Nashville","Memphis","Savannah","Dallas","Charlotte","Los Angeles","Las Vegas","Washington, D.C.","Birmingham"],
    journey:[
      {number:"01",title:"World in Motion",copy:"The orbit becomes a visual language for the forces women set in motion across generations.",tag:"VISION"},
      {number:"02",title:"Hall of Vision",copy:"Portraiture and storytelling introduce women who challenged the limits of what was considered possible.",tag:"LEAD"},
      {number:"03",title:"Culture Lab",copy:"Music, beauty, fashion, media and entertainment reveal how taste becomes identity and identity becomes influence.",tag:"CULTURE"},
      {number:"04",title:"Power + Progress",copy:"Business, policy, activism, athletics and community show leadership in action across different arenas.",tag:"POWER"},
      {number:"05",title:"The Living Archive",copy:"Objects, documents, media and interactive storytelling connect personal journeys to broader social change.",tag:"ARCHIVE"},
      {number:"06",title:"The Future Room",copy:"Visitors leave with a view forward — toward the women building what the next generation will inherit.",tag:"FUTURE"},
    ]
  }
};

function formatDate(value?:string|null){
  if(!value) return "";
  const d = new Date(`${value}T12:00:00`);
  return Number.isNaN(d.valueOf()) ? value : d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
}

function useReveal(){
  useEffect(()=>{
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-mx-reveal]"));
    if(!nodes.length) return;
    const obs = new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){ (entry.target as HTMLElement).dataset.mxVisible = "true"; obs.unobserve(entry.target); }
    }),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
    nodes.forEach(node=>obs.observe(node));
    return()=>obs.disconnect();
  },[]);
}

function BrandMark({config}:{config:MuseumConfig}){
  if(config.mark) return <img className="mx-mark" src={config.mark} alt={`${config.name} logo`}/>;
  return <div className="mx-women-mark"><span className="mx-orbit-symbol"><i/><i/><b>◐</b></span><strong>WOMEN</strong><small>MAKE THE WORLD GO ROUND</small></div>;
}

function InterestPanel({config, parent=false}:{config:MuseumConfig; parent?:boolean}){
  const [city,setCity]=useState(config.cities[0] || "Atlanta");
  const [leadType,setLeadType]=useState<string>("notify");
  const [status,setStatus]=useState<"idle"|"sending"|"done"|"error">("idle");
  const [reference,setReference]=useState("");
  const [live,setLive]=useState<TourRow[]>([]);
  const selected=useMemo(()=>requestTypes.find(x=>x[0]===leadType)||requestTypes[0],[leadType]);
  const liveCity=useMemo(()=>live.find(x=>x.city.toLowerCase()===city.toLowerCase()),[live,city]);
  const checkout=liveCity?.ticket_url || liveCity?.offers?.find(x=>x.offer_status==="on_sale"&&x.checkout_url)?.checkout_url || null;

  useEffect(()=>{
    let cancelled=false;
    fetch(`${SUPABASE_URL}/rest/v1/museum_public_tour_inventory?select=*&museum_slug=eq.${encodeURIComponent(config.slug)}`,{headers:{apikey:SUPABASE_KEY}})
      .then(r=>r.ok?r.json():[]).then(d=>{if(!cancelled&&Array.isArray(d))setLive(d)}).catch(()=>{});
    return()=>{cancelled=true};
  },[config.slug]);

  useEffect(()=>{ if(liveCity?.city_status==="on_sale") setLeadType("tickets"); },[liveCity?.city_status]);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setStatus("sending");
    const form=new FormData(e.currentTarget);
    const payload={museum_slug:config.slug,lead_type:leadType,city,name:String(form.get("name")||""),email:String(form.get("email")||""),phone:String(form.get("phone")||""),organization:String(form.get("organization")||""),group_size:String(form.get("group_size")||""),message:String(form.get("message")||""),source_page:window.location.pathname};
    try{
      const res=await fetch(`${SUPABASE_URL}/functions/v1/museum-interest`,{method:"POST",headers:{"Content-Type":"application/json",apikey:SUPABASE_ANON_JWT,Authorization:`Bearer ${SUPABASE_ANON_JWT}`},body:JSON.stringify(payload)});
      const data=await res.json(); if(!res.ok||!data.ok) throw new Error();
      setReference(data.reference||""); setStatus("done"); e.currentTarget.reset();
    }catch{ setStatus("error"); }
  }

  return <section id="visit" className={`mx-visit ${parent?"mx-parent-visit":""}`} data-mx-reveal>
    <div className="mx-visit-intro"><span className="mx-kicker">PLAN THE EXPERIENCE</span><h2>{parent?"Choose a museum. Choose a city. Stay close.":"Come for the discovery."}</h2><p>{parent?"Use the museum family desk for touring updates, groups, schools, private events, merchandise and press.":"Dates and venues appear as markets are activated. The annual lineup stays unrevealed before the visit."}</p></div>
    <div className="mx-visit-shell">
      <div className="mx-market-panel">
        <label>SELECT TOUR MARKET</label>
        <select value={city} onChange={e=>setCity(e.target.value)}>{config.cities.map(c=><option key={c}>{c}</option>)}</select>
        <div className={`mx-market-status ${liveCity?"is-live":""}`}>
          <small>{liveCity?.city_status==="on_sale"?"NOW ON SALE":liveCity?.city_status==="announced"?"MARKET ANNOUNCED":"PLANNED MARKET"}</small>
          <strong>{city}</strong>
          {liveCity?.venue&&<p>{liveCity.venue}</p>}
          {liveCity?.opens_on&&<p>{formatDate(liveCity.opens_on)}{liveCity.closes_on?` — ${formatDate(liveCity.closes_on)}`:""}</p>}
          {!liveCity&&<p>Venue + dates will be announced when confirmed.</p>}
          {checkout&&<a href={checkout} target="_blank" rel="noopener noreferrer">BUY TICKETS ↗</a>}
        </div>
        <div className="mx-request-tabs">{requestTypes.map(([key,title])=><button type="button" key={key} className={leadType===key?"active":""} onClick={()=>setLeadType(key)}>{title}</button>)}</div>
      </div>
      <form className="mx-interest-form" onSubmit={submit}>
        <div className="mx-form-title"><small>REQUEST TYPE</small><h3>{selected[1]}</h3><p>{selected[2]}</p></div>
        <div className="mx-field-row"><label>Name<input required minLength={2} name="name" autoComplete="name"/></label><label>Email<input required type="email" name="email" autoComplete="email"/></label></div>
        <div className="mx-field-row"><label>Phone<input name="phone" type="tel" autoComplete="tel"/></label><label>Group Size<input name="group_size" type="number" min="1" max="5000"/></label></div>
        <label>Organization<input name="organization"/></label>
        <label>Message<textarea name="message" rows={4} placeholder="Tell the museum team what you need."/></label>
        <button className="mx-submit" disabled={status==="sending"}>{status==="sending"?"SUBMITTING…":checkout&&leadType==="tickets"?"REQUEST TICKET HELP":"SUBMIT REQUEST"}</button>
        {status==="done"&&<div className="mx-success">Received{reference?<> · Reference <b>{reference}</b></>:null}</div>}
        {status==="error"&&<div className="mx-error">We could not submit this request. Please try again.</div>}
      </form>
    </div>
  </section>;
}

function MuseumPage({config}:{config:MuseumConfig}){
  useReveal();
  const vars={"--mx-accent":config.accent,"--mx-soft":config.accentSoft,"--mx-paper":config.paper,"--mx-ink":config.ink} as CSSProperties;
  return <main className={`mx-page mx-${config.slug}`} style={vars}>
    <style>{css}</style>
    <div className="mx-noise" aria-hidden="true"/>
    <nav className="mx-nav"><a className="mx-parent" href="/scented-flowers">SCENTED FLOWERS</a><a className="mx-nav-brand" href="#top">{config.name}</a><div className="mx-nav-links"><a href="#annual">Annual Edition</a><a href="#journey">Experience</a><a className="mx-nav-cta" href="#visit">Plan Visit</a></div></nav>

    <header id="top" className="mx-hero">
      <img src={config.hero} style={{objectPosition:config.heroPosition||"center"}} alt="" aria-hidden="true"/>
      <div className="mx-hero-shade"/>
      <div className="mx-ambient" aria-hidden="true"><i/><i/><i/></div>
      <div className="mx-hero-grid">
        <div className="mx-hero-copy" data-mx-reveal><span className="mx-kicker">{config.parentLabel}</span><h1>{config.name}</h1><p className="mx-tagline">{config.tagline}</p><p className="mx-deck">{config.description}</p><div className="mx-actions"><a className="mx-primary" href="#annual">DISCOVER THE EDITION</a><a className="mx-secondary" href="#journey">ENTER THE EXPERIENCE</a></div></div>
        <div className="mx-hero-emblem" data-mx-reveal><BrandMark config={config}/><small>ANNUAL · IMMERSIVE · TOURING</small></div>
      </div>
      <div className="mx-scroll-cue"><span/>SCROLL TO ENTER</div>
    </header>

    <section className="mx-statement" data-mx-reveal><div><span className="mx-kicker">WHY IT EXISTS</span><h2>Culture deserves more than a memory.</h2></div><div><p>{config.mission}</p><small>SCENTED FLOWERS · PRESERVING STORIES / BUILDING EXPERIENCES</small></div></section>

    <section id="annual" className="mx-annual">
      <div className="mx-annual-copy" data-mx-reveal><span className="mx-kicker">THE ANNUAL COLLECTION</span><h2>No roster.<br/>No spoilers.</h2><p>{config.annualCopy}</p><strong>DIFFERENT EVERY YEAR · REVEALED INSIDE</strong></div>
      <div className="mx-lock-stage" aria-label="Annual collection remains unrevealed before the visit">
        <div className="mx-lock-ring ring-a"/><div className="mx-lock-ring ring-b"/><div className="mx-lock-center"><span>?</span><small>THIS YEAR’S<br/>COLLECTION</small></div>
        <div className="mx-lock-card c1"><b>01</b><span>NEW STORIES</span></div><div className="mx-lock-card c2"><b>02</b><span>NEW ROOMS</span></div><div className="mx-lock-card c3"><b>03</b><span>RETURN AGAIN</span></div>
      </div>
    </section>

    <section className="mx-cinema"><img src={config.gallery} style={{objectPosition:config.galleryPosition||"center"}} alt={`${config.name} museum environment concept`}/><div className="mx-cinema-shade"/><div className="mx-cinema-copy" data-mx-reveal><span className="mx-kicker">{config.visualKicker}</span><h2>{config.visualTitle}</h2><p>The website gives you the atmosphere. The museum keeps the discovery.</p></div></section>

    <section id="journey" className="mx-journey"><header data-mx-reveal><span className="mx-kicker">THE VISITOR JOURNEY</span><h2>Walk through a story,<br/>not a page of names.</h2><p>Each chapter changes the emotional temperature of the visit while protecting the annual reveal.</p></header><div className="mx-journey-track">{config.journey.map(item=><article key={item.number} data-mx-reveal><div><small>{item.number}</small><b>{item.tag}</b></div><h3>{item.title}</h3><p>{item.copy}</p><span className="mx-card-line"/></article>)}</div></section>

    <section className="mx-signature"><div className="mx-signature-orbit" aria-hidden="true"><i/><i/></div><p data-mx-reveal>“{config.signature}”</p><small>THE IDEA BEHIND THE EXPERIENCE</small></section>

    <section id="experience" className="mx-inside"><header data-mx-reveal><span className="mx-kicker">INSIDE THE MUSEUM</span><h2>Layered. Tactile. Cinematic.</h2><p>Not a hallway of posters. The museum blends physical objects, storytelling, sound, art, reflection and discovery.</p></header><div className="mx-feature-grid">{config.experiences.map((item,i)=><div key={item} data-mx-reveal><small>{String(i+1).padStart(2,"0")}</small><strong>{item}</strong></div>)}</div></section>

    <section className="mx-tour"><div className="mx-tour-copy" data-mx-reveal><span className="mx-kicker">THE TOURING PLATFORM</span><h2>Your city can become the next chapter.</h2><p>Markets below are part of the current tour plan. Venue, dates and ticket access only go live when officially activated.</p></div><div className="mx-city-marquee" aria-label="Planned tour markets">{config.cities.concat(config.cities).map((city,i)=><span key={`${city}-${i}`}>{city}<b>✦</b></span>)}</div></section>

    <InterestPanel config={config}/>

    <footer className="mx-footer"><div><a href="/scented-flowers">SCENTED FLOWERS</a><p>{config.name}</p></div><div><a href="/living-legends">Living Legends</a><a href="/fallen-stars">Fallen Stars</a><a href="/women-make-the-world-go-round">Women Make the World Go Round</a><a href="/">Forever Futbol</a></div><small>THE ANNUAL LINEUP IS DISCOVERED INSIDE.</small></footer>
  </main>;
}

const familyCities=["Miami","Orlando","Houston","Tampa","Atlanta","Memphis","Savannah","Dallas","New York","Denver","Washington, D.C.","Las Vegas","Los Angeles","Charlotte","Nashville","Birmingham"];
const parentConfig: MuseumConfig={slug:"scented-flowers",name:"Scented Flowers",parentLabel:"THE MOTHER MUSEUM",tagline:"Give them their flowers. Preserve the legacy.",description:"A cultural museum house built to preserve stories, celebrate impact and give independent museum worlds a shared home.",mission:"Scented Flowers is not one exhibit. It is the cultural house that connects distinct museum experiences through a common standard of preservation, storytelling, touring and return-worthy annual editions.",hero:FAMILY_HERO,gallery:FAMILY_HERO,accent:"#d3aa4a",accentSoft:"#f1d88c",paper:"#f4ecdf",ink:"#070605",mark:"/portfolio/scented-flowers.svg",visualKicker:"THE MUSEUM FAMILY",visualTitle:"One house. Independent worlds.",annualCopy:"Each museum keeps its own identity while its featured collection evolves annually.",signature:"Preserve the story. Build the ritual. Give people a reason to return.",experiences:commonExperiences,cities:familyCities,journey:[]};

export function ScentedFlowersFinal(){
  useReveal();
  const portals=[
    {name:"Living Legends",href:"/living-legends",label:"HONOR THE LIVING",copy:"Recognition in real time.",image:LIVING_HERO,tone:"living"},
    {name:"Fallen Stars",href:"/fallen-stars",label:"REMEMBER THE LIGHT",copy:"Legacy beyond a lifetime.",image:FALLEN_HERO,tone:"fallen"},
    {name:"Women Make the World Go Round",href:"/women-make-the-world-go-round",label:"MAKE INFLUENCE VISIBLE",copy:"Her story. Our world.",image:WOMEN_HERO,tone:"women"},
    {name:"Forever Futbol",href:"/",label:"THE BEAUTIFUL GAME",copy:"Past. Present. Eternal.",image:null,tone:"futbol"},
  ];
  return <main className="sf-final" style={{"--mx-accent":"#d3aa4a","--mx-soft":"#f1d88c","--mx-paper":"#f4ecdf","--mx-ink":"#070605"} as CSSProperties}>
    <style>{css}</style><div className="mx-noise" aria-hidden="true"/>
    <nav className="sf-nav"><a href="#top" className="sf-nav-brand">SCENTED FLOWERS</a><div><a href="#family">Museum Family</a><a href="#model">The Model</a><a className="mx-nav-cta" href="#visit">Stay Connected</a></div></nav>
    <header id="top" className="sf-hero"><img src={FAMILY_HERO} alt="Scented Flowers museum family concept"/><div className="sf-hero-shade"/><div className="sf-hero-inner" data-mx-reveal><span className="mx-kicker">THE MOTHER MUSEUM</span><img className="sf-crest" src="/portfolio/scented-flowers.svg" alt="Scented Flowers"/><h1>One cultural house.<br/><em>Four museum worlds.</em></h1><p>Distinct identities. Shared standards. Annual collections built to make discovery a reason to return.</p><a className="mx-primary" href="#family">ENTER THE MUSEUM DISTRICT ↓</a></div></header>

    <section className="sf-manifesto" data-mx-reveal><span>SCENTED FLOWERS</span><h2>We are not building four versions of the same museum.</h2><p>Living Legends celebrates people while they can receive the flowers. Fallen Stars protects memory. Women Make the World Go Round makes influence visible. Forever Futbol protects the culture of the beautiful game. Scented Flowers is the house that lets every world stay distinct while growing stronger together.</p></section>

    <section id="family" className="sf-portals"><header data-mx-reveal><span className="mx-kicker">THE MUSEUM FAMILY</span><h2>Choose a doorway.</h2><p>You know the world you are entering. The annual collection waiting inside remains part of the discovery.</p></header><div className="sf-portal-grid">{portals.map((portal,i)=><a href={portal.href} key={portal.name} className={`sf-portal ${portal.tone}`} data-mx-reveal>{portal.image?<img src={portal.image} alt="" aria-hidden="true"/>:<div className="sf-futbol-art"><div className="sf-ball">◉</div><i/><i/><i/></div>}<div className="sf-portal-shade"/><div className="sf-portal-copy"><small>0{i+1} · {portal.label}</small><h3>{portal.name}</h3><p>{portal.copy}</p><b>ENTER ↗</b></div></a>)}</div></section>

    <section id="model" className="sf-model"><div className="sf-model-sticky" data-mx-reveal><span className="mx-kicker">THE MODEL</span><h2>Never exactly the same museum twice.</h2><p>The identity stays. The annual collection evolves. That creates anticipation before the visit and a genuine reason to come back next year.</p></div><div className="sf-model-steps">{[
      ["01","ONE HOUSE","Shared cultural standards, preservation systems and touring operations."],
      ["02","DISTINCT WORLDS","Every museum keeps its own visual language, emotional temperature and purpose."],
      ["03","ANNUAL EDITIONS","The featured collection changes without giving away the full lineup online."],
      ["04","RETURN RITUAL","A new year creates a new reason to visit, talk about it and bring someone else."],
    ].map(x=><article key={x[0]} data-mx-reveal><small>{x[0]}</small><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>

    <section className="sf-panorama"><img src={FAMILY_HERO} alt="" aria-hidden="true"/><div/><p data-mx-reveal>FIVE NAMES. ONE CULTURAL HOUSE.<br/><span>THE STORY CHANGES. THE STANDARD DOES NOT.</span></p></section>
    <InterestPanel config={parentConfig} parent/>
    <footer className="mx-footer sf-footer"><div><a href="#top">SCENTED FLOWERS</a><p>THE MOTHER MUSEUM</p></div><div><a href="/living-legends">Living Legends</a><a href="/fallen-stars">Fallen Stars</a><a href="/women-make-the-world-go-round">Women Make the World Go Round</a><a href="/">Forever Futbol</a></div><small>DIFFERENT EVERY YEAR · DISCOVERED INSIDE</small></footer>
  </main>;
}

export function LivingLegendsFinal(){return <MuseumPage config={configs["living-legends"]}/>}
export function FallenStarsFinal(){return <MuseumPage config={configs["fallen-stars"]}/>}
export function WomenFinal(){return <MuseumPage config={configs["women-make-the-world-go-round"]}/>}

const css=`
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#070707}.mx-page,.sf-final{position:relative;min-height:100vh;background:var(--mx-ink);color:#fff;font-family:Arial,Helvetica,sans-serif;overflow:hidden;-webkit-font-smoothing:antialiased}.mx-page h1,.mx-page h2,.mx-page h3,.sf-final h1,.sf-final h2,.sf-final h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;text-wrap:balance}.mx-noise{position:fixed;z-index:100;inset:0;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E")}.mx-kicker{display:block;font-size:9px;letter-spacing:.34em;font-weight:800;color:var(--mx-accent);text-transform:uppercase}.mx-nav,.sf-nav{position:fixed;z-index:90;top:0;left:0;right:0;height:72px;padding:0 clamp(18px,4vw,64px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;background:linear-gradient(180deg,rgba(4,4,5,.88),rgba(4,4,5,.35),transparent);backdrop-filter:blur(8px)}.mx-nav a,.sf-nav a{color:#fff;text-decoration:none}.mx-parent,.sf-nav-brand{font-size:10px;letter-spacing:.2em;font-weight:800}.mx-nav-brand{font:18px Georgia,serif}.mx-nav-links,.sf-nav>div{justify-self:end;display:flex;align-items:center;gap:25px}.mx-nav-links>a,.sf-nav>div>a{font-size:8px;letter-spacing:.15em;text-transform:uppercase;opacity:.75}.mx-nav-cta{border:1px solid rgba(255,255,255,.3);padding:11px 15px;opacity:1!important}.mx-hero{height:100svh;min-height:760px;position:relative;overflow:hidden}.mx-hero>img,.sf-hero>img{position:absolute;inset:-3%;width:106%;height:106%;object-fit:cover;animation:mxPush 22s ease-in-out infinite alternate}.mx-hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,3,4,.94) 0%,rgba(3,3,4,.72) 40%,rgba(3,3,4,.22) 72%),linear-gradient(0deg,rgba(3,3,4,.98) 0%,transparent 45%,rgba(0,0,0,.28) 100%)}.mx-hero-grid{position:relative;z-index:3;height:100%;padding:130px clamp(24px,6vw,96px) 80px;display:grid;grid-template-columns:1.25fr .75fr;align-items:end;gap:8vw}.mx-hero-copy h1{font-size:clamp(66px,9.8vw,154px);line-height:.82;letter-spacing:-.065em;margin:20px 0 28px;max-width:1100px}.mx-tagline{font:italic clamp(21px,2.3vw,33px) Georgia,serif;color:var(--mx-soft);margin:0 0 18px}.mx-deck{max-width:690px;font-size:15px;line-height:1.85;color:rgba(255,255,255,.67)}.mx-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:30px}.mx-primary,.mx-secondary{display:inline-flex;min-height:52px;align-items:center;justify-content:center;padding:0 22px;text-decoration:none;font-size:8px;font-weight:800;letter-spacing:.16em}.mx-primary{background:var(--mx-accent);color:#100e09;border:1px solid var(--mx-accent)}.mx-secondary{color:#fff;border:1px solid rgba(255,255,255,.28);backdrop-filter:blur(12px)}.mx-hero-emblem{justify-self:end;align-self:center;width:min(31vw,400px);text-align:center;padding:34px;border:1px solid rgba(255,255,255,.13);background:rgba(8,8,9,.32);backdrop-filter:blur(15px);box-shadow:0 30px 90px rgba(0,0,0,.4)}.mx-mark{display:block;width:100%;max-height:270px;object-fit:contain}.mx-hero-emblem>small{display:block;margin-top:20px;font-size:7px;letter-spacing:.25em;color:var(--mx-soft)}.mx-women-mark{display:grid;place-items:center}.mx-women-mark strong{font:56px Georgia,serif;letter-spacing:.04em;color:#e2a5aa}.mx-women-mark small{font-size:8px;letter-spacing:.26em;color:#e7bd64}.mx-orbit-symbol{position:relative;width:110px;height:110px;display:grid;place-items:center;margin-bottom:14px}.mx-orbit-symbol i{position:absolute;width:100%;height:48%;border:2px solid #d7ac55;border-radius:50%;transform:rotate(24deg)}.mx-orbit-symbol i:nth-child(2){transform:rotate(-38deg)}.mx-orbit-symbol b{font-size:38px;color:#d7ac55}.mx-scroll-cue{position:absolute;z-index:4;right:clamp(22px,5vw,72px);bottom:25px;display:flex;gap:12px;align-items:center;font-size:7px;letter-spacing:.22em;color:rgba(255,255,255,.55)}.mx-scroll-cue span{width:46px;height:1px;background:var(--mx-accent)}.mx-ambient{position:absolute;right:10%;top:14%;width:38vw;height:38vw;opacity:.24}.mx-ambient i{position:absolute;inset:10%;border:1px solid var(--mx-accent);border-radius:50%;animation:mxOrbit 18s linear infinite}.mx-ambient i:nth-child(2){inset:25%;animation-direction:reverse;transform:rotate(55deg)}.mx-ambient i:nth-child(3){inset:39%;animation-duration:12s}.mx-statement{padding:120px clamp(24px,7vw,110px);background:var(--mx-paper);color:#17130e;display:grid;grid-template-columns:1fr 1fr;gap:9vw;align-items:start}.mx-statement h2{font-size:clamp(48px,6vw,90px);line-height:.94;letter-spacing:-.05em;margin:17px 0}.mx-statement p{font:clamp(21px,2vw,30px)/1.55 Georgia,serif;margin:10px 0 35px}.mx-statement small{font-size:8px;letter-spacing:.18em;color:#86651e}.mx-annual{min-height:850px;padding:120px clamp(24px,6vw,96px);display:grid;grid-template-columns:.9fr 1.1fr;gap:6vw;align-items:center;background:radial-gradient(circle at 75% 50%,color-mix(in srgb,var(--mx-accent) 11%,transparent),transparent 37%),#09090a}.mx-annual-copy h2{font-size:clamp(64px,8vw,124px);line-height:.84;letter-spacing:-.06em;margin:20px 0 32px}.mx-annual-copy p{max-width:610px;font-size:15px;line-height:1.9;color:rgba(255,255,255,.62)}.mx-annual-copy strong{display:block;margin-top:32px;font-size:8px;letter-spacing:.22em;color:var(--mx-soft)}.mx-lock-stage{position:relative;aspect-ratio:1;max-width:670px;width:100%;justify-self:center;display:grid;place-items:center}.mx-lock-ring{position:absolute;border:1px solid color-mix(in srgb,var(--mx-accent) 55%,transparent);border-radius:50%;animation:mxOrbit 22s linear infinite}.ring-a{inset:8%}.ring-b{inset:21%;animation-direction:reverse;transform:rotate(37deg)}.mx-lock-ring:before,.mx-lock-ring:after{content:'✦';position:absolute;color:var(--mx-accent);font-size:20px}.mx-lock-ring:before{top:7%;left:13%}.mx-lock-ring:after{bottom:5%;right:18%}.mx-lock-center{width:210px;height:210px;border-radius:50%;display:grid;place-items:center;text-align:center;background:radial-gradient(circle at 35% 30%,#3b3020,#0a0907 72%);border:1px solid var(--mx-accent);box-shadow:0 0 70px color-mix(in srgb,var(--mx-accent) 18%,transparent)}.mx-lock-center span{font:80px Georgia,serif;color:var(--mx-accent);line-height:.7}.mx-lock-center small{font-size:7px;letter-spacing:.18em;line-height:1.8;color:rgba(255,255,255,.6)}.mx-lock-card{position:absolute;width:150px;padding:16px;border:1px solid rgba(255,255,255,.12);background:rgba(10,10,11,.75);backdrop-filter:blur(15px)}.mx-lock-card b{display:block;font:28px Georgia,serif;color:var(--mx-accent)}.mx-lock-card span{font-size:7px;letter-spacing:.15em}.c1{left:2%;top:20%}.c2{right:0;top:34%}.c3{left:17%;bottom:5%}.mx-cinema{height:min(92vh,920px);min-height:680px;position:relative;overflow:hidden}.mx-cinema>img{width:100%;height:100%;object-fit:cover;transform:scale(1.03)}.mx-cinema-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,4,5,.92),rgba(4,4,5,.12) 70%),linear-gradient(0deg,rgba(4,4,5,.78),transparent 44%)}.mx-cinema-copy{position:absolute;left:clamp(24px,7vw,110px);bottom:90px;z-index:3;max-width:800px}.mx-cinema-copy h2{font-size:clamp(58px,7vw,110px);line-height:.88;letter-spacing:-.055em;margin:18px 0}.mx-cinema-copy p{font-size:15px;line-height:1.8;color:rgba(255,255,255,.65)}.mx-journey{padding:125px 0 135px;background:#0a0a0b}.mx-journey>header{padding:0 clamp(24px,7vw,110px);max-width:1250px}.mx-journey h2{font-size:clamp(55px,7vw,104px);line-height:.92;letter-spacing:-.05em;margin:18px 0}.mx-journey>header p{max-width:650px;line-height:1.8;color:rgba(255,255,255,.55)}.mx-journey-track{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(360px,31vw);gap:12px;overflow-x:auto;padding:55px clamp(24px,7vw,110px) 15px;scroll-snap-type:x mandatory;scrollbar-width:none}.mx-journey-track::-webkit-scrollbar{display:none}.mx-journey-track article{scroll-snap-align:start;min-height:430px;padding:30px;position:relative;border:1px solid rgba(255,255,255,.12);background:linear-gradient(145deg,color-mix(in srgb,var(--mx-accent) 8%,#0b0b0c),#0b0b0c);display:flex;flex-direction:column}.mx-journey-track article>div{display:flex;justify-content:space-between}.mx-journey-track small{font:34px Georgia,serif;color:var(--mx-accent)}.mx-journey-track b{font-size:7px;letter-spacing:.2em;color:rgba(255,255,255,.45)}.mx-journey-track h3{font-size:42px;line-height:1;margin:auto 0 20px}.mx-journey-track p{font-size:13px;line-height:1.75;color:rgba(255,255,255,.58)}.mx-card-line{height:1px;background:linear-gradient(90deg,var(--mx-accent),transparent);width:100%;margin-top:25px}.mx-signature{min-height:520px;position:relative;display:grid;place-items:center;text-align:center;padding:90px 25px;background:var(--mx-paper);color:#17110b;overflow:hidden}.mx-signature p{position:relative;z-index:2;max-width:1100px;font:italic clamp(42px,6vw,86px)/1.05 Georgia,serif;letter-spacing:-.04em;margin:0}.mx-signature>small{position:absolute;bottom:55px;font-size:7px;letter-spacing:.24em;color:#8b6a25}.mx-signature-orbit{position:absolute;width:min(70vw,760px);aspect-ratio:1;opacity:.15}.mx-signature-orbit i{position:absolute;inset:7%;border:1px solid #9f7626;border-radius:50%;transform:rotate(20deg)}.mx-signature-orbit i:nth-child(2){inset:23%;transform:rotate(-40deg)}.mx-inside{padding:120px clamp(24px,7vw,110px);background:#080809}.mx-inside>header{max-width:1000px}.mx-inside h2,.mx-tour h2,.mx-visit-intro h2,.sf-portals h2,.sf-model h2,.sf-manifesto h2{font-size:clamp(54px,6.5vw,96px);line-height:.92;letter-spacing:-.05em;margin:18px 0}.mx-inside>header p,.mx-tour-copy p,.mx-visit-intro p,.sf-portals header p,.sf-model-sticky p{max-width:700px;line-height:1.85;color:rgba(255,255,255,.58)}.mx-feature-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:55px;border-left:1px solid rgba(255,255,255,.12);border-top:1px solid rgba(255,255,255,.12)}.mx-feature-grid>div{min-height:145px;padding:20px;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);display:flex;flex-direction:column;justify-content:space-between}.mx-feature-grid small{font-size:8px;color:var(--mx-accent)}.mx-feature-grid strong{font:22px Georgia,serif}.mx-tour{padding:125px 0 105px;background:linear-gradient(180deg,#0c0c0d,#050506)}.mx-tour-copy{padding:0 clamp(24px,7vw,110px)}.mx-city-marquee{display:flex;gap:35px;white-space:nowrap;overflow:hidden;margin-top:65px;padding:25px 0;border-top:1px solid rgba(255,255,255,.11);border-bottom:1px solid rgba(255,255,255,.11);animation:mxMarquee 45s linear infinite;width:max-content}.mx-city-marquee span{font:30px Georgia,serif;color:rgba(255,255,255,.78)}.mx-city-marquee b{margin-left:35px;color:var(--mx-accent)}.mx-visit{padding:120px clamp(24px,6vw,96px);background:var(--mx-paper);color:#17120d}.mx-visit-intro{max-width:1000px}.mx-visit-intro .mx-kicker{color:#85621d}.mx-visit-intro p{color:rgba(0,0,0,.56)}.mx-visit-shell{display:grid;grid-template-columns:1.05fr .95fr;gap:14px;margin-top:55px;max-width:1500px}.mx-market-panel,.mx-interest-form{background:#fff;border:1px solid rgba(0,0,0,.11);padding:34px}.mx-market-panel>label,.mx-interest-form>label,.mx-field-row label{display:block;font-size:8px;letter-spacing:.15em;text-transform:uppercase}.mx-market-panel select,.mx-interest-form input,.mx-interest-form textarea{width:100%;border:1px solid #d9d0c3;background:#fbf8f3;padding:13px;margin-top:8px;font:14px Arial}.mx-market-panel select{height:58px;font:21px Georgia,serif}.mx-market-status{margin:16px 0 22px;padding:25px;background:#12100c;color:#fff;position:relative;overflow:hidden}.mx-market-status:after{content:'';position:absolute;width:120px;height:120px;right:-30px;top:-45px;border:1px solid rgba(255,255,255,.15);border-radius:50%}.mx-market-status.is-live{box-shadow:inset 4px 0 0 var(--mx-accent)}.mx-market-status small{display:block;font-size:7px;letter-spacing:.22em;color:var(--mx-soft)}.mx-market-status strong{display:block;font:39px Georgia,serif;margin:8px 0}.mx-market-status p{margin:4px 0;color:rgba(255,255,255,.55);font-size:12px}.mx-market-status a{display:inline-block;margin-top:15px;color:var(--mx-soft);font-size:8px;letter-spacing:.15em;text-decoration:none}.mx-request-tabs{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}.mx-request-tabs button{min-height:52px;background:#faf7f2;border:1px solid #ddd4c8;cursor:pointer;font-size:11px}.mx-request-tabs button.active{background:#17130e;color:#fff;border-color:#17130e}.mx-form-title small{font-size:7px;letter-spacing:.2em;color:#8a6620}.mx-form-title h3{font-size:42px;margin:7px 0}.mx-form-title p{font-size:12px;line-height:1.6;color:#777;max-width:500px}.mx-field-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mx-interest-form>label,.mx-field-row label{margin-top:14px}.mx-submit{width:100%;min-height:55px;margin-top:20px;border:0;background:#17130e;color:#fff;font-size:8px;font-weight:800;letter-spacing:.16em;cursor:pointer}.mx-submit:disabled{opacity:.5}.mx-success,.mx-error{margin-top:13px;padding:12px;font-size:11px}.mx-success{background:#e8f1e8;color:#27572e}.mx-error{background:#f6e4e4;color:#842b2b}.mx-footer{padding:55px clamp(24px,6vw,96px);display:grid;grid-template-columns:1fr 1fr auto;align-items:end;gap:30px;background:#050506;border-top:1px solid rgba(255,255,255,.11)}.mx-footer a{color:#fff;text-decoration:none}.mx-footer>div:first-child>a{font:28px Georgia,serif;color:var(--mx-accent)}.mx-footer>div:first-child p{font-size:8px;letter-spacing:.2em}.mx-footer>div:nth-child(2){display:grid;grid-template-columns:1fr 1fr;gap:9px}.mx-footer>div:nth-child(2) a{font-size:8px;letter-spacing:.08em;opacity:.58}.mx-footer>small{font-size:7px;letter-spacing:.18em;color:var(--mx-soft)}
/* MOTHER MUSEUM */
.sf-nav{grid-template-columns:1fr 1fr}.sf-nav>div{justify-self:end}.sf-hero{height:100svh;min-height:760px;position:relative;display:grid;place-items:center;text-align:center;overflow:hidden}.sf-hero-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(3,3,3,.96),rgba(3,3,3,.22) 55%,rgba(3,3,3,.45)),radial-gradient(circle at 50% 48%,transparent,rgba(0,0,0,.45))}.sf-hero-inner{position:relative;z-index:3;max-width:1150px;padding:120px 24px 60px}.sf-crest{width:min(230px,35vw);max-height:230px;object-fit:contain;margin:20px auto 10px}.sf-hero h1{font-size:clamp(60px,8vw,128px);line-height:.88;letter-spacing:-.055em;margin:10px 0 26px}.sf-hero h1 em{color:var(--mx-soft);font-weight:400}.sf-hero p{max-width:720px;margin:0 auto 30px;line-height:1.8;color:rgba(255,255,255,.7)}.sf-manifesto{padding:130px clamp(24px,8vw,130px);background:var(--mx-paper);color:#17110d;display:grid;grid-template-columns:.35fr 1fr;column-gap:7vw}.sf-manifesto>span{font-size:9px;letter-spacing:.3em;color:#8a6720}.sf-manifesto h2{margin-top:0}.sf-manifesto p{grid-column:2;max-width:850px;font:22px/1.65 Georgia,serif}.sf-portals{padding:125px clamp(20px,5vw,80px);background:#080809}.sf-portals>header{padding-left:2vw;max-width:1000px}.sf-portal-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:55px}.sf-portal{position:relative;min-height:620px;overflow:hidden;color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.1)}.sf-portal>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1),filter .8s}.sf-portal:hover>img{transform:scale(1.055);filter:saturate(1.08)}.sf-portal-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(4,4,5,.95),rgba(4,4,5,.1) 70%)}.sf-portal-copy{position:absolute;z-index:3;left:36px;right:36px;bottom:35px}.sf-portal-copy small{font-size:7px;letter-spacing:.2em;color:var(--mx-soft)}.sf-portal-copy h3{font-size:clamp(40px,4.3vw,72px);line-height:.92;margin:12px 0}.sf-portal-copy p{color:rgba(255,255,255,.6)}.sf-portal-copy b{position:absolute;right:0;bottom:3px;font-size:8px;letter-spacing:.15em;color:var(--mx-soft)}.sf-futbol-art{position:absolute;inset:0;background:radial-gradient(circle at 50% 38%,#57401b 0,#17120c 17%,#050506 55%);display:grid;place-items:center}.sf-ball{font-size:170px;color:#d8b257;filter:drop-shadow(0 0 40px rgba(218,177,86,.35))}.sf-futbol-art i{position:absolute;width:55%;aspect-ratio:2/1;border:1px solid #d8b257;border-radius:50%;transform:rotate(25deg)}.sf-futbol-art i:nth-child(3){transform:rotate(-25deg)}.sf-futbol-art i:nth-child(4){transform:rotate(80deg);width:42%}.sf-model{padding:130px clamp(24px,7vw,110px);display:grid;grid-template-columns:.85fr 1.15fr;gap:8vw;background:#0a0a0b}.sf-model-sticky{position:sticky;top:120px;height:max-content}.sf-model-steps{border-top:1px solid rgba(255,255,255,.12)}.sf-model-steps article{padding:46px 0;border-bottom:1px solid rgba(255,255,255,.12);display:grid;grid-template-columns:70px 1fr;column-gap:20px}.sf-model-steps small{font:30px Georgia,serif;color:var(--mx-accent)}.sf-model-steps h3{font-size:32px;margin:0 0 10px}.sf-model-steps p{grid-column:2;font-size:13px;line-height:1.75;color:rgba(255,255,255,.55);max-width:570px}.sf-panorama{height:75vh;min-height:620px;position:relative;display:grid;place-items:center;text-align:center;overflow:hidden}.sf-panorama>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.08)}.sf-panorama>div{position:absolute;inset:0;background:rgba(2,2,3,.58)}.sf-panorama>p{position:relative;z-index:2;font:clamp(38px,5.6vw,82px)/1.02 Georgia,serif;letter-spacing:.03em}.sf-panorama>p span{font-size:.45em;color:var(--mx-soft);letter-spacing:.13em}.sf-parent-visit{--mx-paper:#f4ecdf}.sf-footer{border-top:1px solid rgba(255,255,255,.1)}
[data-mx-reveal]{opacity:0;transform:translateY(28px);transition:opacity .9s ease,transform .9s cubic-bezier(.2,.7,.2,1)}[data-mx-visible='true']{opacity:1;transform:none}@keyframes mxPush{from{transform:scale(1)}to{transform:scale(1.05)}}@keyframes mxOrbit{to{transform:rotate(360deg)}}@keyframes mxMarquee{to{transform:translateX(-50%)}}
@media(max-width:1050px){.mx-nav{grid-template-columns:1fr 1fr}.mx-nav-brand{display:none}.mx-hero-grid{grid-template-columns:1fr}.mx-hero-emblem{display:none}.mx-statement,.mx-annual,.sf-model{grid-template-columns:1fr}.mx-lock-stage{max-width:570px}.mx-feature-grid{grid-template-columns:repeat(3,1fr)}.mx-visit-shell{grid-template-columns:1fr}.mx-footer{grid-template-columns:1fr 1fr}.mx-footer>small{grid-column:1/-1}.sf-manifesto{grid-template-columns:1fr}.sf-manifesto p{grid-column:1}.sf-model-sticky{position:static}.sf-portal{min-height:520px}}
@media(max-width:720px){.mx-nav,.sf-nav{height:64px;padding:0 17px;grid-template-columns:1fr auto}.mx-nav-links>a:not(.mx-nav-cta),.sf-nav>div>a:not(.mx-nav-cta){display:none}.mx-hero{min-height:700px}.mx-hero-grid{padding:110px 18px 64px}.mx-hero-copy h1{font-size:clamp(58px,18vw,88px)}.mx-deck{font-size:13px}.mx-actions{flex-direction:column}.mx-actions a{width:100%}.mx-statement,.mx-inside,.mx-visit{padding:82px 18px}.mx-statement{grid-template-columns:1fr;gap:25px}.mx-statement h2{font-size:50px}.mx-statement p{font-size:19px}.mx-annual{padding:88px 18px;min-height:0}.mx-annual-copy h2{font-size:65px}.mx-lock-stage{max-width:390px}.mx-lock-center{width:150px;height:150px}.mx-lock-center span{font-size:58px}.mx-lock-card{width:112px;padding:11px}.mx-lock-card b{font-size:22px}.mx-cinema{min-height:650px}.mx-cinema-copy{left:18px;right:18px;bottom:58px}.mx-cinema-copy h2{font-size:55px}.mx-journey{padding:85px 0}.mx-journey>header{padding:0 18px}.mx-journey h2{font-size:53px}.mx-journey-track{grid-auto-columns:84vw;padding:40px 18px}.mx-journey-track article{min-height:370px}.mx-signature{min-height:440px}.mx-signature p{font-size:39px}.mx-feature-grid{grid-template-columns:repeat(2,1fr)}.mx-tour{padding:85px 0}.mx-tour-copy{padding:0 18px}.mx-tour h2,.mx-inside h2,.mx-visit-intro h2,.sf-portals h2,.sf-model h2,.sf-manifesto h2{font-size:50px}.mx-market-panel,.mx-interest-form{padding:22px}.mx-request-tabs,.mx-field-row{grid-template-columns:1fr}.mx-footer{padding:45px 18px;grid-template-columns:1fr}.mx-footer>div:nth-child(2){grid-template-columns:1fr}.sf-hero{min-height:720px}.sf-hero-inner{padding:100px 18px 50px}.sf-hero h1{font-size:58px}.sf-manifesto,.sf-portals,.sf-model{padding:85px 18px}.sf-portal-grid{grid-template-columns:1fr}.sf-portal{min-height:470px}.sf-portal-copy{left:24px;right:24px;bottom:24px}.sf-model{gap:35px}.sf-model-steps article{grid-template-columns:55px 1fr}.sf-panorama{min-height:520px}.sf-panorama>p{font-size:42px;padding:0 18px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.mx-hero>img,.sf-hero>img,.mx-lock-ring,.mx-city-marquee{animation:none!important}[data-mx-reveal]{opacity:1;transform:none;transition:none}.sf-portal>img{transition:none}}
`;
