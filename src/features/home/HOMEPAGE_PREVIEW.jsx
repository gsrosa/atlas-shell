import { useState, useEffect, useRef } from "react";

/* ── tokens & global styles ─────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --p5:#ff5722;--p4:#ff8f73;--p3:#ffb5a0;--p6:#e64a19;
      --a4:#4dd4e8;--a5:#26c6da;
      --bg:#111317;--mu:#1a1c20;--ct:#1e2024;--ch:#282a2e;
      --bd:#414754;--fg:#f1f2f6;--fm:#9295aa;--fd:#5a5d72;
    }
    html{scroll-behavior:smooth}
    body,#root{font-family:'Manrope',-apple-system,sans-serif;background:var(--bg);color:var(--fg);-webkit-font-smoothing:antialiased}
    .df{font-family:'Noto Serif',Georgia,serif}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes fi{from{opacity:0}to{opacity:1}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes bob{0%,100%{transform:translateY(0)}45%{transform:translateY(-7px)}}
    @keyframes dotbounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
    .fu{opacity:0;transform:translateY(26px);transition:opacity .55s ease,transform .55s ease}
    .fu.in{opacity:1;transform:none}
    .glass{backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);background:rgba(17,19,23,.76)}
    .sx{overflow-x:auto;overflow-y:hidden;scrollbar-width:none;cursor:grab}
    .sx::-webkit-scrollbar{display:none}
    .bp{display:inline-flex;align-items:center;gap:7px;background:var(--p5);color:#fff;padding:12px 24px;border-radius:999px;font-family:'Manrope',sans-serif;font-weight:700;font-size:14px;border:none;cursor:pointer;transition:background .15s,transform .12s,box-shadow .15s;box-shadow:0 4px 22px rgba(255,87,34,.35);white-space:nowrap}
    .bp:hover{background:var(--p4);box-shadow:0 4px 28px rgba(255,87,34,.5)}
    .bp:active{background:var(--p6);transform:scale(.98)}
    .bg{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.08);color:#fff;padding:12px 20px;border-radius:999px;font-family:'Manrope',sans-serif;font-weight:600;font-size:13px;border:1px solid rgba(255,255,255,.16);cursor:pointer;transition:background .15s;white-space:nowrap;text-decoration:none}
    .bg:hover{background:rgba(255,255,255,.14)}
    .ba{display:inline-flex;align-items:center;gap:7px;background:var(--a5);color:#00363d;padding:12px 24px;border-radius:999px;font-family:'Manrope',sans-serif;font-weight:800;font-size:14px;border:none;cursor:pointer;transition:background .15s,transform .12s;box-shadow:0 4px 22px rgba(38,198,218,.28);white-space:nowrap}
    .ba:hover{background:var(--a4)}
  `}</style>
);

/* ── fade-up hook ────────────────────────────────────────────── */
function FU({ children, delay = 0 }) {
  const r = useRef(null);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); ob.disconnect(); } }, { threshold: .1 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return <div ref={r} className="fu" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* ── NAV ─────────────────────────────────────────────────────── */
function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 72);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64, padding: "0 clamp(16px,4vw,80px)", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background .3s,backdrop-filter .3s,border-color .3s", background: sc ? "rgba(17,19,23,.85)" : "transparent", backdropFilter: sc ? "blur(20px)" : "none", WebkitBackdropFilter: sc ? "blur(20px)" : "none", borderBottom: sc ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="11" stroke="#ff5722" strokeWidth="1.5" /><path d="M8 13h10M13 8v10" stroke="#ff5722" strokeWidth="1.5" strokeLinecap="round" /><circle cx="13" cy="13" r="2.5" fill="#ff5722" /></svg>
        <span className="df" style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>Atlas</span>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <a href="#hiw" style={{ color: "var(--fm)", fontSize: 13, fontWeight: 500, textDecoration: "none", padding: "8px 12px" }}>How it works</a>
        <button className="bp" style={{ padding: "10px 18px", fontSize: 13 }}>Start planning</button>
      </div>
    </nav>
  );
}

/* ── CHAT DEMO ───────────────────────────────────────────────── */
const FMSG = "I want 10 days somewhere remote, lots of hiking, hot springs if possible. Going solo in September.";
const RL = [{ e: "📍", t: "Reykjavík → Highlands → Westfjords" }, { e: "🥾", t: "Landmannalaugar trek (3 days)" }, { e: "♨️", t: "Hot springs daily" }, { e: "🌿", t: "No crowds · ~$2,100 est." }];

