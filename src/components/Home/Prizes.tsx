'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Prizes = ({ className = "" }) => {
    const sectionRef = useRef<HTMLElement | null>(null);
  
    useEffect(() => {
        if (!sectionRef.current) return;
      
        const prev = sectionRef.current.previousElementSibling as HTMLElement | null;
        if (!prev) return;
      
        gsap.fromTo(
          sectionRef.current,
          { yPercent: -100 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: prev,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }, []);

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className={`min-h-screen daybg w-full pt-[13vh] relative 
         ${className} flex flex-col justify-between items-center`}
    >
      <div className="w-full h-max">
        <div className="h-max flex flex-col justify-center items-center text-center mb-18 px-6 leading-tight">
          <h1 className="text-[12vw] font-bold text-[#ffe600] uppercase font-pixel-emulator">
            Prizes
          </h1>
        </div>

          {/* Prize Cards */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-18 font-quinque relative z-10 mb-15">
            {/* 2nd Place */}
            <div className="text-center p-2 w-72">
                <img src='/assets/home/silver.gif' alt="2nd Place" className="w-32 mx-auto mb-4 rotating-coin" />
                <h2 className="bstroke text-[2.2vh] tracking-wider font-bold mb-2 text-[#FF8C00]">2ND PLACE</h2>
                <p className="bstroke text-[#FF8C00] text-[2.5vh] tracking-wider">25,000 RS</p>
            </div>

            {/* 1st Place */}
            <div className="text-center p-2 w-80">
                <img src='/assets/home/gold.gif' alt="1st Place Winner" className="w-44 mx-auto mb-4" />
                <h2 className="bstroke text-[2.2vh] tracking-wider mb-2 text-[#FF8C00]">1ST PLACE</h2>
                <p className="bstroke text-[#FF8C00] text-[2.5vh] tracking-wider">50,000 RS</p>
            </div>

            {/* 3rd Place */}
            <div className="text-center p-2 w-72">
                <img src="/assets/home/bronze.gif" alt="3rd Place" className="w-32 mx-auto mb-4" />
                <h2 className="bstroke text-[2.2vh] tracking-wider mb-2 text-[#FF8C00]">3RD PLACE</h2>
                <p className="bstroke text-[#FF8C00] text-[2.5vh] tracking-wider">15,000 RS</p>
            </div>
        </div>
        </div>
    </section>
  );
};

export default Prizes;