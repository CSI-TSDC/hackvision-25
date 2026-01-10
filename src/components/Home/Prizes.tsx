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
  const ufoLightRef = useRef<HTMLDivElement | null>(null);
  const prizesWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ufoContainer = ufoContainerRef.current;
    const ufoOnly = ufoOnlyRef.current;
    const ufoLight = ufoLightRef.current;
    const prizesWrap = prizesWrapRef.current;

    if (!section || !ufoContainer || !ufoOnly || !ufoLight || !prizesWrap) return;

    // Set initial styles
    gsap.set(ufoOnly, { opacity: 0, scale: 0.7 });
    gsap.set(ufoLight, { clipPath: 'inset(100% 0px 0px)' });
    gsap.set(prizesWrap, { opacity: 0 });

    let triggers: ScrollTrigger[] = [];
    let ufoFadeInTimeline: gsap.core.Timeline | null = null;

    // Wait for layout to be ready
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      // Animation 1: When prizes section comes into viewport from bottom
      // Animate ufo-only div: opacity 0→1, scale 0.7→1 smoothly
      // End when ufo-only div top reaches 30% viewport
      // Use ufoOnly as trigger to ensure it reaches 30% viewport correctly
      ufoFadeInTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ufoOnly,
          start: 'bottom bottom',
          end: 'top 30%',
          scrub: true,
        },
      });

      ufoFadeInTimeline.to(ufoOnly, {
        opacity: 1,
        scale: 1,
        ease: 'none', // Linear interpolation for smooth lerp
        duration: 1,
      });

      triggers.push(ufoFadeInTimeline.scrollTrigger!);

      // Pin ufo container for exactly 300vh
      // Remove scrub from pin trigger (pins don't need scrub)
      const ufoPinTrigger = ScrollTrigger.create({
        trigger: ufoContainer,
        start: 'top top',
        end: () => `+=${window.innerHeight * 3}`, // 300vh = 3 * viewport height in pixels
        pin: ufoContainer,
        pinSpacing: true,
        invalidateOnRefresh: true, // Recalculate on resize
      });
      triggers.push(ufoPinTrigger);

      // Animation 3: When ufo container reaches top top (gets pinned)
      // Animate ufo light clip-path from bottom smoothly over +=30vh
      // Use direct progress interpolation for smoother lerp
      const ufoLightTrigger = ScrollTrigger.create({
        trigger: ufoContainer,
        start: 'top top',
        end: () => `+=${window.innerHeight * 0.3}`, // 30vh in pixels
        scrub: 0.3, // Smooth scrubbing with lag for smoother interpolation
        onUpdate: (self) => {
          // Smooth interpolation function for better lerp
          const progress = self.progress;
          // Apply smooth easing function for better interpolation
          const smoothProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2; // Smooth ease-in-out
          
          const insetValue = 100 - (smoothProgress * 100); // 100% → 0%
          gsap.set(ufoLight, {
            clipPath: `inset(0px 0px ${insetValue}% 0px)`,
          });
        },
      });

      triggers.push(ufoLightTrigger);

      // Show prizes wrap when section enters viewport smoothly
      const prizesFadeIn = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        onEnter: () => {
          gsap.to(prizesWrap, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
      });
      triggers.push(prizesFadeIn);

      // Pin section (which includes prizesWrap) when section bottom reaches viewport bottom
      // End when tracks section bottom reaches viewport bottom
      // Use requestAnimationFrame to ensure tracks section is rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const tracksSection = document.getElementById('tracks');
          
          if (tracksSection) {
            const sectionPinTrigger = ScrollTrigger.create({
              trigger: section,
              start: 'bottom bottom',
              endTrigger: tracksSection,
              end: 'bottom bottom',
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
         ${className} flex flex-col bg-black min-h-screen z-4`}
    >
      <div className='w-full h-screen'>
          <img src="/assets/home/Prizes/prizesbg.png" className='w-full h-full object-cover' alt="" />
        </div>
      <div ref={ufoContainerRef} className='absolute top-0 w-full h-max flex flex-col justify-center items-center'>
        <div ref={ufoOnlyRef} className='relative w-[50vw] h-auto opacity-0' style={{ transform: 'scale(0.7)' }}>
          <img src="/assets/home/Prizes/onlyufo.png" className='w-full h-full object-contain' alt="" />
        </div>
        <div ref={ufoLightRef} className='relative flex-1 -mt-0.5 ' style={{ clipPath: 'inset(100% 0px 0px)' }}>
          <img src="/assets/home/Prizes/ufolight.png" className='w-full h-full object-contain' alt="" />
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
                <span className='text-[3.2vh] font-pixel-emulator'>
                  <span>1st Place</span>
                </span>
                <span className='text-[2vw] bstroke text-[#D4AF37]'>
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