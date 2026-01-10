'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const sectionRef = useRef(null)
  const timelineWrapRef = useRef(null)
  const stripsContainerRef = useRef(null)

  useLayoutEffect(() => {
    // Wait for DOM to be ready
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const strips = gsap.utils.toArray('.strip')

        strips.forEach((el, i) => {
          const speed = 150
          const dir = i % 2 === 0 ? 1 : -1

          ScrollTrigger.create({
            trigger: stripsContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: self => {
              const xPercent = (self.progress * speed * dir) % 100
              gsap.set(el, { xPercent: xPercent })
            },
          })
        })

        ScrollTrigger.refresh()
      }, sectionRef)

      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timeout)
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
      <div ref={stripsContainerRef} className="relative w-full h-[380px] overflow-hidden">
        <div className="w-[150vw] h-[70px] bg-white text-black border-y-4 border-black origin-top-left rotate-3 relative">
          <div className="strip w-full h-full flex items-center justify-center">
            {repeat('HACKVISION 🔥')}
          </div>
        </div>

        <div className="absolute top-[25%] w-[150vw] h-[70px] bg-[#d2ff52] text-black border-y-4 border-black origin-top-right -rotate-1">
          <div className="strip w-full h-full flex items-center justify-center">
            {repeat('CODE • CREATE • DEPLOY')}
          </div>
        </div>

        <div className="absolute bottom-[20%] w-[150vw] h-[70px] bg-black border-y-4 border-black">
          <div className="strip w-full h-full flex items-center justify-center">
            {repeat('CSI COMMITTEE')}
          </div>
        </div>
      </div>
      <div id='timeline_wrap' className='py-50 w-full flex justify-center' ref={timelineWrapRef}>
        <div className="relative z-10 px-[5vw] mb-15">
          <div className="relative inline-block font-quinque font-bold">
            {/* White layer - stays on top initially */}
            <h1 className="absolute text-white text-6xl md:text-8xl left-0 z-10">
              Timeline
            </h1>
            {/* Blue layer - initially stacked below white */}
            <h1 className="absolute text-blue-500 text-6xl md:text-8xl left-0 top-0 z-5">
              Timeline
            </h1>
            {/* Black layer - initially stacked below blue */}
            <h1 className="relative text-black text-6xl md:text-8xl left-0 top-0 z-1">
              Timeline
            </h1>
          </div>
        </div>
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