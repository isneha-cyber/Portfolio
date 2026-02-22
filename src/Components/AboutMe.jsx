import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const titleLineRef = useRef(null);
  const infoRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentSectionRef = useRef(null);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const timeoutId = setTimeout(() => {
      if (!isMounted) return;
      
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
          if (!sectionRef.current || !titleLineRef.current || !pinRef.current || 
              !imageContainerRef.current || !imageRef.current || !overlayRef.current || 
              !infoRef.current || !contentSectionRef.current) {
            return;
          }

          // Title animation
          gsap.from(titleLineRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });

          // Pin and scale animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=100%',
              scrub: 1,
              pin: pinRef.current,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(imageContainerRef.current, {
            width: '70%',
            marginLeft: '15%',
            marginRight: '15%',
            height: '50vh', // Reduced from 90vh to a more reasonable height
            ease: 'power2.inOut',
            duration: 1,
          }, 0)
          .to(imageRef.current, {
            scale: 1,
            ease: 'power2.inOut',
            duration: 1,
            onUpdate: function() {
              if (imageRef.current) {
                if (this.progress > 0.5) {
                  imageRef.current.style.objectFit = 'contain';
                  imageRef.current.style.transform = 'scale(1)';
                } else {
                  imageRef.current.style.objectFit = 'cover';
                  imageRef.current.style.transform = 'scale(1.1)';
                }
              }
            }
          }, 0)
          .to(overlayRef.current, {
            height: '100%',
            ease: 'power2.inOut',
            duration: 1,
          }, 0)
          .to(infoRef.current, {
            opacity: 0,
            y: -50,
            ease: 'power2.inOut',
            duration: 0.8,
          }, 0);

          // Content section fade in
          gsap.fromTo(contentSectionRef.current,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: contentSectionRef.current,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 0.5,
              },
            }
          );
        });

        mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
          if (!sectionRef.current || !titleLineRef.current || !infoRef.current || 
              !imageContainerRef.current || !imageRef.current || !overlayRef.current) {
            return;
          }

          // Title animation - FIXED: opacity should be 0, not 1
          gsap.from(titleLineRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });

          // Info animation - FIXED: opacity should be 0, not 1
          gsap.from(infoRef.current, {
            y: 16,
            opacity: 0,
            duration: 0.7,
            delay: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });

          // Container animation
          gsap.to(imageContainerRef.current, {
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
            height: '90vh',
            ease: 'none',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 0.7,
            },
          });

          // Image animation - FIXED: Corrected the logic (starts with cover, ends with contain)
          gsap.to(imageRef.current, {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 0.7,
            },
            onUpdate: function() {
              if (imageRef.current) {
                if (this.progress > 0.5) {
                  imageRef.current.style.objectFit = 'contain';
                  imageRef.current.style.transform = 'scale(1)';
                } else {
                  imageRef.current.style.objectFit = 'cover';
                  imageRef.current.style.transform = 'scale(1.1)';
                }
              }
            }
          });

          // Overlay animation
          gsap.to(overlayRef.current, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 0.7,
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMounted]);

  return (
    <>
      <section ref={sectionRef} className="relative w-full bg-white">
        {/* Vertical grid lines */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border-r border-gray-200 h-full" />
          ))}
        </div>
        
        <div ref={pinRef} className="mx-auto w-full max-w-[1440px] px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-40">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
            <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
              <div className="overflow-hidden">
                <h1 className="font-nohemi text-center text-5xl font-bold uppercase tracking-wider sm:text-7xl lg:text-8xl xl:text-[13rem]">
                  <span ref={titleLineRef} className="block w-full text-center">
                    ABOUT ME
                  </span>
                </h1>
              </div>

              <div
                ref={infoRef}
                className="flex items-center justify-between gap-1 text-sm text-gray-400 sm:flex-row sm:gap-96 lg:text-2xl tracking-[0.5em]"
              >
                <h3>INTERNATIONAL</h3>
                <h3 className="uppercase">fullstack developer</h3>
              </div>
            </div>

            {/* Image container with proper styling - REMOVED py-20 which was causing issues */}
            <div 
              ref={imageContainerRef} 
              className="relative mt-8 w-full sm:mt-10 lg:mt-12"
              style={{ 
                height: '90vh',
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  ref={imageRef}
                  src="/images/person.jpg"
                  loading="lazy"
                  alt="Nico Photo"
                  className="w-full h-full transition-all duration-300"
                  style={{
                    objectFit: 'cover',
                    objectPosition: '50% 30%',
                    transform: 'scale(1.1)',
                  }}
                />
                {/* Overlay element - FIXED: Start with height 0% */}
                <div 
                  ref={overlayRef}
                  className="absolute bottom-0 left-0 w-full pointer-events-none"
                  style={{ 
                    height: '100%',
                    zIndex: 20,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section 
        ref={contentSectionRef}
        className="w-full bg-white relative flex justify-center items-start py-16 md:py-24"
        style={{ 
          zIndex: 30,
          minHeight: '100vh',
        }}
      >
        {/* Vertical grid lines */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border-r border-gray-200 h-full" />
          ))}
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                My Journey in Web Development
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                I'm a Webflow Developer with over 4 years of experience, following a 5-year journey as a Product Designer. I've also worked as a Front-End Developer, enhancing my ability to create highly interactive and structured websites. Currently, I'm an official Webflow Certified Partner and part of the Awwwards Jury, and having won some awards.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                In 2021, following my studies and completion of courses in the field, I had the opportunity to work on several projects as a Freelancer, where I built both the website and the development of websites for some early Brazilian startups.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Throughout 2022, alongside my career as a Product Designer, I focused on working as a Webflow Developer, also as a Freelancer, on various low and medium ticket projects.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                In 2023, I had the chance to dedicate 100% of my time to my career as a Webflow Developer. I currently work at Amply, helping B2B companies and startups worldwide, while also freelancing with studios like Carthagos, RMD Studio, and Duck Design Studio and many other around the globe, additionally, having a portfolio of our own clients.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                My main goal is to create incredible websites that, above all, help the client/company achieve their business objectives. I use Webflow as the primary tool to ensure clean code, scalable websites, and elegant animations. To achieve this, I leverage other skills and tools such as HTML, CSS, JS, GSAP, Memberstack, among other amazing solutions, to continually enhance the websites.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @font-face {
          font-family: 'Generalsans';
          src: url('/fonts/GeneralSans-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        .font-nohemi {
          font-family: 'Nohemi', sans-serif;
        }
      `}</style>
    </>
  );
};

export default AboutMe;