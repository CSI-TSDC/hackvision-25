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
      ScrollTrigger.refresh();

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
        start: 'top top',
        onEnter: () => {
          gsap.to(ufoLight, {
            clipPath: 'inset(0px 0px 0% 0px)',
            duration: 1.3,
            ease: 'power3.in', // Smooth interpolation
          });
        },
        onLeaveBack: () => {
          gsap.to(ufoLight, {
            clipPath: 'inset(0px 0px 100% 0px)',
            duration: 0.6,
            ease: 'power3.out', // Smooth interpolation
          });
        },
      });

      triggers.push(ufoLightTrigger);

      const prizesFadeInTrigger = ScrollTrigger.create({
        trigger: ufoContainer,
        start: 'top top',
        onEnter: () => {
          if (prizesFadeTimeout) {
            clearTimeout(prizesFadeTimeout);
          }
          // Wait 1.2s after ufo hits top top, then animate opacity to 1
          prizesFadeTimeout = setTimeout(() => {
            gsap.to(prizesWrap, {
              opacity: 1,
              duration: 0.7,
              ease: 'power3.in',
            });
          }, 600);
        },
        onLeaveBack: () => {
          // Clear timeout immediately if scrolling back up (no delay)
          if (prizesFadeTimeout) {
            clearTimeout(prizesFadeTimeout);
            prizesFadeTimeout = null;
          }
          // Reverse immediately: animate back to opacity 0 when scrolling back up
          gsap.to(prizesWrap, {
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out',
            immediateRender: false,
          });
        },
      });

      triggers.push(prizesFadeInTrigger);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const tracksSection = document.getElementById('tracks');

          if (tracksSection) {
            const sectionPinTrigger = ScrollTrigger.create({
              trigger: section,
              start: 'bottom bottom',
              endTrigger: tracksSection,
              end: 'top top',
              pin: section,
              pinSpacing: false,
              invalidateOnRefresh: true,
            });
            triggers.push(sectionPinTrigger);
            ScrollTrigger.refresh(); // Refresh after adding new trigger
          } else {
            console.warn('Tracks section not found for prizes pin trigger');
          }
        });
      });
    });

    return () => {
      triggers.forEach(trigger => trigger?.kill());
      ufoFadeInTimeline?.kill();
      if (prizesFadeTimeout) {
        clearTimeout(prizesFadeTimeout);
      }
      // Kill any remaining triggers for these elements
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
      <div
        ref={ufoContainerRef}
        className="absolute top-0 left-0 w-full h-screen flex flex-col items-center pb-5"
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
            className="w-full h-full object-contain"
            alt=""
          />
        </div>
      </div>
      <div ref={prizesWrapRef} id='prizes_wrap' className='absolute bottom-0 w-full items-center justify-center opacity-0'>
        <div className="relative z-10 w-full flex flex-row gap-10 px-[8vw]">
          <div className='flex flex-col w-full h-auto justify-center items-center'>
            <div className='w-28 h-auto mb-8'>
              <img className="w-full h-full object-contain" src="/assets/home/Prizes/silver.gif" alt="Silver" />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <span className='text-[3.2vh] font-pixel-emulator'>
                <span>2nd Place</span>
              </span>
              <span className='text-[1.8vw] font-quinque bstroke text-[#BFC3C7]'>
                <span>25,000 RS</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center">
            <div className='flex flex-col justify-center items-center font-quinque'>
              <span className='text-[3.6vh] font-pixel-emulator bstrokeds'>
                <span>1st Place</span>
              </span>
              <span className='text-[2.9vh] md:text-[2.2vw] bstroke text-[#D4AF37]'>
                <span>50,000 RS</span>
              </span>
            </div>
            <Trophy3D modelPath='/assets/home/Prizes/trophy.glb' />
          </div>
          <div className='flex flex-col w-full h-auto justify-center items-center'>
            <div className='w-28 h-auto mb-8'>
              <img className="w-full h-full object-contain" src="/assets/home/Prizes/bronze.gif" alt="Bronze" />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <span className='text-[3.2vh] font-pixel-emulator'>
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