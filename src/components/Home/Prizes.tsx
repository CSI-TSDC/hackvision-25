'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Trophy3D from './Trophy3D';

gsap.registerPlugin(ScrollTrigger);

const Prizes = ({ className = "" }) => {
  const prizesWrapRef = useRef<HTMLDivElement>(null);
  const whiteTextRef = useRef<HTMLHeadingElement>(null);
  const blueTextRef = useRef<HTMLHeadingElement>(null);
  const blackTextRef = useRef<HTMLHeadingElement>(null);
    
  useEffect(() => {
    if (!prizesWrapRef.current || !whiteTextRef.current || !blueTextRef.current || !blackTextRef.current) return;

    // Pin the prizes_wrap section
    const pinTrigger = ScrollTrigger.create({
      trigger: prizesWrapRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
    });

    // First scroll: Move blue and black layers up by 8px
    gsap.to([blueTextRef.current, blackTextRef.current], {
      y: -8,
      scrollTrigger: {
        trigger: prizesWrapRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: true,
      },
    });

    // Second scroll: Move black layer up by another 8px (total 16px from start)
    gsap.to(blackTextRef.current, {
      y: -16,
      scrollTrigger: {
        trigger: prizesWrapRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: true,
      },
    });

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === prizesWrapRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="prizes"
      className={`min-h-[300vh] w-full relative 
         ${className} flex flex-col bg-[#8ac926]`}
    >
      <div className="grid-bg"></div>
      <div id='prizes_wrap' ref={prizesWrapRef}>
        <div className="relative z-10 px-[8vw] py-10 mt-35">
          <div className="relative inline-block">
            {/* White layer - stays on top initially */}
            <h1 ref={whiteTextRef} className="absolute text-white text-6xl md:text-8xl font-bold font-quinque left-0 z-10">
              Prizes
            </h1>
            {/* Blue layer - initially stacked below white */}
            <h1 ref={blueTextRef} className="absolute text-blue-500 text-6xl md:text-8xl font-bold font-quinque left-0 top-0 z-[5]">
              Prizes
            </h1>
            {/* Black layer - initially stacked below blue */}
            <h1 ref={blackTextRef} className="relative text-black text-6xl md:text-8xl font-bold font-quinque left-0 top-0 z-[1]">
              Prizes
            </h1>
          </div>
        </div>
        
        {/* Two column layout */}
        <div className="relative z-10 w-full flex flex-row gap-4 px-[8vw] pb-10">
          <div className="w-1/2 flex items-center justify-center">
            <Trophy3D modelPath='/assets/home/Prizes/trophy.glb' />
          </div>
          
          <div className="w-1/2 flex flex-col items-center justify-center gap-6">
            {/* <div className="pixel-box-border px-8 py-6 min-w-[300px]">
              <div className="relative z-10 text-white font-pixel-emulator text-center">
                <div className="text-2xl mb-2">1st Place</div>
                <div className="text-3xl font-bold">50,000 Rs</div>
              </div>
            </div>

            <div className="pixel-box-border px-8 py-6 min-w-[300px]">
              <div className="relative z-10 text-white font-pixel-emulator text-center">
                <div className="text-2xl mb-2">2nd Place</div>
                <div className="text-3xl font-bold">25,000 Rs</div>
              </div>
            </div>

            <div className="pixel-box-border px-8 py-6 min-w-[300px]">
              <div className="relative z-10 text-white font-pixel-emulator text-center">
                <div className="text-2xl mb-2">3rd Place</div>
                <div className="text-3xl font-bold">15,000 Rs</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Prizes;