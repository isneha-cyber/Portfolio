import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#01010e] text-white overflow-hidden">
      {/* Grid Lines - 9 columns */}
      <div className="absolute inset-0 grid grid-cols-9 pointer-events-none z-0">
        {[...Array(9)].map((_, i) => (
          <div 
            key={i} 
            className="h-full border-r border-gray-800/50 last:border-r-0" 
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-[5%]">
        {/* Main Content */}
        <div className="py-16 md:py-24 lg:py-32">
          
          {/* Top Section - Let's Chat */}
          <div className="mb-20 md:mb-32">
            <a 
              href="https://calendar.notion.so/meet/nicomenezes/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[13rem] font-bold uppercase tracking-[5px] transition-all duration-300 group-hover:opacity-70">
                LET'S CHAT
              </h2>
              <div className="h-[2px] bg-white mt-4 md:mt-6 w-0 group-hover:w-full transition-all duration-700 ease-out" />
            </a>
          </div>

          {/* Bottom Section - Links & Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-sm md:text-base font-semibold uppercase tracking-wider text-gray-400">
                Social
              </h3>
              <nav className="flex flex-col gap-4">
                <a 
                  href="https://www.instagram.com/nicomenezes_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300 text-base md:text-lg group flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-300" />
                  Instagram
                </a>
                <a 
                  href="https://x.com/nicomenezes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300 text-base md:text-lg group flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-300" />
                  Twitter
                </a>
                <a 
                  href="https://www.linkedin.com/in/nicolas-menezes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300 text-base md:text-lg group flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-300" />
                  LinkedIn
                </a>
                <a 
                  href="https://webflow.com/@nico-menezzes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300 text-base md:text-lg group flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-300" />
                  Github
                </a>
              </nav>
            </div>

            {/* Contact Links */}
            <div className="space-y-6">
              <h3 className="text-sm md:text-base font-semibold uppercase tracking-wider text-gray-400">
                Contact
              </h3>
              <nav className="flex flex-col gap-4">
                <a 
                  href="mailto:contato@nicomenezes.com"
                  className="text-white/70 hover:text-white transition-colors duration-300 text-base md:text-lg group flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-300" />
                  E-mail
                </a>
                <a 
                  href="https://wa.me/5551994591629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300 text-base md:text-lg group flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-300" />
                  Whatsapp
                </a>
              </nav>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h3 className="text-sm md:text-base font-semibold uppercase tracking-wider text-gray-400">
                Location
              </h3>
              <div className="flex flex-col gap-2">
                <p className="text-white/70 text-base md:text-lg">
                 Pokhara, Nepal
                </p>
                <p className="text-white/50 text-sm md:text-base font-mono">
                  {time || 'GMT-3'}
                </p>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-6">
              <h3 className="text-sm md:text-base font-semibold uppercase tracking-wider text-gray-400">
                Availability
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                <p className="text-white/70 text-base md:text-lg">
                  Open for projects
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-20 md:mt-32 pt-8 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-white/50 text-sm md:text-base">
                © {new Date().getFullYear()} Isneha Manandhar. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-6">
                <a 
                  href="/privacy" 
                  className="text-white/50 hover:text-white text-sm md:text-base transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms" 
                  className="text-white/50 hover:text-white text-sm md:text-base transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Gradient Overlay at Top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#01010e] to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;