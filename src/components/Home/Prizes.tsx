'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Trophy3D from './Trophy3D';
import Podium3D from './Podium3D';
gsap.registerPlugin(ScrollTrigger);

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const Prizes = ({ className = "" }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prizesWrapRef = useRef<HTMLDivElement | null>(null);
  const podiumsRef = useRef<(HTMLDivElement | null)[]>([]);
  const infosRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const parallaxTextRef = useRef<HTMLDivElement | null>(null);

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
        start: 'top 70%',
        onEnter: () => {
          // Staggered animation - podiums slide up first (slower)
          const tl = gsap.timeline();
          tl.to(podiums, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            delay: 0.1,
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

      // Parallax effect on PRIZES text - moves slower for depth effect
      if (parallaxTextRef.current) {
        gsap.to(parallaxTextRef.current, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Mobile-only fade in animation
      ScrollTrigger.matchMedia({
        "(max-width: 767px)": function () {
          if (mobileRef.current) {
            gsap.set(mobileRef.current, { opacity: 0, y: 30 });
            const mobileTrigger = ScrollTrigger.create({
              trigger: section,
              start: 'top 60%',
              onEnter: () => {
                gsap.to(mobileRef.current, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'power2.out',
                });
              },
              onLeaveBack: () => {
                gsap.to(mobileRef.current, {
                  opacity: 0,
                  y: 30,
                  duration: 0.4,
                });
              },
            });
            triggers.push(mobileTrigger);
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
      <Image src={`${BASE_PATH}/assets/home/About/transition1.webp`} width={1920} height={200} className="absolute w-full h-max object-cover z-4" alt="Transition" />
      <div className='relative w-full h-[70vh] md:h-max z-3'>
        <Image src={`${BASE_PATH}/assets/home/Prizes/prizesbg-1.webp`} width={1920} priority height={1080} className='w-full h-full md:h-max relative object-cover object-top' alt="Prizes Background" />
        <div className='absolute bottom-0 w-full h-max hidden md:flex items-center justify-center'>
          <div ref={prizesWrapRef} className="relative z-10 w-full max-w-[95vw] lg:max-w-[85vw] flex flex-row gap-4 lg:gap-10 px-[2vw] lg:px-[8vw] translate-y-10 justify-center items-end h-auto">
            <div className='flex flex-col w-[28vw] lg:w-full h-auto justify-center items-center order-1'>
              <div ref={el => { infosRef.current[0] = el; }} className='flex flex-col-reverse gap-6 lg:gap-12 justify-center items-center'>
                <div className='w-20 lg:w-28 h-auto mb-4 lg:mb-8'>
                  <Image className="w-full h-full object-contain" src={`${BASE_PATH}/assets/home/Prizes/silver.gif`} width={112} height={112} alt="Silver" unoptimized />
                </div>
                <div className='flex flex-col gap-1 lg:gap-2 items-center'>
                  <span className='text-[2.5vh] lg:text-[3.2vh] bstrokeds text-white font-pixel-emulator'>
                    <span>2nd Place</span>
                  </span>
                  <span className='text-[2vw] lg:text-[1.8vw] font-quinque bstrokeds text-[#BFC3C7]'>
                    <span>25,000 RS</span>
                  </span>
                </div>
              </div>
              <div ref={el => { podiumsRef.current[0] = el; }} className='w-full h-[12vh] lg:h-[25vh]'>
                <Podium3D color='#BFC3C7' className='w-full h-full' />
              </div>
            </div>
            <div className="flex flex-col w-[32vw] lg:w-full items-center justify-center order-2">
              <div ref={el => { infosRef.current[1] = el; }} className='flex flex-col justify-center items-center font-quinque'>
                <span className='text-[2.8vh] lg:text-[3.6vh] text-white font-pixel-emulator bstrokeds'>
                  <span>1st Place</span>
                </span>
                <span className='w-max text-[2vw] lg:text-[2vw] bstrokeds text-[#D4AF37]'>
                  <span>50,000 RS</span>
                </span>
              </div>
              <div ref={el => { infosRef.current[2] = el; }} className="w-full max-w-[20vw] lg:max-w-md h-[15vh] lg:h-[30vh]">
                <Trophy3D modelPath='/assets/home/Prizes/trophy.glb' className='w-full h-full' />
              </div>
              <div ref={el => { podiumsRef.current[1] = el; }} className='w-full h-[15vh] lg:h-[30vh]'>
                <Podium3D color='#D4AF37' className='w-full h-full' />
              </div>
            </div>
            <div className='flex flex-col w-[28vw] lg:w-full h-auto justify-center items-center order-3'>

              <div ref={el => { infosRef.current[3] = el; }} className='flex flex-col-reverse gap-6 lg:gap-12 justify-center items-center'>
                <div className='w-20 lg:w-28 h-auto mb-4 lg:mb-8'>
                  <Image className="w-full h-full object-contain" src={`${BASE_PATH}/assets/home/Prizes/bronze.gif`} width={112} height={112} alt="Bronze" unoptimized />
                </div>
                <div className='flex flex-col gap-1 lg:gap-2 items-center'>
                  <span className='text-[2.5vh] lg:text-[3.2vh] bstrokeds text-white font-pixel-emulator'>
                    <span>3rd Place</span>
                  </span>
                  <span className='text-[2vw] lg:text-[1.8vw] font-quinque bstrokeds text-[#9C6B3D]'>
                    <span>10,000 RS</span>
                  </span>
                </div>

              </div>
              <div ref={el => { podiumsRef.current[2] = el; }} className='w-full h-[12vh] lg:h-[25vh]'>
                <Podium3D color='#9C6B3D' className='w-full h-full' />
              </div>
            </div>
          </div>
        </div>
        <div ref={parallaxTextRef} className='absolute opacity-60 bottom-0 w-full flex justify-center text-[13vw]/[14vw] shadow-2xl font-quinque'>
          <span>PRIZES</span>
        </div>
      </div>
      <div className='relative w-full h-[30vh] md:h-max z-2'>
        <Image src={`${BASE_PATH}/assets/home/Prizes/prizesbg-2.webp`} priority width={1920} height={600} className='w-full h-full md:h-max relative object-cover object-bottom' alt="Prizes Background" />
      </div>

      {/* Mobile Prizes Layout - with fade in animation */}
      <div ref={mobileRef} className='absolute inset-0 w-full flex md:hidden flex-col items-center justify-center px-4 py-6 gap-4 z-8'>
        {/* Top section - Trophy only */}
        <div className="w-[180px] h-auto aspect-square shrink-0">
          <Trophy3D modelPath='/assets/home/Prizes/trophy.glb' className="w-full h-full" />
        </div>

        {/* Bottom section - Prize boxes */}
        <div className="w-full max-w-md flex flex-col gap-2 mt-2">
          {/* 1st Place Box */}
          <div className="w-full bg-[#1a3a8a]/80 backdrop-blur-sm border-2 border-[#4a7fff] rounded-lg p-3 flex items-center gap-4">
            <div className='w-10 h-10 shrink-0'>
              <Image className="w-full h-full object-contain" src={`${BASE_PATH}/assets/home/Prizes/gold.gif`} width={40} height={40} alt="Gold" unoptimized />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm text-white font-pixel-emulator'>
                1st Place
              </span>
              <span className='text-base font-quinque text-[#D4AF37]'>
                50,000 RS
              </span>
            </div>
          </div>

          {/* 2nd Place Box */}
          <div className="w-full bg-[#3a6adf]/60 backdrop-blur-sm border-2 border-[#6a9fff] rounded-lg p-3 flex items-center gap-4">
            <div className='w-10 h-10 shrink-0'>
              <Image className="w-full h-full object-contain" src={`${BASE_PATH}/assets/home/Prizes/silver.gif`} width={40} height={40} alt="Silver" unoptimized />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm text-white font-pixel-emulator'>
                2nd Place
              </span>
              <span className='text-base font-quinque text-[#BFC3C7]'>
                25,000 RS
              </span>
            </div>
          </div>

          {/* 3rd Place Box */}
          <div className="w-full bg-[#5a8aff]/50 backdrop-blur-sm border-2 border-[#8ab0ff] rounded-lg p-3 flex items-center gap-4">
            <div className='w-10 h-10 shrink-0'>
              <Image className="w-full h-full object-contain" src={`${BASE_PATH}/assets/home/Prizes/bronze.gif`} width={40} height={40} alt="Bronze" unoptimized />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm text-white font-pixel-emulator'>
                3rd Place
              </span>
              <span className='text-base font-quinque text-[#9C6B3D]'>
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