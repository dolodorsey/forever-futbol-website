"use client";

import { FormEvent, useMemo, useState } from "react";

const SUPABASE_URL = "https://wfkohcwxxsrhcxhepfql.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indma29oY3d4eHNyaGN4aGVwZnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMzMxODUsImV4cCI6MjA4MjkwOTE4NX0.e78lphH3WlRtWP0M9egyvFCLNVW9rgJiOBy9-ZZC9Ao";

const actionTypes = [
  ["notify", "Notify Me", "Be first to know when dates and venues are announced."],
  ["tickets", "Tickets", "Get ticket/on-sale updates for your selected city."],
  ["group_visit", "Group Visits", "Plan a group museum experience."],
  ["school_visit", "Schools", "Education, student and campus visit interest."],
  ["private_event", "Private Events", "Buyouts, receptions and private experiences."],
  ["merchandise", "Merchandise", "Get notified about museum merchandise drops."],
  ["press", "Press", "Media, editorial and interview requests."],
] as const;

type Props = {
  museumSlug: string;
  museumName: string;
  honorees?: string[];
  cities: string[];
  accent?: string;
  accent2?: string;
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[’']/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function MuseumEnhancements({ museumSlug, museumName, honorees = [], cities, accent = "#d5aa49", accent2 = "#f2d88a" }: Props) {
  const [leadType, setLeadType] = useState<string>("notify");
  const [city, setCity] = useState(cities[0] || "Atlanta");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [reference, setReference] = useState("");
  const selectedAction = useMemo(() => actionTypes.find(x => x[0] === leadType) || actionTypes[0], [leadType]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      museum_slug: museumSlug,
      lead_type: leadType,
      city,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      organization: String(form.get("organization") || ""),
      group_size: String(form.get("group_size") || ""),
      message: String(form.get("message") || ""),
      source_page: typeof window !== "undefined" ? window.location.pathname : "",
    };
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/museum-interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");
      setReference(data.reference || "");
      setStatus("done");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return <section className="museum-enhance" style={{ "--me-accent": accent, "--me-accent2": accent2 } as React.CSSProperties}>
    <style>{css}</style>
    {honorees.length > 0 && <div className="profile-directory" id="digital-exhibits">
      <div className="enhance-head"><span>DIGITAL EXHIBITS</span><h2>Season One, person by person.</h2><p>Every honoree now has a shareable digital exhibit shell built for biography, timeline, achievements, artifacts, awards, media, impact, verified facts, connected people and gallery content.</p></div>
      <div className="profile-grid">{honorees.map((name, i) => <a key={name} href={`/${museumSlug}/${slugify(name)}`}><small>{String(i + 1).padStart(2, "0")}</small><strong>{name}</strong><b>ENTER ↗</b></a>)}</div>
    </div>}

    <div className="conversion" id="visit">
      <div className="enhance-head light"><span>PLAN YOUR VISIT</span><h2>Choose the city. Choose the relationship.</h2><p>Tour dates and venues are still in planning unless announced by the museum. Your request is routed by museum, city and intent so the right team can follow up.</p></div>
      <div className="conversion-grid">
        <div className="city-panel">
          <label>SELECT TOUR MARKET</label>
          <select value={city} onChange={e => setCity(e.target.value)}>{cities.map(c => <option key={c} value={c}>{c}</option>)}</select>
          <div className="city-state"><span>{city}</span><strong>PLANNED MARKET</strong><p>Venue + dates: to be announced.</p></div>
          <div className="action-grid">{actionTypes.map(([key, title, desc]) => <button key={key} onClick={() => setLeadType(key)} className={leadType === key ? "active" : ""}><strong>{title}</strong><span>{desc}</span></button>)}</div>
        </div>
        <form className="interest-form" onSubmit={submit}>
          <div><span>REQUEST TYPE</span><h3>{selectedAction[1]}</h3><p>{selectedAction[2]}</p></div>
          <label>Name<input name="name" required minLength={2} /></label>
          <label>Email<input name="email" type="email" required /></label>
          <div className="two"><label>Phone<input name="phone" type="tel" /></label><label>Group Size<input name="group_size" type="number" min="1" max="5000" /></label></div>
          <label>Organization<input name="organization" /></label>
          <label>Message<textarea name="message" rows={4} placeholder={`Tell the ${museumName} team what you need.`} /></label>
          <button className="submit" disabled={status === "sending"}>{status === "sending" ? "Submitting…" : `Submit ${selectedAction[1]} Request`}</button>
          <small className="consent">By submitting, you agree that the museum team may contact you about this request.</small>
          {status === "done" && <div className="success">Request received. Reference: <strong>{reference}</strong></div>}
          {status === "error" && <div className="error">Could not submit this request. Please try again.</div>}
        </form>
      </div>
    </div>
  </section>;
}

const css = `
.museum-enhance{background:#08080a;color:#f7f0e4;font-family:Arial,Helvetica,sans-serif}.profile-directory,.conversion{padding:110px clamp(22px,6vw,96px)}.profile-directory{background:#0b0a09}.enhance-head{max-width:1050px;margin:0 0 48px}.enhance-head>span{font-size:9px;letter-spacing:.35em;color:var(--me-accent);font-weight:800}.enhance-head h2{font:400 clamp(44px,6vw,88px)/.95 Georgia,serif;letter-spacing:-.045em;margin:14px 0 20px}.enhance-head p{max-width:750px;line-height:1.8;color:rgba(255,255,255,.6)}.profile-grid{display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(255,255,255,.12);border-top:1px solid rgba(255,255,255,.12)}.profile-grid a{min-height:180px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;color:#fff;text-decoration:none;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);transition:.25s}.profile-grid a:hover{background:color-mix(in srgb,var(--me-accent) 11%,transparent);transform:translateY(-2px)}.profile-grid small,.profile-grid b{font-size:8px;letter-spacing:.18em;color:var(--me-accent)}.profile-grid strong{font:400 27px/1.05 Georgia,serif}.conversion{background:#f1eadf;color:#15110b}.enhance-head.light>span{color:#8d6925}.enhance-head.light p{color:rgba(0,0,0,.58)}.conversion-grid{display:grid;grid-template-columns:1fr .8fr;gap:18px;max-width:1450px}.city-panel,.interest-form{background:#fff;padding:36px;border:1px solid rgba(0,0,0,.1)}.city-panel>label{display:block;font-size:8px;letter-spacing:.22em;font-weight:800;margin-bottom:10px;color:#8d6925}.city-panel select{width:100%;height:58px;border:1px solid #d7cdbd;background:#fbf8f3;padding:0 17px;font:21px Georgia,serif}.city-state{margin:18px 0 28px;padding:24px;background:#0d0c0b;color:#fff}.city-state span{display:block;font:34px Georgia,serif}.city-state strong{display:block;color:var(--me-accent2);font-size:8px;letter-spacing:.2em;margin:9px 0}.city-state p{margin:0;color:rgba(255,255,255,.55);font-size:13px}.action-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.action-grid button{min-height:105px;text-align:left;border:1px solid #ddd3c4;background:#faf7f1;padding:17px;cursor:pointer}.action-grid button.active{background:#17130d;color:#fff;border-color:#17130d}.action-grid button strong{display:block;font:19px Georgia,serif;margin-bottom:7px}.action-grid button span{font-size:11px;line-height:1.5;opacity:.58}.interest-form>div:first-child span{font-size:8px;letter-spacing:.2em;color:#8d6925;font-weight:800}.interest-form h3{font:38px Georgia,serif;margin:7px 0}.interest-form>div:first-child p{font-size:13px;line-height:1.6;color:#777;margin:0 0 22px}.interest-form label{display:block;font-size:9px;letter-spacing:.12em;text-transform:uppercase;margin-top:14px}.interest-form input,.interest-form textarea{display:block;width:100%;margin-top:7px;border:1px solid #d9d0c4;padding:13px;font:14px Arial;background:#fcfaf7}.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.submit{width:100%;min-height:54px;margin-top:19px;border:0;background:#17130d;color:#fff;font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.submit:disabled{opacity:.5}.consent{display:block;margin-top:10px;color:#777;line-height:1.5}.success,.error{margin-top:14px;padding:13px;font-size:12px}.success{background:#e5f2e7;color:#1e5728}.error{background:#f7e4e4;color:#8a2525}@media(max-width:980px){.profile-grid{grid-template-columns:repeat(2,1fr)}.conversion-grid{grid-template-columns:1fr}}@media(max-width:620px){.profile-directory,.conversion{padding:78px 18px}.profile-grid,.action-grid,.two{grid-template-columns:1fr}.profile-grid a{min-height:135px}.city-panel,.interest-form{padding:22px}.enhance-head h2{font-size:45px}}
`;
