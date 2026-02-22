import React from 'react';

const Experience = () => {
  const experiences = [
    { company: '@Amply', period: '2025 - Current' },
    { company: '@Carthagos', period: '2023 - 2025' },
    { company: '@RMDstudio', period: '2023 - 2024' },
    { company: '@Freelancer', period: '2018 - Current' },
    { company: '@JS+', period: '2022 - 2023' },
    { company: '@Warren', period: '2021 - 2022' }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 relative">
      {/* Vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="border-r border-gray-200 h-full" />
        ))}
      </div>
      
      <div className="px-4 md:px-8 mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="overflow-hidden mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-center uppercase">
              experiences
            </h2>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Square Image Container */}
                <div className="relative w-full pb-[80%] mb-4">
                  <div 
                    className="absolute inset-0 bg-[#eaeaea] transition-colors duration-300 group-hover:bg-[#d5d5d5]"
                  ></div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col">
                  <a 
                    href="#" 
                    className="text-xl md:text-2xl font-medium text-[#01010e] hover:text-gray-600 transition-colors duration-200 no-underline"
                  >
                    {exp.company}
                  </a>
                  <span className="text-sm md:text-base text-[#b3b3b3]">
                    {exp.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;