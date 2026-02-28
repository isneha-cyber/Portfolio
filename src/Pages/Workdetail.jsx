import { useEffect, useRef } from "react";

const PROJECT_DATA = {
  title: "AWARDCO",
  category: "WEBSITE DEVELOPMENT",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  visitUrl: "https://awardco.com",
  about: `Awardco is a leading employee recognition platform built to create meaningful moments at work. We partnered with their team to craft a high-performance digital experience that communicates the power of recognition through clean, intentional design.`,
  members: [
    { name: "Nico Menezes", handle: "@nicomenezes", role: "Art Direction" },
    { name: "Beto Oliveira", handle: "@BetoOliveira", role: "Development" },
    { name: "Design Team", handle: "@designteam", role: "UI/UX Design" },
  ],
  images: [
    "https://picsum.photos/seed/awardco1/1400/900",
    "https://picsum.photos/seed/awardco2/1400/900",
    "https://picsum.photos/seed/awardco3/1400/900",
    "https://picsum.photos/seed/awardco4/1400/900",
  ],
  testimonials: [
    {
      quote: "Awardco's fast, compassionate service ensured an employee received a much-needed gift card in time for a personal purchase.",
      author: "Stacey O'Neil",
      role: "HR Specialist",
    },
    {
      quote: "Thanks to the Awardco Center of Excellence, we now have a strong thought partner that shares our vision.",
      author: "Sarah Mazzocco",
      role: "Chief People Officer",
    },
    {
      quote: "Recognizing your team members is a great way to build merit. To get people to stay, you have to take care of them.",
      author: "Rafael Bezerra",
      role: "Manager, Automation Ops",
    },
  ],
};

function useGSAP(cb) {
  useEffect(() => {
    const s1 = document.createElement("script");
    const s2 = document.createElement("script");
    s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
    s1.onload = () => {
      document.head.appendChild(s2);
      s2.onload = () => {
        const gsap = window.gsap;
        const ST = window.ScrollTrigger;
        gsap.registerPlugin(ST);
        cb(gsap, ST);
      };
    };
    document.head.appendChild(s1);
  }, []);
}

