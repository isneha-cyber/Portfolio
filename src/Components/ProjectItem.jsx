// components/ProjectItem.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ProjectItem = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);

  // Add error checking
  if (!project) {
    console.error('Project prop is undefined in ProjectItem');
    return null;
  }

  useEffect(() => {
    // Make sure refs exist before animating
    if (!imageRef.current || !overlayRef.current || !titleRef.current || !infoRef.current) return;

    if (isHovered) {
      gsap.to(imageRef.current, {
        scale: 1.07,
        y: -10,
        duration: 0.6,
        ease: "power3.out"
      });
      
      gsap.to(overlayRef.current, {
        height: "0%",
        duration: 0.6,
        ease: "power3.out"
      });

      gsap.to(titleRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      });

      gsap.to(infoRef.current, {
        opacity: 1,
        duration: 0.4,
        delay: 0.2,
        ease: "power3.out"
      });
    } else {
      gsap.to(imageRef.current, {
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      });
      
      gsap.to(overlayRef.current, {
        height: "100%",
        duration: 0.6,
        ease: "power3.out"
      });

      gsap.to(titleRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.out"
      });

      gsap.to(infoRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power3.out"
      });
    }
  }, [isHovered]);

  return (
    <a
      href={`/projects/${project.slug}`}
      className="block w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="work-image-wrap relative overflow-hidden">
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-white z-10"
          style={{ height: '100%' }}
        ></div>
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          loading="lazy"
          srcSet={project.srcset}
          sizes="100vw"
          className="w-full h-auto object-cover"
          style={{ transformOrigin: '50% 50%' }}
        />
      </div>
      <div className="content-work mt-4">
        <div className="overflow-hidden">
          <h2 
            ref={titleRef}
            className="font-['Generalsans',sans-serif] text-2xl font-bold text-[#01010e]"
            style={{ transform: 'translateY(100%)' }}
          >
            {project.title}
          </h2>
        </div>
        <div 
          ref={infoRef}
          className="content-info-work flex gap-4 text-sm opacity-0"
        >
          <div>{project.category}</div>
          <div>{project.year}</div>
        </div>
      </div>
    </a>
  );
};

export default ProjectItem;