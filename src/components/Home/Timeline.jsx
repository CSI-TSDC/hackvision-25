'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden w-full min-h-screen bg-[#f5f5f0] py-20"
    >
      {/* Timeline Header */}
      <div className="pt-8 pb-12 w-full flex flex-col items-center">
        <div ref={headingRef} className="relative z-10 px-[5vw] mb-6">
          <h1
            className="font-pixel-emulator text-[#161616] text-[8vw] md:text-[5vw] tracking-wider text-center relative"
            style={{
              textShadow: '4px 4px 0px rgba(0,0,0,0.2), 6px 6px 0px rgba(0,0,0,0.1)',
            }}
          >
            JANUARY 2026
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-[#5B2EFF]" />
        </div>
        <p className="font-nikea text-gray-600 text-lg md:text-xl text-center max-w-md px-4">
          Your journey to victory starts here
        </p>
      </div>

      {/* Calendar placeholder - for new design */}
      <div className="w-full flex justify-center px-4 md:px-[6vw] pb-12">
        <div className="w-full max-w-6xl text-center text-gray-400 py-20">
          {/* New calendar design will go here */}
        </div>
      </div>

      {/* Decorative pixels - updated for light theme */}
      <div className="absolute top-[15%] left-[3%] w-3 h-3 bg-[#5B2EFF] opacity-70 animate-pulse" />
      <div className="absolute top-[12%] left-[8%] w-2 h-2 bg-[#d2ff52] opacity-70 animate-pulse" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-[18%] right-[5%] w-4 h-4 bg-[#FF8C00] opacity-60 animate-pulse" style={{ animationDelay: '0.7s' }} />
      <div className="absolute top-[10%] right-[12%] w-2 h-2 bg-[#5B2EFF] opacity-50 animate-pulse" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-[25%] left-[5%] w-4 h-4 bg-[#4ecdc4] opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[20%] right-[3%] w-3 h-3 bg-[#5B2EFF] opacity-50 animate-pulse" style={{ animationDelay: '1.4s' }} />
    </section>
  )
}