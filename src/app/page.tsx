"use client";
import { useState, useEffect, useRef } from "react";

// Palette: Base #0E1014, Light #F2EEE5, Accent1 #C6A65B (gold), Accent2 #335A42 (green), Support #1F4C7A (navy)
const C = { base: "#0E1014", cream: "#F2EEE5", gold: "#C6A65B", green: "#335A42", navy: "#1F4C7A", steel: "#1A1C20", dim: "#6A6E75", deep: "#0A0B0D", warm: "#181A16" };

function useInView(t = 0.12) { const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false); useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold: t }); obs.observe(el); return () => obs.disconnect(); }, [t]); return [ref, v] as const; }
function R({ children, delay = 0, dir = "up", style = {} }: { children: React.ReactNode; delay?: number; dir?: string; style?: React.CSSProperties }) { const [ref, vis] = useInView(); const t: Record<string, string> = { up: "translateY(50px)", left: "translateX(60px)", right: "translateX(-60px)" }; return <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "none" : t[dir] || t.up, transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`, willChange: "transform, opacity" }}>{children}</div>; }
const Grain = () => <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.035 }}><svg width="100%" height="100%"><filter id="g"><feTurbulence baseFrequency="0.55" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#g)" /></svg></div>;

function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 500); }, []);
  return (
    <section style={{ height: "100vh", position: "relative", overflow: "hidden", background: C.base }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 40% 50%, ${C.green}08, transparent 60%)` }} />
      <div style={{ position: "absolute", top: "50%", left: "6vw", right: "6vw", height: 1, background: `linear-gradient(90deg, ${C.gold}10, ${C.gold}05, ${C.gold}10)`, opacity: ready ? 1 : 0, transition: "opacity 1.5s ease 0.8s" }} />
      <div style={{ position: "absolute", bottom: "14vh", left: "6vw", zIndex: 3 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: C.gold, marginBottom: 28, opacity: ready ? 1 : 0, transform: ready ? "translateX(0)" : "translateX(-20px)", transition: "all 1s ease 0.1s", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 32, height: 1, background: C.gold, display: "inline-block" }} />Museum · Culture · Football
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(52px, 12vw, 180px)", fontWeight: 400, lineHeight: 0.88, letterSpacing: "-0.02em", color: C.cream, margin: 0 }}>
          <span style={{ display: "block", opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(100%)", transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}>Forever</span>
          <span style={{ display: "block", fontStyle: "italic", color: C.gold, opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(100%)", transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.35s" }}>Futbol</span>
        </h1>
        <div style={{ marginTop: 36, marginLeft: "clamp(60px, 10vw, 160px)", opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.6s" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.1vw, 16px)", fontWeight: 300, color: C.dim, lineHeight: 1.6, maxWidth: 340 }}>The museum of the beautiful game. Where football history becomes art, and every nation tells its story.</p>
        </div>
      </div>
    </section>
  );
}

function NationPanels() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const nations = [
    { name: "Brazil", era: "1958 — Present", desc: "The gold standard. Five World Cups. Pelé, Ronaldo, Ronaldinho. Jogo bonito — the beautiful game personified.", color: "#2B6E1E", accent: "#E5C14A" },
    { name: "Argentina", era: "1978 — Present", desc: "Passion distilled. Maradona's hand of god. Messi's redemption arc. La Albiceleste carries the weight of a nation.", color: "#4A8CC7", accent: "#F2EEE5" },
    { name: "Italy", era: "1934 — Present", desc: "The architects. Catenaccio defense elevated to art. Four stars on the crest. Where tactics became theatre.", color: "#1A4B8C", accent: "#C6A65B" },
    { name: "England", era: "1966 — Present", desc: "The birthplace. One trophy, eternal belief. The Premier League changed the game. Now the world watches.", color: "#1C3A5A", accent: "#E5E5E5" },
    { name: "Germany", era: "1954 — Present", desc: "The machine. Precision and will. Four stars earned through relentless efficiency. Never count them out.", color: "#1A1A1A", accent: "#D4AF37" },
    { name: "France", era: "1998 — Present", desc: "The evolution. Zidane's elegance to Mbappé's speed. Two stars. Where football meets art.", color: "#1A2850", accent: "#C82424" },
  ];

  return (
    <section style={{ padding: "120px 6vw", background: C.deep }}>
      <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold, marginBottom: 64, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 1, background: C.gold, display: "inline-block" }} />The Nations</div></R>
      <R delay={0.1}><h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, lineHeight: 0.95, color: C.cream, margin: "0 0 64px" }}>Every nation.<br /><em style={{ color: C.gold }}>Every story.</em></h2></R>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
        {nations.map((n, i) => (
          <R key={n.name} delay={0.06 * i}>
            <div onClick={() => setExpanded(expanded === i ? null : i)} style={{
              background: expanded === i ? n.color : C.steel,
              padding: expanded === i ? "clamp(40px, 4vw, 64px)" : "clamp(28px, 2.5vw, 44px)",
              cursor: "pointer", position: "relative", overflow: "hidden",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              border: `1px solid ${expanded === i ? n.accent + "30" : C.steel}`,
              gridColumn: expanded === i ? "1 / -1" : "auto",
              minHeight: expanded === i ? 220 : "auto",
            }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: n.accent, marginBottom: 8, transition: "color 0.4s ease" }}>{n.era}</div>
              <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: expanded === i ? "clamp(32px, 4vw, 52px)" : "clamp(22px, 2.5vw, 32px)", fontWeight: 500, color: C.cream, margin: "0 0 12px", transition: "font-size 0.4s ease" }}>{n.name}</h3>
              <div style={{ maxHeight: expanded === i ? 180 : 0, opacity: expanded === i ? 1 : 0, overflow: "hidden", transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: C.cream, opacity: 0.6, maxWidth: 500, marginBottom: 20 }}>{n.desc}</p>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: n.accent, borderBottom: `1px solid ${n.accent}40`, paddingBottom: 2 }}>Enter Exhibit →</span>
              </div>
            </div>
          </R>
        ))}
      </div>
    </section>
  );
}