function ChatDemo() {
  const [typed, setTyped] = useState("");
  const [think, setThink] = useState(false);
  const [rep, setRep] = useState(false);
  const [vis, setVis] = useState(0);
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { i++; setTyped(FMSG.slice(0, i)); if (i >= FMSG.length) { clearInterval(iv); setTimeout(() => setThink(true), 380); setTimeout(() => { setThink(false); setRep(true); }, 2100); } }, 25);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    if (!rep) return;
    let l = 0; const iv = setInterval(() => { l++; setVis(l); if (l >= RL.length) clearInterval(iv); }, 210);
    return () => clearInterval(iv);
  }, [rep]);
  return (
    <div style={{ background: "rgba(17,19,23,.92)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 20, padding: "20px 22px", backdropFilter: "blur(24px)", boxShadow: "0 32px 60px rgba(0,0,0,.55)", minHeight: 260 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#ff5722,#ff8f73)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Atlas</div>
          <div style={{ fontSize: 11, color: "var(--fm)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />Active
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <div style={{ background: "var(--p5)", color: "#fff", borderRadius: "16px 16px 4px 16px", padding: "9px 13px", fontSize: 13, lineHeight: 1.55, maxWidth: "88%", fontWeight: 500 }}>
          {typed}{typed.length < FMSG.length && <span style={{ animation: "blink 1s infinite", marginLeft: 2 }}>|</span>}
        </div>
      </div>
      {think && <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "10px 12px", marginBottom: 10 }}>
        {[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--fm)", display: "inline-block", animation: `dotbounce 1s ${i * 180}ms infinite` }} />)}
        <span style={{ fontSize: 12, color: "var(--fm)", marginLeft: 6 }}>Atlas is planning…</span>
      </div>}
      {rep && <div style={{ animation: "fi .35s ease" }}>
        <div style={{ background: "var(--ch)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "4px 16px 16px 16px", padding: "13px 15px", fontSize: 13 }}>
          <div style={{ color: "var(--fm)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 11 }}>Iceland · 10 days · September</div>
          {RL.map((l, i) => i < vis ? <div key={i} style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 7 }}><span>{l.e}</span><span style={{ color: "var(--fg)", fontSize: 13 }}>{l.t}</span></div> : null)}
          {vis >= RL.length && <button style={{ marginTop: 11, width: "100%", background: "var(--p5)", color: "#fff", border: "none", borderRadius: 10, padding: "9px 0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>View full itinerary →</button>}
        </div>
      </div>}
    </div>
  );
}

/* ── HERO ────────────────────────────────────────────────────── */
function Hero() {
  const [q, setQ] = useState("");
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `linear-gradient(to bottom,rgba(17,19,23,.1) 0%,rgba(17,19,23,.32) 35%,rgba(17,19,23,.82) 65%,rgba(17,19,23,1) 100%),url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop') center/cover no-repeat`, transform: "scale(1.04)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "clamp(100px,10vw,130px) clamp(16px,4vw,80px) clamp(60px,7vw,90px)", display: "flex", alignItems: "center", gap: "clamp(32px,4vw,72px)", flexWrap: "wrap" }}>
        {/* Left copy */}
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--p3)", marginBottom: 22, padding: "6px 14px", background: "rgba(255,87,34,.12)", borderRadius: 999, border: "1px solid rgba(255,181,160,.2)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--p3)" }} />Solo travel, reimagined
          </div>
          <h1 className="df" style={{ fontSize: "clamp(2rem,4.8vw,3.2rem)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.09, letterSpacing: "-.025em", color: "#fff", marginBottom: 20 }}>
            Trip planning that<br />
            <span style={{ color: "var(--p3)", fontStyle: "normal" }}>thinks the way you travel.</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,1.5vw,17px)", fontWeight: 300, lineHeight: 1.72, color: "var(--fm)", maxWidth: 460, marginBottom: 30 }}>
            Tell Atlas where you want to go. It builds a full itinerary around your style, your pace, and what you actually care about — not a one-size template.
          </p>
          {/* Search pill */}
          <div className="glass" style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(255,255,255,.1)", padding: "5px 5px 5px 16px", marginBottom: 18, maxWidth: 510, boxShadow: "0 20px 48px rgba(0,0,0,.45)" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--fd)" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Where are you headed?" style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 15, color: "var(--fg)", fontFamily: "'Manrope',sans-serif", padding: "10px 0" }} />
            <button className="bp" style={{ padding: "10px 20px", fontSize: 13, flexShrink: 0 }}>Start planning</button>
          </div>
          {/* CTA row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 18 }}>
            <button className="ba">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              Plan with chat
            </button>
            <a href="#hiw" className="bg">How it works ↓</a>
          </div>
          <div style={{ fontSize: 12, color: "var(--fd)", letterSpacing: ".04em" }}>1,200+ solo travelers · 47 countries · Free beta access</div>
        </div>
        {/* Chat demo */}
        <div style={{ flex: "0 0 clamp(260px,33vw,400px)" }}><ChatDemo /></div>
      </div>
      <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: .38, pointerEvents: "none", zIndex: 1 }}>
        <span style={{ fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", color: "#fff" }}>Scroll</span>
        <span style={{ fontSize: 17, color: "#fff", animation: "bob 1.8s ease infinite" }}>↓</span>
      </div>
    </section>
  );
}

/* ── FEATURES ────────────────────────────────────────────────── */
const FEATS = [
  { icon: "⏱", title: "Learns your travel style", body: "Tell it once — your pace, budget, and what you care about. Atlas builds every plan around that, not a generic average." },
  { icon: "🧍", title: "Made for one", body: "Solo-safe neighborhoods, single-room availability, and activities that work without a group. Built in, not bolted on." },
  { icon: "🗺", title: "Real places. No sponsored lists.", body: "Trained on real traveler communities, not tourist boards or paid placements. Expect places you won't find in a magazine." },
  { icon: "🔄", title: "Plans that flex as you do", body: "Change a day and everything adjusts. Your itinerary is a living document, not a PDF you'll ignore by day two." },
];

function FCard({ icon, title, body }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? "var(--ct)" : "var(--mu)", border: `1px solid ${h ? "rgba(255,255,255,.08)" : "transparent"}`, borderRadius: 16, padding: "clamp(22px,2.5vw,32px)", transition: "all .2s ease", transform: h ? "translateY(-4px)" : "none", height: "100%", display: "flex", flexDirection: "column", cursor: "default" }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: h ? "rgba(255,87,34,.2)" : "rgba(255,87,34,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 18, transition: "background .2s", flexShrink: 0 }}>{icon}</div>
      <h3 className="df" style={{ fontSize: 18, fontWeight: 600, color: "var(--fg)", marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--fm)", fontWeight: 300, flex: 1, margin: 0 }}>{body}</p>
      <div style={{ marginTop: 18, fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--fd)", opacity: h ? 1 : 0, transition: "opacity .2s" }}>Atlas intelligence</div>
    </div>
  );
}

function Features() {
  return (
    <section style={{ background: "var(--bg)", padding: "clamp(52px,7vw,100px) clamp(16px,4vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FU>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: "clamp(40px,5vw,68px)" }}>
            <div style={{ maxWidth: 540 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--a4)", marginBottom: 14 }}>Why it's different</div>
              <h2 className="df" style={{ fontSize: "clamp(1.5rem,3.2vw,2.6rem)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.15, color: "var(--fg)", marginBottom: 14 }}>Built around how solo travelers<br />actually travel.</h2>
              <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.72, color: "var(--fm)", maxWidth: 420, margin: 0 }}>We move beyond static lists to living plans. Atlas learns your pace, then adapts when the weather — or your curiosity — shifts.</p>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".25em", textTransform: "uppercase", color: "var(--a4)", opacity: .65 }}>01 / The advantage</div>
          </div>
        </FU>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(12px,1.5vw,18px)" }}>
          {FEATS.map((f, i) => <FU key={f.title} delay={i * 80}><FCard {...f} /></FU>)}
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ────────────────────────────────────────────── */
const STEPS = [
  { n: "01", e: "📌", title: "Tell Atlas what you want", body: "Destination, dates, travel style. Rough ideas are fine — Atlas asks follow-up questions to fill in the gaps." },
  { n: "02", e: "✨", title: "Get a full itinerary in seconds", body: "Flights, accommodation, daily routes, and local picks — all connected and tailored to how you travel." },
  { n: "03", e: "✏️", title: "Adjust anything, anytime", body: "Change one thing and Atlas reshuffles the rest. Your plan stays consistent even when your plans change." },
];

function HowItWorks() {
  const lr = useRef(null);
  useEffect(() => {
    const el = lr.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.width = "100%"; ob.disconnect(); } }, { threshold: .3 });
    ob.observe(el); return () => ob.disconnect();
  }, []);
  return (
    <section id="hiw" style={{ background: "var(--mu)", padding: "clamp(52px,7vw,100px) clamp(16px,4vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FU><div style={{ textAlign: "center", marginBottom: "clamp(40px,5vw,68px)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--a4)", marginBottom: 14 }}>Getting started</div>
          <h2 className="df" style={{ fontSize: "clamp(1.5rem,3.2vw,2.6rem)", fontStyle: "italic", fontWeight: 700, color: "var(--fg)" }}>Three steps from idea to itinerary.</h2>
        </div></FU>
        <div style={{ position: "relative" }}>
          {/* connector */}
          <div style={{ position: "absolute", top: 48, left: "17%", right: "17%", height: 1, background: "rgba(255,255,255,.06)" }}>
            <div ref={lr} style={{ height: "100%", background: "linear-gradient(90deg,var(--p5),var(--a5))", width: 0, transition: "width 1s ease .3s", borderRadius: 1 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(20px,3vw,40px)", position: "relative", zIndex: 1 }}>
            {STEPS.map((s, i) => (
              <FU key={s.n} delay={i * 130}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 8px" }}>
                  <div style={{ position: "relative", marginBottom: 18 }}>
                    <div className="df" style={{ fontSize: 72, fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,.04)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", userSelect: "none", whiteSpace: "nowrap" }}>{s.n}</div>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,.1)", background: "var(--ct)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, position: "relative", zIndex: 1 }}>{s.e}</div>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--fg)", marginBottom: 9, lineHeight: 1.35 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: "var(--fm)", margin: 0 }}>{s.body}</p>
                </div>
              </FU>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PRECISION ───────────────────────────────────────────────── */
const PP = [
  { title: "Terrain-aware routing", body: "Routes factor in elevation, trail conditions, and what's realistic for your timeline and fitness level." },
  { title: "Solo-first safety context", body: "Neighborhood safety scores, solo-friendly accommodation, and activities that don't require a partner. Always on." },
  { title: "Live itinerary sync", body: "Update one element — a flight, a hotel, an activity — and Atlas cascades the change through your whole trip." },
];

function Precision() {
  return (
    <section style={{ background: "var(--bg)", padding: "clamp(52px,7vw,100px) clamp(16px,4vw,80px)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,5vw,80px)", alignItems: "center" }}>
        <FU>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--a4)", marginBottom: 14 }}>Under the hood · 02</div>
          <h2 className="df" style={{ fontSize: "clamp(1.5rem,3.2vw,2.6rem)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.15, color: "var(--fg)", marginBottom: 20 }}>Planning intelligence,<br />not just planning.</h2>
          <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.72, color: "var(--fm)", marginBottom: 36, maxWidth: 430 }}>Atlas doesn't match keywords to templates. It reasons through your trip — terrain, season, solo safety, and pacing — to build something that actually works on the ground.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {PP.map(p => (
              <div key={p.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <span style={{ color: "var(--a4)", fontSize: 14, fontWeight: 700 }}>◇</span>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--fg)", marginBottom: 5 }}>{p.title}</div>
                  <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: "var(--fm)", margin: 0 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </FU>
        <FU delay={120}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -40, borderRadius: "50%", background: "rgba(38,198,218,.07)", filter: "blur(72px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", border: "1px solid rgba(255,255,255,.07)", boxShadow: "0 24px 60px rgba(0,0,0,.5)", aspectRatio: "4/3", background: "var(--ch)" }}>
              {/* Topo grid */}
              <div style={{ position: "absolute", inset: 0, opacity: .28, background: "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(38,198,218,.07) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(38,198,218,.07) 29px)" }} />
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .22 }} viewBox="0 0 400 300" fill="none">
                <path d="M40 200 Q100 140 160 180 Q220 220 280 160 Q330 110 380 140" stroke="#26c6da" strokeWidth="1.5" />
                <path d="M20 230 Q80 170 140 210 Q200 250 260 190 Q310 140 380 170" stroke="#26c6da" strokeWidth="1" />
                <path d="M60 160 Q120 100 180 150 Q240 190 300 130 Q350 80 395 110" stroke="#26c6da" strokeWidth="1.5" />
                <circle cx="200" cy="150" r="6" fill="#ff5722" opacity=".9" />
                <circle cx="200" cy="150" r="16" stroke="#ff5722" strokeWidth="1" opacity=".3" />
                <circle cx="200" cy="150" r="28" stroke="#ff5722" strokeWidth=".5" opacity=".15" />
              </svg>
              {/* Planner active badge */}
              <div className="glass" style={{ position: "absolute", top: 16, right: 16, border: "1px solid rgba(255,255,255,.1)", borderRadius: 11, padding: "7px 13px", display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--fg)" }}>Planner active</span>
              </div>
              {/* Confidence card */}
              <div className="glass" style={{ position: "absolute", bottom: 16, left: 16, right: 16, border: "1px solid rgba(255,255,255,.09)", borderRadius: 16, padding: "13px 17px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--fm)", marginBottom: 4 }}>Confidence</div>
                  <div className="df" style={{ fontSize: 21, color: "var(--fg)", fontWeight: 700 }}>High</div>
                </div>
                <div style={{ width: 1, height: 32, background: "rgba(255,255,255,.08)", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--fm)", marginBottom: 8 }}>Route synthesis</div>
                  <div style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: "72%", borderRadius: 99, background: "linear-gradient(90deg,var(--p5),var(--p3))" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FU>
      </div>
    </section>
  );
}

/* ── DESTINATIONS ────────────────────────────────────────────── */
const DESTS = [
  { name: "Patagonia", country: "Chile / Argentina", hook: "Where the wind writes your itinerary.", tags: ["Remote", "Trekking"], img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=70&auto=format&fit=crop" },
  { name: "Iceland", country: "Iceland", hook: "Fire, ice, and shoulder-season silence.", tags: ["Adventure", "Wild"], img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&q=70&auto=format&fit=crop" },
  { name: "Azores", country: "Portugal", hook: "Europe's volcanic secret. Still undiscovered.", tags: ["Island", "Authentic"], img: "https://images.unsplash.com/photo-1555629151-5abe5c6b0ad6?w=400&q=70&auto=format&fit=crop" },
  { name: "Scottish Highlands", country: "Scotland", hook: "Solitude with scenery you can't fake.", tags: ["Nature", "Slow travel"], img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70&auto=format&fit=crop" },
  { name: "Norwegian Fjords", country: "Norway", hook: "The world's best argument for slow travel.", tags: ["Fjords", "Scenic"], img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=70&auto=format&fit=crop" },
  { name: "New Zealand", country: "South Island", hook: "Adventure that needs no filter.", tags: ["Outdoors", "Epic"], img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=70&auto=format&fit=crop" },
  { name: "Costa Rica", country: "Central America", hook: "Dense jungle. Zero compromises on wildlife.", tags: ["Nature", "Bio"], img: "https://images.unsplash.com/photo-1518182170546-07661fd94144?w=400&q=70&auto=format&fit=crop" },
  { name: "Kyoto Backcountry", country: "Japan", hook: "Japan without the queues.", tags: ["Culture", "Off-grid"], img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=70&auto=format&fit=crop" },
];

function DCard({ d }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ flexShrink: 0, width: "clamp(220px,24vw,276px)", aspectRatio: "3/4", borderRadius: 18, overflow: "hidden", position: "relative", cursor: "pointer", border: "1px solid rgba(255,255,255,.07)", transition: "transform .25s,box-shadow .25s", transform: h ? "translateY(-6px)" : "none", boxShadow: h ? "0 24px 48px rgba(0,0,0,.55)" : "0 8px 22px rgba(0,0,0,.3)" }}>
      <div style={{ position: "absolute", inset: 0, background: `url('${d.img}') center/cover no-repeat`, transition: "transform .35s", transform: h ? "scale(1.07)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 22%,rgba(17,19,23,.58) 56%,rgba(17,19,23,.97) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 16px 16px" }}>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
          {d.tags.map(t => <span key={t} style={{ fontSize: 9, fontWeight: 700, color: "var(--fm)", background: "rgba(255,255,255,.1)", borderRadius: 4, padding: "3px 6px", letterSpacing: ".04em" }}>{t}</span>)}
        </div>
        <div className="df" style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 3 }}>{d.name}</div>
        <div style={{ fontSize: 10, color: "var(--fd)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 7 }}>{d.country}</div>
        <div className="df" style={{ fontSize: 12, fontStyle: "italic", color: "rgba(255,255,255,.58)", lineHeight: 1.45, marginBottom: 11 }}>"{d.hook}"</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--p3)", letterSpacing: ".04em", opacity: h ? 1 : 0, transform: h ? "translateY(0)" : "translateY(5px)", transition: "opacity .2s,transform .2s" }}>Plan this trip →</div>
      </div>
    </div>
  );
}

function Destinations() {
  return (
    <section style={{ background: "var(--mu)", padding: "clamp(52px,7vw,100px) 0", overflow: "hidden" }}>
      <FU>
        <div style={{ padding: "0 clamp(16px,4vw,80px)", marginBottom: 30 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 14 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--a4)", marginBottom: 12 }}>Explore</div>
              <h2 className="df" style={{ fontSize: "clamp(1.5rem,3.2vw,2.6rem)", fontStyle: "italic", fontWeight: 700, color: "var(--fg)" }}>Where solo travelers are going next.</h2>
            </div>
            <span style={{ fontSize: 12, color: "var(--fd)", letterSpacing: ".05em" }}>Swipe to explore →</span>
          </div>
        </div>
      </FU>
      <div className="sx" style={{ padding: "4px clamp(16px,4vw,80px) 24px", display: "flex", gap: 13 }}>
        {DESTS.map(d => <DCard key={d.name} d={d} />)}
      </div>
    </section>
  );
}

/* ── SOCIAL PROOF ────────────────────────────────────────────── */
function useCount(to, active, dec = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1800, s = performance.now();
    const f = n => { const p = Math.min((n - s) / dur, 1), e = 1 - Math.pow(1 - p, 3); setV(parseFloat((e * to).toFixed(dec))); if (p < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }, [active, to, dec]);
  return v;
}

function Stat({ to, sfx, lbl, dec = 0, delay = 0 }) {
  const r = useRef(null); const [a, setA] = useState(false);
  useEffect(() => { const el = r.current; const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setA(true), delay); ob.disconnect(); } }, { threshold: .3 }); ob.observe(el); return () => ob.disconnect(); }, [delay]);
  const v = useCount(to, a, dec);
  return (
    <div ref={r} style={{ textAlign: "center", padding: "0 clamp(12px,2vw,28px)" }}>
      <div className="df" style={{ fontSize: "clamp(2rem,4.5vw,2.8rem)", fontWeight: 700, lineHeight: 1, color: "#fff", marginBottom: 7 }}>{v}{sfx}</div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase", color: "var(--fm)" }}>{lbl}</div>
    </div>
  );
}

const TESTS = [
  { q: "I typed 'solo, Japan, 2 weeks, no tourist traps' and got the best itinerary I've ever used.", n: "Sofia M.", c: "Berlin" },
  { q: "It actually understands that solo travel is different — not just a group itinerary with one person removed.", n: "Tomás R.", c: "São Paulo" },
];

function SocialProof() {
  return (
    <section style={{ background: "var(--ct)", padding: "clamp(52px,7vw,100px) clamp(16px,4vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FU>
          <div style={{ textAlign: "center", marginBottom: 48, padding: "13px 20px", background: "rgba(255,87,34,.07)", border: "1px solid rgba(255,181,160,.14)", borderRadius: 14, fontSize: 14, color: "var(--fm)", lineHeight: 1.6 }}>
            <span style={{ color: "var(--p3)", fontWeight: 700 }}>Atlas is in beta.</span>{" "}Join 1,200+ solo explorers already planning smarter — in 47 countries.
          </div>
        </FU>
        <FU>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(20px,4vw,56px)", marginBottom: "clamp(48px,6vw,76px)", paddingBottom: "clamp(40px,5vw,60px)", borderBottom: "1px solid var(--bd)" }}>
            <Stat to={1200} sfx="+" lbl="Solo explorers" delay={0} />
            <Stat to={47} sfx="" lbl="Countries planned" delay={180} />
            <Stat to={4.2} sfx="h" lbl="Saved per trip" dec={1} delay={360} />
          </div>
        </FU>
        <FU>
          <div style={{ textAlign: "center", marginBottom: "clamp(34px,4vw,50px)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--a4)", marginBottom: 14 }}>Early access</div>
            <h2 className="df" style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", fontStyle: "italic", fontWeight: 700, color: "var(--fg)" }}>Trusted by travelers who plan differently.</h2>
          </div>
        </FU>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(14px,2vw,24px)" }}>
          {TESTS.map((t, i) => (
            <FU key={t.n} delay={i * 100}>
              <div style={{ background: "var(--mu)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 20, padding: "clamp(24px,3vw,36px)", position: "relative", overflow: "hidden" }}>
                <div className="df" aria-hidden style={{ position: "absolute", top: -8, left: 16, fontSize: 100, lineHeight: 1, color: "var(--p5)", opacity: .07, userSelect: "none", fontWeight: 700 }}>"</div>
                <blockquote className="df" style={{ fontSize: "clamp(14px,1.5vw,16px)", fontStyle: "italic", lineHeight: 1.62, color: "var(--fg)", marginBottom: 22, position: "relative", zIndex: 1 }}>"{t.q}"</blockquote>
                <footer style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,var(--p5),var(--a5))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.n[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--fg)" }}>{t.n}</div>
                    <div style={{ fontSize: 11, color: "var(--fm)" }}>{t.c}</div>
                  </div>
                </footer>
              </div>
            </FU>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ───────────────────────────────────────────────── */
function FinalCta() {
  const [q, setQ] = useState("");
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", overflow: "hidden", padding: "clamp(80px,9vw,130px) clamp(16px,4vw,80px)" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `linear-gradient(to bottom,rgba(17,19,23,.52) 0%,rgba(17,19,23,.88) 100%),url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80&auto=format&fit=crop') center/cover no-repeat` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(ellipse 60% 50% at 50% 30%,rgba(38,198,218,.06),transparent)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, width: "100%" }}>
        <FU>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--p3)", marginBottom: 20 }}>Start exploring</div>
          <h2 className="df" style={{ fontSize: "clamp(1.9rem,4.8vw,3.4rem)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.1, color: "#fff", marginBottom: 20, letterSpacing: "-.022em" }}>Your next trip starts<br />with one message.</h2>
          <p style={{ fontSize: "clamp(15px,1.6vw,17px)", fontWeight: 300, lineHeight: 1.72, color: "rgba(255,255,255,.56)", marginBottom: 38 }}>Describe where you want to go. Atlas handles the rest.</p>
          <div className="glass" style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(255,255,255,.12)", padding: "5px 5px 5px 20px", marginBottom: 16, boxShadow: "0 20px 48px rgba(0,0,0,.55)" }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Where are you headed?" style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 15, color: "var(--fg)", fontFamily: "'Manrope',sans-serif", padding: "10px 0" }} />
            <button className="bp" style={{ padding: "10px 20px", fontSize: 13, flexShrink: 0, boxShadow: "0 4px 28px rgba(255,87,34,.45)" }}>Start planning free</button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
            <a href="#hiw" className="bg" style={{ fontSize: 13 }}>See how it works</a>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.26)", letterSpacing: ".06em" }}>Beta access · No credit card · Cancel anytime</p>
        </FU>
      </div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--bd)", padding: "clamp(20px,3vw,36px) clamp(16px,4vw,80px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="20" height="20" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="11" stroke="#ff5722" strokeWidth="1.5" /><path d="M8 13h10M13 8v10" stroke="#ff5722" strokeWidth="1.5" strokeLinecap="round" /><circle cx="13" cy="13" r="2.5" fill="#ff5722" /></svg>
        <span className="df" style={{ fontWeight: 700, fontSize: 15, color: "var(--fm)" }}>Atlas</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--fd)" }}>Beta · Free access · 2026</div>
      <div style={{ fontSize: 12, color: "var(--fd)" }}>© 2026 Atlas AI</div>
    </footer>
  );
}

/* ── ROOT ────────────────────────────────────────────────────── */
export default function AtlasHomepage() {
  return (
    <>
      <G />
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <Nav />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Precision />
          <Destinations />
          <SocialProof />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
