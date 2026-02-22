// // components/WorksGrid.jsx
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { projects } from '../data/projects';

// gsap.registerPlugin(ScrollTrigger);


// const ProjectCard = ({ project, index }) => {
//   const cardRef     = useRef(null);
//   const imageRef    = useRef(null);
//   const overlayRef  = useRef(null);
//   const titleRef    = useRef(null);
//   const infoRef     = useRef(null);
//   const lineRef     = useRef(null);

//   const isRight = index % 2 === 0; // even → image right, odd → image left

//   /* ── scroll-in reveal ──────────────────────────────────────────────────── */
//   useEffect(() => {
//     if (!cardRef.current) return;

//     const xStart = isRight ? 60 : -60;

//     gsap.fromTo(cardRef.current,
//       { y: 90, x: xStart, opacity: 0 },
//       {
//         y: 0,
//         x: 0,
//         opacity: 1,
//         duration: 1.1,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: cardRef.current,
//           start: 'top 88%',
//           toggleActions: 'play none none reverse',
//         },
//       }
//     );

//     // Decorative line expands on scroll
//     if (lineRef.current) {
//       gsap.from(lineRef.current, {
//         scaleX: 0,
//         transformOrigin: isRight ? 'right center' : 'left center',
//         duration: 1.2,
//         ease: 'expo.inOut',
//         scrollTrigger: {
//           trigger: cardRef.current,
//           start: 'top 85%',
//           toggleActions: 'play none none reverse',
//         },
//       });
//     }
//   }, []);

//   /* ── hover handlers ─────────────────────────────────────────────────────── */
//   const handleEnter = () => {
//     gsap.to(imageRef.current,  { scale: 1.06, duration: 0.65, ease: 'power3.out' });
//     gsap.to(overlayRef.current,{ scaleY: 0,   duration: 0.55, ease: 'power3.out' });
//     gsap.to(titleRef.current,  { y: 0,        duration: 0.45, ease: 'power3.out' });
//     gsap.to(infoRef.current,   { opacity: 1,  duration: 0.35, delay: 0.15, ease: 'power3.out' });
//   };

//   const handleLeave = () => {
//     gsap.to(imageRef.current,  { scale: 1,       duration: 0.65, ease: 'power3.out' });
//     gsap.to(overlayRef.current,{ scaleY: 1,       duration: 0.55, ease: 'power3.out' });
//     gsap.to(titleRef.current,  { y: '105%',       duration: 0.4,  ease: 'power3.in' });
//     gsap.to(infoRef.current,   { opacity: 0,      duration: 0.3,  ease: 'power3.in' });
//   };

//   return (
//     <div ref={cardRef} className="w-full opacity-0">
//       {/* ── layout: flex row, direction flips per index ─────────────────── */}
//       <div
//         className={`
//           flex flex-col gap-0
//           lg:flex-row lg:items-stretch
//           ${isRight ? 'lg:flex-row' : 'lg:flex-row-reverse'}
//         `}
//       >
//         {/* ── image side (60%) ───────────────────────────────────────────── */}
//         <a
//           href={`/projects/${project.slug}`}
//           className="block relative lg:w-[60%] overflow-hidden"
//           onMouseEnter={handleEnter}
//           onMouseLeave={handleLeave}
//           aria-label={project.title}
//         >
//           {/* Overlay curtain — scaleY from top so it wipes upward */}
//           <div
//             ref={overlayRef}
//             className="absolute inset-0 bg-white z-10"
//             style={{ transformOrigin: 'top center' }}
//           />

//           <img
//             ref={imageRef}
//             src={project.image}
//             srcSet={project.srcset}
//             sizes="(max-width: 1023px) 100vw, 60vw"
//             alt={project.title}
//             loading="lazy"
//             className="w-full h-full object-cover block"
//             style={{
//               aspectRatio: '16/10',
//               willChange: 'transform',
//             }}
//           />
//         </a>

//         {/* ── info side (40%) ────────────────────────────────────────────── */}
//         <div
//           className={`
//             lg:w-[40%] flex flex-col justify-between
//             px-6 py-6 lg:py-10
//             ${isRight ? 'lg:pl-12 lg:pr-6' : 'lg:pr-12 lg:pl-6'}
//           `}
//         >
//           {/* Index number */}
//           <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-stone-400 mb-4 lg:mb-0">
//             {String(index + 1).padStart(2, '0')}
//           </span>

//           {/* Title + meta */}
//           <div>
//             {/* Decorative line */}
//             <div
//               ref={lineRef}
//               className="w-full h-px bg-stone-300 mb-5 hidden lg:block"
//             />

//             {/* Overflow-hidden so translateY clip works */}
//             <div className="overflow-hidden mb-2">
//               <h2
//                 ref={titleRef}
//                 className="font-nohemi text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-stone-900 leading-none"
//                 style={{ transform: 'translateY(105%)' }}
//               >
//                 {project.title}
//               </h2>
//             </div>

//             <div
//               ref={infoRef}
//               className="flex items-center gap-4 opacity-0"
//             >
//               <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
//                 {project.category}
//               </span>
//               <span className="text-stone-300 text-xs">✦</span>
//               <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
//                 {project.year}
//               </span>
//             </div>

