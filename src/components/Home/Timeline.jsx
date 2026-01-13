'use client'
import { useLayoutEffect, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const calendarData = [
  // Week 1 (Jan starts on Thursday)
  { day: null }, { day: null }, { day: null }, { day: 1, type: 'normal' }, { day: 2, type: 'normal' }, { day: 3, type: 'normal' }, { day: 4, type: 'normal' },
  // Week 2
  { day: 5, type: 'normal' }, { day: 6, type: 'normal' }, { day: 7, type: 'normal' }, { day: 8, type: 'normal' },
  { day: 9, type: 'hackvision', title: 'Registration Opens', subtitle: 'PPT Round Begins', icon: '🎮' },
  { day: 10, type: 'normal' }, { day: 11, type: 'normal' },
  // Week 3
  { day: 12, type: 'normal' }, { day: 13, type: 'normal' },
  { day: 14, type: 'occasion', title: 'Makar Sankranti' },
  { day: 15, type: 'normal' }, { day: 16, type: 'normal' },
  { day: 17, type: 'hackvision', title: 'Registration Closes', subtitle: 'PPT Round Ends', icon: '⏰' },
  { day: 18, type: 'normal' },
  // Week 4
  { day: 19, type: 'normal' },
  { day: 20, type: 'hackvision', title: 'Teams Announced', icon: '🏆' },
  { day: 21, type: 'hackvision', title: 'Problems Revealed', icon: '💡' },
  { day: 22, type: 'hackvision', title: 'Hackathon Begins!', subtitle: 'Hackathon Day!', icon: '🚀', highlight: true },
  { day: 23, type: 'hackvision', title: 'Hackathon Ends!', subtitle: 'Hackathon Day!', icon: '🎉', highlight: true }, { day: 24, type: 'normal' }, { day: 25, type: 'normal' },
  // Week 5
  { day: 26, type: 'occasion', title: 'Republic Day' },
  { day: 27, type: 'normal' }, { day: 28, type: 'normal' }, { day: 29, type: 'normal' }, { day: 30, type: 'normal' }, { day: 31, type: 'normal' }, { day: null },
]

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" className="mx-3">
    <path
      fill="currentColor"
      d="M12 2l2.9 6.1L22 9l-5 4.9L18.2 22 12 18.6 5.8 22 7 13.9 2 9l7.1-.9L12 2z"
    />
  </svg>
);

const Dot = () => (
  <span className="inline-block w-2 h-2 rounded-full bg-current mx-3" />
);

