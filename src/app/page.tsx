"use client";
import { useState, useEffect, useRef } from "react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  base:      "#07070a",
  surface:   "#0e0c10",
  panel:     "rgba(255,255,255,0.03)",
  border:    "rgba(255,255,255,0.08)",
  gold:      "#d4a832",
  goldDeep:  "#8a6a1a",
  goldLight: "#f2d88a",
  teal:      "#1aadad",
  tealDim:   "rgba(26,173,173,0.15)",
  cream:     "#f0ece4",
  muted:     "rgba(255,255,255,0.48)",
  dim:       "rgba(255,255,255,0.28)",
};

const F = {
  serif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  sans:  "'DM Sans', 'Inter', system-ui, sans-serif",
};

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, v] = useInView();
  return (
    <div
      ref={ref}
      style={{
        transform: v ? "translateY(0)" : "translateY(40px)",
        opacity: v ? 1 : 0,
        transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const Grain = () => (
  <div
    style={{
      position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }}
  />
);

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? "14px clamp(24px,4vw,56px)" : "28px clamp(24px,4vw,56px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(7,7,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div>
        <div style={{ fontFamily: F.sans, fontSize: "8px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginBottom: "3px" }}>
          Global Football Culture
        </div>
        <span style={{ fontFamily: F.serif, fontSize: "22px", fontWeight: 600, color: C.cream, letterSpacing: "0.02em" }}>
          Forever Futbol
        </span>
      </div>
      <div style={{ display: "flex", gap: "clamp(16px,2.5vw,36px)", alignItems: "center" }}>
        {["Experience", "Tour", "Groups", "Partners"].map((n) => (
          <a
            key={n}
            href={`#${n.toLowerCase()}`}
            style={{
              fontFamily: F.sans, fontSize: "10px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: C.muted, textDecoration: "none", transition: "color 0.3s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = C.cream)}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = C.muted)}
          >
            {n}
          </a>
        ))}
        <button
          style={{
            fontFamily: F.sans, fontSize: "10px", fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#07070a", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`,
            border: "none", padding: "11px 28px", cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          Get Tickets
        </button>
      </div>
    </nav>
  );
}

// ─── HERO — FULL SCREEN VIDEO ─────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative", width: "100%", height: "100vh",
        overflow: "hidden", background: C.base,
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* ── VIDEO BACKGROUND — 3-panel triptych ── */}
      <div style={{
        position: "absolute", inset: 0,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "3px",
        background: C.base,
        padding: "0",
      }}>
        {/* LEFT panel — FUTBOL.MP4 */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <video
            src="/museum/futbol-side.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: loaded ? 0.85 : 0,
              transition: "opacity 1.4s ease 0.15s",
            }}
          />
          {/* Soft inner edge blend toward center */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(to right, transparent 0%, transparent 60%, rgba(7,7,10,0.5) 100%)",
          }} />
        </div>

        {/* CENTER panel — hero-reel.mp4 (primary) */}
        <div style={{ position: "relative", overflow: "hidden", zIndex: 2 }}>
          <video
            ref={videoRef}
            src="/museum/hero-reel.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: loaded ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
          />
        </div>

        {/* RIGHT panel — FUTBOL.MP4 (facing us) */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <video
            src="/museum/futbol-side.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: loaded ? 0.85 : 0,
              transition: "opacity 1.4s ease 0.15s",
            }}
          />
          {/* Soft inner edge blend toward center */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(to left, transparent 0%, transparent 60%, rgba(7,7,10,0.5) 100%)",
          }} />
        </div>

        {/* Cinematic outer edge vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
          background: `linear-gradient(to right, ${C.base} 0%, transparent 5%, transparent 95%, ${C.base} 100%)`,
        }} />

        {/* Thin gold divider lines between panels */}
        <div style={{
          position: "absolute", left: "33.33%", top: "10%", bottom: "10%", width: "1px",
          background: `linear-gradient(to bottom, transparent, ${C.gold}30, ${C.gold}15, transparent)`,
          zIndex: 4, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", left: "66.66%", top: "10%", bottom: "10%", width: "1px",
          background: `linear-gradient(to bottom, transparent, ${C.gold}30, ${C.gold}15, transparent)`,
          zIndex: 4, pointerEvents: "none",
        }} />
      </div>

      {/* ── GRADIENT OVERLAYS ── */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: `
            linear-gradient(to bottom,
              rgba(7,7,10,0.35) 0%,
              rgba(7,7,10,0.05) 40%,
              rgba(7,7,10,0.55) 70%,
              rgba(7,7,10,0.92) 100%
            )`,
        }}
      />
      {/* Gold atmosphere */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 60%, rgba(212,168,50,0.08) 0%, transparent 60%)`,
        }}
      />
      <Grain />

      {/* ── HERO COPY ── */}
      <div
        style={{
          position: "relative", zIndex: 2,
          padding: "0 clamp(32px,6vw,96px) clamp(64px,8vh,112px)",
          maxWidth: "1400px", margin: "0 auto", width: "100%",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.55em",
            textTransform: "uppercase", color: C.gold,
            marginBottom: "20px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.9s ease 0.4s",
          }}
        >
          Touring Museum · Global Football Culture
        </div>

        {/* Brand wordmark */}
        <h1
          style={{
            fontFamily: F.serif,
            fontSize: "clamp(52px,8.5vw,128px)",
            fontWeight: 600, lineHeight: 0.9,
            letterSpacing: "-0.02em", color: C.cream,
            marginBottom: "28px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(48px)",
            transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}
        >
          Forever Futbol
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: F.serif,
            fontSize: "clamp(18px,2.2vw,30px)",
            fontStyle: "italic", color: C.goldLight,
            marginBottom: "48px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.9s ease 0.9s",
          }}
        >
          Past. Present. Eternal.
        </p>

        {/* Sub descriptor */}
        <p
          style={{
            fontFamily: F.sans, fontSize: "clamp(13px,1.1vw,16px)",
            lineHeight: 1.8, color: C.muted,
            maxWidth: "480px", marginBottom: "48px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.9s ease 1.1s",
          }}
        >
          A touring museum of global football culture — the icons, nations, style, and moments that made the beautiful game eternal.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex", gap: "16px", flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.9s ease 1.4s",
          }}
        >
          <a
            href="#tickets"
            style={{
              fontFamily: F.sans, fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#07070a",
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`,
              border: "none", padding: "16px 48px", cursor: "pointer",
              textDecoration: "none", display: "inline-block",
              transition: "all 0.3s",
            }}
          >
            Get Tickets
          </a>
          <a
            href="#experience"
            style={{
              fontFamily: F.sans, fontSize: "10px", fontWeight: 500,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: C.cream, background: "transparent",
              border: `1px solid rgba(255,255,255,0.22)`,
              padding: "16px 40px", cursor: "pointer",
              textDecoration: "none", display: "inline-block",
              transition: "all 0.3s",
            }}
          >
            Explore the Experience
          </a>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div
        style={{
          position: "absolute", bottom: "32px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          opacity: loaded ? 0.5 : 0,
          transition: "opacity 1s ease 2s",
          animation: loaded ? "scrollBounce 2s ease-in-out infinite 2s" : "none",
        }}
      >
        <div style={{ fontFamily: F.sans, fontSize: "8px", letterSpacing: "0.35em", textTransform: "uppercase", color: C.cream }}>
          Scroll
        </div>
        <div style={{ width: "1px", height: "32px", background: `linear-gradient(180deg, ${C.gold}, transparent)` }} />
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}

