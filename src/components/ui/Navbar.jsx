'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    { label: 'Partners', href: '#partners' },
  ];

  return (
    <>
      <nav
        className={`w-full flex fixed font-quinque h-[9vh] md:pt-[15px] text-sm ${className} justify-between items-stretch md:pl-[4vw] text-[#f8f8f8] transition-all duration-300 ${isScrolled ? 'top-[3.5vh] z-[100]' : 'md:absolute top-0 md:mt-[3.5vh] z-99 md:z-1'}`}
        style={{
          background: 'transparent',
        }}
      >

        <div className="hidden md:flex w-max h-full items-center">
          <Image src="/assets/Logos/hackvision_logo.webp" width={192} height={48} className="w-48" alt="HackVision" />
        </div>

        <div id="nav" className="hidden md:flex flex-1 w-auto justify-end h-full">

          {/* Glassmorphic Menu Bar */}
          <div
            className="flex h-full text-[0.8vw] w-[57vw] justify-between items-center pl-[50px] space-x-4 pr-[20px] relative overflow-hidden"
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
                  const target = document.querySelector(link.href);

                  if (link.href === '#tracks' && target) {
                    // Scroll so the bottom of tracks section aligns with viewport bottom
                    const targetRect = target.getBoundingClientRect();
                    const offset = -(window.innerHeight - targetRect.height);
                    if (lenis) {
                      lenis.scrollTo(link.href, { duration: 1.2, offset });
                    } else {
                      const scrollPosition = window.scrollY + targetRect.top + targetRect.height - window.innerHeight;
                      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                    }
                  } else if (lenis) {
                    lenis.scrollTo(link.href, { duration: 1.2 });
                  } else {
                    target?.scrollIntoView({ behavior: 'smooth' });
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
            className='flex items-center gap-2 md:text-[0.8vw] text-white hover:text-[#1a1a2e] bg-[#00b4d8] transition-all duration-300 cursor-pointer px-6 py-2 relative overflow-hidden group'
            style={{
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
            }}
          >
            <a className='w-full' target='_blank' rel='noopener noreferrer' href="https://unstop.com/o/8YEQtVf?lb=xk26YO1e&utm_medium=Share&utm_source=abhadho42350&utm_campaign=Online_coding_challenge">
              {/* Hover overlay */}
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              {/* Pixel effect top-left */}
              <span className="absolute top-0 left-0 w-2 h-2 bg-[#1a1a2e] opacity-30" />
              {/* Button content */}
              <span className="relative z-10 font-pixel-emulator text-[#1a1a2e] tracking-widest text-[0.9vw]">REGISTER</span>
              {/* Arrow icon */}
              <span className="relative z-10 text-[#1a1a2e] group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </button>
        </div>

        <div
          className="md:hidden flex w-full h-full items-center justify-between px-[4vw]"
          style={{
            background: isMobileMenuOpen
              ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)'
              : 'transparent',
            backdropFilter: isMobileMenuOpen ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isMobileMenuOpen ? 'blur(12px)' : 'none',
            borderBottom: isMobileMenuOpen ? '2px solid rgba(0, 180, 216, 0.5)' : 'none',
          }}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/assets/Logos/hackvision_logo.webp" width={160} height={40} className="w-36" alt="HackVision" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center w-10 h-10 text-white z-[101] relative"
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

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden ${isScrolled ? 'fixed' : 'absolute'} ${isScrolled ? 'top-[calc(3.5vh+9vh)]' : 'top-full'} left-0 right-0 w-full shadow-lg z-[99]`}
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
                    const target = document.querySelector(link.href);

                    if (link.href === '#tracks' && target) {
                      // Scroll so the bottom of tracks section aligns with viewport bottom
                      const targetRect = target.getBoundingClientRect();
                      const offset = -(window.innerHeight - targetRect.height);
                      if (lenis) {
                        lenis.scrollTo(link.href, { duration: 1.2, offset });
                      } else {
                        const scrollPosition = window.scrollY + targetRect.top + targetRect.height - window.innerHeight;
                        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                      }
                    } else if (lenis) {
                      lenis.scrollTo(link.href, { duration: 1.2 });
                    } else {
                      target?.scrollIntoView({ behavior: 'smooth' });
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