export default function WorkDetail() {
  const heroTitleRef = useRef(null);
  const sidebarRef = useRef(null);
  const galleryRef = useRef(null);
  const nextRef = useRef(null);

  useGSAP((gsap, ST) => {
    gsap.fromTo(heroTitleRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.2 }
    );
    gsap.fromTo(sidebarRef.current?.querySelectorAll(".gsap-stagger"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.5 }
    );
    galleryRef.current?.querySelectorAll(".gsap-img").forEach((el) => {
      gsap.fromTo(el,
        { yPercent: 8, opacity: 0, scale: 1.04 },
        { yPercent: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
      );
    });
    galleryRef.current?.querySelectorAll(".gsap-text").forEach((el) => {
      gsap.fromTo(el,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }
      );
    });
    if (nextRef.current) {
      gsap.fromTo(nextRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: nextRef.current, start: "top 90%", toggleActions: "play none none none" } }
      );
    }
    return () => ST.getAll().forEach((t) => t.kill());
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ede8", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
        .font-display { font-family: 'Playfair Display', serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
        .video-container video { filter: grayscale(100%); transition: filter 0.8s ease; }
        .video-container:hover video { filter: grayscale(0%); }
        .img-hover { filter: grayscale(75%); transform: scale(1.03); transition: filter 0.7s ease, transform 0.7s ease; }
        .img-hover:hover { filter: grayscale(0%); transform: scale(1); }
        .link-line { position: relative; display: inline-flex; align-items: center; gap: 6px; }
        .link-line::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #f0ede8; transition: width 0.4s ease; }
        .link-line:hover::after { width: 100%; }
        .next-hover .next-title { transition: transform 0.7s cubic-bezier(.22,1,.36,1); display: inline-block; }
        .next-hover:hover .next-title { transform: scale(1.05) translateY(-4px); }

        /* ── Fixed grid lines ── */
        .grid-lines {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 0;
          display: grid; grid-template-columns: repeat(9, 1fr);
        }
        .grid-line { border-right: 1px solid rgba(240,237,232,0.04); height: 100%; }

        @media (max-width: 639px) {
          .grid-lines { grid-template-columns: repeat(4, 1fr); }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .grid-lines { grid-template-columns: repeat(6, 1fr); }
        }
        @media (max-width: 1023px) {
          .sidebar-el { border-bottom: 1px solid rgba(240,237,232,0.08) !important; }
          .img-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 1024px) {
          .main-layout { flex-direction: row !important; }
          .sidebar-el {
            width: 38% !important;
            height: 100vh !important;
            position: sticky !important;
            top: 0 !important;
            border-right: 1px solid rgba(240,237,232,0.07) !important;
          }
          .content-el { width: 62% !important; }
        }
      `}</style>

      {/* Fixed grid lines behind everything */}
      <div className="grid-lines">
        {[...Array(9)].map((_, i) => <div key={i} className="grid-line" />)}
      </div>

      {/* Split layout */}
      <main className="main-layout" style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>

        {/* ─── LEFT SIDEBAR ─── */}
        <aside
          ref={sidebarRef}
          className="sidebar-el"
          style={{ width: "100%", padding: "clamp(2rem, 5vw, 5rem)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem" }}
        >
          <div>
            {/* Logo mark */}
            <div className="gsap-stagger" style={{ marginBottom: "3rem" }}>
              <div style={{ width: 36, height: 36, background: "#f0ede8", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 16, height: 16, border: "2.5px solid #0a0a0a", transform: "rotate(45deg)" }} />
              </div>
            </div>

            {/* Title */}
            <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
              <h1 ref={heroTitleRef} className="font-display"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 0.92, color: "#f0ede8" }}>
                {PROJECT_DATA.title}
              </h1>
            </div>

            {/* Category + Visit */}
            <div className="gsap-stagger" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
              <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "rgba(240,237,232,0.35)", textTransform: "uppercase" }}>
                {PROJECT_DATA.category}
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(240,237,232,0.08)" }} />
              <a href={PROJECT_DATA.visitUrl} target="_blank" rel="noopener noreferrer"
                className="link-line font-mono"
                style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,237,232,0.5)", textDecoration: "none" }}>
                VISIT SITE
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            {/* About */}
            <p className="gsap-stagger"
              style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", color: "rgba(240,237,232,0.6)", lineHeight: 1.75, marginBottom: "3rem", maxWidth: 420 }}>
              {PROJECT_DATA.about}
            </p>

            {/* Team */}
            <div className="gsap-stagger">
              <p className="font-mono" style={{
                fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(240,237,232,0.25)",
                textTransform: "uppercase", marginBottom: "1rem",
                paddingTop: "2rem", borderTop: "1px solid rgba(240,237,232,0.07)"
              }}>Team</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {PROJECT_DATA.members.map((m) => (
                  <li key={m.handle} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 500 }}>{m.name}</p>
                      <p className="font-mono" style={{ fontSize: "0.65rem", color: "rgba(240,237,232,0.3)", marginTop: 2 }}>{m.handle}</p>
                    </div>
                    <span className="font-mono" style={{ fontSize: "0.62rem", color: "rgba(240,237,232,0.25)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom: socials + visit */}
          <div className="gsap-stagger" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "1.2rem" }}>
              {[
                <path key="tw" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
                <g key="li"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></g>,
              ].map((paths, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(240,237,232,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ cursor: "pointer", transition: "stroke 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.stroke = "#f0ede8"}
                  onMouseLeave={e => e.currentTarget.style.stroke = "rgba(240,237,232,0.3)"}>
                  {paths}
                </svg>
              ))}
            </div>
            <a href={PROJECT_DATA.visitUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.6rem 1.2rem", border: "1px solid rgba(240,237,232,0.15)", borderRadius: 100, fontSize: "0.7rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", color: "rgba(240,237,232,0.6)", transition: "border-color 0.3s, color 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(240,237,232,0.5)"; e.currentTarget.style.color = "#f0ede8"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,237,232,0.15)"; e.currentTarget.style.color = "rgba(240,237,232,0.6)"; }}>
              Visit Website
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </aside>

        {/* ─── RIGHT CONTENT ─── */}
        <section ref={galleryRef} className="content-el"
          style={{ width: "100%", padding: "clamp(1rem, 3vw, 2.5rem)", display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vw, 1.5rem)" }}>

          {/* VIDEO */}
          <div className="video-container gsap-img"
            style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#111", aspectRatio: "16/9" }}>
            <video autoPlay muted loop playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
              <source src={PROJECT_DATA.videoUrl} type="video/mp4" />
            </video>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.6))", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "1.2rem", left: "1.4rem" }}>
              <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.4)" }}>
                Project Overview — 2024
              </span>
            </div>
          </div>

          {/* IMAGES — 2×2 grid */}
          <div className="gsap-img img-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(0.5rem, 1.2vw, 1rem)" }}>
            {PROJECT_DATA.images.map((src, i) => (
              <div key={i}
                style={{ position: "relative", borderRadius: 10, overflow: "hidden", background: "#111", aspectRatio: "4/3" }}>
                <img
                  src={src}
                  alt={`Project view ${i + 1}`}
                  className="img-hover"
                  referrerPolicy="no-referrer"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* counter badge */}
                <div style={{ position: "absolute", bottom: "0.8rem", right: "0.9rem" }}>
                  <span className="font-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.14em", color: "rgba(240,237,232,0.3)", textTransform: "uppercase" }}>
                    {String(i + 1).padStart(2, "0")} / {String(PROJECT_DATA.images.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>

       

        </section>
      </main>

      {/* ─── NEXT PROJECT — full bleed, outside split layout ─── */}
      <div ref={nextRef} className="next-hover"
        style={{ position: "relative", zIndex: 1, overflow: "hidden", background: "#0d0d0d", cursor: "pointer", borderTop: "1px solid rgba(240,237,232,0.07)" }}>

        {/* bg image */}
        <img
          src="https://picsum.photos/seed/next/1920/1080?blur=5"
          alt=""
          referrerPolicy="no-referrer"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15, filter: "grayscale(70%)", transition: "opacity 0.8s ease, filter 0.8s ease" }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.35"; e.currentTarget.style.filter = "grayscale(0%)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "0.15"; e.currentTarget.style.filter = "grayscale(70%)"; }}
        />

        {/* vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(6rem, 18vw, 14rem) 2rem", textAlign: "center" }}>

          <span className="font-mono"
            style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)", marginBottom: "1.2rem", display: "block" }}>
            Next Project
          </span>

          <h2 className="next-title font-display"
            style={{ fontSize: "clamp(5rem, 14vw, 13rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.86, color: "#f0ede8" }}>
            ASSISTIQ
          </h2>

          <div style={{ marginTop: "2.5rem" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontSize: "0.68rem", fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(240,237,232,0.45)",
              border: "1px solid rgba(240,237,232,0.18)",
              padding: "0.6rem 1.4rem", borderRadius: 100,
            }}>
              View Project
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}