// components/Works.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Works = () => {
  const heroRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(linesRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      }
    );
  }, []);

  return (
    <section ref={heroRef} className="pt-32 pb-16 px-[5%]">
        {/* Vertical grid lines */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border-r border-gray-200 h-full" />
          ))}
        </div>
      <div className="z-20">
        <div className="hero-works-wrap">
          <h1 className="font-['Nohemi',sans-serif] text-[clamp(4rem,15vw,12rem)] font-bold uppercase leading-[0.9]">
            <div ref={el => linesRef.current[0] = el} className="block w-full">
              SOME
            </div>
            <div ref={el => linesRef.current[1] = el} className="block w-full">
              WORKS
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Works;