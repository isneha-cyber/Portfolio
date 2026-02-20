import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: 'Arca',
    category: 'Webflow Development',
    year: '2025',
    imageUrl: 'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/69246c44cdcca41f4ddecbd1_Frame%201707479277.avif',
    videoUrl: 'https://cdn.prod.website-files.com/6698059876092bcd6352569a%2F69246ab17fc99c335e6c2d6c_Arca_mp4.mp4',
    link: '/projects/arca',
  },
  {
    id: 2,
    title: 'Uncaged',
    category: 'Webflow Development',
    year: '2024',
    imageUrl: 'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/670ef78f27e2a9b2549e2f5d_Placeholder%20Image.avif',
    videoUrl: 'https://cdn.prod.website-files.com/6698059876092bcd6352569a%2F6736063a11336ce82a08c56e_copy_1A7BA9A6-6757-4B3E-AF2C-31A608A520C4-transcode.mp4',
    link: '/projects/uncaged',
  },
  {
    id: 3,
    title: 'Cadie',
    category: 'Webflow Development',
    year: '2024',
    imageUrl: 'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/669ee576a05e890caf24b147_DSC_9785-1.avif',
    videoUrl: 'https://cdn.prod.website-files.com/6698059876092bcd6352569a%2F66eb1e4cc7576bb27dd9883b_copy_633FE69F-114F-4AF5-BDD7-D9ACA48E5156%20%281%29-transcode.mp4',
    link: '/projects/cadie',
  },
];

