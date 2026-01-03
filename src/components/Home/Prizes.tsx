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
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: prizesWrapRef.current,
        start: 'top top',
        end: '+=300vh',
        pin: true,
        anticipatePin: 1,
        onEnter: () => {
          gsap.to(blueTextRef.current, {
            y: -10,
            duration: 0.6,
            ease: 'power3.out',
          });
  
          gsap.to(whiteTextRef.current, {
            y: -20,
            duration: 0.6,
            ease: 'power3.out',
          });
        },
        onLeaveBack: () => {
          gsap.to([whiteTextRef.current, blueTextRef.current], {
            y: 0,
            duration: 0.5,
            ease: 'power3.inOut',
          });
        },
      });
    });
  
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="prizes"
      className={`w-full relative 
         ${className} flex flex-col bg-[#8ac926]`}
    >
      <div className="grid-bg"></div>
      <div id='prizes_wrap' className='py-40' ref={prizesWrapRef}>
        <div className="relative z-10 px-[5vw] mb-10">
          <div className="relative inline-block font-quinque font-bold">
            {/* White layer - stays on top initially */}
            <h1 ref={whiteTextRef} className="absolute text-white text-6xl md:text-8xl left-0 z-10">
              Prizes
            </h1>
            {/* Blue layer - initially stacked below white */}
            <h1 ref={blueTextRef} className="absolute text-blue-500 text-6xl md:text-8xl left-0 top-0 z-[5]">
              Prizes
            </h1>
            {/* Black layer - initially stacked below blue */}
            <h1 ref={blackTextRef} className="relative text-black text-6xl md:text-8xl left-0 top-0 z-[1]">
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