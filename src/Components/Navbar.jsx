import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past threshold
      setIsScrolled(currentScrollY > 10);

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      }

      // Always show navbar at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-transparent ' : 'bg-transparent'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
           {/* Logo */}
            <a 
              href="/" 
              className="inline-flex items-center gap-1 transition-opacity hover:opacity-80"
              aria-label="ISNEHA home"
            >
              <span className="text-2xl sm:text-3xl font-semibold text-black">
                ISNEHA
              </span>
            </a>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="relative z-50 flex flex-col justify-center items-center w-10 h-10 focus:outline-none group"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div
                className={`w-6 h-0.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'bg-white rotate-45 translate-y-1.5' : 'bg-black'
                }`}
              />
              <div
                className={`w-6 h-0.5 transition-all duration-300 ease-in-out mt-1.5 ${
                  isMenuOpen ? 'bg-white -rotate-45 -translate-y-1' : 'bg-black'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Right Side Menu Overlay - 1/3 Width */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Semi-transparent backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel - 1/3 width on desktop, full width on mobile */}
        <div className="absolute top-0 right-0 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-black shadow-2xl">
          {/* Menu Content */}
          <div className="relative h-full flex flex-col justify-between px-6 sm:px-8 lg:px-12 py-8">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:opacity-60 transition-opacity"
                aria-label="Close menu"
              >
               
              </button>
            </div>

            {/* Menu Links - Centered */}
            <nav className="flex flex-col space-y-4 sm:space-y-6 items-start">
              <a
                href="/"
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white hover:opacity-60 transition-all duration-300 uppercase tracking-tight ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? '100ms' : '0ms' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/works"
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-tight ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? '200ms' : '0ms' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Works
              </a>
              <a
                href="/about"
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-tight ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </nav>

            {/* Bottom Section */}
            <div
              className={`flex flex-col items-start gap-6 transition-all duration-500 ${
                isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
            >
              {/* Contact Links */}
              <div className="flex flex-col gap-2 text-sm sm:text-base">
                <a
                  href="mailto:contact@isneha.com"
                  className="text-white hover:opacity-60 transition-opacity"
                >
                  contact@isneha.com
                </a>
                <a
                  href="https://www.instagram.com/isneha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-60 transition-opacity"
                >
                  @isneha
                </a>
              </div>

              {/* Availability Status */}
              <div className="flex flex-col items-start gap-1 text-sm">
                <span className="text-white">Freelancer Availability</span>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="absolute top-0 left-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-40" />
                  </div>
                  <span className="text-white">Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}