const About = () => {
  const wrapperRef      = useRef(null);
  const aboutRef        = useRef(null);
  const projectsRef     = useRef(null);
  const clipRefs        = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 0px)', () => {
      // ── Give ScrollTrigger a clean slate ──
      ScrollTrigger.getAll().forEach(t => t.kill());

      const vh = window.innerHeight;
      const totalProjectsHeight = projectsRef.current.offsetHeight; // 3 × 100vh

      // ─────────────────────────────────────────────────────
      // ARCHITECTURE FIX:
      // The old code used a y:'100vh' transform on the projects
      // section and ALSO tried to use ScrollTrigger on the child
      // slides. This breaks because ScrollTrigger measures DOM
      // positions (getBoundingClientRect) BEFORE the CSS transform
      // is applied, so every trigger fires at the wrong time.
      //
      // SOLUTION: Remove the slide-up transform entirely.
      // Instead, stack the projects section directly after the
      // about section using position:sticky on the about section.
      // Each project card reveals via clip-path, sequenced so
      // one card per viewport-height of scroll.
      // ─────────────────────────────────────────────────────

      // Reset any stray transform on the projects section
      gsap.set(projectsRef.current, { y: 0, clearProps: 'transform' });

      // ── 1. PIN ABOUT SECTION ──────────────────────────────
      // Pin the about section while we scroll through all 3 projects.
      // pinSpacing:false so the projects section sits right underneath.
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top top',
        end: `+=${totalProjectsHeight}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // ── 2. CLIP-PATH REVEAL PER PROJECT ──────────────────
      // Each project occupies exactly 1 viewport height of scroll.
      // Project[0] reveals during scroll 0 → vh
      // Project[1] reveals during scroll vh → 2vh
      // Project[2] reveals during scroll 2vh → 3vh
      //
      // We use a single long ScrollTrigger on the whole projects
      // wrapper and drive each clip via a scrub timeline.
      // This avoids the "measure before transform" problem entirely.

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,   // anchor to the pinned about section
          start: 'top top',
          end: `+=${totalProjectsHeight}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      clipRefs.current.forEach((clip, i) => {
        if (!clip) return;

        // Start fully hidden (collapsed at bottom)
        gsap.set(clip, {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        });

        // Each card takes up 1/3 of the total scroll distance.
        // position in timeline: i * (1/3) of total duration
        const start = i / projects.length;       // 0, 0.333, 0.666
        const end   = (i + 1) / projects.length; // 0.333, 0.666, 1.0

        tl.fromTo(
          clip,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'none',
            duration: end - start,
          },
          start  // insert at this position in the timeline
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">

      {/* ══════════════════════════════════════════
          ABOUT — pinned white section
      ══════════════════════════════════════════ */}
      <section
        ref={aboutRef}
        className="relative z-10 bg-white text-[#01010e] min-h-screen"
      >
        {/* Vertical grid lines */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border-r border-gray-100 h-full" />
          ))}
        </div>

        <div className="w-full min-h-screen flex items-center justify-center
                        px-4 sm:px-6 md:px-8 lg:px-12
                        py-16 sm:py-20 lg:py-24">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center text-center gap-1 sm:gap-2 lg:gap-3">

              {/* LINE 1 — Name + portrait */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight">
                  Isneha Manandhar is an international
                </h2>
                <img
                  src="/images/person.jpg"
                  alt="Isneha Manandhar"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                             rounded-full object-cover shadow-xl shrink-0"
                  loading="lazy"
                />
              </div>

              {/* LINE 2 — Role + logo + comma */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight">
                  Full Stack Developer
                </h2>
                <img
                  src="/images/fullstack.png"
                  alt="Full Stack Logo"
                  className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0"
                  loading="lazy"
                />
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-bold leading-tight text-[#c5c5c5]">
                  ,
                </h2>
              </div>

              {/* LINE 3 — who builds + photo + websites */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">
                  who builds
                </h2>
                <img
                  src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991462bf76217807db9c6_DSC_9785.webp"
                  alt="Working"
                  className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto rounded-lg object-cover shadow-xl shrink-0"
                  loading="lazy"
                />
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">
                  websites
                </h2>
              </div>

              {/* LINE 4 — phrase + photo */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">
                  that helps you store data
                </h2>
                <img
                  src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991bb314d4830350b260f_Frame%2044390.webp"
                  alt="Development"
                  className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto rounded-lg object-cover shadow-xl shrink-0"
                  loading="lazy"
                />
              </div>

              {/* LINE 5 — photo + phrase */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
                <img
                  src="https://cdn.prod.website-files.com/6698059876092bcd6352569a/669991db1dc4aa4d8d78e374_Frame%2044391.webp"
                  alt="Results"
                  className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto rounded-lg object-cover shadow-xl shrink-0"
                  loading="lazy"
                />
                <h2 className="text-[clamp(1.4rem,3.8vw,4rem)] font-light leading-tight text-[#c5c5c5]">
                  and achieve results
                </h2>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS — stacked full-screen slides
          Each slide is h-screen, stacked via
          position:absolute so they layer on top
          of each other. Clip-path reveals each one.
      ══════════════════════════════════════════ */}
      <section
        ref={projectsRef}
        className="relative z-20"
        /* Total height = 3 × 100vh so scroll distance is correct */
        style={{ height: `${projects.length * 100}vh` }}
      >
        {/*
          Sticky inner keeps the visible area locked to the viewport
          while the outer section provides the scroll distance.
          This is the standard "scroll-driven" pattern that avoids
          the transform measurement problem completely.
        */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (clipRefs.current[index] = el)}
              /*
                All cards are absolute-stacked on top of each other.
                Clip-path reveals them in sequence via the timeline.
                z-index increases so later cards sit on top.
              */
              className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
              style={{ zIndex: index + 1 }}
            >
              <div className="group relative w-full h-full">

                {/* Background image — covers full card */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Hover video */}
                <video
                  className="absolute inset-0 w-full h-full object-cover
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-500 z-[1]"
                  loop muted playsInline preload="none"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                >
                  <source src={project.videoUrl} type="video/mp4" />
                </video>

                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t
                                from-black/80 via-black/20 to-transparent
                                pointer-events-none z-[2]" />

                {/* Project info */}
                <div className="absolute inset-x-0 bottom-0 z-[3]
                                px-4 py-6
                                sm:px-8 sm:py-10
                                md:px-12 md:py-12
                                lg:px-16 lg:py-16
                                text-white">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col gap-3
                                    sm:flex-row sm:items-end sm:justify-between sm:gap-6">

                      {/* Title */}
                      <h3 className="text-[clamp(2.8rem,9vw,8rem)]
                                     font-bold leading-none tracking-tight">
                        {project.title}
                      </h3>

                      {/* Meta + CTA */}
                      <div className="flex flex-row items-center justify-between
                                      sm:flex-row sm:items-end gap-4 sm:gap-8">
                        {/* Category + year */}
                        <div className="flex flex-col gap-1 opacity-60">
                          <span className="text-[0.65rem] sm:text-xs md:text-sm
                                           uppercase tracking-widest">
                            {project.category}
                          </span>
                          <span className="text-[0.65rem] sm:text-xs md:text-sm
                                           uppercase tracking-widest">
                            {project.year}
                          </span>
                        </div>

                        {/* CTA */}
                        <a
                          href={project.link}
                          className="group/cta inline-flex items-center gap-2 sm:gap-3
                                     text-xs sm:text-sm md:text-base font-medium
                                     hover:gap-4 sm:hover:gap-5 transition-all duration-300"
                        >
                          <span className="block h-px w-5 sm:w-6
                                           bg-white transition-all duration-300
                                           group-hover/cta:w-8 sm:group-hover/cta:w-10" />
                          About more
                          <span className="block h-px w-5 sm:w-6
                                           bg-white transition-all duration-300
                                           group-hover/cta:w-8 sm:group-hover/cta:w-10" />
                        </a>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;