"use client";
import { useState, useEffect } from "react";

interface Tier { id: string; tier_name: string; tier_code: string; price: string; description: string; includes: string[]; max_capacity: number; sold: number; }
interface Slot { id: string; slot_date: string; slot_time: string; capacity: number; booked: number; }

export default function TicketsPage() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => { fetch("/api/tickets").then(r => r.json()).then(d => setTiers(d.tiers || [])); }, []);
  useEffect(() => { if (selectedDate) fetch(`/api/tickets?date=${selectedDate}`).then(r => r.json()).then(d => setSlots(d.slots || [])); }, [selectedDate]);

  const generateDates = () => {
    const dates = [];
    const start = new Date("2026-06-11");
    const end = new Date("2026-07-19");
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  };

  const tier = tiers.find(t => t.tier_code === selectedTier);
  const total = tier ? parseFloat(tier.price) * quantity : 0;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch("/api/tickets", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier_code: selectedTier, slot_id: selectedSlot, quantity, ...form })
      });
      setConfirmed(true);
    } catch {}
    setLoading(false);
  };

  const formatTime = (t: string) => { const [h,m] = t.split(":").map(Number); const ampm = h >= 12 ? "PM" : "AM"; return `${h > 12 ? h-12 : h || 12}:${String(m).padStart(2,"0")} ${ampm}`; };
  const formatDate = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  if (confirmed) return (
    <main className="min-h-screen bg-[#0E1014] text-[#F2EEE5] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-[#C6A65B]/20 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-[#C6A65B] text-3xl">✓</span></div>
        <h1 className="font-['EB_Garamond'] text-3xl text-[#C6A65B] mb-3">Reservation Confirmed</h1>
        <p className="text-[#888] text-sm leading-relaxed mb-2">Your tickets for the Forever Futbol Museum have been reserved.</p>
        <p className="text-[#666] text-xs mb-8">A confirmation email will be sent to {form.email}</p>
        <div className="bg-[#12141A] border border-[#1E2028] rounded-lg p-6 text-left mb-8">
          <div className="flex justify-between mb-3"><span className="text-[#666] text-xs">Tier</span><span className="text-sm">{tier?.tier_name}</span></div>
          <div className="flex justify-between mb-3"><span className="text-[#666] text-xs">Date</span><span className="text-sm">{formatDate(selectedDate)}</span></div>
          <div className="flex justify-between mb-3"><span className="text-[#666] text-xs">Quantity</span><span className="text-sm">{quantity}</span></div>
          <div className="flex justify-between border-t border-[#1E2028] pt-3 mt-3"><span className="text-[#C6A65B] text-xs tracking-wider">TOTAL</span><span className="text-[#C6A65B] font-bold">${total.toFixed(2)}</span></div>
        </div>
        <a href="/" className="inline-block bg-[#C6A65B] text-[#0E1014] px-10 py-3 text-xs font-bold tracking-[3px] uppercase rounded">BACK TO MUSEUM</a>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#0E1014] text-[#F2EEE5]">
      {/* HERO */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#0E1014] z-10" />
        <img src="https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/forever_futbol/03_event_flyers/Gemini_Generated_Image_gvj9u6gvj9u6gvj9.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 text-center px-6">
          <img src="https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png" alt="Forever Futbol" className="mx-auto max-w-[140px] mb-5" />
          <h1 className="font-['EB_Garamond'] text-3xl md:text-4xl font-light text-[#C6A65B]">Secure Your Visit</h1>
          <p className="text-[#888] text-sm mt-2">June 11 – July 19, 2026 · Atlanta</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 -mt-6 relative z-30 pb-20">
        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1,2,3].map(s => (<div key={s} className={`w-8 h-1 rounded-full ${step >= s ? "bg-[#C6A65B]" : "bg-[#1E2028]"}`} />))}
        </div>

        {/* STEP 1: SELECT TIER */}
        {step === 1 && (
          <div>
            <h2 className="font-['EB_Garamond'] text-2xl mb-6 text-center">Choose Your Experience</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {tiers.filter(t => ["GA","VIP","MVVIP"].includes(t.tier_code)).map(t => (
                <button key={t.id} onClick={() => { setSelectedTier(t.tier_code); setStep(2); }} className={`text-left p-6 rounded-lg border transition-all hover:border-[#C6A65B]/50 ${selectedTier === t.tier_code ? "bg-[#C6A65B]/10 border-[#C6A65B]" : "bg-[#12141A] border-[#1E2028]"}`}>
                  <p className="text-[#C6A65B] font-['EB_Garamond'] text-3xl font-bold">${parseFloat(t.price).toFixed(0)}</p>
                  <p className="text-sm font-medium mt-1 mb-3">{t.tier_name}</p>
                  <p className="text-[#666] text-xs mb-4">{t.description}</p>
                  <ul className="space-y-1.5">{t.includes.map((inc, i) => (<li key={i} className="text-[#888] text-xs flex gap-2"><span className="text-[#C6A65B]">◆</span>{inc}</li>))}</ul>
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {tiers.filter(t => ["GROUP","KIDS"].includes(t.tier_code)).map(t => (
                <button key={t.id} onClick={() => { setSelectedTier(t.tier_code); setStep(2); }} className="text-left p-5 rounded-lg border bg-[#12141A] border-[#1E2028] hover:border-[#C6A65B]/50 transition-all">
                  <div className="flex justify-between items-start">
                    <div><p className="text-sm font-medium">{t.tier_name}</p><p className="text-[#666] text-xs mt-1">{t.description}</p></div>
                    <p className="text-[#C6A65B] font-['EB_Garamond'] text-xl font-bold">${parseFloat(t.price).toFixed(0)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE + TIME + QUANTITY */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="text-[#666] text-xs mb-4 hover:text-[#C6A65B]">← Back to tiers</button>
            <h2 className="font-['EB_Garamond'] text-2xl mb-2">Select Date & Time</h2>
            <p className="text-[#C6A65B] text-sm mb-6">{tier?.tier_name} — ${parseFloat(tier?.price||"0").toFixed(0)} per person</p>

            <label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Date</label>
            <div className="grid grid-cols-7 gap-1 mb-6 max-h-[200px] overflow-y-auto">
              {generateDates().map(d => (
                <button key={d} onClick={() => setSelectedDate(d)} className={`py-2 px-1 text-xs rounded text-center transition-all ${selectedDate === d ? "bg-[#C6A65B] text-[#0E1014] font-bold" : "bg-[#12141A] border border-[#1E2028] hover:border-[#C6A65B]/30"}`}>
                  {new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                </button>
              ))}
            </div>

            {selectedDate && slots.length > 0 && (
              <>
                <label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Time Slot (15-minute intervals)</label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-1 mb-6 max-h-[200px] overflow-y-auto">
                  {slots.filter(s => s.booked < s.capacity).map(s => (
                    <button key={s.id} onClick={() => setSelectedSlot(s.id)} className={`py-2 text-xs rounded transition-all ${selectedSlot === s.id ? "bg-[#C6A65B] text-[#0E1014] font-bold" : "bg-[#12141A] border border-[#1E2028] hover:border-[#C6A65B]/30"}`}>
                      {formatTime(s.slot_time)}
                    </button>
                  ))}
                </div>
              </>
            )}

            <label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Quantity</label>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setQuantity(Math.max(1,quantity-1))} className="w-10 h-10 bg-[#12141A] border border-[#1E2028] rounded flex items-center justify-center text-lg hover:border-[#C6A65B]">−</button>
              <span className="text-xl font-bold w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(20,quantity+1))} className="w-10 h-10 bg-[#12141A] border border-[#1E2028] rounded flex items-center justify-center text-lg hover:border-[#C6A65B]">+</button>
              <span className="text-[#C6A65B] font-['EB_Garamond'] text-2xl ml-4">${(parseFloat(tier?.price||"0") * quantity).toFixed(2)}</span>
            </div>

            <button disabled={!selectedDate || !selectedSlot} onClick={() => setStep(3)} className="w-full bg-[#C6A65B] text-[#0E1014] py-4 text-xs font-bold tracking-[3px] uppercase rounded hover:bg-[#d4b46a] transition-all disabled:opacity-30">CONTINUE TO CHECKOUT</button>
          </div>
        )}

        {/* STEP 3: CHECKOUT */}
        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} className="text-[#666] text-xs mb-4 hover:text-[#C6A65B]">← Back to date selection</button>
            <h2 className="font-['EB_Garamond'] text-2xl mb-6">Complete Your Reservation</h2>

            <div className="bg-[#12141A] border border-[#1E2028] rounded-lg p-6 mb-6">
              <div className="flex justify-between mb-2"><span className="text-[#666] text-xs">Tier</span><span className="text-sm">{tier?.tier_name}</span></div>
              <div className="flex justify-between mb-2"><span className="text-[#666] text-xs">Date</span><span className="text-sm">{formatDate(selectedDate)}</span></div>
              <div className="flex justify-between mb-2"><span className="text-[#666] text-xs">Qty</span><span className="text-sm">{quantity}</span></div>
              <div className="flex justify-between border-t border-[#1E2028] pt-3 mt-3"><span className="text-[#C6A65B] text-xs tracking-wider">TOTAL</span><span className="text-[#C6A65B] font-bold text-lg">${total.toFixed(2)}</span></div>
            </div>

            <div className="space-y-4 mb-6">
              <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Full Name</label><input required value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none" /></div>
              <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Email</label><input required type="email" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none" /></div>
              <div><label className="block text-[#666] text-[10px] tracking-widest uppercase mb-2">Phone</label><input value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} className="w-full bg-[#0A0B0F] border border-[#1E2028] rounded px-4 py-3 text-sm text-[#F2EEE5] focus:border-[#C6A65B] outline-none" /></div>
            </div>

            <button disabled={!form.name || !form.email || loading} onClick={handleSubmit} className="w-full bg-[#C6A65B] text-[#0E1014] py-4 text-xs font-bold tracking-[3px] uppercase rounded hover:bg-[#d4b46a] transition-all disabled:opacity-50">{loading ? "PROCESSING..." : "COMPLETE RESERVATION"}</button>
          </div>
        )}
      </section>

      <footer className="text-center py-8 border-t border-[#1E2028]">
        <p className="text-[#333] text-[10px]">Forever Futbol Museum · Atlanta · The Kollective Hospitality Group</p>
      </footer>
    </main>
  );
}