export default function Timeline() {
  const sectionRef = useRef(null)
  const stripsContainerRef = useRef(null)
  const headingRef = useRef(null)
  const calendarRef = useRef(null)
  const cellsRef = useRef([])
  const ctxRef = useRef(null)

  // Resize handler to refresh ScrollTrigger
  useEffect(() => {
    let resizeTimer

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh(true)
      }, 500)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', () => {
      setTimeout(() => ScrollTrigger.refresh(true), 500)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      ctxRef.current = gsap.context(() => {
        // Strips animation
        const strips = gsap.utils.toArray('.strip')
        strips.forEach((el, i) => {
          const speed = 100
          const dir = i % 2 === 0 ? 1 : -1
          ScrollTrigger.create({
            trigger: stripsContainerRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: self => {
              const xPercent = (self.progress * speed * dir) % 100
              gsap.set(el, { xPercent: xPercent })
            },
          })
        })

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

        // Calendar cells staggered animation
        const cells = cellsRef.current.filter(Boolean)
        cells.forEach((cell, i) => {
          gsap.fromTo(cell,
            { opacity: 0, scale: 0.8, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              delay: i * 0.02,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: calendarRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              }
            }
          )
        })

        ScrollTrigger.refresh()
      }, sectionRef)

      return () => ctxRef.current?.revert()
    }, 500)

    return () => {
      clearTimeout(timeout)
      ctxRef.current?.revert()
    }
  }, [])

  const repeat = (text, className) =>
    Array.from({ length: 50 }).map((_, i) => (
      <span key={i} className={`whitespace-nowrap font-bold flex items-center ${className}`}>
        {text}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden w-full min-h-screen bg-[#5B2EFF] pb-20"
    >
      {/* Strips Container */}
      <div ref={stripsContainerRef} className="relative w-full h-[380px] mb-[15vh] overflow-hidden">
        <div className="w-[150vw] h-[70px] bg-white text-black border-y-4 border-black origin-top-left rotate-3 relative">
          <div className="strip w-full h-full flex items-center justify-center">
            {repeat(
              <>
                <span>HACKVISION</span>
                <Star />
                <span>CSI COMMITTEE</span>
                <Star />
              </>
            )}
          </div>
        </div>

        <div className="absolute top-[25%] w-[150vw] h-[70px] bg-[#d2ff52] text-black border-y-4 border-black origin-top-right -rotate-1">
          <div className="strip w-full h-full flex items-center justify-center">
            {repeat('CODE • CREATE • DEPLOY', 'mx-8')}
          </div>
        </div>

        <div className="absolute bottom-[20%] w-[150vw] h-[70px] bg-black border-y-4 border-black">
          <div className="strip w-full h-full flex items-center justify-center text-[#d2ff52]">
            {repeat(
              <>
                <span>REGISTRATIONS OPEN</span>
                <Dot />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Header */}
      <div className="pt-8 pb-8 w-full flex flex-col items-center">
        <div ref={headingRef} className="relative z-10 px-[5vw] mb-10">
          <h1
            className="font-pixel-emulator text-[#d2ff52] text-[6vw] md:text-[6vw] tracking-wider text-center relative"
            style={{
              textShadow: '4px 4px 0px #000, 6px 6px 0px rgba(0,0,0,0.3)',
            }}
          >
            JANUARY 2026
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-[#d2ff52]" />
        </div>
        <p className="font-nikea text-white/70 text-lg md:text-xl text-center max-w-md px-4">
          Your journey to victory starts here
        </p>
      </div>

      {/* Calendar Grid */}
      <div ref={calendarRef} className="w-full flex justify-center px-4 md:px-[8vw] pb-20">
        <div className="w-full max-w-5xl">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {WEEKDAYS.map((day, i) => (
              <div
                key={day}
                className="text-center font-pixel-emulator text-white/60 text-xs md:text-sm py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {calendarData.map((item, i) => {
              if (item.day === null) {
                return <div key={i} className="aspect-square" />
              }

              const isHackvision = item.type === 'hackvision'
              const isOccasion = item.type === 'occasion'
              const isHighlight = item.highlight
              const hasEvent = isHackvision || isOccasion

              return (
                <div
                  key={i}
                  ref={el => cellsRef.current[i] = el}
                  className={`
                    aspect-square p-1 md:p-2 cursor-pointer group relative
                    border-4 border-black font-quinque
                    transition-all duration-300
                    hover:scale-105 hover:z-10
                    ${isHighlight
                      ? 'bg-gradient-to-br from-[#d2ff52] to-[#9eff00] animate-pulse'
                      : isHackvision
                        ? 'bg-[#d2ff52] hover:shadow-[0_0_20px_rgba(210,255,82,0.5)]'
                        : isOccasion
                          ? 'bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                          : 'bg-black/30 border-white/20 hover:border-[#d2ff52] hover:bg-black/50'
                    }
                  `}
                  style={{
                    boxShadow: hasEvent ? '3px 3px 0px 0px rgba(0,0,0,1)' : 'none',
                  }}
                >
                  {/* Day number */}
                  <div className={`relative z-10 text-lg md:text-2xl font-bold leading-none ${isHackvision || isHighlight ? 'text-black' : isOccasion ? 'text-[#5B2EFF]' : 'text-white/70'
                    }`}>
                    {item.day}
                  </div>

                  {/* Event icon */}
                  {item.icon && (
                    <div className="relative z-10 text-sm md:text-lg mt-0.5">
                      {item.icon}
                    </div>
                  )}

                  {/* Tooltip on hover */}
                  {hasEvent && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      <div className="bg-black border-2 border-[#d2ff52] px-3 py-2 whitespace-nowrap">
                        <div className={`font-quinque text-xs md:text-sm ${isHackvision ? 'text-[#d2ff52]' : 'text-white'}`}>
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className="font-nikea text-white/70 text-xs mt-0.5">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#d2ff52] border-2 border-black" />
              <span className="text-white/70 font-nikea">HackVision Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-black" />
              <span className="text-white/70 font-nikea">Occasions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative pixels */}
      <div className="absolute top-[15%] left-[3%] w-3 h-3 bg-[#d2ff52] opacity-70 animate-pulse" />
      <div className="absolute top-[12%] left-[8%] w-2 h-2 bg-white opacity-50 animate-pulse" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-[18%] right-[5%] w-4 h-4 bg-[#FF8C00] opacity-60 animate-pulse" style={{ animationDelay: '0.7s' }} />
      <div className="absolute top-[10%] right-[12%] w-2 h-2 bg-[#d2ff52] opacity-50 animate-pulse" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-[28%] left-[6%] w-5 h-5 bg-[#4ecdc4] opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[32%] left-[2%] w-2 h-2 bg-white opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[25%] left-[5%] w-4 h-4 bg-[#d2ff52] opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[20%] right-[3%] w-3 h-3 bg-[#4ecdc4] opacity-50 animate-pulse" style={{ animationDelay: '1.4s' }} />
      <div className="absolute bottom-[10%] left-[3%] w-2 h-2 bg-[#9b59b6] opacity-60 animate-pulse" style={{ animationDelay: '1.7s' }} />
      <div className="absolute bottom-[8%] right-[5%] w-3 h-3 bg-[#d2ff52] opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
    </section>
  )
}