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
  heroImage?: string;
  motif: "flowers" | "stars" | "orbit";
  honorees: string[];
  experiences: string[];
  cities: string[];
  seasonNote?: string;
};

const commonExperiences = [
  "Champagne",
  "Art",
  "Biographies",
  "Plaques / Awards / Accolades",
  "What You Didn’t Know",
  "Related Family",
  "Speeches / Music / Video Clips",
  "Silent Headphones for Audio",
  "Lifesize Statues",
  "Life Journey Map",
  "Fun Fact",
  "Souvenir Shop",
];

export const museumConfigs: Record<string, MuseumConfig> = {
  "living-legends": {
    slug: "living-legends",
    name: "Living Legends",
    eyebrow: "A Scented Flowers Museum",
    tagline: "Giving them their flowers while they can smell them.",
    description:
      "A living tribute to the people whose talent, leadership and cultural influence helped shape the world we know today.",
    mission:
      "Living Legends exists to celebrate remarkable achievements in real time — sharing stories, creating gratitude, and inspiring future generations while the honorees are still here to receive the appreciation.",
    accent: "#e0aa2f",
    accent2: "#f5df95",
    ink: "#0a0907",
    paper: "#f8f1dc",
    heroImage: "/portfolio/living-legends.png",
    motif: "flowers",
    honorees: [
      "Shaq",
      "Drake",
      "Lil Wayne",
      "Nicki Minaj",
      "Tyler Perry",
      "Dave Chappel",
      "Will Smith",
      "Michael Vick",
      "Deion Sanders",
      "Michael Jordan",
      "Lebron James",
      "Mike Tyson",
      "Katt Williams",
      "Timberland",
      "Kirk Franklin",
      "Diana Ross",
      "Gladys Knight",
      "Martin Lawerence",
      "Obama",
    ],
    experiences: ["Letters of Appreciation", ...commonExperiences],
    cities: [
      "Miami",
      "Orlando",
      "Houston",
      "Tampa",
      "Atlanta",
      "Memphis",
      "Savannah",
      "Dallas",
      "New York",
      "Denver",
      "Washington, D.C.",
      "Las Vegas",
      "Los Angeles",
      "Charlotte",
      "Nashville",
    ],
  },
  "fallen-stars": {
    slug: "fallen-stars",
    name: "Fallen Stars",
    eyebrow: "A Scented Flowers Museum",
    tagline: "The stars still shine.",
    description:
      "A respectful, immersive memorial to cultural icons whose lives ended, but whose work, influence and memory continue to move generations.",
    mission:
      "Fallen Stars preserves stories and memories through art, artifacts and multimedia — helping visitors understand the achievements, challenges and lasting cultural impact of the people we lost.",
    accent: "#e9c34c",
    accent2: "#65c8ef",
    ink: "#06111e",
    paper: "#e9f7ff",
    heroImage: "/portfolio/fallen-stars.png",
    motif: "stars",
    honorees: [
      "Kobe Bryant",
      "Pop Smoke",
      "Trouble",
      "Takeoff",
      "DMX",
      "PnB Rock",
      "King Von",
      "Virgil Abloh",
      "Chadwick Boseman",
      "Bankroll Fresh",
      "Bernie Mack",
      "Gangsta Boo",
      "Left Eye",
      "Aaliyah",
      "Paul Walker",
    ],
    experiences: commonExperiences,
    cities: [
      "Miami",
      "Orlando",
      "Houston",
      "Tampa",
      "Atlanta",
      "New York",
      "Denver",
      "Nashville",
      "Memphis",
      "Savannah",
      "Dallas",
      "Birmingham",
      "Los Angeles",
      "Las Vegas",
      "Washington, D.C.",
      "Charlotte",
    ],
  },
  "women-make-the-world-go-round": {
    slug: "women-make-the-world-go-round",
    name: "Women Make the World Go Round",
    eyebrow: "A Scented Flowers Museum",
    tagline: "Celebrating the women who move culture forward.",
    description:
      "A museum dedicated to women’s history, achievement, perspective and influence — with a flagship focus on Black women and urban culture.",
    mission:
      "The museum honors women who overcame barriers, shaped culture and opened doors for others. Its interactive storytelling is designed to make influence visible, challenge underrepresentation and leave visitors with a deeper understanding of women’s impact.",
    accent: "#f1378c",
    accent2: "#f2a228",
    ink: "#2a0d1c",
    paper: "#fff5f8",
    motif: "orbit",
    honorees: [
      "Beyonce",
      "Janet Jackson",
      "Erykah Badu",
      "Lauryn Hill",
      "Angela Bassett",
      "Whitney Houston",
      "Halle Berry",
      "Michelle Obama",
      "Oprah Winfrey",
      "Viola Davis",
      "Venus and Serena Williams",
    ],
    experiences: commonExperiences,
    cities: [
      "Miami",
      "Orlando",
      "Houston",
      "Tampa",
      "Atlanta",
      "New York",
      "Denver",
      "Nashville",
      "Memphis",
      "Savannah",
      "Dallas",
      "Charlotte",
      "Los Angeles",
      "Las Vegas",
      "Washington, D.C.",
      "Birmingham",
    ],
    seasonNote: "Plus a rotating city-specific talent spotlight in every market.",
  },
};

