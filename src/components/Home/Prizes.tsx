'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Trophy3D from './Trophy3D';
gsap.registerPlugin(ScrollTrigger);

const Prizes = ({ className = "" }) => {
  
  return (
    <section
      id="prizes"
      className={`w-full relative 
         ${className} flex flex-col bg-black min-h-screen z-4`}
    >
      <div className='w-full h-max'>
          <img src="/assets/home/Prizes/prizesbg.png" alt="" />
        </div>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-max flex flex-col py-30 justify-center items-center'>
        <div className='w-[60vw] h-auto'>
          <img src="/assets/home/Prizes/onlyufo.png" className='w-full h-full object-contain' alt="" />
        </div>
        <div className='flex-1 -mt-0.5'>
          <img src="/assets/home/Prizes/ufolight.png" alt="" />
        </div>
      </div>
      <div id='prizes_wrap' className='absolute bottom-0 pb-15 w-full items-center justify-center'>
        <div className="relative z-10 w-full flex flex-row gap-10 px-[8vw] pb-10">
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