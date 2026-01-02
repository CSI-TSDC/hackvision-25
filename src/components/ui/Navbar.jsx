'use client';

import { useState, useEffect } from 'react';

export default function Navbar({ className="" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`w-full flex ${isScrolled ? 'fixed' : 'absolute'} ${isScrolled ? 'top-[3.5vh]' : 'top-0'} font-quinque h-[9vh] ${isScrolled ? '' : 'mt-[3.5vh]'} pt-[15px] text-sm ${className} justify-between items-stretch px-[4vw] font-quinque text-[#f8f8f8] ${isScrolled ? 'z-[100]' : 'z-1'}`}>
        <div className="w-max h-full flex items-center">
          <img src="/assets/home/hackvision_logo.png" className="w-48" alt="" />
        </div>
        <div id="nav" className="flex flex-1 w-auto justify-end h-full -mr-13">
          {/* Desktop Menu */}
          <div className="hidden md:flex h-full text-[0.8vw] w-[55vw] justify-between items-center pl-[50px] space-x-4 pr-[20px]" style={{ backgroundColor: 'rgba(71, 85, 105, 0.8)' }}>
            <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer">
              <span>About</span>
            </a>
            <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer">
              <span>Prizes</span>
            </a>
            <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer">
              <span>Tracks</span>
            </a>
            <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer">
              <span>Timeline</span>
            </a>
            <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer">
              <span>Sponsors</span>
            </a>
          </div>
          <button className='hidden md:block bg-black md:text-[0.8vw] border-white border text-white hover:text-white transition-colors duration-200 cursor-pointer px-4 py-2'>
            <span>Register</span>
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 text-white z-[101] relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${isScrolled ? 'fixed' : 'absolute'} ${isScrolled ? 'top-[calc(3.5vh+9vh+15px)]' : 'top-full'} left-0 w-full shadow-lg z-[99]`} style={{ backgroundColor: 'rgba(71, 85, 105, 0.95)' }}>
            <div className="flex flex-col px-[4vw] py-4 space-y-4">
              <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <span>About</span>
              </a>
              <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Prizes</span>
              </a>
              <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Tracks</span>
              </a>
              <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Timeline</span>
              </a>
              <a href="" className="hover:text-[#FF8C00] transition-colors duration-200 cursor-pointer text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Sponsors</span>
              </a>
              <button className='bg-black border-white border text-white hover:text-white transition-colors duration-200 cursor-pointer px-4 py-2 w-full' onClick={() => setIsMobileMenuOpen(false)}>
                <span>Register</span>
              </button>
            </div>
          </div>
        )}
      </nav>
      <div className={`header-top ${isScrolled ? 'scrolled' : ''}`}></div>
    </>
  );
}