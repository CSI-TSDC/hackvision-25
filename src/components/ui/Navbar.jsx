'use client';

import { useState, useEffect } from 'react';

export default function Navbar({ className = "" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Sponsors', href: '#sponsors' },
  ];

  return (
    <>
      <nav className={`w-full flex ${isScrolled ? 'fixed' : 'absolute'} ${isScrolled ? 'top-[3.5vh]' : 'top-0'} font-quinque h-[9vh] ${isScrolled ? '' : 'md:mt-[3.5vh]'} pt-[15px] text-sm ${className} justify-between items-stretch pl-[4vw] font-quinque text-[#f8f8f8] ${isScrolled ? 'z-[100]' : 'z-1'}`}>

        {/* Logo */}
        <div className="w-max h-full flex items-center">
          <img src="/assets/home/hackvision_logo.png" className="w-48" alt="HackVision" />
        </div>

        {/* Desktop Menu Container */}
        <div id="nav" className="flex flex-1 w-auto justify-end h-full">

          {/* Glassmorphic Menu Bar */}
          <div
            className="hidden md:flex h-full text-[0.8vw] w-[55.5vw] justify-between items-center pl-[50px] space-x-4 pr-[20px] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.85) 0%, rgba(22, 33, 62, 0.9) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderBottom: '2px solid rgba(0, 180, 216, 0.5)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Pixel corners */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#d2ff52]" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#FF8C00]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#4ecdc4]" />

            {/* Animated scan line */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
              }}
            />

            {/* Nav Links */}
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const lenis = window.__lenis;
                  if (lenis) {
                    lenis.scrollTo(link.href, { duration: 1.2 });
                  } else {
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative group hover:text-[#d2ff52] transition-all duration-300 cursor-pointer py-2"
              >
                <span className="relative z-10 font-pixel-emulator tracking-wider text-[1.3vw]">{link.label.toUpperCase()}</span>

                {/* Hover underline effect */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d2ff52] group-hover:w-full transition-all duration-300" />

                {/* Pixel dot indicator */}
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#d2ff52] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            ))}
          </div>

          {/* Register Button */}
          <button
            className='hidden md:flex items-center gap-2 md:text-[0.8vw] text-white hover:text-[#1a1a2e] bg-[#00b4d8] transition-all duration-300 cursor-pointer px-6 py-2 relative overflow-hidden group'
            style={{
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
            }}
          >
            <a className='w-full' target='_blank' rel='noopener noreferrer' href="https://unstop.com/o/8YEQtVf?lb=xk26YO1e&utm_medium=Share&utm_source=abhadho42350&utm_campaign=Online_coding_challenge">
              {/* Hover overlay */}
              <span
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />

              {/* Pixel effect top-left */}
              <span className="absolute top-0 left-0 w-2 h-2 bg-[#1a1a2e] opacity-30" />

              {/* Button content */}
              <span className="relative z-10 font-pixel-emulator text-[#1a1a2e] tracking-widest text-[0.9vw]">REGISTER</span>

              {/* Arrow icon */}
              <span className="relative z-10 text-[#1a1a2e] group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </button>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-white z-[101] relative mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {/* Pixel-style hamburger */}
            <div className="flex flex-col gap-1.5">
              <span className={`w-6 h-0.5 bg-[#d2ff52] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 w-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-[#d2ff52] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden ${isScrolled ? 'fixed' : 'absolute'} ${isScrolled ? 'top-[calc(3.5vh+9vh+15px)]' : 'top-full'} left-0 right-0 w-full shadow-lg z-[99]`}
            style={{
              background: 'linear-gradient(180deg, rgba(26, 26, 46, 0.98) 0%, rgba(22, 33, 62, 0.98) 100%)',
              backdropFilter: 'blur(12px)',
              borderBottom: '2px solid rgba(210, 255, 82, 0.3)',
            }}
          >
            {/* Scan lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
              }}
            />

            <div className="flex flex-col px-[4vw] py-6 space-y-1 relative">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="flex items-center gap-3 py-3 text-white hover:text-[#d2ff52] transition-colors duration-200 cursor-pointer border-b border-white/5"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const lenis = window.__lenis;
                    if (lenis) {
                      lenis.scrollTo(link.href, { duration: 1.2 });
                    } else {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="w-2 h-2 bg-[#d2ff52] opacity-60" />
                  <span className="font-pixel-emulator tracking-wider text-sm">{link.label.toUpperCase()}</span>
                </a>
              ))}

              {/* Mobile Register Button */}
              <button
                className='mt-4 w-full py-4 text-[#1a1a2e] font-pixel-emulator tracking-widest text-sm relative overflow-hidden'
                style={{
                  background: 'linear-gradient(135deg, #d2ff52 0%, #a8d935 100%)',
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <a target='_blank' rel='noopener noreferrer' href="https://unstop.com/o/8YEQtVf?lb=xk26YO1e&utm_medium=Share&utm_source=abhadho42350&utm_campaign=Online_coding_challenge">
                  <span className="absolute top-0 left-0 w-2 h-2 bg-[#1a1a2e] opacity-30" />
                  REGISTER NOW
                </a>
              </button>
            </div>
          </div>
        )}
      </nav>
      <div className={`header-top ${isScrolled ? 'scrolled' : ''}`}></div>
    </>
  );
}