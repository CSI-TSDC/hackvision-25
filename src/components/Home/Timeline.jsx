'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.strip').forEach((el, i) => {
        let targetX = gsap.quickTo(el, 'xPercent', {
          duration: 0.6,
          ease: 'power3.out',
        })
  
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: self => {
              const dir = i % 2 === 0 ? 1 : -1
              targetX(gsap.utils.interpolate(-60, 60, self.progress) * dir)
            },
          })
      })
    })
  
    return () => ctx.revert()
  }, [])

  const repeat = (text) =>
    Array.from({ length: 50 }).map((_, i) => (
      <span key={i} className="mx-8 whitespace-nowrap font-bold">
        {text}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden w-full min-h-screen bg-[#5B2EFF] py-40"
    >
      <div className="relative w-full h-[380px] overflow-hidden">
            <div className="w-[150vw] h-[70px] bg-white text-black border-y-4 border-black origin-top-left rotate-3 relative">
        <div className="strip absolute left-0 top-0 w-max h-full py-4 flex items-center">
            {repeat('HACKVISION 🔥')}
        </div>
        </div>

        <div className="absolute top-[25%] w-[150vw] h-[70px] bg-[#d2ff52] text-black border-y-4 border-black origin-top-right -rotate-1 relative">
        <div className="strip absolute right-0 top-0 w-max h-full py-4 flex items-center">
            {repeat('CODE • CREATE • DEPLOY')}
        </div>
        </div>

        <div className="absolute bottom-[20%] w-[150vw] h-[70px] bg-black border-y-4 border-black relative">
        <div className="strip absolute left-0 top-0 w-max h-full py-4 flex items-center text-[#d2ff52]">
            {repeat('CSI COMMITTEE')}
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
  )
}