function Motif({ type, accent, accent2 }: { type: MuseumConfig["motif"]; accent: string; accent2: string }) {
  if (type === "stars") {
    return (
      <div className="mp-motif" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="mp-star"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 19) % 86}%`,
              opacity: 0.2 + ((i % 5) * 0.12),
              transform: `scale(${0.45 + (i % 4) * 0.22}) rotate(${i * 9}deg)`,
              color: i % 3 === 0 ? accent2 : accent,
            }}
          >
            ✦
          </span>
        ))}
      </div>
    );
  }

  if (type === "orbit") {
    return (
      <div className="mp-motif mp-orbit" aria-hidden="true">
        <span style={{ borderColor: `${accent}44` }} />
        <span style={{ borderColor: `${accent2}4f` }} />
        <span style={{ borderColor: `${accent}33` }} />
      </div>
    );
  }

  return (
    <div className="mp-motif mp-petals" aria-hidden="true">
      {Array.from({ length: 11 }).map((_, i) => (
        <span
          key={i}
          style={{
            background: i % 2 ? accent : accent2,
            transform: `rotate(${i * 31}deg) translateY(-${78 + (i % 4) * 20}px)`,
          }}
        />
      ))}
    </div>
  );
}

function Nav({ config }: { config: MuseumConfig }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`mp-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="/scented-flowers" className="mp-parent-link">
        SCENTED FLOWERS
      </a>
      <a href="#top" className="mp-nav-brand">
        {config.name}
      </a>
      <div className="mp-nav-links">
        <a href="#story">Story</a>
        <a href="#season">Season One</a>
        <a href="#experience">Experience</a>
        <a href="#tour">Tour</a>
      </div>
    </nav>
  );
}

