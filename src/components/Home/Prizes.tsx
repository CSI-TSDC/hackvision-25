'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Prizes = ({ className = "" }) => {
    // const sectionRef = useRef<HTMLElement | null>(null);
  
    // useEffect(() => {
    //     if (!sectionRef.current) return;
      
    //     const prev = sectionRef.current.previousElementSibling as HTMLElement | null;
    //     if (!prev) return;
      
    //     gsap.fromTo(
    //       sectionRef.current,
    //       { yPercent: -100 },
    //       {
    //         yPercent: 0,
    //         ease: 'none',
    //         scrollTrigger: {
    //           trigger: prev,
    //           start: 'top top',
    //           end: 'bottom top',
    //           scrub: true,
    //         },
    //       }
    //     );
    //   }, []);

  return (
    <section
      // ref={sectionRef}
      id="prizes"
      className={`min-h-screen w-full pt-[13vh] relative 
         ${className} flex bg-[#8ac926]`}
    >
      
    </section>
  );
};

export default Prizes;