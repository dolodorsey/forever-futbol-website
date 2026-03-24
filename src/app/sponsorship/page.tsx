"use client";
import { useState } from "react";
import Image from "next/image";

const WEBHOOK = "https://dorsey.app.n8n.cloud/webhook/khg-form-submit";
const FF_PIT = "pit-4fa7a823-ef6c-457e-b77b-c160660373e9";
const FF_LOC = "GbG9KQGmgIDSvPuYIUf9";

export default function SponsorshipPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ contact_name: "", contact_title: "", company_name: "", contact_email: "", contact_phone: "", sponsorship_interest: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, brand_key: "forever_futbol", form_type: "sponsorship_deck_request", source: "website" };
    try {
      await fetch(WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
      await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
        method: "POST",
        headers: { Authorization: `Bearer ${FF_PIT}`, "Content-Type": "application/json", Version: "2021-07-28" },
        body: JSON.stringify({ locationId: FF_LOC, email: form.contact_email, phone: form.contact_phone || undefined, firstName: form.contact_name.split(" ")[0], lastName: form.contact_name.split(" ").slice(1).join(" ") || "", name: form.contact_name, companyName: form.company_name, source: "sponsorship_form", tags: ["ff_sponsor", "deck_requested", "world_cup_2026", form.sponsorship_interest] })
      }).catch(() => {});
    } catch {}
    setSubmitted(true);
    setLoading(false);
  };

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <main className="min-h-screen bg-[#0E1014] text-[#F2EEE5]">
      {/* HERO */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#0E1014] z-10" />
        <img src="https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/forever_futbol/03_event_flyers/Gemini_Generated_Image_c1aew6c1aew6c1ae.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 text-center px-6">
          <img src="https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png" alt="Forever Futbol" className="mx-auto max-w-[160px] mb-6" />
          <h1 className="font-['EB_Garamond'] text-4xl md:text-5xl font-light text-[#C6A65B]">Sponsorship Inquiry</h1>
          <p className="text-[#C6A65B]/60 text-xs tracking-[5px] uppercase mt-3">Past · Present · Eternal</p>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-xl mx-auto px-6 -mt-8 relative z-30 pb-20">
        {!submitted ? (
          <div className="bg-[#12141A] border border-[#1E2028] rounded-lg p-8 md:p-10 shadow-2xl">
            <h2 className="font-['EB_Garamond'] text-2xl mb-1">Request the Sponsorship Deck</h2>
            <p className="text-[#666] text-sm mb-6 leading-relaxed">The Forever Futbol Museum opens June 11 in Atlanta — a 39-day museum-grade football experience during the 2026 FIFA World Cup.</p>

            <div className="grid grid-cols-3 gap-px bg-[#1E2028] rounded-md overflow-hidden mb-8">
              {[["39","Days"],["ATL","Atlanta"],["2026","World Cup"]].map(([n,l])=>(
                <div key={l} className="bg-[#12141A] py-4 text-center">
                  <p className="text-[#C6A65B] font-['EB_Garamond'] text-2xl font-bold">{n}</p>
                  <p className="text-[#444] text-[9px] tracking-widest uppercase mt-1">{l}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Your Name</label><input required value={form.contact_name} onChange={e=>update("contact_name",e.target.value)} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none transition-colors" placeholder="Full name" /></div>
                <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Title</label><input value={form.contact_title} onChange={e=>update("contact_title",e.target.value)} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none transition-colors" placeholder="e.g. VP Marketing" /></div>
              </div>
              <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Company</label><input required value={form.company_name} onChange={e=>update("company_name",e.target.value)} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none transition-colors" placeholder="Company name" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Email</label><input required type="email" value={form.contact_email} onChange={e=>update("contact_email",e.target.value)} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none transition-colors" placeholder="you@company.com" /></div>
                <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Phone</label><input value={form.contact_phone} onChange={e=>update("contact_phone",e.target.value)} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none transition-colors" placeholder="(optional)" /></div>
              </div>
              <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Sponsorship Interest</label>
                <select required value={form.sponsorship_interest} onChange={e=>update("sponsorship_interest",e.target.value)} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none appearance-none">
                  <option value="" disabled>Select a category</option>
                  <option value="title_sponsor">Title Sponsor</option>
                  <option value="presenting_sponsor">Presenting Sponsor</option>
                  <option value="category_sponsor">Category Sponsor (Beverage, Apparel, Tech, etc.)</option>
                  <option value="activation_partner">On-Site Activation</option>
                  <option value="media_partner">Media / Content</option>
                  <option value="hospitality">Hospitality (Hotels, Travel)</option>
                  <option value="other">Other / Custom</option>
                </select>
              </div>
              <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Message (Optional)</label><textarea value={form.message} onChange={e=>update("message",e.target.value)} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none min-h-[100px] resize-y" placeholder="Tell us about your brand..." /></div>
              <button type="submit" disabled={loading} className="w-full bg-[#C6A65B] text-[#0E1014] py-4 text-xs font-bold tracking-[3px] uppercase rounded hover:bg-[#d4b46a] transition-all disabled:opacity-50">{loading ? "SENDING..." : "REQUEST THE SPONSORSHIP DECK"}</button>
              <a href="/" className="block text-center text-[#C6A65B]/50 text-xs tracking-wider hover:text-[#C6A65B] transition-colors mt-2">Or explore the experience →</a>
            </form>
          </div>
        ) : (
          <div className="bg-[#12141A] border border-[#1E2028] rounded-lg p-12 text-center shadow-2xl">
            <h2 className="font-['EB_Garamond'] text-3xl text-[#C6A65B] mb-3">Request Received</h2>
            <p className="text-[#888] text-sm leading-relaxed">Thank you for your interest in the Forever Futbol Museum.<br/>We&apos;ll send the sponsorship deck within 24 hours.</p>
            <a href="/" className="inline-block mt-8 bg-[#C6A65B] text-[#0E1014] px-10 py-3 text-xs font-bold tracking-[3px] uppercase rounded">EXPLORE THE EXPERIENCE</a>
          </div>
        )}
      </section>

      <footer className="text-center py-8 border-t border-[#1E2028]">
        <p className="text-[#333] text-[10px]">The Kollective Hospitality Group · Atlanta, GA</p>
      </footer>
    </main>
  );
}
