"use client";
import type { ReactNode } from "react";
import { useState, useEffect, useRef, MutableRefObject } from "react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  base:    "#07070a",
  surface: "#0e0c10",
  panel:   "rgba(255,255,255,0.03)",
  border:  "rgba(255,255,255,0.08)",
  gold:    "#d4a832",
  goldDeep:"#8a6a1a",
  goldLight:"#f2d88a",
  cream:   "#f0ece4",
  muted:   "rgba(255,255,255,0.48)",
  dim:     "rgba(255,255,255,0.28)",
};

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, d = 0 }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ transform: v ? "translateY(0)" : "translateY(32px)", opacity: v ? 1 : 0, transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s` }}>{children}</div>;
}

const Grain = () => (
  <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
);

const F = { serif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", sans: "'DM Sans', 'Inter', system-ui, sans-serif" };

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "14px clamp(24px,4vw,56px)" : "24px clamp(24px,4vw,56px)", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(7,7,10,0.94)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
      <div>
        <div style={{ fontFamily: F.sans, fontSize: "8px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginBottom: "3px" }}>The World's New Football</div>
        <span style={{ fontFamily: F.serif, fontSize: "20px", fontWeight: 600, color: C.cream, letterSpacing: "0.02em" }}>Forever Futbol</span>
      </div>
      <div style={{ display: "flex", gap: "clamp(16px,2.5vw,36px)", alignItems: "center" }}>
        {["Experience", "Tour", "Groups", "Partners"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = C.cream} onMouseLeave={e => e.target.style.color = C.muted}>{n}</a>
        ))}
        <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#07070a", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, border: "none", padding: "10px 26px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}>Get Tickets</button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: `radial-gradient(ellipse at 50% 80%, rgba(212,168,50,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 10%, rgba(212,168,50,0.06) 0%, transparent 50%), ${C.base}`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 clamp(32px,6vw,96px) 96px" }}>
      <Grain />
      {/* Gold glow orb */}
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "700px", borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}15, transparent 70%)`, pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        {/* Trophy framing — text-only since no real image */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: C.gold, opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 0.3s", marginBottom: "32px" }}>
            Culture Experience · Touring Museum · Football Heritage
          </div>
          <div style={{ fontFamily: F.sans, fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: C.dim, marginBottom: "16px", opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}>
            FOREVER FUTBOL
          </div>
          <h1 style={{ fontFamily: F.serif, fontSize: "clamp(48px,9vw,130px)", fontWeight: 600, lineHeight: 0.9, letterSpacing: "-0.02em", color: C.cream, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.6s" }}>
            The World's New<br />
            Football <em style={{ color: C.gold }}>Culture</em><br />
            <em>Experience</em>
          </h1>
          <p style={{ fontFamily: F.sans, fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.8, color: C.muted, maxWidth: "560px", margin: "28px auto 0", opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 1.0s" }}>
            An immersive touring museum celebrating global football culture — its history, its icons, its fashion, and its power to unite every corner of the world.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "44px", opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 1.3s", flexWrap: "wrap" }}>
            <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#07070a", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, border: "none", padding: "16px 44px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}>Explore the Tour</button>
            <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.cream, background: "transparent", border: `1px solid ${C.border}`, padding: "16px 38px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.borderColor = C.gold; e.target.style.color = C.gold; }} onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.cream; }}>Group & Partners</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXHIBITS ─────────────────────────────────────────────────────────────────
const EXHIBITS = [
  { name: "Hall of Legends", desc: "Monumental icons, trophy-room drama, and heritage storytelling at museum scale.", accent: C.gold },
  { name: "World Cup Theater", desc: "Immersive cinematic football history with nation-scale energy and match-day emotion.", accent: "#4A9A6A" },
  { name: "Boots, Kits & Culture", desc: "The fashion, fandom, club identity, and aesthetic culture of football across generations.", accent: "#4A6A9A" },
  { name: "Street to Stadium", desc: "The bridge between grassroots football energy and world-stage glory.", accent: "#C85A1A" },
  { name: "The Beautiful Game", desc: "Technique, creativity, and the art of football translated into spatial experience.", accent: "#8A4A9A" },
  { name: "Nations & Flags", desc: "Cultural identity, football nationalism, and the power of the badge.", accent: "#9A4A4A" },
];

function Exhibits() {
  const [hover, setHover] = useState(null);
  return (
    <section id="experience" style={{ background: C.base, padding: "120px clamp(32px,6vw,96px)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "64px" }}>
            <div>
              <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>Exhibition Worlds</div>
              <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,72px)", fontWeight: 600, lineHeight: 1.0, color: C.cream }}>Inside the Experience</h2>
            </div>
            <p style={{ fontFamily: F.sans, fontSize: "15px", lineHeight: 1.75, color: C.muted, maxWidth: "400px" }}>Each exhibit is a fully realized world — immersive, educational, and built for emotional resonance.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px", background: C.border }}>
          {EXHIBITS.map((ex, i) => (
            <div key={ex.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ background: hover === i ? C.surface : C.base, padding: "44px 32px", cursor: "pointer", transition: "background 0.3s", position: "relative", overflow: "hidden" }}>
              {hover === i && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 20%, ${ex.accent}15, transparent 70%)` }} />}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: "40px", height: "2px", background: `linear-gradient(90deg, ${ex.accent}, transparent)`, marginBottom: "24px" }} />
                <div style={{ fontFamily: F.serif, fontSize: "26px", fontWeight: 600, color: C.cream, marginBottom: "14px" }}>{ex.name}</div>
                <p style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.7, color: C.muted }}>{ex.desc}</p>
                <div style={{ marginTop: "24px", fontFamily: F.sans, fontSize: "9px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: ex.accent, opacity: hover === i ? 1 : 0, transition: "opacity 0.3s" }}>
                  Explore Exhibit →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOUR CITIES ──────────────────────────────────────────────────────────────
const CITIES = [
  { city: "Atlanta", status: "Flagship", dates: "Spring 2026", note: "Premiere Market" },
  { city: "Houston", status: "Upcoming", dates: "Summer 2026", note: "Strong Football Culture" },
  { city: "Los Angeles", status: "Planned", dates: "Fall 2026", note: "West Coast Launch" },
  { city: "Miami", status: "Planned", dates: "Q4 2026", note: "International Gateway" },
  { city: "New York", status: "TBD", dates: "2027", note: "Global Stage" },
  { city: "Chicago", status: "TBD", dates: "2027", note: "Midwest Expansion" },
];

function TourCities() {
  const [sel, setSel] = useState(0);
  const city = CITIES[sel];
  return (
    <section id="tour" style={{ background: C.surface, padding: "120px clamp(32px,6vw,96px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${C.gold}08, transparent 60%)` }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>City Rollout</div>
          <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,72px)", fontWeight: 600, lineHeight: 1.0, color: C.cream, marginBottom: "64px" }}>The Touring Schedule</h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", background: C.border }}>
          <div style={{ background: C.base, display: "flex", flexDirection: "column", gap: "2px" }}>
            {CITIES.map((c, i) => (
              <div key={c.city} onClick={() => setSel(i)} style={{ padding: "24px 28px", cursor: "pointer", background: sel === i ? `linear-gradient(135deg, ${C.gold}12, ${C.goldDeep}08)` : "transparent", borderLeft: sel === i ? `2px solid ${C.gold}` : "2px solid transparent", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: "22px", fontWeight: 600, color: sel === i ? C.cream : C.muted }}>{c.city}</div>
                  <div style={{ fontFamily: F.sans, fontSize: "11px", color: sel === i ? C.gold : "rgba(255,255,255,0.3)", marginTop: "4px" }}>{c.dates}</div>
                </div>
                <span style={{ fontFamily: F.sans, fontSize: "9px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: sel === i ? C.gold : "rgba(255,255,255,0.25)", padding: "6px 14px", border: `1px solid ${sel === i ? C.gold + "40" : "rgba(255,255,255,0.08)"}`, background: sel === i ? `${C.gold}12` : "transparent" }}>{c.status}</span>
              </div>
            ))}
          </div>
          <div style={{ background: `linear-gradient(145deg, #0e0c10, #14121a)`, padding: "56px 48px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 70% 30%, ${C.gold}12, transparent 60%)` }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>{city.status}</div>
              <div style={{ fontFamily: F.serif, fontSize: "52px", fontWeight: 600, color: C.cream, lineHeight: 1.0, marginBottom: "8px" }}>{city.city}</div>
              <div style={{ fontFamily: F.sans, fontSize: "14px", color: C.muted, marginBottom: "4px" }}>{city.dates}</div>
              <div style={{ fontFamily: F.sans, fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "40px" }}>{city.note}</div>
              <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg, ${C.gold}40, transparent)`, marginBottom: "32px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Individual Tickets", "Group Bookings", "School Programs", "Corporate Events", "Partner Activations"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: F.sans, fontSize: "13px", color: C.muted }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: C.gold, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              <button style={{ marginTop: "36px", fontFamily: F.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#07070a", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, border: "none", padding: "13px 36px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => e.target.style.transform = "translateY(-2px)"} onMouseLeave={e => e.target.style.transform = "translateY(0)"}>
                Get {city.city} Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GROUPS & PARTNERS ────────────────────────────────────────────────────────
function GroupsPartners() {
  const paths = [
    { title: "School Groups", desc: "Educational football culture packages for K–12 and university groups with curriculum tie-ins.", cta: "Book Group Visit" },
    { title: "Corporate Events", desc: "Private museum access, branded activations, and premium hospitality for corporate clients.", cta: "Plan Corporate Event" },
    { title: "Tourism Partners", desc: "City tourism boards, hotels, and tour operators building football culture packages.", cta: "Partner Inquiry" },
    { title: "Sponsors & Brands", desc: "Exhibit naming rights, activation spaces, and cultural partnership at a world-class football venue.", cta: "Become a Sponsor" },
  ];
  return (
    <section id="groups" style={{ background: C.base, padding: "120px clamp(32px,6vw,96px)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>Group & Partner Access</div>
          <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,68px)", fontWeight: 600, lineHeight: 1.0, color: C.cream, marginBottom: "64px" }}>Find Your Path</h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2px", background: C.border }}>
          {paths.map((p, i) => (
            <div key={p.title} style={{ background: C.surface, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: `linear-gradient(180deg, ${C.gold}, transparent)` }} />
              <div style={{ paddingLeft: "24px" }}>
                <div style={{ fontFamily: F.sans, fontSize: "9px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>0{i + 1}</div>
                <div style={{ fontFamily: F.serif, fontSize: "28px", fontWeight: 600, color: C.cream, marginBottom: "14px" }}>{p.title}</div>
                <p style={{ fontFamily: F.sans, fontSize: "14px", lineHeight: 1.75, color: C.muted, marginBottom: "28px" }}>{p.desc}</p>
                <button style={{ fontFamily: F.sans, fontSize: "9px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, background: "transparent", border: `1px solid ${C.gold}30`, padding: "10px 24px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.background = `${C.gold}15`; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.transform = "translateY(0)"; }}>{p.cta} →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MERCH ────────────────────────────────────────────────────────────────────
function MerchRetail() {
  return (
    <section style={{ background: C.surface, padding: "120px clamp(32px,6vw,96px)", position: "relative", overflow: "hidden" }}>
      <Grain />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${C.gold}08, transparent 65%)` }} />
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "24px" }}>Merch & Memorabilia</div>
          <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,72px)", fontWeight: 600, color: C.cream, lineHeight: 1.0, marginBottom: "24px" }}>
            Carry the Culture Home.
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: "16px", lineHeight: 1.8, color: C.muted, maxWidth: "540px", margin: "0 auto 48px" }}>
            A premium retail layer with collectible drops, limited apparel, cultural product extensions, and football memorabilia curated by the Forever Futbol team.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#07070a", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, border: "none", padding: "16px 48px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => e.target.style.transform = "translateY(-2px)"} onMouseLeave={e => e.target.style.transform = "translateY(0)"}>Shop Merch</button>
            <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.cream, background: "transparent", border: `1px solid ${C.border}`, padding: "16px 40px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.borderColor = C.gold; e.target.style.color = C.gold; }} onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.cream; }}>Collectibles Drop</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#060609", borderTop: `1px solid ${C.border}`, padding: "64px clamp(32px,6vw,96px) 40px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3,1fr)", gap: "48px", marginBottom: "64px" }}>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: "8px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>Culture Experience</div>
            <div style={{ fontFamily: F.serif, fontSize: "24px", fontWeight: 600, color: C.cream, marginBottom: "16px" }}>Forever Futbol</div>
            <p style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.7, color: C.muted }}>The world&apos;s new football culture experience. Touring globally.</p>
          </div>
          {[
            { h: "Experience", l: ["Hall of Legends", "World Cup Theater", "Boots & Culture", "Street to Stadium", "The Beautiful Game"] },
            { h: "Visit", l: ["Get Tickets", "Group Bookings", "School Programs", "Corporate Events", "Accessibility"] },
            { h: "Partners", l: ["Sponsors", "Tourism Partners", "Media & Press", "Brand Activations", "foreverfutbolmuseum@gmail.com"] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: F.sans, fontSize: "8px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold, marginBottom: "20px" }}>{col.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.l.map(i => <li key={i} style={{ fontFamily: F.sans, fontSize: "13px", color: C.muted }}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ fontFamily: F.sans, fontSize: "11px", color: "rgba(255,255,255,0.22)" }}>© 2026 Forever Futbol. A KHG Enterprise. All rights reserved.</div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy", "Terms", "Contact"].map(i => <span key={i} style={{ fontFamily: F.sans, fontSize: "11px", color: "rgba(255,255,255,0.25)", cursor: "pointer" }}>{i}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ForeverFutbolV3() {
  return (
    <div style={{ background: C.base }}>
      <Nav />
      <Hero />
      <Exhibits />
      <TourCities />
      <GroupsPartners />
      <MerchRetail />
      <Footer />
    </div>
  );
}
