'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Trophy3D from './Trophy3D';
gsap.registerPlugin(ScrollTrigger);

const Prizes = ({ className = "" }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ufoContainerRef = useRef<HTMLDivElement | null>(null);
  const ufoOnlyRef = useRef<HTMLDivElement | null>(null);
  const ufoOnRef = useRef<HTMLImageElement | null>(null);
  const ufoLightRef = useRef<HTMLDivElement | null>(null);
  const prizesWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ufoContainer = ufoContainerRef.current;
    const ufoOnly = ufoOnlyRef.current;
    const ufoOn = ufoOnRef.current;
    const ufoLight = ufoLightRef.current;
    const prizesWrap = prizesWrapRef.current;

    if (!section || !ufoContainer || !ufoOnly || !ufoLight || !prizesWrap) return;

    gsap.set(ufoOnly, { opacity: 0, scale: 0.7 });
    gsap.set(ufoLight, { clipPath: 'inset(0px 0px 100% 0px)' });
    gsap.set(prizesWrap, { opacity: 0 });

    let triggers: ScrollTrigger[] = [];
    let ufoFadeInTimeline: gsap.core.Timeline | null = null;
    let prizesFadeTimeout: NodeJS.Timeout | null = null;

    requestAnimationFrame(() => {

      ufoFadeInTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ufoOnly,
          start: 'bottom bottom',
          end: 'top 30%',
          scrub: true,
        },
      });

      ufoFadeInTimeline
        .to(ufoOnly, {
          opacity: 1,
          scale: 1,
          ease: 'none',
          duration: 1,
        }, 0)
        .to(ufoOn, {
          opacity: 1,
          ease: 'none',
          duration: 1,
        }, 0.6);

      triggers.push(ufoFadeInTimeline.scrollTrigger!);

      const ufoPinTrigger = ScrollTrigger.create({
        trigger: ufoContainer,
        start: 'top top',
        endTrigger: section,
        end: 'bottom bottom',
        pin: ufoContainer,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });
      triggers.push(ufoPinTrigger);

      const ufoLightTrigger = ScrollTrigger.create({
        trigger: ufoContainer,
        start: 'top 40%',
        onEnter: () => {
          gsap.to(ufoLight, {
            clipPath: 'inset(0px 0px 0% 0px)',
            duration: 0.9,
            ease: 'cubic-bezier(0.7, 0, 0.84, 0)',
          });
        },
        onLeaveBack: () => {
          gsap.to(ufoLight, {
            clipPath: 'inset(0px 0px 100% 0px)',
            duration: 0.6,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          });
        },
      });

      triggers.push(ufoLightTrigger);

      const prizesFadeInTrigger = ScrollTrigger.create({
        trigger: ufoContainer,
        start: 'top 40%',
        onEnter: () => {
          if (prizesFadeTimeout) {
            clearTimeout(prizesFadeTimeout);
          }
          prizesFadeTimeout = setTimeout(() => {
            gsap.to(prizesWrap, {
              opacity: 1,
              duration: 0.7,
              ease: 'cubic-bezier(0.7, 0, 0.84, 0)',
            });
          }, 600);
        },
        onLeaveBack: () => {
          if (prizesFadeTimeout) {
            clearTimeout(prizesFadeTimeout);
            prizesFadeTimeout = null;
          }
          gsap.to(prizesWrap, {
            opacity: 0,
            duration: 0.5,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            immediateRender: false,
          });
        },
      });

      triggers.push(prizesFadeInTrigger);

      const tracksSection = document.getElementById('tracks');
      if (tracksSection) {
        const sectionPinTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          endTrigger: tracksSection,
          end: 'top bottom',
          pin: section,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
        triggers.push(sectionPinTrigger);
      }
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    // Debounced resize observer
    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 200);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      triggers.forEach(trigger => trigger?.kill());
      ufoFadeInTimeline?.kill();
      if (prizesFadeTimeout) {
        clearTimeout(prizesFadeTimeout);
      }
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section || st.trigger === ufoContainer || st.trigger === ufoOnly) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className={`w-full relative 
         ${className} flex flex-col bg-black h-screen overflow-hidden z-4`}
    >
      <div className='w-full h-screen'>
        <img src="/assets/home/Prizes/prizesbg.png" className='w-full h-full object-cover' alt="" />
      </div>

      {/* Mobile UFO Container - visible on mobile */}
      <div className="absolute top-0 left-0 w-full h-screen flex md:hidden flex-col items-center">
        {/* UFO for mobile */}
        <div className="relative w-[80vw] h-auto shrink-0 mt-4">
          <img
            src="/assets/home/Prizes/onlyufo.png"
            className="w-full h-full object-contain z-2"
            alt=""
          />
        </div>
        {/* Light beam for mobile */}
        <div className="relative flex-1 w-full -mt-0.5 overflow-hidden">
          <img
            src="/assets/home/Prizes/ufolight2.png"
            className="w-full h-full object-contain object-top"
            alt=""
          />
        </div>
      </div>

      {/* Desktop UFO Container */}
      <div
        ref={ufoContainerRef}
        className="absolute top-0 left-0 w-full h-screen hidden md:flex flex-col items-center pb-5"
      >
        {/* UFO (natural height, stays at top) */}
        <div
          ref={ufoOnlyRef}
          className="relative w-[50vw] h-auto shrink-0 opacity-0"
          style={{ transform: 'scale(0.7)' }}
        >
          <img
            ref={ufoOnRef}
            src="/assets/home/Prizes/onlyufo.png"
            className="absolute top-0 left-0 w-full h-full object-contain z-2 opacity-0"
            alt=""
          />
          <img
            src="/assets/home/Prizes/ufo_off.png"
            className="w-full h-full object-contain"
            alt=""
          />
        </div>

        {/* Light takes remaining height */}
        <div
          ref={ufoLightRef}
          className="relative flex-1 w-full -mt-0.5 overflow-hidden"
          style={{ clipPath: 'inset(0px 0px 100% 0px)' }}
        >
          <img
            src="/assets/home/Prizes/ufolight2.png"
            className="w-full h-full object-contain object-top"
            alt=""
          />
        </div>
      </div>

      {/* Mobile Prizes Layout - matching reference design */}
      <div className='absolute inset-0 w-full flex md:hidden flex-col items-center justify-end px-4 py-6 gap-4'>
        {/* Top section - Trophy only */}
        <div className="w-[180px] h-auto aspect-square shrink-0">
          <Trophy3D modelPath='/assets/home/Prizes/trophy.glb' className="w-full h-full" />
        </div>

        {/* Bottom section - Prize boxes */}
        <div className="w-full flex flex-col gap-2 mt-4">
          {/* 1st Place Box */}
          <div className="w-full bg-[#1a3a8a]/80 backdrop-blur-sm border-2 border-[#4a7fff] rounded-lg p-3 flex items-center gap-4">
            <div className='w-12 h-12 shrink-0'>
              <img className="w-full h-full object-contain" src="/assets/home/Prizes/gold.gif" alt="Gold" />
            </div>
            <div className='flex flex-col'>
              <span className='text-[1.8vh] text-white font-pixel-emulator'>
                1st Place
              </span>
              <span className='text-[2.2vh] font-quinque text-[#D4AF37]'>
                50,000 RS
              </span>
            </div>
          </div>

          {/* 2nd Place Box */}
          <div className="w-full bg-[#3a6adf]/60 backdrop-blur-sm border-2 border-[#6a9fff] rounded-lg p-3 flex items-center gap-4">
            <div className='w-12 h-12 shrink-0'>
              <img className="w-full h-full object-contain" src="/assets/home/Prizes/silver.gif" alt="Silver" />
            </div>
            <div className='flex flex-col'>
              <span className='text-[1.8vh] text-white font-pixel-emulator'>
                2nd Place
              </span>
              <span className='text-[2.2vh] font-quinque text-[#BFC3C7]'>
                25,000 RS
              </span>
            </div>
          </div>

          {/* 3rd Place Box */}
          <div className="w-full bg-[#5a8aff]/50 backdrop-blur-sm border-2 border-[#8ab0ff] rounded-lg p-3 flex items-center gap-4">
            <div className='w-12 h-12 shrink-0'>
              <img className="w-full h-full object-contain" src="/assets/home/Prizes/bronze.gif" alt="Bronze" />
            </div>
            <div className='flex flex-col'>
              <span className='text-[1.8vh] text-white font-pixel-emulator'>
                3rd Place
              </span>
              <span className='text-[2.2vh] font-quinque text-[#9C6B3D]'>
                15,000 RS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Prizes Layout */}
      <div ref={prizesWrapRef} id='prizes_wrap' className='absolute bottom-0 w-full hidden md:flex items-center justify-center opacity-0'>
        <div className="relative z-10 w-full flex flex-row gap-10 px-[8vw] justify-center items-center h-auto">
          <div className='flex flex-col w-full h-auto justify-center items-center order-1'>
            <div className='w-28 h-auto mb-8'>
              <img className="w-full h-full object-contain" src="/assets/home/Prizes/silver.gif" alt="Silver" />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <span className='text-[3.2vh] bstrokeds text-white font-pixel-emulator'>
                <span>2nd Place</span>
              </span>
              <span className='text-[1.8vw] font-quinque bstroke text-[#BFC3C7]'>
                <span>25,000 RS</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center order-2">
            <div className='flex flex-col justify-center items-center font-quinque'>
              <span className='text-[3.6vh] text-white font-pixel-emulator bstrokeds'>
                <span>1st Place</span>
              </span>
              <span className='text-[2.2vw] bstroke text-[#D4AF37]'>
                <span>50,000 RS</span>
              </span>
            </div>
            <div className="w-full">
              <Trophy3D modelPath='/assets/home/Prizes/trophy.glb' />
            </div>
          </div>
          <div className='flex flex-col w-full h-auto justify-center items-center order-3'>
            <div className='w-28 h-auto mb-8'>
              <img className="w-full h-full object-contain" src="/assets/home/Prizes/bronze.gif" alt="Bronze" />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <span className='text-[3.2vh] bstrokeds text-white font-pixel-emulator'>
                <span>3rd Place</span>
              </span>
              <span className='text-[1.8vw] font-quinque bstroke text-[#9C6B3D]'>
                <span>15,000 RS</span>
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Prizes;