function Exhibits() {
  return (
    <section style={{ padding: "140px 6vw", background: C.base }}>
      <R><h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 400, fontStyle: "italic", lineHeight: 0.9, color: C.cream, margin: "0 0 80px" }}>Exhibits.</h2></R>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[{ v: "6", u: "", l: "Nations Featured" }, { v: "200", u: "+", l: "Artifacts" }, { v: "4", u: "", l: "Touring Cities" }, { v: "∞", u: "", l: "Passion" }].map((s, i) => (
          <R key={s.l} delay={0.08 + i * 0.08}>
            <div style={{ padding: "40px 20px 40px 0", borderLeft: i > 0 ? `1px solid ${C.steel}` : "none", paddingLeft: i > 0 ? 20 : 0 }}>
              <div style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 400, color: C.gold, lineHeight: 1, display: "flex", alignItems: "baseline" }}>{s.v}<span style={{ fontSize: "clamp(14px, 1.5vw, 20px)", fontFamily: "'DM Mono', monospace", marginLeft: 2, color: C.dim }}>{s.u}</span></div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: C.dim, marginTop: 12 }}>{s.l}</div>
            </div>
          </R>
        ))}
      </div>
    </section>
  );
}

function Conversion() {
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  return (
    <section id="contact" style={{ minHeight: "70vh", background: C.deep, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-3vw", top: "50%", transform: "translateY(-50%)", fontFamily: "'EB Garamond', serif", fontSize: "clamp(200px, 35vw, 500px)", fontWeight: 700, fontStyle: "italic", color: C.steel, opacity: 0.04 }}>FF</div>
      <div style={{ padding: "100px 6vw", position: "relative", zIndex: 1 }}>
        <R><h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(48px, 10vw, 140px)", fontWeight: 400, lineHeight: 0.88, color: C.cream, margin: "0 0 40px" }}>Enter the<br /><em style={{ color: C.gold }}>Museum.</em></h2></R>
        <R delay={0.15}><div style={{ maxWidth: 480 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.dim, marginBottom: 36 }}>Exhibit announcements, touring schedule, and exclusive collector access.</p>
          {!done ? (
            <div style={{ display: "flex", border: `1px solid ${C.steel}` }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, padding: "16px 20px", fontFamily: "'DM Mono', monospace", fontSize: 13, border: "none", outline: "none", background: "transparent", color: C.cream }} />
              <button onClick={() => email && setDone(true)} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", padding: "16px 28px", background: C.green, color: C.cream, border: "none", cursor: "pointer", transition: "background 0.3s ease" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.background = C.gold; (e.target as HTMLElement).style.color = C.base; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.background = C.green; (e.target as HTMLElement).style.color = C.cream; }}>Join</button>
            </div>
          ) : <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 24, fontStyle: "italic", color: C.gold }}>Welcome to the museum.</div>}
        </div></R>
      </div>
    </section>
  );
}

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const fn = () => setS(window.scrollY > 80); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "22px 6vw", display: "flex", justifyContent: "space-between", alignItems: "center", background: s ? `${C.base}F2` : "transparent", backdropFilter: s ? "blur(24px)" : "none", borderBottom: s ? `1px solid ${C.steel}` : "1px solid transparent", transition: "all 0.5s ease" }}>
    <a href="#" style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, fontWeight: 500, color: C.cream, textDecoration: "none" }}>Forever <span style={{ fontStyle: "italic", color: C.gold }}>Futbol</span></a>
    <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
      {["Nations", "Exhibits"].map(i => <a key={i} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.dim, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.color = C.cream; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.color = C.dim; }}>{i}</a>)}
      <a href="#contact" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: C.base, background: C.gold, padding: "8px 18px", textDecoration: "none" }}>Visit</a>
    </div>
  </nav>;
}

function Footer() {
  return <footer style={{ background: C.base, padding: "56px 6vw 40px", borderTop: `1px solid ${C.steel}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: C.cream, marginBottom: 8 }}>Forever <span style={{ fontStyle: "italic", color: C.gold }}>Futbol</span></div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.dim, opacity: 0.3 }}>© 2026 Forever Futbol Museum — A Kollective Hospitality Group Brand</div>
      </div>
      <div style={{ display: "flex", gap: 24 }}>{["Instagram", "Press", "Legal"].map(l => <a key={l} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: C.dim, textDecoration: "none", opacity: 0.3, transition: "opacity 0.3s" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "1"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "0.3"; }}>{l}</a>)}</div>
    </div>
  </footer>;
}

export default function ForeverFutbol() {
  return <main style={{ overflowX: "hidden" }}>
    <style>{`@media (max-width: 900px) { div[style*="repeat(4"] { grid-template-columns: 1fr 1fr !important; } div[style*="repeat(3"] { grid-template-columns: 1fr !important; } h1 { font-size: 52px !important; } nav > div:first-child ~ div a:not(:last-child) { display: none; } }`}</style>
    <Grain /><Nav /><Hero /><NationPanels /><Exhibits /><Conversion /><Footer />
  </main>;
}