// ─── BRAND STATEMENT ──────────────────────────────────────────────────────────
function BrandStatement() {
  return (
    <section
      style={{
        background: C.base,
        padding: "120px clamp(32px,6vw,96px)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 60% 50%, ${C.gold}06, transparent 60%)` }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "24px" }}>
            More Than a Museum
          </div>
          <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,4.5vw,68px)", fontWeight: 600, lineHeight: 1.05, color: C.cream, marginBottom: "28px" }}>
            Football lives<br />
            <em style={{ color: C.goldLight }}>beyond the pitch.</em>
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: "16px", lineHeight: 1.85, color: C.muted, maxWidth: "480px", marginBottom: "36px" }}>
            Forever Futbol is an immersive journey through the culture of the world&apos;s game — the icons, the nations, the style, the supporters, the moments, and the legacy that made football eternal.
          </p>
          <div style={{ display: "flex", gap: "40px" }}>
            {[["6", "Worlds"], ["8", "Cities"], ["∞", "Memories"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: F.serif, fontSize: "42px", fontWeight: 600, color: C.gold, lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: C.muted, marginTop: "6px" }}>{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          {/* Museum entrance image */}
          <div style={{ position: "relative", borderRadius: "2px", overflow: "hidden" }}>
            <img
              src="/museum/hero-entry.png"
              alt="Forever Futbol museum entrance — Past. Present. Eternal."
              style={{ width: "100%", height: "500px", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.gold}12, transparent 60%)` }} />
            <div
              style={{
                position: "absolute", bottom: "24px", left: "24px",
                fontFamily: F.serif, fontSize: "14px", fontStyle: "italic",
                color: C.goldLight, letterSpacing: "0.05em",
              }}
            >
              "Past. Present. Eternal."
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── EXHIBITS ─────────────────────────────────────────────────────────────────
const EXHIBITS = [
  {
    name: "Hall of Legends",
    desc: "The icons who changed the game — and the moments that made them immortal.",
    image: "/museum/hall-of-legends.png",
    accent: C.gold,
    tag: "Legends",
  },
  {
    name: "World Cup Theater",
    desc: "A cinematic tribute to football's grandest stage, where nations rise, fall, and live forever in memory.",
    image: "/museum/world-cup-theater.png",
    accent: "#4A9A6A",
    tag: "History",
  },
  {
    name: "Boots, Kits & Culture",
    desc: "The design, style, statements, and symbolism worn by generations of players and supporters.",
    image: "/museum/boots-kits-culture.png",
    accent: C.teal,
    tag: "Culture",
  },
  {
    name: "Nations & Flags",
    desc: "A tribute to pride, identity, and the colors that unite millions under one crest, one chant, one dream.",
    image: "/museum/nations-flags.png",
    accent: "#4A6A9A",
    tag: "Identity",
  },
  {
    name: "Street to Stadium",
    desc: "From concrete cages and neighborhood pitches to cathedrals of sport — the journey of football's soul.",
    image: "/museum/street-to-stadium.png",
    accent: "#C85A1A",
    tag: "Journey",
  },
  {
    name: "The Beautiful Game",
    desc: "Skill. Rhythm. Flair. Poetry in motion. The artistry that made football the world's universal language.",
    image: "/museum/beautiful-game.png",
    accent: "#8A4A9A",
    tag: "Art",
  },
];

function Exhibits() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="experience" style={{ background: C.base, padding: "120px 0" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(32px,6vw,96px)" }}>
        <Reveal>
          <div style={{ marginBottom: "72px" }}>
            <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>
              Exhibition Worlds
            </div>
            <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,72px)", fontWeight: 600, lineHeight: 0.95, color: C.cream, marginBottom: "16px" }}>
              Enter the Museum
            </h2>
            <p style={{ fontFamily: F.sans, fontSize: "15px", color: C.muted, maxWidth: "480px", lineHeight: 1.75 }}>
              Six worlds. Countless memories. One global obsession.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Full-width cinematic grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "auto auto" }}>
        {EXHIBITS.map((ex, i) => (
          <div
            key={ex.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              position: "relative", overflow: "hidden",
              height: i < 3 ? "480px" : "360px",
              cursor: "pointer",
            }}
          >
            {/* Room image */}
            <img
              src={ex.image}
              alt={ex.name}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                transform: active === i ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}
            />

            {/* Dark overlay */}
            <div
              style={{
                position: "absolute", inset: 0,
                background: active === i
                  ? `linear-gradient(to top, rgba(7,7,10,0.95) 0%, rgba(7,7,10,0.3) 60%, transparent 100%)`
                  : `linear-gradient(to top, rgba(7,7,10,0.88) 0%, rgba(7,7,10,0.5) 50%, rgba(7,7,10,0.2) 100%)`,
                transition: "background 0.6s ease",
              }}
            />

            {/* Accent color overlay */}
            <div
              style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse at 50% 100%, ${ex.accent}20, transparent 70%)`,
                opacity: active === i ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute", inset: 0, zIndex: 2,
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end",
                padding: "clamp(20px,3vw,40px)",
              }}
            >
              {/* Tag */}
              <div
                style={{
                  fontFamily: F.sans, fontSize: "8px", fontWeight: 600,
                  letterSpacing: "0.4em", textTransform: "uppercase",
                  color: ex.accent, marginBottom: "12px",
                  opacity: 0.9,
                }}
              >
                {ex.tag}
              </div>

              {/* Name */}
              <div
                style={{
                  fontFamily: F.serif,
                  fontSize: "clamp(20px,2vw,28px)",
                  fontWeight: 600, color: C.cream,
                  lineHeight: 1.1, marginBottom: "12px",
                }}
              >
                {ex.name}
              </div>

              {/* Desc — visible on hover */}
              <p
                style={{
                  fontFamily: F.sans, fontSize: "13px",
                  lineHeight: 1.7, color: C.muted,
                  maxHeight: active === i ? "80px" : "0px",
                  overflow: "hidden",
                  opacity: active === i ? 1 : 0,
                  transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                  marginBottom: active === i ? "16px" : "0",
                }}
              >
                {ex.desc}
              </p>

              {/* CTA */}
              <div
                style={{
                  fontFamily: F.sans, fontSize: "9px", fontWeight: 600,
                  letterSpacing: "0.28em", textTransform: "uppercase",
                  color: ex.accent,
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "translateY(0)" : "translateY(8px)",
                  transition: "all 0.4s ease 0.1s",
                }}
              >
                Explore Exhibit →
              </div>

              {/* Accent line */}
              <div
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, ${ex.accent}, transparent)`,
                  opacity: active === i ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── MUSEUM ROOMS TEASER ──────────────────────────────────────────────────────
function MuseumTeaser() {
  return (
    <section
      style={{
        background: C.surface, padding: "120px clamp(32px,6vw,96px)",
        position: "relative", overflow: "hidden",
      }}
    >
      <Grain />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${C.gold}06, transparent 60%)` }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>
              What You&apos;ll Feel Inside
            </div>
            <h2 style={{ fontFamily: F.serif, fontSize: "clamp(32px,4.5vw,64px)", fontWeight: 600, color: C.cream, lineHeight: 1.05, marginBottom: "20px" }}>
              This is not a room full of facts.
            </h2>
            <p style={{ fontFamily: F.sans, fontSize: "16px", color: C.muted, maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
              It is football reinterpreted through light, sound, scale, symbolism, and story.
            </p>
          </div>
        </Reveal>

        {/* 3-column preview row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
          {[
            { img: "/museum/hall-of-legends-women.png", label: "Women's Football Legacy" },
            { img: "/museum/museum-entrance.png", label: "The Entrance Experience" },
            { img: "/museum/club-dynasties.png", label: "Club Dynasties" },
          ].map(({ img, label }) => (
            <div key={label} style={{ position: "relative", overflow: "hidden", height: "320px" }}>
              <img
                src={img} alt={label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,7,10,0.75) 0%, transparent 60%)" }} />
              <div
                style={{
                  position: "absolute", bottom: "20px", left: "20px",
                  fontFamily: F.sans, fontSize: "10px", fontWeight: 600,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: C.goldLight,
                }}
              >
                {label}
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
  { city: "Atlanta", status: "Flagship", dates: "Spring 2026", note: "Premiere market. Rising football capital with global energy." },
  { city: "Houston", status: "Upcoming", dates: "Summer 2026", note: "Diverse, international, built for a football audience that spans continents." },
  { city: "Los Angeles", status: "Planned", dates: "Fall 2026", note: "Where entertainment, global culture, and the sport's future collide." },
  { city: "Miami", status: "Planned", dates: "Q4 2026", note: "A natural home for football passion, international identity, and electric fan culture." },
  { city: "New York", status: "TBD", dates: "2027", note: "A world city worthy of a world game." },
  { city: "Chicago", status: "TBD", dates: "2027", note: "Historic, proud, positioned for large-scale cultural experiences." },
];

function TourCities() {
  const [sel, setSel] = useState(0);
  const city = CITIES[sel];

  return (
    <section id="tour" style={{ background: C.base, padding: "120px clamp(32px,6vw,96px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 20% 50%, ${C.gold}06, transparent 55%)` }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>
            City Rollout
          </div>
          <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,72px)", fontWeight: 600, lineHeight: 0.95, color: C.cream, marginBottom: "20px" }}>
            The Tour Begins
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: "15px", color: C.muted, maxWidth: "440px", marginBottom: "64px", lineHeight: 1.75 }}>
            Launching city by city, building a global football experience across culture capitals.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "3px", background: C.border }}>
          {/* City list */}
          <div style={{ background: C.base, display: "flex", flexDirection: "column", gap: "2px" }}>
            {CITIES.map((c, i) => (
              <div
                key={c.city}
                onClick={() => setSel(i)}
                style={{
                  padding: "24px 28px", cursor: "pointer",
                  background: sel === i ? `linear-gradient(135deg, ${C.gold}10, ${C.goldDeep}06)` : "transparent",
                  borderLeft: sel === i ? `2px solid ${C.gold}` : `2px solid transparent`,
                  transition: "all 0.3s",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: "22px", fontWeight: 600, color: sel === i ? C.cream : C.muted }}>
                    {c.city}
                  </div>
                  <div style={{ fontFamily: F.sans, fontSize: "11px", color: sel === i ? C.gold : "rgba(255,255,255,0.28)", marginTop: "4px" }}>
                    {c.dates}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: F.sans, fontSize: "9px", fontWeight: 600,
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: sel === i ? C.gold : "rgba(255,255,255,0.22)",
                    padding: "6px 14px",
                    border: `1px solid ${sel === i ? C.gold + "40" : "rgba(255,255,255,0.08)"}`,
                    background: sel === i ? `${C.gold}10` : "transparent",
                  }}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>

          {/* City detail */}
          <div style={{ background: `linear-gradient(145deg, #0e0c10, #14121a)`, padding: "56px 48px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 70% 30%, ${C.gold}10, transparent 60%)` }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>
                {city.status}
              </div>
              <div style={{ fontFamily: F.serif, fontSize: "56px", fontWeight: 600, color: C.cream, lineHeight: 1.0, marginBottom: "16px" }}>
                {city.city}
              </div>
              <div style={{ fontFamily: F.sans, fontSize: "14px", color: C.gold, marginBottom: "12px" }}>{city.dates}</div>
              <p style={{ fontFamily: F.sans, fontSize: "14px", color: C.muted, marginBottom: "40px", lineHeight: 1.75 }}>
                {city.note}
              </p>
              <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg, ${C.gold}40, transparent)`, marginBottom: "32px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Individual Tickets", "Group Bookings", "School Programs", "Corporate Events", "Partner Activations"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: F.sans, fontSize: "13px", color: C.muted }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: C.gold, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              <button
                style={{
                  marginTop: "36px", fontFamily: F.sans, fontSize: "10px", fontWeight: 600,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#07070a", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`,
                  border: "none", padding: "14px 40px", cursor: "pointer", transition: "all 0.3s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)")}
              >
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
    <section id="groups" style={{ background: C.surface, padding: "120px clamp(32px,6vw,96px)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>
            Group & Partner Access
          </div>
          <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,68px)", fontWeight: 600, lineHeight: 0.95, color: C.cream, marginBottom: "16px" }}>
            Choose Your Way In
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: "15px", color: C.muted, maxWidth: "440px", marginBottom: "64px", lineHeight: 1.75 }}>
            From schools and youth academies to private groups and corporate teams, Forever Futbol is designed to be experienced together.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2px", background: C.border }}>
          {paths.map((p, i) => (
            <div
              key={p.title}
              style={{ background: C.base, padding: "48px 40px", position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, width: "2px", height: "100%", background: `linear-gradient(180deg, ${C.gold}, transparent)` }} />
              <div style={{ paddingLeft: "24px" }}>
                <div style={{ fontFamily: F.sans, fontSize: "9px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>
                  0{i + 1}
                </div>
                <div style={{ fontFamily: F.serif, fontSize: "28px", fontWeight: 600, color: C.cream, marginBottom: "14px" }}>
                  {p.title}
                </div>
                <p style={{ fontFamily: F.sans, fontSize: "14px", lineHeight: 1.75, color: C.muted, marginBottom: "28px" }}>
                  {p.desc}
                </p>
                <button
                  style={{
                    fontFamily: F.sans, fontSize: "9px", fontWeight: 600,
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: C.gold, background: "transparent",
                    border: `1px solid ${C.gold}30`,
                    padding: "10px 24px", cursor: "pointer", transition: "all 0.3s",
                  }}
                >
                  {p.cta} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PULL QUOTE ───────────────────────────────────────────────────────────────
function PullQuote() {
  return (
    <section
      style={{
        background: C.base, padding: "96px clamp(32px,6vw,96px)",
        borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${C.gold}05, transparent 65%)` }} />
      <Reveal>
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: F.serif, fontSize: "clamp(28px,4vw,56px)", fontStyle: "italic", color: C.cream, lineHeight: 1.2, maxWidth: "820px", margin: "0 auto" }}>
            &ldquo;The world&apos;s game deserves a world-class stage.&rdquo;
          </div>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginTop: "28px" }}>
            Forever Futbol
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── TICKETS ──────────────────────────────────────────────────────────────────
// ─── TICKET DATA — LIVE EVENTBRITE ───────────────────────────────────────────
const FF_TICKETS = [
  {
    city: "Atlanta",
    date: "June 5, 2026",
    status: "On Sale Now",
    url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442211046",
    note: "Flagship Launch",
  },
  {
    city: "Washington DC",
    date: "June 15, 2026",
    status: "On Sale Now",
    url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442556078",
    note: "East Coast Stop",
  },
  {
    city: "Los Angeles",
    date: "June 25, 2026",
    status: "On Sale Now",
    url: "https://www.eventbrite.com/e/forever-futbol-tickets-1983442708534",
    note: "West Coast Stop",
  },
];

function Tickets() {
  const [selectedCity, setSelectedCity] = useState(0);

  return (
    <section
      id="tickets"
      style={{ padding: "120px clamp(32px,6vw,96px)", background: C.base, position: "relative", overflow: "hidden" }}
    >
      <Grain />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${C.gold}06, transparent 60%)` }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>
            Secure Your Entry
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "64px" }}>
            <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,72px)", fontWeight: 600, color: C.cream, lineHeight: 0.95 }}>
              Get Your Tickets
            </h2>
            <p style={{ fontFamily: F.sans, fontSize: "14px", lineHeight: 1.8, color: C.muted, maxWidth: "360px" }}>
              Timed entry. Limited capacity per city. Reserve early — these sell out.
            </p>
          </div>
        </Reveal>

        {/* ── CITY TICKET CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", background: `${C.gold}15`, marginBottom: "48px" }}>
          {FF_TICKETS.map((t, i) => (
            <Reveal key={t.city} delay={i * 0.08}>
              <div
                onClick={() => setSelectedCity(i)}
                style={{
                  background: selectedCity === i ? `linear-gradient(145deg, #0f0e0c, #1a1710)` : C.surface,
                  padding: "40px 36px",
                  cursor: "pointer",
                  borderTop: `2px solid ${selectedCity === i ? C.gold : "transparent"}`,
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  display: "flex", flexDirection: "column", gap: "12px",
                }}
              >
                {/* Status badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontFamily: F.sans, fontSize: "8px", fontWeight: 700,
                  letterSpacing: "0.3em", textTransform: "uppercase",
                  color: selectedCity === i ? C.gold : C.muted,
                  transition: "color 0.3s",
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#4ADE80",
                    boxShadow: "0 0 6px #4ADE80",
                    animation: "pulse 2s ease-in-out infinite",
                  }} />
                  {t.status}
                </div>

                {/* City */}
                <div style={{
                  fontFamily: F.serif, fontSize: "clamp(22px,2.5vw,34px)", fontWeight: 600,
                  color: C.cream, lineHeight: 1,
                }}>
                  {t.city}
                </div>

                {/* Date */}
                <div style={{ fontFamily: F.sans, fontSize: "13px", color: selectedCity === i ? C.gold : C.muted }}>
                  {t.date}
                </div>

                {/* Note */}
                <div style={{ fontFamily: F.sans, fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                  {t.note}
                </div>

                {/* CTA — always visible, prominent */}
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    marginTop: "16px",
                    fontFamily: F.sans, fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: selectedCity === i ? "#07070a" : C.cream,
                    background: selectedCity === i
                      ? `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`
                      : "transparent",
                    border: selectedCity === i ? "none" : `1px solid rgba(255,255,255,0.15)`,
                    padding: "14px 28px",
                    textDecoration: "none", display: "inline-block",
                    transition: "all 0.3s",
                  }}
                >
                  Buy {t.city} Tickets →
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── GROUP / SCHOOL / PARTNER PATHS ── */}
        <Reveal delay={0.2}>
          <div style={{
            background: C.surface, padding: "36px 40px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "24px",
            borderLeft: `2px solid ${C.gold}50`,
          }}>
            <div>
              <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>
                Groups · Schools · Corporate
              </div>
              <div style={{ fontFamily: F.serif, fontSize: "clamp(18px,2vw,26px)", fontStyle: "italic", color: C.cream }}>
                Bringing a group of 10 or more?
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="mailto:foreverfutbolmuseum@gmail.com?subject=Group Booking Inquiry"
                style={{
                  fontFamily: F.sans, fontSize: "10px", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "#07070a", background: C.gold,
                  padding: "13px 32px", textDecoration: "none", display: "inline-block",
                  transition: "all 0.3s",
                }}
              >
                Book a Group
              </a>
              <a
                href="mailto:foreverfutbolmuseum@gmail.com?subject=School/Education Inquiry"
                style={{
                  fontFamily: F.sans, fontSize: "10px", fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: C.cream, background: "transparent",
                  border: `1px solid ${C.border}`, padding: "13px 28px",
                  textDecoration: "none", display: "inline-block",
                  transition: "all 0.3s",
                }}
              >
                School Programs
              </a>
            </div>
          </div>
        </Reveal>

        {/* Trust signals */}
        <div style={{ marginTop: "32px", display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
          {["Powered by Eventbrite", "Secure Checkout", "Instant Confirmation", "Refund Policy Applies"].map(s => (
            <div key={s} style={{ fontFamily: F.sans, fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>
              {s}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#060609", borderTop: `1px solid ${C.border}`, padding: "72px clamp(32px,6vw,96px) 40px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3,1fr)", gap: "48px", marginBottom: "64px" }}>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: "8px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>
              Global Football Culture
            </div>
            <div style={{ fontFamily: F.serif, fontSize: "26px", fontWeight: 600, color: C.cream, marginBottom: "16px" }}>
              Forever Futbol
            </div>
            <p style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.7, color: C.muted }}>
              The world&apos;s new football culture experience. Touring globally.
            </p>
          </div>
          {[
            { h: "Experience", l: ["Hall of Legends", "World Cup Theater", "Boots & Culture", "Street to Stadium", "The Beautiful Game"] },
            { h: "Visit", l: ["Get Tickets", "Group Bookings", "School Programs", "Corporate Events", "Accessibility"] },
            { h: "Partners", l: ["Sponsors", "Tourism Partners", "Media & Press", "Brand Activations", "foreverfutbolmuseum@gmail.com"] },
          ].map((col) => (
            <div key={col.h}>
              <div style={{ fontFamily: F.sans, fontSize: "8px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold, marginBottom: "20px" }}>
                {col.h}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.l.map((item) => (
                  <li key={item} style={{ fontFamily: F.sans, fontSize: "13px", color: C.muted }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ fontFamily: F.sans, fontSize: "11px", color: "rgba(255,255,255,0.22)" }}>
            © 2026 Forever Futbol. A KHG Enterprise. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy", "Terms", "Contact"].map((item) => (
              <span key={item} style={{ fontFamily: F.sans, fontSize: "11px", color: "rgba(255,255,255,0.25)", cursor: "pointer" }}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ForeverFutbolV4() {
  return (
    <div style={{ background: C.base }}>
      <Nav />
      <Hero />
      <BrandStatement />
      <Exhibits />
      <MuseumTeaser />
      <TourCities />
      <GroupsPartners />
      <PullQuote />
      <Tickets />
      <Footer />
    </div>
  );
}
