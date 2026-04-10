import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Google Fonts ─────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary-500: #ff5722;
      --primary-400: #ff8f73;
      --primary-300: #ffb5a0;
      --primary-600: #e64a19;
      --aux-300: #7ee8fc;
      --aux-400: #4dd4e8;
      --aux-500: #26c6da;
      --surface-bg: #111317;
      --surface-muted: #1a1c20;
      --surface-container: #1e2024;
      --surface-container-high: #282a2e;
      --surface-border: #414754;
      --fg: #f1f2f6;
      --fg-muted: #9295aa;
      --fg-dim: #5a5d72;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Manrope', -apple-system, sans-serif;
      background: var(--surface-bg);
      color: var(--fg);
      -webkit-font-smoothing: antialiased;
    }

    .font-display { font-family: 'Noto Serif', Georgia, serif; }

    @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
    @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
    @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.45} }
    @keyframes bounce  { 0%,100%{transform:translateY(0)} 45%{transform:translateY(-6px)} }
    @keyframes drawLine{ from{width:0} to{width:100%} }
    @keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
    @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
    @keyframes spin    { to{transform:rotate(360deg)} }

    .fade-up { opacity:0; transform:translateY(28px); transition: opacity .55s ease, transform .55s ease; }
    .fade-up.in-view { opacity:1; transform:none; }

    .glass {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(17,19,23,.75);
    }

    .no-scroll { overflow: hidden; }
    .scroll-x { overflow-x:auto; overflow-y:hidden; }
    .scroll-x::-webkit-scrollbar { display:none; }

    .btn-primary {
      display:inline-flex; align-items:center; gap:8px;
      background:var(--primary-500); color:#fff;
      padding:14px 28px; border-radius:999px;
      font-family:'Manrope',sans-serif; font-weight:700; font-size:14px;
      border:none; cursor:pointer;
      transition: background .15s ease, transform .12s ease, box-shadow .15s ease;
      box-shadow: 0 4px 24px rgba(255,87,34,.35);
      white-space:nowrap;
    }
    .btn-primary:hover  { background:var(--primary-400); box-shadow:0 4px 28px rgba(255,87,34,.5); }
    .btn-primary:active { background:var(--primary-600); transform:scale(.98); }

    .btn-ghost {
      display:inline-flex; align-items:center; gap:8px;
      background:rgba(255,255,255,.08); color:#fff;
      padding:14px 24px; border-radius:999px;
      font-family:'Manrope',sans-serif; font-weight:600; font-size:14px;
      border:1px solid rgba(255,255,255,.18); cursor:pointer;
      transition: background .15s ease;
      white-space:nowrap;
    }
    .btn-ghost:hover { background:rgba(255,255,255,.14); }

    .btn-aux {
      display:inline-flex; align-items:center; gap:8px;
      background:var(--aux-500); color:#00363d;
      padding:14px 28px; border-radius:999px;
      font-family:'Manrope',sans-serif; font-weight:800; font-size:14px;
      border:none; cursor:pointer;
      transition: background .15s ease, transform .12s ease;
      box-shadow: 0 4px 24px rgba(38,198,218,.28);
      white-space:nowrap;
    }
    .btn-aux:hover  { background:var(--aux-400); }
    .btn-aux:active { transform:scale(.98); }

    @media (max-width:640px) {
      .hide-mobile { display:none !important; }
    }
    @media (min-width:641px) {
      .hide-desktop { display:none !important; }
    }
  `}</style>
);

/* ─── Helpers ──────────────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in-view"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useFadeUp();
  return (
    <div ref={ref} className="fade-up" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── NAV ───────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(16px,4vw,80px)",
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "background .3s ease, backdrop-filter .3s ease, border-color .3s ease",
      background: scrolled ? "rgba(17,19,23,.82)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="11" stroke="#ff5722" strokeWidth="1.5"/>
          <path d="M8 13h10M13 8v10" stroke="#ff5722" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="13" cy="13" r="2.5" fill="#ff5722"/>
        </svg>
        <span style={{ fontFamily:"'Noto Serif',serif", fontWeight:700, fontSize:18, color:"#fff", letterSpacing:"-.01em" }}>
          Atlas
        </span>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <a href="#how-it-works" className="hide-mobile" style={{
          color:"var(--fg-muted)", fontSize:13, fontWeight:500, textDecoration:"none",
          padding:"8px 14px", borderRadius:8,
          transition:"color .15s"
        }}
          onMouseOver={e=>e.target.style.color="#fff"}
          onMouseOut={e=>e.target.style.color="var(--fg-muted)"}
        >How it works</a>
        <button className="btn-primary" style={{ padding:"10px 20px", fontSize:13 }}>
          Start planning
        </button>
      </div>
    </nav>
  );
}

/* ─── AI CHAT DEMO ──────────────────────────────────────────── */
const FULL_MSG = "I want 10 days somewhere remote, lots of hiking, hot springs if possible. Going solo in September.";
const REPLY_LINES = [
  { icon: "📍", text: "Reykjavík → Highlands → Westfjords" },
  { icon: "🥾", text: "Landmannalaugar trek (3 days)" },
  { icon: "♨️", text: "Hot springs daily" },
  { icon: "🌿", text: "No crowds · ~$2,100 est." },
];

function AiChatDemo() {
  const [typed, setTyped] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTyped(FULL_MSG.slice(0, i));
      if (i >= FULL_MSG.length) {
        clearInterval(typeInterval);
        setTimeout(() => setThinking(true), 400);
        setTimeout(() => { setThinking(false); setShowReply(true); }, 2200);
      }
    }, 28);
    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (!showReply) return;
    let line = 0;
    const interval = setInterval(() => {
      line++;
      setVisibleLines(line);
      if (line >= REPLY_LINES.length) clearInterval(interval);
    }, 220);
    return () => clearInterval(interval);
  }, [showReply]);

  return (
    <div style={{
      background:"rgba(17,19,23,.88)",
      border:"1px solid rgba(255,255,255,.09)",
      borderRadius:20,
      padding:24,
      backdropFilter:"blur(24px)",
      WebkitBackdropFilter:"blur(24px)",
      boxShadow:"0 32px 64px rgba(0,0,0,.55)",
      minHeight:300,
    }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,.06)" }}>
        <div style={{
          width:36, height:36, borderRadius:"50%",
          background:"linear-gradient(135deg,#ff5722,#ff8f73)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:16
        }}>✦</div>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>Atlas</div>
          <div style={{ fontSize:11, color:"var(--fg-muted)", display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", display:"inline-block", animation:"pulse 2s infinite" }}/>
            Active
          </div>
        </div>
      </div>

      {/* User message */}
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:16 }}>
        <div style={{
          background:"var(--primary-500)", color:"#fff",
          borderRadius:"16px 16px 4px 16px",
          padding:"10px 14px", fontSize:13, lineHeight:1.55,
          maxWidth:"85%", fontWeight:500,
        }}>
          {typed}
          {typed.length < FULL_MSG.length && (
            <span style={{ animation:"blink 1s infinite", marginLeft:2, opacity:.9 }}>|</span>
          )}
        </div>
      </div>

      {/* Thinking */}
      {thinking && (
        <div style={{ display:"flex", gap:5, alignItems:"center", padding:"12px 16px", marginBottom:12 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              width:8, height:8, borderRadius:"50%", background:"var(--fg-muted)",
              display:"inline-block",
              animation:`bounce 1s ${i*180}ms infinite`
            }}/>
          ))}
          <span style={{ fontSize:12, color:"var(--fg-muted)", marginLeft:6 }}>Atlas is planning…</span>
        </div>
      )}

      {/* Reply */}
      {showReply && (
        <div style={{ animation:"fadeIn .35s ease" }}>
          <div style={{
            background:"var(--surface-container-high, #282a2e)",
            border:"1px solid rgba(255,255,255,.07)",
            borderRadius:"4px 16px 16px 16px",
            padding:"14px 16px",
            fontSize:13,
          }}>
            <div style={{ color:"var(--fg-muted)", fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:".12em", marginBottom:12 }}>
              Iceland · 10 days · September
            </div>
            {REPLY_LINES.map((l, i) => (
              i < visibleLines ? (
                <div key={i} style={{
                  display:"flex", gap:10, alignItems:"center",
                  marginBottom:8, animation:"fadeUp .3s ease",
                }}>
                  <span>{l.icon}</span>
                  <span style={{ color:"var(--fg)", fontSize:13 }}>{l.text}</span>
                </div>
              ) : null
            ))}
            {visibleLines >= REPLY_LINES.length && (
              <button style={{
                marginTop:12, width:"100%",
                background:"var(--primary-500)", color:"#fff",
                border:"none", borderRadius:10, padding:"10px 0",
                fontSize:13, fontWeight:700, cursor:"pointer",
                animation:"fadeUp .3s ease .1s both",
              }}>
                View full itinerary →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────────── */
function HeroSection() {
  const [query, setQuery] = useState("");

  const heroGradient = `
    linear-gradient(to bottom,
      rgba(17,19,23,.15) 0%,
      rgba(17,19,23,.30) 35%,
      rgba(17,19,23,.78) 65%,
      rgba(17,19,23,1)   100%
    )
  `;

  return (
    <section style={{
      position:"relative",
      minHeight:"min(100dvh, 920px)",
      display:"flex", flexDirection:"column", justifyContent:"center",
      overflow:"hidden",
    }}>
      {/* Background */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        background:`
          ${heroGradient},
          url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop') center/cover no-repeat
        `,
        transform:"scale(1.04)",
      }}/>

      {/* Content */}
      <div style={{
        position:"relative", zIndex:1,
        maxWidth:1200, margin:"0 auto", width:"100%",
        padding:"clamp(96px,10vw,128px) clamp(16px,4vw,80px) clamp(56px,6vw,80px)",
        display:"flex", alignItems:"center", gap:"clamp(32px,4vw,80px)",
        flexWrap:"wrap",
      }}>
        {/* Left */}
        <div style={{ flex:"1 1 360px", minWidth:0 }}>
          <div style={{
            display:"inline-block",
            fontSize:10, fontWeight:700, letterSpacing:".35em",
            textTransform:"uppercase", color:"var(--primary-300)",
            marginBottom:20,
            padding:"6px 14px",
            background:"rgba(255,87,34,.12)",
            borderRadius:999,
            border:"1px solid rgba(255,181,160,.2)",
          }}>
            Solo travel, reimagined
          </div>

          <h1 className="font-display" style={{
            fontSize:"clamp(2rem,5vw,3.25rem)",
            fontWeight:700, fontStyle:"italic",
            lineHeight:1.08, letterSpacing:"-.02em",
            color:"#fff", marginBottom:20,
          }}>
            Trip planning that<br/>
            <span style={{ color:"var(--primary-300)", fontStyle:"normal" }}>
              thinks the way you travel.
            </span>
          </h1>

          <p style={{
            fontSize:"clamp(15px,1.6vw,17px)", fontWeight:300,
            lineHeight:1.7, color:"var(--fg-muted)",
            maxWidth:460, marginBottom:32,
          }}>
            Tell Atlas where you want to go. It builds a full itinerary around
            your style, your pace, and what you actually care about — not a
            one-size template.
          </p>

          {/* Search pill */}
          <div className="glass" style={{
            display:"flex", alignItems:"center", gap:8,
            borderRadius:999, border:"1px solid rgba(255,255,255,.1)",
            padding:"6px 6px 6px 16px",
            marginBottom:20, maxWidth:520,
            boxShadow:"0 20px 50px rgba(0,0,0,.45)",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--fg-dim)" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Where are you headed?"
              style={{
                flex:1, background:"none", border:"none", outline:"none",
                fontSize:15, color:"var(--fg)",
                fontFamily:"'Manrope',sans-serif",
                padding:"10px 0",
              }}
            />
            <button className="btn-primary" style={{ padding:"11px 22px", fontSize:13, flexShrink:0 }}>
              Start planning
            </button>
          </div>

          {/* CTA row */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"center" }}>
            <button className="btn-aux">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Plan with chat
            </button>
            <a href="#how-it-works" className="btn-ghost" style={{ textDecoration:"none" }}>
              How it works ↓
            </a>
          </div>

          {/* Trust line */}
          <div style={{
            marginTop:20, fontSize:12, color:"var(--fg-dim)",
            letterSpacing:".04em",
          }}>
            1,200+ solo travelers · 47 countries · Free beta access
          </div>
        </div>

        {/* Right – Chat Demo */}
        <div style={{ flex:"0 0 clamp(280px,35vw,420px)", alignSelf:"center" }}
          className="hide-mobile">
          <AiChatDemo />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:4,
        opacity:.45, pointerEvents:"none", zIndex:1,
      }}>
        <span style={{ fontSize:9, letterSpacing:".25em", textTransform:"uppercase", color:"#fff" }}>Scroll</span>
        <span style={{ fontSize:18, color:"#fff", animation:"bounce 1.8s ease infinite" }}>↓</span>
      </div>
    </section>
  );
}

/* ─── FEATURES ──────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a9 9 0 1 0 0 18A9 9 0 0 0 12 2z"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Learns your travel style",
    body: "Tell it once — your pace, budget, and what you care about. Atlas builds every plan around that, not a generic average.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    title: "Made for one",
    body: "Solo-safe neighborhoods, single-room availability, and activities that work without a group. Built in, not bolted on.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M3 12h18M3 18h18"/><path d="M7 6V4M12 6V4M17 6V4"/>
      </svg>
    ),
    title: "Real places. No sponsored lists.",
    body: "Trained on real traveler communities, not tourist boards or paid placements. Expect places you won't find in a magazine.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v-1a8 8 0 0 1 16 0v1"/><path d="M2 12h2v4H2zm18 0h2v4h-2"/><path d="M12 19v2m-4-2h8"/>
      </svg>
    ),
    title: "Plans that flex as you do",
    body: "Change a day and everything adjusts. Your itinerary is a living document, not a PDF you'll ignore by day two.",
  },
];

function FeaturesSection() {
  return (
    <section style={{ background:"var(--surface-bg)", padding:"clamp(48px,7vw,96px) clamp(16px,4vw,80px)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeUp>
          <div style={{
            display:"flex", flexWrap:"wrap",
            justifyContent:"space-between", alignItems:"flex-end",
            gap:24, marginBottom:"clamp(40px,5vw,72px)",
          }}>
            <div style={{ maxWidth:560 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:".3em", textTransform:"uppercase", color:"var(--aux-400)", marginBottom:14 }}>
                Why it's different
              </div>
              <h2 className="font-display" style={{
                fontSize:"clamp(1.6rem,3.5vw,2.75rem)",
                fontStyle:"italic", fontWeight:700,
                lineHeight:1.15, color:"var(--fg)",
                marginBottom:14,
              }}>
                Built around how solo travelers<br className="hide-mobile"/> actually travel.
              </h2>
              <p style={{ fontSize:16, fontWeight:300, lineHeight:1.7, color:"var(--fg-muted)", maxWidth:440 }}>
                We move beyond static lists to living plans. Atlas learns your pace, then adapts when the weather — or your curiosity — shifts.
              </p>
            </div>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:".25em", textTransform:"uppercase", color:"var(--aux-400)", opacity:.7 }}>
              01 / The advantage
            </div>
          </div>
        </FadeUp>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))",
          gap:"clamp(12px,1.5vw,20px)",
        }}>
          {FEATURES.map((f, i) => (
            <FadeUp key={f.title} delay={i * 80}>
              <FeatureCard {...f} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, body }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--surface-container)" : "var(--surface-muted)",
        border: `1px solid ${hovered ? "rgba(255,255,255,.08)" : "transparent"}`,
        borderRadius:16, padding:"clamp(24px,2.5vw,36px)",
        transition:"background .2s ease, border-color .2s ease, transform .2s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        cursor:"default", height:"100%", boxSizing:"border-box",
        display:"flex", flexDirection:"column", gap:0,
      }}>
      <div style={{
        width:48, height:48, borderRadius:12,
        background: hovered ? "rgba(255,87,34,.18)" : "rgba(255,87,34,.1)",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"var(--primary-300)", marginBottom:20,
        transition:"background .2s ease",
      }}>
        {icon}
      </div>
      <h3 className="font-display" style={{
        fontSize:20, fontWeight:600, color:"var(--fg)", marginBottom:12, lineHeight:1.3,
      }}>
        {title}
      </h3>
      <p style={{ fontSize:14, lineHeight:1.65, color:"var(--fg-muted)", fontWeight:300, flex:1 }}>
        {body}
      </p>
      <div style={{
        marginTop:20, fontSize:10, fontWeight:700, letterSpacing:".2em",
        textTransform:"uppercase", color:"var(--fg-dim)",
        opacity: hovered ? 1 : 0, transition:"opacity .2s ease",
      }}>
        Atlas intelligence
      </div>
    </div>
  );
}

/* ─── HOW IT WORKS ──────────────────────────────────────────── */
const STEPS = [
  {
    num:"01",
    icon:(
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title:"Tell Atlas what you want",
    body:"Destination, dates, travel style. Rough ideas are fine — Atlas asks follow-up questions to fill in the gaps.",
  },
  {
    num:"02",
    icon:(
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title:"Get a full itinerary in seconds",
    body:"Flights, accommodation, daily routes, and local picks — all connected and tailored to how you travel.",
  },
  {
    num:"03",
    icon:(
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    title:"Adjust anything, anytime",
    body:"Change one thing and Atlas reshuffles the rest. Your plan stays consistent even when your plans change.",
  },
];

function HowItWorksSection() {
  const lineRef = useRef(null);
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.width = "100%";
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" style={{
      background:"var(--surface-muted)",
      padding:"clamp(48px,7vw,96px) clamp(16px,4vw,80px)",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:"clamp(40px,5vw,72px)" }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".3em", textTransform:"uppercase", color:"var(--aux-400)", marginBottom:14 }}>
              Getting started
            </div>
            <h2 className="font-display" style={{
              fontSize:"clamp(1.6rem,3.5vw,2.75rem)",
              fontStyle:"italic", fontWeight:700, color:"var(--fg)",
            }}>
              Three steps from idea to itinerary.
            </h2>
          </div>
        </FadeUp>

        {/* Steps */}
        <div style={{ position:"relative" }}>
          {/* Connector line */}
          <div className="hide-mobile" style={{
            position:"absolute", top:52, left:"16.5%", right:"16.5%",
            height:1,
            background:"rgba(255,255,255,.06)",
            zIndex:0,
          }}>
            <div ref={lineRef} style={{
              height:"100%",
              background:"linear-gradient(90deg, var(--primary-500), var(--aux-500))",
              width:0,
              transition:"width 1s ease .3s",
              borderRadius:1,
            }}/>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
            gap:"clamp(24px,3vw,40px)",
            position:"relative", zIndex:1,
          }}>
            {STEPS.map((s, i) => (
              <FadeUp key={s.num} delay={i * 130}>
                <StepCard {...s} />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ num, icon, title, body }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"0 8px" }}>
      {/* Number bg */}
      <div style={{ position:"relative", marginBottom:20 }}>
        <div className="font-display" style={{
          fontSize:80, fontWeight:700, lineHeight:1,
          color:"rgba(255,255,255,.045)",
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%)",
          userSelect:"none", pointerEvents:"none",
          whiteSpace:"nowrap",
        }}>
          {num}
        </div>
        <div style={{
          width:56, height:56, borderRadius:"50%",
          border:"1px solid rgba(255,255,255,.1)",
          background:"var(--surface-container)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"var(--aux-400)", position:"relative", zIndex:1,
        }}>
          {icon}
        </div>
      </div>
      <h3 style={{ fontSize:17, fontWeight:700, color:"var(--fg)", marginBottom:10, lineHeight:1.35 }}>
        {title}
      </h3>
      <p style={{ fontSize:14, fontWeight:300, lineHeight:1.65, color:"var(--fg-muted)" }}>
        {body}
      </p>
    </div>
  );
}

/* ─── PRECISION ─────────────────────────────────────────────── */
const PROOF_POINTS = [
  {
    title:"Terrain-aware routing",
    body:"Routes factor in elevation, trail conditions, and what's realistic for your timeline and fitness level.",
  },
  {
    title:"Solo-first safety context",
    body:"Neighborhood safety scores, solo-friendly accommodation, and activities that don't require a partner. Always on.",
  },
  {
    title:"Live itinerary sync",
    body:"Update one element — a flight, a hotel, an activity — and Atlas cascades the change through your whole trip.",
  },
];

function PrecisionSection() {
  return (
    <section style={{ background:"var(--surface-bg)", padding:"clamp(48px,7vw,96px) clamp(16px,4vw,80px)", overflow:"hidden" }}>
      <div style={{
        maxWidth:1200, margin:"0 auto",
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
        gap:"clamp(40px,5vw,80px)",
        alignItems:"center",
      }}>
        {/* Copy */}
        <FadeUp>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".3em", textTransform:"uppercase", color:"var(--aux-400)", marginBottom:14 }}>
              Under the hood · 02
            </div>
            <h2 className="font-display" style={{
              fontSize:"clamp(1.6rem,3.5vw,2.75rem)",
              fontStyle:"italic", fontWeight:700, lineHeight:1.15,
              color:"var(--fg)", marginBottom:20,
            }}>
              Planning intelligence,<br/>not just planning.
            </h2>
            <p style={{ fontSize:15, fontWeight:300, lineHeight:1.7, color:"var(--fg-muted)", marginBottom:36, maxWidth:440 }}>
              Atlas doesn't match keywords to templates. It reasons through your trip — terrain, season, solo safety, and pacing — to build something that actually works on the ground.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
              {PROOF_POINTS.map((p) => (
                <div key={p.title} style={{ display:"flex", gap:18, alignItems:"flex-start" }}>
                  <div style={{
                    width:40, height:40, borderRadius:"50%", flexShrink:0,
                    border:"1px solid var(--surface-border)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginTop:2,
                  }}>
                    <span style={{ color:"var(--aux-400)", fontSize:16, fontWeight:700 }}>◇</span>
                  </div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:700, color:"var(--fg)", marginBottom:6 }}>{p.title}</div>
                    <p style={{ fontSize:13, fontWeight:300, lineHeight:1.65, color:"var(--fg-muted)", margin:0 }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Demo panel */}
        <FadeUp delay={120}>
          <div style={{ position:"relative" }}>
            {/* Ambient glow */}
            <div style={{
              position:"absolute", inset:-40, borderRadius:"50%",
              background:"rgba(38,198,218,.07)", filter:"blur(72px)",
              pointerEvents:"none",
            }}/>
            <div style={{
              position:"relative",
              borderRadius:28,
              overflow:"hidden",
              border:"1px solid rgba(255,255,255,.07)",
              boxShadow:"0 24px 64px rgba(0,0,0,.5)",
              aspectRatio:"4/3",
              background:"var(--surface-container-high, #282a2e)",
            }}>
              {/* Topo map bg */}
              <div style={{
                position:"absolute", inset:0, opacity:.35,
                background:`
                  repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(38,198,218,.08) 29px),
                  repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(38,198,218,.08) 29px),
                  radial-gradient(ellipse 80% 60% at 60% 40%, rgba(38,198,218,.12), transparent)
                `,
              }}/>
              {/* SVG topo lines */}
              <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.2 }} viewBox="0 0 400 300" fill="none">
                <path d="M40 200 Q100 140 160 180 Q220 220 280 160 Q330 110 380 140" stroke="#26c6da" strokeWidth="1.5" fill="none"/>
                <path d="M20 230 Q80 170 140 210 Q200 250 260 190 Q310 140 380 170" stroke="#26c6da" strokeWidth="1" fill="none"/>
                <path d="M60 160 Q120 100 180 150 Q240 190 300 130 Q350 80 395 110" stroke="#26c6da" strokeWidth="1.5" fill="none"/>
                <circle cx="200" cy="150" r="6" fill="#ff5722" opacity=".9"/>
                <circle cx="200" cy="150" r="16" stroke="#ff5722" strokeWidth="1" opacity=".3"/>
                <circle cx="200" cy="150" r="28" stroke="#ff5722" strokeWidth=".5" opacity=".15"/>
              </svg>

              {/* Status badge */}
              <div className="glass" style={{
                position:"absolute", top:18, right:18,
                border:"1px solid rgba(255,255,255,.1)",
                borderRadius:12, padding:"8px 14px",
                display:"flex", alignItems:"center", gap:8,
              }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", animation:"pulse 2s infinite" }}/>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"var(--fg)" }}>
                  Planner active
                </span>
              </div>

              {/* Confidence card */}
              <div className="glass" style={{
                position:"absolute", bottom:18, left:18, right:18,
                border:"1px solid rgba(255,255,255,.09)",
                borderRadius:18, padding:"16px 20px",
                display:"flex", alignItems:"center", gap:20,
                flexWrap:"wrap",
              }}>
                <div style={{ flexShrink:0 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"var(--fg-muted)", marginBottom:4 }}>
                    Confidence
                  </div>
                  <div className="font-display" style={{ fontSize:22, color:"var(--fg)", fontWeight:700 }}>High</div>
                </div>
                <div style={{ width:1, height:36, background:"rgba(255,255,255,.08)", flexShrink:0 }}/>
                <div style={{ flex:1, minWidth:120 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"var(--fg-muted)", marginBottom:8 }}>
                    Route synthesis
                  </div>
                  <div style={{ height:5, borderRadius:99, background:"rgba(255,255,255,.08)", overflow:"hidden" }}>
                    <div style={{
                      height:"100%", width:"72%", borderRadius:99,
                      background:"linear-gradient(90deg, var(--primary-500), var(--primary-300))",
                    }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── DESTINATIONS ──────────────────────────────────────────── */
const DESTINATIONS = [
  { name:"Patagonia", country:"Chile / Argentina", hook:"Where the wind writes your itinerary.", tags:["Remote","Trekking"],    color:"#1a2c2a" },
  { name:"Iceland",   country:"Iceland",           hook:"Fire, ice, and shoulder-season silence.", tags:["Adventure","Wild"], color:"#1a1f2c" },
  { name:"Azores",    country:"Portugal",          hook:"Europe's volcanic secret. Still undiscovered.", tags:["Island","Authentic"], color:"#1a2618" },
  { name:"Scottish Highlands", country:"Scotland", hook:"Solitude with scenery you can't fake.", tags:["Nature","Slow travel"], color:"#1c1e2a" },
  { name:"Norwegian Fjords", country:"Norway",    hook:"The world's best argument for slow travel.", tags:["Fjords","Scenic"], color:"#141d26" },
  { name:"New Zealand South Island", country:"New Zealand", hook:"Adventure that needs no filter.", tags:["Outdoors","Epic"], color:"#1a2416" },
  { name:"Costa Rica", country:"Costa Rica",      hook:"Dense jungle. Zero compromises on wildlife.", tags:["Nature","Bio"], color:"#161f18" },
  { name:"Kyoto Backcountry", country:"Japan",    hook:"Japan without the queues.", tags:["Culture","Off-grid"], color:"#22181a" },
];

const DEST_IMAGES = [
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555629151-5abe5c6b0ad6?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518182170546-07661fd94144?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=75&auto=format&fit=crop",
];

function DestinationsSection() {
  return (
    <section style={{ background:"var(--surface-muted)", padding:"clamp(48px,7vw,96px) 0", overflow:"hidden" }}>
      <FadeUp>
        <div style={{ padding:"0 clamp(16px,4vw,80px)", marginBottom:36 }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end", gap:16 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:".3em", textTransform:"uppercase", color:"var(--aux-400)", marginBottom:12 }}>
                Explore
              </div>
              <h2 className="font-display" style={{
                fontSize:"clamp(1.6rem,3.5vw,2.75rem)",
                fontStyle:"italic", fontWeight:700, color:"var(--fg)",
              }}>
                Where solo travelers are going next.
              </h2>
            </div>
            <span style={{ fontSize:12, color:"var(--fg-dim)", letterSpacing:".05em" }}>
              Swipe to explore →
            </span>
          </div>
        </div>
      </FadeUp>

      {/* Scroll strip */}
      <div className="scroll-x" style={{
        padding:"4px clamp(16px,4vw,80px) 24px",
        display:"flex", gap:16,
        cursor:"grab",
      }}>
        {DESTINATIONS.map((d, i) => (
          <DestCard key={d.name} dest={d} img={DEST_IMAGES[i]} />
        ))}
      </div>
    </section>
  );
}

function DestCard({ dest, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink:0,
        width:"clamp(240px,28vw,300px)",
        aspectRatio:"3/4",
        borderRadius:20,
        overflow:"hidden",
        position:"relative",
        cursor:"pointer",
        border:"1px solid rgba(255,255,255,.07)",
        transition:"transform .25s ease, box-shadow .25s ease",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "none",
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,.55)" : "0 8px 24px rgba(0,0,0,.3)",
      }}
    >
      {/* Image */}
      <div style={{
        position:"absolute", inset:0,
        background:`url('${img}') center/cover no-repeat, ${dest.color}`,
        transition:"transform .35s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}/>
      {/* Gradient */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to bottom, transparent 25%, rgba(17,19,23,.6) 60%, rgba(17,19,23,.96) 100%)",
      }}/>
      {/* Content */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 20px 20px" }}>
        {/* Tags */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
          {dest.tags.map(t => (
            <span key={t} style={{
              fontSize:10, fontWeight:600, color:"var(--fg-muted)",
              background:"rgba(255,255,255,.1)", borderRadius:4,
              padding:"3px 8px", letterSpacing:".04em",
            }}>{t}</span>
          ))}
        </div>
        <div className="font-display" style={{ fontSize:20, fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:4 }}>
          {dest.name}
        </div>
        <div style={{ fontSize:11, color:"var(--fg-dim)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:8 }}>
          {dest.country}
        </div>
        <div className="font-display" style={{
          fontSize:13, fontStyle:"italic", color:"rgba(255,255,255,.65)", lineHeight:1.45,
          marginBottom:14,
        }}>
          "{dest.hook}"
        </div>
        <div style={{
          fontSize:12, fontWeight:700, color:"var(--primary-300)",
          letterSpacing:".05em",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition:"opacity .2s ease, transform .2s ease",
        }}>
          Plan this trip →
        </div>
      </div>
    </div>
  );
}

/* ─── SOCIAL PROOF ──────────────────────────────────────────── */
function useCounter(target, active, decimals = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((ease * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, decimals]);
  return val;
}

function StatBlock({ to, suffix, label, decimals = 0, delay = 0 }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setActive(true), delay); obs.disconnect(); } }, { threshold: .3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  const val = useCounter(to, active, decimals);
  return (
    <div ref={ref} style={{ textAlign:"center", padding:"0 16px" }}>
      <div className="font-display" style={{
        fontSize:"clamp(2.2rem,5vw,3rem)", fontWeight:700, lineHeight:1,
        color:"#fff", marginBottom:6,
      }}>
        {val}{suffix}
      </div>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:".25em", textTransform:"uppercase", color:"var(--fg-muted)" }}>
        {label}
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    quote:"I typed 'solo, Japan, 2 weeks, no tourist traps' and got the best itinerary I've ever used.",
    name:"Sofia M.",
    city:"Berlin",
  },
  {
    quote:"It actually understands that solo travel is different — not just a group itinerary with one person removed.",
    name:"Tomás R.",
    city:"São Paulo",
  },
];

function SocialProofSection() {
  return (
    <section style={{ background:"var(--surface-container)", padding:"clamp(48px,7vw,96px) clamp(16px,4vw,80px)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>

        {/* Beta banner */}
        <FadeUp>
          <div style={{
            textAlign:"center", marginBottom:56,
            padding:"16px 24px",
            background:"rgba(255,87,34,.07)",
            border:"1px solid rgba(255,181,160,.15)",
            borderRadius:16,
            fontSize:14, color:"var(--fg-muted)", fontWeight:400, lineHeight:1.6,
          }}>
            <span style={{ color:"var(--primary-300)", fontWeight:700 }}>Atlas is in beta.</span>
            {" "}Join 1,200+ solo explorers already planning smarter — in 47 countries.
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp>
          <div style={{
            display:"flex", flexWrap:"wrap", justifyContent:"center",
            gap:"clamp(24px,4vw,60px)", marginBottom:"clamp(48px,6vw,80px)",
            paddingBottom:"clamp(40px,5vw,64px)",
            borderBottom:"1px solid var(--surface-border)",
          }}>
            <StatBlock to={1200} suffix="+" label="Solo explorers" delay={0} />
            <StatBlock to={47} suffix="" label="Countries planned" delay={180} />
            <StatBlock to={4.2} suffix="h" label="Saved per trip" decimals={1} delay={360} />
          </div>
        </FadeUp>

        {/* Heading */}
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:"clamp(36px,4vw,56px)" }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".3em", textTransform:"uppercase", color:"var(--aux-400)", marginBottom:14 }}>
              Early access
            </div>
            <h2 className="font-display" style={{
              fontSize:"clamp(1.5rem,3vw,2.5rem)",
              fontStyle:"italic", fontWeight:700, color:"var(--fg)",
            }}>
              Trusted by travelers who plan differently.
            </h2>
          </div>
        </FadeUp>

        {/* Testimonials */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:"clamp(16px,2vw,28px)",
        }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 100}>
              <TestimonialCard {...t} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, city }) {
  return (
    <div style={{
      background:"var(--surface-muted)",
      border:"1px solid rgba(255,255,255,.06)",
      borderRadius:20, padding:"clamp(28px,3vw,40px)",
      position:"relative", overflow:"hidden",
    }}>
      {/* Decorative quote */}
      <div className="font-display" aria-hidden style={{
        position:"absolute", top:-10, left:20,
        fontSize:120, lineHeight:1, color:"var(--primary-500)",
        opacity:.07, userSelect:"none", pointerEvents:"none",
        fontWeight:700,
      }}>
        "
      </div>
      <blockquote className="font-display" style={{
        fontSize:"clamp(15px,1.6vw,18px)",
        fontStyle:"italic", fontWeight:400,
        lineHeight:1.6, color:"var(--fg)",
        marginBottom:28, position:"relative", zIndex:1,
      }}>
        "{quote}"
      </blockquote>
      <footer style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{
          width:36, height:36, borderRadius:"50%",
          background:"linear-gradient(135deg, var(--primary-500), var(--aux-500))",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:14, fontWeight:700, color:"#fff", flexShrink:0,
        }}>
          {name[0]}
        </div>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:"var(--fg)" }}>{name}</div>
          <div style={{ fontSize:12, color:"var(--fg-muted)" }}>{city}</div>
        </div>
      </footer>
    </div>
  );
}

/* ─── FINAL CTA ─────────────────────────────────────────────── */
function FinalCtaSection() {
  const [query, setQuery] = useState("");
  return (
    <section style={{
      position:"relative",
      minHeight:"min(100dvh,860px)",
      display:"flex", flexDirection:"column",
      justifyContent:"center", alignItems:"center",
      textAlign:"center",
      overflow:"hidden",
      padding:"clamp(64px,8vw,120px) clamp(16px,4vw,80px)",
    }}>
      {/* Background */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        background:`
          linear-gradient(to bottom, rgba(17,19,23,.6) 0%, rgba(17,19,23,.88) 100%),
          url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80&auto=format&fit=crop') center/cover no-repeat
        `,
      }}/>

      {/* Star shimmer overlay */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        background:"radial-gradient(ellipse 60% 50% at 50% 30%, rgba(38,198,218,.06), transparent)",
        pointerEvents:"none",
      }}/>

      <div style={{ position:"relative", zIndex:1, maxWidth:640, width:"100%" }}>
        <FadeUp>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:".35em", textTransform:"uppercase", color:"var(--primary-300)", marginBottom:20 }}>
            Start exploring
          </div>
          <h2 className="font-display" style={{
            fontSize:"clamp(2rem,5vw,3.5rem)",
            fontStyle:"italic", fontWeight:700,
            lineHeight:1.1, color:"#fff",
            marginBottom:20, letterSpacing:"-.02em",
          }}>
            Your next trip starts<br/>with one message.
          </h2>
          <p style={{
            fontSize:"clamp(15px,1.7vw,18px)", fontWeight:300,
            lineHeight:1.7, color:"rgba(255,255,255,.6)",
            marginBottom:40,
          }}>
            Describe where you want to go.<br className="hide-mobile"/>Atlas handles the rest.
          </p>

          {/* Inline search pill */}
          <div className="glass" style={{
            display:"flex", alignItems:"center", gap:8,
            borderRadius:999, border:"1px solid rgba(255,255,255,.12)",
            padding:"6px 6px 6px 20px",
            marginBottom:20,
            boxShadow:"0 20px 50px rgba(0,0,0,.55)",
          }}>
            <input
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder="Where are you headed?"
              style={{
                flex:1, background:"none", border:"none", outline:"none",
                fontSize:15, color:"var(--fg)",
                fontFamily:"'Manrope',sans-serif",
                padding:"10px 0",
              }}
            />
            <button className="btn-primary" style={{ padding:"11px 24px", fontSize:13, flexShrink:0 }}>
              Start planning free
            </button>
          </div>

          {/* Ghost CTA */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
            <a href="#how-it-works" className="btn-ghost" style={{ textDecoration:"none", fontSize:13 }}>
              See how it works
            </a>
          </div>

          {/* Trust line */}
          <p style={{ fontSize:12, color:"rgba(255,255,255,.3)", letterSpacing:".06em" }}>
            Beta access · No credit card · Cancel anytime
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background:"var(--surface-bg)",
      borderTop:"1px solid var(--surface-border)",
      padding:"clamp(24px,3vw,40px) clamp(16px,4vw,80px)",
      display:"flex", flexWrap:"wrap",
      justifyContent:"space-between", alignItems:"center",
      gap:16,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="11" stroke="#ff5722" strokeWidth="1.5"/>
          <path d="M8 13h10M13 8v10" stroke="#ff5722" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="13" cy="13" r="2.5" fill="#ff5722"/>
        </svg>
        <span style={{ fontFamily:"'Noto Serif',serif", fontWeight:700, fontSize:15, color:"var(--fg-muted)" }}>Atlas</span>
      </div>
      <div style={{ fontSize:12, color:"var(--fg-dim)", letterSpacing:".04em" }}>
        Beta · No credit card · Cancel anytime
      </div>
      <div style={{ fontSize:12, color:"var(--fg-dim)" }}>© 2026 Atlas AI</div>
    </footer>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <FontLoader />
      <div style={{ background:"var(--surface-bg)", minHeight:"100vh" }}>
        <Nav />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <PrecisionSection />
          <DestinationsSection />
          <SocialProofSection />
          <FinalCtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