export function MuseumPage({ config }: { config: MuseumConfig }) {
  const vars = {
    "--accent": config.accent,
    "--accent2": config.accent2,
    "--ink": config.ink,
    "--paper": config.paper,
  } as CSSProperties;

  return (
    <main id="top" className={`museum-page museum-${config.slug}`} style={vars}>
      <style>{portfolioCss}</style>
      <Nav config={config} />

      <section className="mp-hero">
        <div className="mp-hero-wash" />
        <Motif type={config.motif} accent={config.accent} accent2={config.accent2} />
        <div className="mp-hero-grid">
          <div className="mp-hero-copy">
            <div className="mp-kicker">{config.eyebrow}</div>
            <h1>{config.name}</h1>
            <p className="mp-tagline">{config.tagline}</p>
            <p className="mp-description">{config.description}</p>
            <div className="mp-actions">
              <a href="#season" className="mp-button primary">Explore Season One</a>
              <a href="#tour" className="mp-button ghost">See Tour Markets</a>
            </div>
          </div>
          <div className="mp-hero-art">
            {config.heroImage ? (
              <div className="mp-logo-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={config.heroImage} alt={`${config.name} logo`} />
              </div>
            ) : (
              <div className="mp-word-art" aria-label={config.name}>
                <span>WOMEN</span>
                <strong>MAKE THE WORLD</strong>
                <span>GO ROUND</span>
              </div>
            )}
          </div>
        </div>
        <div className="mp-scroll-mark">SCROLL TO ENTER ↓</div>
      </section>

      <section id="story" className="mp-story mp-section">
        <div className="mp-section-label">01 / WHY IT EXISTS</div>
        <div className="mp-story-grid">
          <h2>Culture deserves more than a memory.</h2>
          <div>
            <p>{config.mission}</p>
            <p className="mp-small-copy">
              Built as a touring, highly visual museum experience, every room is designed to turn biography into atmosphere — giving visitors something to learn, feel, photograph and carry with them.
            </p>
          </div>
        </div>
      </section>

      <section id="season" className="mp-season mp-section">
        <div className="mp-section-head">
          <div>
            <div className="mp-section-label">02 / CURRENT COLLECTION</div>
            <h2>Season One</h2>
          </div>
          <p>{config.seasonNote || "The opening class of featured honorees."}</p>
        </div>
        <div className="mp-honoree-grid">
          {config.honorees.map((name, index) => (
            <article key={name} className="mp-honoree-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{name}</h3>
              <div className="mp-card-line" />
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="mp-experience mp-section">
        <div className="mp-section-head">
          <div>
            <div className="mp-section-label">03 / INSIDE THE MUSEUM</div>
            <h2>Built to be experienced.</h2>
          </div>
          <p>Not a hallway of posters. A layered museum environment with physical, audio and interactive storytelling.</p>
        </div>
        <div className="mp-experience-grid">
          {config.experiences.map((item, index) => (
            <div key={item} className="mp-experience-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="tour" className="mp-tour mp-section">
        <div className="mp-tour-shell">
          <div className="mp-section-label">04 / TOURING PLATFORM</div>
          <h2>Designed to move city to city.</h2>
          <p className="mp-tour-intro">
            These markets come directly from the current museum plans. Dates and venues will be announced by the brand when confirmed.
          </p>
          <div className="mp-city-grid">
            {config.cities.map((city, index) => (
              <div key={city} className="mp-city">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{city}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-close mp-section">
        <div className="mp-close-inner">
          <div>
            <div className="mp-section-label">SCENTED FLOWERS PRESENTS</div>
            <h2>{config.name}</h2>
            <p>{config.tagline}</p>
          </div>
          <div className="mp-close-actions">
            <a className="mp-button primary" href="/scented-flowers">View the Museum Family</a>
            <a className="mp-button ghost" href="#top">Back to Top</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ScentedFlowersHome() {
  const museumCards = [
    {
      name: "Forever Futbol",
      href: "/",
      label: "Global Football Culture",
      line: "Past. Present. Eternal.",
      accent: "#1aadad",
      accent2: "#d4a832",
    },
    {
      name: "Living Legends",
      href: "/living-legends",
      label: "Living Cultural Icons",
      line: "Give them their flowers now.",
      accent: "#e0aa2f",
      accent2: "#f5df95",
    },
    {
      name: "Fallen Stars",
      href: "/fallen-stars",
      label: "Legacy & Memory",
      line: "The stars still shine.",
      accent: "#65c8ef",
      accent2: "#e9c34c",
    },
    {
      name: "Women Make the World Go Round",
      href: "/women-make-the-world-go-round",
      label: "Women, Culture & Influence",
      line: "Celebrating the women who move culture forward.",
      accent: "#f1378c",
      accent2: "#f2a228",
    },
  ];

  return (
    <main className="sf-home">
      <style>{portfolioCss}</style>
      <nav className="sf-nav">
        <a href="#top" className="sf-brand">SCENTED FLOWERS</a>
        <div>
          <a href="#museums">Museums</a>
          <a href="#mission">Mission</a>
          <a href="#model">Model</a>
        </div>
      </nav>

      <section id="top" className="sf-hero">
        <div className="sf-halo" />
        <div className="sf-botanical" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} style={{ transform: `rotate(${i * 24}deg) translateY(-${180 + (i % 3) * 28}px)` }} />
          ))}
        </div>
        <div className="sf-hero-copy">
          <div className="sf-kicker">A HOUSE OF CULTURAL MUSEUMS</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sf-logo" src="/portfolio/scented-flowers.png" alt="Scented Flowers" />
          <h1>Give them their flowers.<br />Preserve the legacy.</h1>
          <p>
            Scented Flowers is the mother brand for a growing family of touring cultural museums — each with its own identity, story and audience, all united by one idea: culture should be honored while it is happening and preserved when the moment is gone.
          </p>
          <a className="sf-enter" href="#museums">Enter the collection ↓</a>
        </div>
      </section>

      <section id="museums" className="sf-museums">
        <div className="sf-section-copy">
          <span>THE COLLECTION</span>
          <h2>Four museums. Four worlds.</h2>
          <p>Every property stays distinct. Scented Flowers provides the parent identity, touring system and cultural standard.</p>
        </div>
        <div className="sf-card-grid">
          {museumCards.map((museum, index) => (
            <a key={museum.name} href={museum.href} className="sf-museum-card" style={{ "--cardA": museum.accent, "--cardB": museum.accent2 } as CSSProperties}>
              <span className="sf-card-num">0{index + 1}</span>
              <div className="sf-card-label">{museum.label}</div>
              <h3>{museum.name}</h3>
              <p>{museum.line}</p>
              <div className="sf-card-arrow">↗</div>
            </a>
          ))}
        </div>
      </section>

      <section id="mission" className="sf-manifesto">
        <div className="sf-manifesto-word">FLOWERS</div>
        <div className="sf-manifesto-copy">
          <span>THE MISSION</span>
          <h2>Honor people. Protect stories. Build experiences that outlive the moment.</h2>
          <p>
            The collection spans celebration, remembrance, sport and women’s cultural influence. Instead of flattening those stories into one generic museum, Scented Flowers gives each property its own visual language and emotional temperature.
          </p>
        </div>
      </section>

      <section id="model" className="sf-model">
        <div className="sf-section-copy">
          <span>THE SYSTEM</span>
          <h2>One parent platform. Independent museum brands.</h2>
        </div>
        <div className="sf-model-grid">
          {[
            ["01", "Distinct identities", "Every museum keeps its own logo, color world, voice and visitor experience."],
            ["02", "Tour-ready", "A shared operating model makes each property capable of moving market to market."],
            ["03", "Seasonal collections", "Honoree lineups can rotate by season without rebuilding the entire experience."],
            ["04", "One cultural house", "Scented Flowers becomes the trusted umbrella audiences recognize across the portfolio."],
          ].map(([num, title, body]) => (
            <article key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="sf-footer">
        <div>SCENTED FLOWERS</div>
        <p>Living Legends · Fallen Stars · Women Make the World Go Round · Forever Futbol</p>
      </footer>
    </main>
  );
}

const portfolioCss = `
*{box-sizing:border-box}.museum-page,.sf-home{min-height:100vh;margin:0}.museum-page{background:var(--ink);color:var(--paper);font-family:Arial,Helvetica,sans-serif;overflow:hidden}.mp-nav{position:fixed;z-index:40;top:0;left:0;right:0;height:74px;padding:0 clamp(20px,4vw,58px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;border-bottom:1px solid transparent;transition:.35s;background:transparent}.mp-nav.is-scrolled{background:color-mix(in srgb,var(--ink) 92%,transparent);backdrop-filter:blur(20px);border-color:color-mix(in srgb,var(--paper) 12%,transparent)}.mp-parent-link,.mp-nav-brand,.mp-nav-links a{text-decoration:none;color:var(--paper)}.mp-parent-link{font-size:9px;font-weight:700;letter-spacing:.28em}.mp-nav-brand{font-family:Georgia,serif;font-size:20px}.mp-nav-links{display:flex;justify-content:flex-end;gap:24px}.mp-nav-links a{font-size:9px;letter-spacing:.16em;text-transform:uppercase;opacity:.68}.mp-hero{min-height:100vh;position:relative;display:grid;align-items:center;padding:120px clamp(24px,6vw,96px) 70px;isolation:isolate}.mp-hero-wash{position:absolute;inset:0;background:radial-gradient(circle at 72% 48%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 36%),radial-gradient(circle at 28% 25%,color-mix(in srgb,var(--accent2) 10%,transparent),transparent 30%),linear-gradient(145deg,var(--ink),color-mix(in srgb,var(--ink) 84%,#000));z-index:-3}.mp-hero-grid{max-width:1500px;width:100%;margin:auto;display:grid;grid-template-columns:1.08fr .92fr;gap:7vw;align-items:center}.mp-kicker,.mp-section-label{font-size:9px;letter-spacing:.34em;text-transform:uppercase;font-weight:700;color:var(--accent)}.mp-hero h1{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(64px,8.5vw,140px);line-height:.85;letter-spacing:-.055em;margin:22px 0 24px;max-width:960px}.museum-women-make-the-world-go-round .mp-hero h1{font-size:clamp(55px,7.2vw,116px)}.mp-tagline{font-family:Georgia,serif;font-style:italic;font-size:clamp(21px,2.4vw,34px);color:var(--accent2);margin:0 0 24px}.mp-description{max-width:670px;font-size:15px;line-height:1.8;opacity:.72}.mp-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:38px}.mp-button{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 28px;text-decoration:none;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;transition:.25s}.mp-button.primary{background:var(--accent);color:var(--ink);border:1px solid var(--accent)}.mp-button.ghost{border:1px solid color-mix(in srgb,var(--paper) 28%,transparent);color:var(--paper)}.mp-button:hover{transform:translateY(-2px)}.mp-hero-art{display:flex;justify-content:center;position:relative}.mp-logo-frame{width:min(520px,100%);aspect-ratio:1;display:grid;place-items:center;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--paper) 8%,transparent),transparent 65%);border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);box-shadow:0 0 100px color-mix(in srgb,var(--accent) 14%,transparent)}.mp-logo-frame img{width:88%;height:88%;object-fit:contain;filter:drop-shadow(0 25px 48px rgba(0,0,0,.35))}.mp-word-art{width:100%;min-height:520px;display:flex;flex-direction:column;justify-content:center;gap:12px;text-align:center;border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);background:radial-gradient(circle at 50% 50%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 60%);transform:rotate(-4deg)}.mp-word-art span{font-family:Georgia,serif;font-size:clamp(48px,6vw,90px);color:var(--accent)}.mp-word-art strong{font-size:13px;letter-spacing:.44em;color:var(--accent2)}.mp-scroll-mark{position:absolute;bottom:26px;left:clamp(24px,6vw,96px);font-size:8px;letter-spacing:.24em;opacity:.45}.mp-motif{position:absolute;inset:0;z-index:-2;pointer-events:none}.mp-star{position:absolute;font-size:28px}.mp-orbit{display:grid;place-items:center;transform:translateX(26%)}.mp-orbit span{position:absolute;width:70vw;height:38vw;border:1px solid;border-radius:50%;transform:rotate(-18deg)}.mp-orbit span:nth-child(2){width:54vw;height:27vw;transform:rotate(22deg)}.mp-orbit span:nth-child(3){width:36vw;height:18vw;transform:rotate(-54deg)}.mp-petals{display:grid;place-items:center;transform:translate(28%,4%)}.mp-petals span{position:absolute;width:58px;height:130px;border-radius:100% 0 100% 0;opacity:.12;transform-origin:center 210px}.mp-section{padding:110px clamp(24px,6vw,96px)}.mp-story{background:var(--paper);color:var(--ink)}.mp-story-grid{display:grid;grid-template-columns:1fr 1fr;gap:8vw;max-width:1450px;margin:28px auto 0}.mp-story h2,.mp-section-head h2,.mp-tour h2,.mp-close h2{font-family:Georgia,serif;font-size:clamp(48px,6vw,94px);line-height:.96;letter-spacing:-.045em;font-weight:400;margin:0}.mp-story-grid p{font-family:Georgia,serif;font-size:clamp(20px,2.3vw,32px);line-height:1.45;margin:0}.mp-story-grid .mp-small-copy{font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.8;opacity:.64;margin-top:30px}.mp-section-head{display:flex;justify-content:space-between;gap:50px;align-items:flex-end;max-width:1450px;margin:0 auto 46px}.mp-section-head p{max-width:470px;line-height:1.7;opacity:.58;margin:0}.mp-section-head h2{margin-top:14px}.mp-season{background:color-mix(in srgb,var(--ink) 94%,#fff)}.mp-honoree-grid{max-width:1450px;margin:auto;display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid color-mix(in srgb,var(--paper) 12%,transparent);border-top:1px solid color-mix(in srgb,var(--paper) 12%,transparent)}.mp-honoree-card{min-height:210px;padding:26px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid color-mix(in srgb,var(--paper) 12%,transparent);border-bottom:1px solid color-mix(in srgb,var(--paper) 12%,transparent);transition:.25s}.mp-honoree-card:hover{background:color-mix(in srgb,var(--accent) 9%,transparent)}.mp-honoree-card span{font-size:9px;color:var(--accent);letter-spacing:.18em}.mp-honoree-card h3{font-family:Georgia,serif;font-size:clamp(24px,2.4vw,38px);font-weight:400;margin:0;line-height:1.05}.mp-card-line{height:2px;width:38px;background:var(--accent)}.mp-experience{background:var(--paper);color:var(--ink)}.mp-experience .mp-section-label{color:var(--accent)}.mp-experience-grid{max-width:1450px;margin:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:color-mix(in srgb,var(--ink) 14%,transparent);border:1px solid color-mix(in srgb,var(--ink) 14%,transparent)}.mp-experience-card{min-height:145px;padding:25px;background:var(--paper);display:flex;flex-direction:column;justify-content:space-between;transition:.25s}.mp-experience-card:hover{background:color-mix(in srgb,var(--accent) 8%,var(--paper))}.mp-experience-card span{font-size:9px;letter-spacing:.15em;opacity:.46}.mp-experience-card strong{font-family:Georgia,serif;font-size:26px;font-weight:400}.mp-tour{background:linear-gradient(160deg,var(--ink),color-mix(in srgb,var(--accent2) 10%,var(--ink)));position:relative}.mp-tour-shell{max-width:1450px;margin:auto}.mp-tour h2{max-width:980px;margin:16px 0 24px}.mp-tour-intro{max-width:660px;line-height:1.75;opacity:.62}.mp-city-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:55px;border-top:1px solid color-mix(in srgb,var(--paper) 12%,transparent);border-left:1px solid color-mix(in srgb,var(--paper) 12%,transparent)}.mp-city{padding:22px;min-height:104px;border-right:1px solid color-mix(in srgb,var(--paper) 12%,transparent);border-bottom:1px solid color-mix(in srgb,var(--paper) 12%,transparent);display:flex;flex-direction:column;justify-content:space-between}.mp-city span{font-size:8px;color:var(--accent)}.mp-city strong{font-family:Georgia,serif;font-size:24px;font-weight:400}.mp-close{background:var(--paper);color:var(--ink)}.mp-close-inner{max-width:1450px;margin:auto;display:flex;justify-content:space-between;gap:50px;align-items:flex-end}.mp-close h2{margin:14px 0 10px}.mp-close p{font-family:Georgia,serif;font-style:italic;font-size:24px;color:var(--accent);margin:0}.mp-close-actions{display:flex;gap:12px;flex-wrap:wrap}.mp-close .mp-button.ghost{color:var(--ink);border-color:color-mix(in srgb,var(--ink) 25%,transparent)}
.sf-home{background:#090806;color:#f4eee2;font-family:Arial,Helvetica,sans-serif}.sf-nav{position:fixed;z-index:50;top:0;left:0;right:0;height:74px;padding:0 clamp(22px,5vw,72px);display:flex;align-items:center;justify-content:space-between;background:rgba(9,8,6,.78);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.08)}.sf-nav a{text-decoration:none;color:#f4eee2;font-size:9px;letter-spacing:.18em;text-transform:uppercase}.sf-brand{font-family:Georgia,serif!important;font-size:18px!important;letter-spacing:.08em!important}.sf-nav>div{display:flex;gap:28px}.sf-hero{min-height:100vh;position:relative;display:grid;place-items:center;text-align:center;padding:120px 24px 70px;overflow:hidden}.sf-halo{position:absolute;width:68vw;height:68vw;border-radius:50%;background:radial-gradient(circle,rgba(210,170,64,.2),rgba(210,170,64,.06) 34%,transparent 66%);filter:blur(20px)}.sf-botanical{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none;opacity:.55}.sf-botanical span{position:absolute;width:70px;height:170px;border:1px solid rgba(217,179,79,.28);border-radius:100% 0 100% 0;transform-origin:center 360px}.sf-hero-copy{position:relative;z-index:2;max-width:1120px}.sf-kicker,.sf-section-copy>span,.sf-manifesto-copy>span{font-size:9px;letter-spacing:.38em;color:#d4ac4c;font-weight:800}.sf-logo{width:min(300px,62vw);height:220px;object-fit:contain;margin:0 auto 8px;display:block;filter:drop-shadow(0 28px 50px rgba(0,0,0,.45))}.sf-hero h1{font-family:Georgia,serif;font-weight:400;font-size:clamp(56px,7vw,112px);line-height:.92;letter-spacing:-.05em;margin:4px 0 26px}.sf-hero p{max-width:780px;margin:0 auto;color:rgba(244,238,226,.68);line-height:1.9;font-size:15px}.sf-enter{display:inline-block;margin-top:38px;color:#d4ac4c;text-decoration:none;font-size:9px;letter-spacing:.22em;text-transform:uppercase}.sf-museums{padding:120px clamp(24px,6vw,96px);background:#f4eee2;color:#16120b}.sf-section-copy{max-width:900px;margin-bottom:52px}.sf-section-copy h2,.sf-manifesto h2{font-family:Georgia,serif;font-size:clamp(48px,6.2vw,94px);font-weight:400;letter-spacing:-.05em;line-height:.95;margin:14px 0 20px}.sf-section-copy p{max-width:610px;line-height:1.8;opacity:.58}.sf-card-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.sf-museum-card{min-height:440px;position:relative;padding:34px;text-decoration:none;color:#fff;overflow:hidden;background:radial-gradient(circle at 85% 15%,color-mix(in srgb,var(--cardA) 42%,transparent),transparent 32%),linear-gradient(145deg,#111,var(--cardB));display:flex;flex-direction:column;justify-content:flex-end;transition:.35s}.sf-museum-card:before{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.75),rgba(0,0,0,.02) 70%)}.sf-museum-card>*{position:relative;z-index:2}.sf-museum-card:hover{transform:translateY(-5px)}.sf-card-num{position:absolute;top:28px;left:32px;font-size:10px;letter-spacing:.18em;color:var(--cardA)}.sf-card-label{font-size:9px;text-transform:uppercase;letter-spacing:.22em;opacity:.62}.sf-museum-card h3{font-family:Georgia,serif;font-size:clamp(38px,4.5vw,68px);font-weight:400;line-height:.93;letter-spacing:-.04em;margin:12px 0 12px}.sf-museum-card p{font-family:Georgia,serif;font-style:italic;font-size:20px;margin:0;color:var(--cardA)}.sf-card-arrow{position:absolute;right:30px;top:24px;font-size:28px;opacity:.72}.sf-manifesto{min-height:760px;position:relative;padding:130px clamp(24px,6vw,96px);display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:7vw;overflow:hidden}.sf-manifesto-word{font-family:Georgia,serif;font-size:clamp(90px,15vw,250px);writing-mode:vertical-rl;transform:rotate(180deg);color:rgba(212,172,76,.1);line-height:.75}.sf-manifesto-copy p{max-width:620px;line-height:1.9;color:rgba(244,238,226,.65)}.sf-model{padding:120px clamp(24px,6vw,96px);background:#120f0a}.sf-model-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.12);border-left:1px solid rgba(255,255,255,.12)}.sf-model-grid article{padding:28px;min-height:280px;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12)}.sf-model-grid article>span{font-size:9px;color:#d4ac4c}.sf-model-grid h3{font-family:Georgia,serif;font-weight:400;font-size:30px;margin:80px 0 12px}.sf-model-grid p{font-size:13px;line-height:1.7;color:rgba(244,238,226,.58)}.sf-footer{padding:70px clamp(24px,6vw,96px);display:flex;justify-content:space-between;gap:30px;border-top:1px solid rgba(255,255,255,.1)}.sf-footer div{font-family:Georgia,serif;font-size:28px;color:#d4ac4c}.sf-footer p{font-size:11px;letter-spacing:.08em;opacity:.5}
@media(max-width:980px){.mp-nav{grid-template-columns:1fr auto}.mp-nav-brand{display:none}.mp-nav-links{display:none}.mp-hero-grid,.mp-story-grid{grid-template-columns:1fr}.mp-hero{padding-top:110px}.mp-hero-art{margin-top:20px}.mp-logo-frame{max-width:390px}.mp-word-art{min-height:350px}.mp-honoree-grid{grid-template-columns:repeat(2,1fr)}.mp-experience-grid{grid-template-columns:repeat(2,1fr)}.mp-city-grid{grid-template-columns:repeat(2,1fr)}.mp-section-head,.mp-close-inner{align-items:flex-start;flex-direction:column}.sf-card-grid{grid-template-columns:1fr}.sf-manifesto{grid-template-columns:.3fr 1fr}.sf-model-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.mp-hero h1{font-size:54px}.museum-women-make-the-world-go-round .mp-hero h1{font-size:48px}.mp-section{padding:82px 20px}.mp-story h2,.mp-section-head h2,.mp-tour h2,.mp-close h2{font-size:45px}.mp-honoree-grid,.mp-experience-grid,.mp-city-grid{grid-template-columns:1fr}.mp-honoree-card{min-height:150px}.mp-nav{padding:0 18px}.mp-hero{padding-left:20px;padding-right:20px}.mp-actions,.mp-close-actions{flex-direction:column;width:100%}.mp-button{width:100%}.sf-nav{padding:0 18px}.sf-nav>div{display:none}.sf-hero{padding-left:18px;padding-right:18px}.sf-hero h1{font-size:52px}.sf-museums,.sf-model{padding:88px 18px}.sf-museum-card{min-height:360px;padding:26px}.sf-manifesto{grid-template-columns:1fr;padding:90px 18px}.sf-manifesto-word{writing-mode:initial;transform:none;font-size:24vw}.sf-model-grid{grid-template-columns:1fr}.sf-footer{padding:50px 18px;flex-direction:column}.sf-logo{height:170px}}
`;
