'use client';

import { useEffect, useRef, useState } from 'react';

export default function Navbar({ className="" }) {
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);
  const isStickyRef = useRef(false);
  const triggerScrollY = useRef(0);

  useEffect(() => {

    const handleScroll = () => {
      const navElement = document.getElementById('nav');
      if (!navElement) return;

      const currentScrollY = window.scrollY || window.pageYOffset;

      if (!isStickyRef.current) {
        // Not sticky yet - check if nav element reached the top
        const rect = navElement.getBoundingClientRect();
        
        if (rect.top <= 0) {
          // Store the scroll position where it reached the top
          triggerScrollY.current = currentScrollY + rect.top;
          isStickyRef.current = true;
          setIsSticky(true);
        }
      } else {
        // Already sticky - check if scrolled back up past the trigger point
        if (currentScrollY < triggerScrollY.current) {
          isStickyRef.current = false;
          setIsSticky(false);
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav ref={navRef} className={`w-full flex ${isSticky ? 'fixed' : 'absolute'} ${isSticky ? 'top-0 z-99' : ''} bg-slate-600 font-quinque h-[9vh] ${isSticky ? '' : 'mt-[3.5vh] pt-[15px]'} text-sm ${className} justify-between px-[4vw] font-quinque text-[#f8f8f8] z-1`}>
      <div className="w-max h-full flex items-center">
        <img src="/assets/home/hackvision_logo.png" className="w-48" alt="" />
      </div>
      <div id="nav">
        <div className="flex h-full w-[62vw] justify-between items-center pl-[50px] pr-[7.5vw] space-x-4">
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
      </div>
      {/* <div className="absolute right-0 h-full">
          <a href="">
            <span>Register</span>
          </a>
        </div> */}
    </nav>
  );
}