//             {/* View link */}
//             <a
//               href={`/projects/${project.slug}`}
//               className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.35em] text-stone-900 border-b border-stone-900 pb-0.5 hover:text-stone-500 hover:border-stone-500 transition-colors duration-200"
//             >
//               View project
//               <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Full-width divider */}
//       <div className="w-full h-px bg-stone-200 mt-8 lg:mt-12" />
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────────────── */

// const WorksGrid = () => {
//   const sectionRef    = useRef(null);
//   const headingRef    = useRef(null);
//   const countRef      = useRef(null);

//   useEffect(() => {
//     if (headingRef.current) {
//       gsap.from(headingRef.current, {
//         yPercent: 100,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: 'top 80%',
//           toggleActions: 'play none none reverse',
//         },
//       });
//     }
//     if (countRef.current) {
//       gsap.from(countRef.current, {
//         opacity: 0,
//         x: 20,
//         duration: 0.8,
//         delay: 0.2,
//         ease: 'power2.out',
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: 'top 80%',
//           toggleActions: 'play none none reverse',
//         },
//       });
//     }
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden"
//     >
//       {/* Subtle grid lines */}
//       <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
//         {[...Array(9)].map((_, i) => (
//           <div key={i} className="border-r border-stone-300/30 h-full" />
//         ))}
//       </div>

//       <div className="relative z-10 w-full px-4 sm:px-8 lg:px-14 xl:px-20">

      

//         {/* ── Project list ───────────────────────────────────────────────── */}
//         <div className="flex flex-col gap-12 lg:gap-20">
//           {projects.map((project, index) => (
//             <ProjectCard key={project.id} project={project} index={index} />
//           ))}
//         </div>

//       </div>

//       <style jsx>{`
//         .font-nohemi {
//           font-family: 'Nohemi', 'Helvetica Neue', sans-serif;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default WorksGrid;





// components/WorksGrid.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
  const cardRef     = useRef(null);
  const imageRef    = useRef(null);
  const titleRef    = useRef(null);
  const infoRef     = useRef(null);
  const lineRef     = useRef(null);

  const isRight = index % 2 === 0;

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, { opacity: 0, y: 90, x: isRight ? 60 : -60 });

    const xStart = isRight ? 60 : -60;

    gsap.fromTo(cardRef.current,
      { y: 90, x: xStart, opacity: 0 },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    if (lineRef.current) {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: isRight ? 'right center' : 'left center',
        duration: 1.2,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, []);

  const handleEnter = () => {
    gsap.to(imageRef.current, { scale: 1.06, duration: 0.65, ease: 'power3.out' });
  };

  const handleLeave = () => {
    gsap.to(imageRef.current, { scale: 1, duration: 0.65, ease: 'power3.out' });
  };

  return (
    <div ref={cardRef} className="w-full">
      <div
        className={`
          flex flex-col gap-0
          lg:flex-row lg:items-stretch
          ${isRight ? 'lg:flex-row' : 'lg:flex-row-reverse'}
        `}
      >
        {/* Image side (60%) */}
        <a
          href={`/projects/${project.slug}`}
          className="block relative lg:w-[60%] overflow-hidden"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          aria-label={project.title}
        >
          <img
            ref={imageRef}
            src={project.image}
            srcSet={project.srcset}
            sizes="(max-width: 1023px) 100vw, 60vw"
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover block"
            style={{ aspectRatio: '16/10', willChange: 'transform' }}
          />
        </a>

        {/* Info side (40%) */}
        <div
          className={`
            lg:w-[40%] flex flex-col justify-between
            px-6 py-6 lg:py-10
            ${isRight ? 'lg:pl-12 lg:pr-6' : 'lg:pr-12 lg:pl-6'}
          `}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-stone-400 mb-4 lg:mb-0">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div>
            <div ref={lineRef} className="w-full h-px bg-stone-300 mb-5 hidden lg:block" />

            <div className="overflow-hidden mb-2">
              <h2
                ref={titleRef}
                className="font-nohemi text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-stone-900 leading-none"
              >
                {project.title}
              </h2>
            </div>

            <div ref={infoRef} className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
                {project.category}
              </span>
              <span className="text-stone-300 text-xs">✦</span>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
                {project.year}
              </span>
            </div>

            <a
              href={`/projects/${project.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.35em] text-stone-900 border-b border-stone-900 pb-0.5 hover:text-stone-500 hover:border-stone-500 transition-colors duration-200"
            >
              View project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-stone-200 mt-8 lg:mt-12" />
    </div>
  );
};

const WorksGrid = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const countRef   = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }
    if (countRef.current) {
      gsap.from(countRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="border-r border-stone-300/30 h-full" />
        ))}
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-14 xl:px-20">
        <div className="flex flex-col gap-12 lg:gap-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <style>{`.font-nohemi { font-family: 'Nohemi', 'Helvetica Neue', sans-serif; }`}</style>
    </section>
  );
};

export default WorksGrid;