import { useEffect, useState } from 'react';

export default function Projects() {
  const [lineWidth, setLineWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Animate line width on mount
    const timer = setTimeout(() => {
      setLineWidth(100);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Project images data - matching the Webflow structure
  const projectImages = [
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/69246c4a61d15ecace468ba1_Frame%201.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/66f45b89cec13fbc6fba04ed_thumb.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/670ef6f48934a4f891733070_Screenshot%202024-10-14%20at%2012.04.20%204.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/66f45dc46350c7de668abf41_thumb.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/66d2154fd96236f53dda7f5e_thumb1-1.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/67d1a521f835b40e0e682ed0_image%2052.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/66d2153e08a233fad8588927_thumb1.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/67d1a729340801f0308f5e50_MAB_5319%202.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/66d2155ff2fec2975149890c_thumb.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/692470d41605360a5decb2a6_Frame%201707479277.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/69246fe63a5ea985e8be7265_Frame%201707479277.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/66f45ef985e1b6bcd70830f0_thumb.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/67d199efc63eabce02299804_image%2046.avif',
    'https://cdn.prod.website-files.com/669ee37559969f9efba7ee67/670ef794202d6965f9293e19_thumb.avif',
  ];

  return (
    <section className="relative z-30 h-screen bg-[#01010e] overflow-hidden">
      {/* Padding Global - 5% on sides */}
      <div className="relative h-full" >
        
        {/* More Projects Wrap */}
        <div className="relative h-full">
          
          {/* Container Large */}
          <div className="relative h-full max-w-[1920px] mx-auto">
            
            {/* Padding Section Large */}
            <div className="relative h-full">
              
              {/* Content - SEE ALL PROJECTS */}
              <div className="relative z-20 flex items-center justify-center h-full">
                <a
                  href="/works"
                  className="inline-block text-center group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 transition-opacity duration-300 group-hover:opacity-90 text-center">
                    SEE ALL PROJECTS
                  </h2>
                  
                  {/* Animated Line */}
                  <div className="flex justify-center">
                    <div
                      className="h-1 bg-white transition-all duration-700 ease-out"
                      style={{ 
                        width: isHovered ? '100%' : `${lineWidth}%`,
                        maxWidth: '600px'
                      }}
                    ></div>
                  </div>
                </a>
              </div>

              {/* Background Images */}
              <div className="absolute inset-0 z-10">
                
                {/* Image Overlay Layer */}
                <div className="absolute inset-0 bg-black/60 z-10"></div>

                {/* Images Layout - 5 Columns */}
                <div className="flex h-full w-full gap-0">
                  
                  {/* Column 1 - Down Animation */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex flex-col animate-scroll-down-1">
                      {projectImages.map((img, idx) => (
                        <div key={`col1-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {projectImages.map((img, idx) => (
                        <div key={`col1-dup-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2 - Up Animation */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex flex-col animate-scroll-up-2">
                      {[...projectImages].reverse().map((img, idx) => (
                        <div key={`col2-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {[...projectImages].reverse().map((img, idx) => (
                        <div key={`col2-dup-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3 - Down Animation (Hidden on mobile) */}
                  <div className="hidden sm:flex flex-1 flex-col overflow-hidden">
                    <div className="flex flex-col animate-scroll-down-3">
                      {projectImages.map((img, idx) => (
                        <div key={`col3-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {projectImages.map((img, idx) => (
                        <div key={`col3-dup-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 4 - Up Animation (Hidden on mobile/tablet) */}
                  <div className="hidden md:flex flex-1 flex-col overflow-hidden">
                    <div className="flex flex-col animate-scroll-up-4">
                      {[...projectImages].reverse().map((img, idx) => (
                        <div key={`col4-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {[...projectImages].reverse().map((img, idx) => (
                        <div key={`col4-dup-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 5 - Down Animation (Hidden on mobile/tablet) */}
                  <div className="hidden lg:flex flex-1 flex-col overflow-hidden">
                    <div className="flex flex-col animate-scroll-down-5">
                      {projectImages.map((img, idx) => (
                        <div key={`col5-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {projectImages.map((img, idx) => (
                        <div key={`col5-dup-${idx}`} className="flex-shrink-0 mb-4">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-[80vh] object-cover transform rotate-[3deg]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scrollDown {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scrollUp {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-down-1 {
          animation: scrollDown 50s linear infinite;
        }

        .animate-scroll-up-2 {
          animation: scrollUp 50s linear infinite;
        }

        .animate-scroll-down-3 {
          animation: scrollDown 45s linear infinite;
        }

        .animate-scroll-up-4 {
          animation: scrollUp 55s linear infinite;
        }

        .animate-scroll-down-5 {
          animation: scrollDown 48s linear infinite;
        }
      `}</style>
    </section>
  );
}