'use client';
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger); 

export default function Timeline() {
    const strips = useRef([])

    useEffect(() => {
        strips.current.forEach((el, i) => {
          gsap.fromTo(
            el,
            { x: i % 2 === 0 ? -200 : 200 },
            {
              x: i % 2 === 0 ? 200 : -200,
              scrollTrigger: {
                trigger: el.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        })
      }, [])
    
      const repeatHTML = (html) =>
        Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="mx-8 whitespace-nowrap font-bold"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))
  return (
    <section id="timeline" className="relative overflow-hidden w-full min-h-screen bg-[#5B2EFF] text-white py-40">
        <div className="relative w-full h-[380px] overflow-hidden">
      
            <div className="w-[150vw] h-[60px] bg-white border-y-4 border-black origin-top-left rotate-3">
                <div ref={el => strips.current[0] = el} className="w-max h-full py-4 flex">
                {repeatHTML('HACKVISION 🔥')}
                </div>
            </div>

            <div className="absolute top-[25%] w-[150vw] h-[60px] bg-[#d2ff52] border-y-4 border-black origin-top-right -rotate-1">
                <div ref={el => strips.current[1] = el} className="w-max h-full py-4 flex">
                {repeatHTML('CODE <span>•</span> CREATE <span>•</span> DEPLOY')}
                </div>
            </div>

            <div className="absolute bottom-[20%] w-[150vw] h-[60px] bg-black border-y-4 border-black">
                <div ref={el => strips.current[2] = el} className="w-max h-full py-4 flex text-[#d2ff52]">
                {repeatHTML('CSI COMMITTEE')}
                </div>
            </div>

        </div>
        <div className="w-full h-max flex flex-col items-start font-pixel-emulator text-[6vw] pb-20 px-[5vw]">
            <span>
                <span>Timeline</span>
            </span>
        </div>
        <div className="w-full h-max flex justify-center px-[5vw]">
            <div className="max-w-[70vw] h-max flex flex-col md:flex-row font-quinque gap-4">
                
                {/* LEFT */}
                <div className="w-full md:w-1/2 grid grid-rows-3 divide-y-2 border-2">
                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">28th</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Jan</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">Registration Opens</span>
                        </div>
                    </div>

                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">29th</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Jan</span>
                        </div>
                        <div className="px-4 flex flex-col">
                        <span className="text-lg font-medium font-nikea">Registration Closes &</span>
                        <span className="text-lg font-medium font-nikea">PPT Round Begins</span>
                        </div>
                    </div>

                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">30th</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Jan</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">Round 1 Ends</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full md:w-1/2 grid grid-rows-3 divide-y-2 border-2">
                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">31st</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Jan</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">
                            Shortlisted Teams Announced
                        </span>
                        </div>
                    </div>

                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">1st</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Feb</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">
                            Problem Statements Revealed
                        </span>
                        </div>
                    </div>

                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">2nd</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Feb</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">Hackathon Begins</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}