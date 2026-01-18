'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Trophy3D from './Trophy3D';
import Podium3D from './Podium3D';
gsap.registerPlugin(ScrollTrigger);

const Prizes = ({ className = "" }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prizesWrapRef = useRef<HTMLDivElement | null>(null);
  const podiumsRef = useRef<(HTMLDivElement | null)[]>([]);
  const infosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const prizesWrap = prizesWrapRef.current;
    const podiums = podiumsRef.current.filter(Boolean);
    const infos = infosRef.current.filter(Boolean);

    if (!section || !prizesWrap) return;

    // Initial states
    gsap.set(podiums, { y: 100, opacity: 0 });
    gsap.set(infos, { opacity: 0, y: -20 });

    let triggers: ScrollTrigger[] = [];

    requestAnimationFrame(() => {
      const prizesFadeInTrigger = ScrollTrigger.create({
        trigger: prizesWrap,
        start: 'top 50%',
        onEnter: () => {
          // Staggered animation - podiums slide up first (slower)
          const tl = gsap.timeline();
          tl.to(podiums, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            delay: 0.2,
          })
            // Then trophy and info fade in after
            .to(infos, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
            }, '-=0.3');
        },
        onLeaveBack: () => {
          gsap.to(podiums, { y: 100, opacity: 0, duration: 0.3 });
          gsap.to(infos, { opacity: 0, y: -20, duration: 0.3 });
        },
      });

      triggers.push(prizesFadeInTrigger);

      // Desktop-only pinning
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
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
        },
      });
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 200);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      triggers.forEach(trigger => trigger?.kill());
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) {
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
         ${className} flex flex-col h-max overflow-hidden z-4`}
    >
      <img src="/assets/home/About/transition1.png" className="absolute w-full h-max object-cover z-4" alt="Transition" width={1000} height={1000} />
      <div className='relative w-full h-[70vh] md:h-max z-3'>
        <img src="/assets/home/Prizes/prizesbg-1.png" className='w-full h-full md:h-max relative object-cover object-top' alt="" />
        <div className='absolute bottom-0 w-full h-max hidden md:flex items-center justify-center'>
          <div ref={prizesWrapRef} className="relative z-10 w-full flex flex-row gap-10 px-[8vw] translate-y-10 justify-center items-end h-auto">
            <div className='flex flex-col w-full h-auto justify-center items-center order-1'>
              <div ref={el => { infosRef.current[0] = el; }} className='flex flex-col-reverse gap-12 justify-center items-center'>
                <div className='w-28 h-auto mb-8'>
                  <img className="w-full h-full object-contain" src="/assets/home/Prizes/silver.gif" alt="Silver" />
                </div>
                <div className='flex flex-col gap-2 items-center'>
                  <span className='text-[3.2vh] bstrokeds text-white font-pixel-emulator'>
                    <span>2nd Place</span>
                  </span>
                  <span className='text-[1.8vw] font-quinque bstrokeds text-[#BFC3C7]'>
                    <span>25,000 RS</span>
                  </span>
                </div>
              </div>
              <div ref={el => { podiumsRef.current[0] = el; }} className='w-full h-[25vh]'>
                <Podium3D color='#BFC3C7' className='w-full h-full' />
              </div>
            </div>
            <div className="flex flex-col w-full items-center justify-center order-2">
              <div ref={el => { infosRef.current[1] = el; }} className='flex flex-col justify-center items-center font-quinque'>
                <span className='text-[3.6vh] text-white font-pixel-emulator bstrokeds'>
                  <span>1st Place</span>
                </span>
                <span className='text-[2.2vw] bstrokeds text-[#D4AF37]'>
                  <span>50,000 RS</span>
                </span>
              </div>
              <div ref={el => { infosRef.current[2] = el; }} className="w-full max-w-md h-[30vh]">
                <Trophy3D modelPath='/assets/home/Prizes/trophy.glb' className='w-full h-full' />
              </div>
              <div ref={el => { podiumsRef.current[1] = el; }} className='w-full h-[30vh]'>
                <Podium3D color='#D4AF37' className='w-full h-full' />
              </div>
            </div>
            <div className='flex flex-col w-full h-auto justify-center items-center order-3'>

              <div ref={el => { infosRef.current[3] = el; }} className='flex flex-col-reverse gap-12 justify-center items-center'>
                <div className='w-28 h-auto mb-8'>
                  <img className="w-full h-full object-contain" src="/assets/home/Prizes/bronze.gif" alt="Bronze" />
                </div>
                <div className='flex flex-col gap-2 items-center'>
                  <span className='text-[3.2vh] bstrokeds text-white font-pixel-emulator'>
                    <span>3rd Place</span>
                  </span>
                  <span className='text-[1.8vw] font-quinque bstrokeds text-[#9C6B3D]'>
                    <span>15,000 RS</span>
                  </span>
                </div>

              </div>
              <div ref={el => { podiumsRef.current[2] = el; }} className='w-full h-[25vh]'>
                <Podium3D color='#9C6B3D' className='w-full h-full' />
              </div>
            </div>
          </div>
        </div>
        <div className='absolute opacity-60 bottom-0 w-full flex justify-center text-[13vw]/[14vw] shadow-2xl font-quinque'>
          <span>PRIZES</span>
        </div>
      </div>
      <div className='relative w-full h-[30vh] md:h-max z-2'>
        <img src="/assets/home/Prizes/prizesbg-2.png" className='w-full h-full md:h-max relative object-cover object-bottom' alt="" />
      </div>

      {/* Mobile Prizes Layout - centered */}
      <div ref={prizesWrapRef} className='absolute inset-0 w-full flex md:hidden flex-col items-center justify-center px-4 py-6 gap-4'>
        {/* Top section - Trophy only */}
        <div className="w-[220px] h-auto aspect-square shrink-0">
          <Trophy3D modelPath='/assets/home/Prizes/trophy.glb' className="w-full h-full" />
        </div>

        {/* Bottom section - Prize boxes */}
        <div className="w-full max-w-md flex flex-col gap-2 mt-4">
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
              <span className='text-[2.2vh] font-quinque bstrokeds text-[#BFC3C7]'>
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

      {/* Desktop Prizes Layout - centered */}


    </section>
  );
};

export default Prizes;