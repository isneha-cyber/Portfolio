import { useEffect, useRef, useState } from 'react';

export default function AbilitiesSection() {
  const titleRef = useRef(null);
  const abilitiesRef = useRef([]);
  const [isHovered, setIsHovered] = useState(Array(4).fill(false));

  useEffect(() => {
    // Animate title on mount
    if (titleRef.current) {
      titleRef.current.style.transform = 'translateY(0)';
    }

    // Stagger animate abilities
    abilitiesRef.current.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.style.opacity = '1';
        }, 100 + index * 100);
      }
    });
  }, []);

  const handleMouseEnter = (index) => {
    setIsHovered(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handleMouseLeave = (index) => {
    setIsHovered(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  const abilities = [
    {
      title: 'Webflow development',
      description: 'Custom, optimized websites are developed in Webflow, with a focus on impactful design, interactive animations, and exceptional usability.',
    },
    {
      title: 'user interface design',
      description: 'Creating intuitive and visually engaging interfaces, with a focus on usability and design impact that drive meaningful results.',
    },
    {
      title: 'Front-end development',
      description: 'Developing responsive, high-performance websites with a focus on clean code and seamless user experience.',
    },
    {
      title: 'LOW-CODE DEVELOPMENT',
      description: 'Leveraging no-code tools for efficient workflows and CRM integrations, focusing on platforms like Zapier.',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-white py-20 sm:py-28 lg:py-36 xl:py-44 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-9 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border-r border-gray-200 h-full"></div>
          ))}
        </div>

        {/* Content Container */}
        <div className="relative w-full px-6 sm:px-8 lg:px-12">
          {/* Layout Wrapper */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-16 xl:gap-20">
            
            {/* Title Section */}
            <div className="overflow-hidden lg:flex-shrink-0">
              <h2
                ref={titleRef}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight transition-transform duration-1000 ease-out"
                style={{ 
                  transform: 'translateY(100px)',
                  color: '#01010e',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                ABILITIES
              </h2>
            </div>

            {/* Abilities Grid - 2x2 Layout with Borders and Padding */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl lg:max-w-[43rem]">
              {abilities.map((ability, index) => (
                <div
                  key={index}
                  ref={(el) => (abilitiesRef.current[index] = el)}
                  className="group opacity-0 transition-all duration-700 border border-gray-300 py-6 rounded-lg hover:border-gray-500 hover:shadow-sm"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Marquee Container */}
                  <div className="relative overflow-hidden  h-12 ">
                    {/* Primary Marquee */}
                    <div 
                      className="absolute whitespace-nowrap flex will-change-transform"
                      style={{
                        animation: isHovered[index] ? 'none' : `marquee ${35 + index * 2}s linear infinite`,
                      }}
                    >
                      {/* First set */}
                      {[...Array(10)].map((_, i) => (
                        <span
                          key={`first-${i}`}
                          className="inline-block text-2xl sm:text-3xl font-bold tracking-tight uppercase "
                          style={{ color: '#01010e' }}
                        >
                          {ability.title}
                        </span>
                      ))}
                      
                     
                    </div>
                  </div>

                  <div className="relative overflow-hidden mb-4 h-12">
                    {/* Primary Marquee */}
                    <div 
                      className="absolute whitespace-nowrap flex will-change-transform"
                      style={{
                        animation: isHovered[index] ? 'none' : `marquee ${35 + index * 2}s linear infinite`,
                      }}
                    >
                      {/* First set */}
                      {[...Array(10)].map((_, i) => (
                        <span
                          key={`first-${i}`}
                          className="inline-block text-2xl sm:text-3xl  font-bold tracking-tight uppercase "
                          style={{ color: '#01010e' }}
                        >
                          {ability.title}
                        </span>
                      ))}
                      
                     
                    </div>
                  </div>


                  {/* Description */}
                  <p 
                    className="text-sm sm:text-base leading-relaxed px-2"
                    style={{ 
                      color: '#555555',
                    }}
                  >
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Marquee Animation Style */}
        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>
    </div>
  );
}