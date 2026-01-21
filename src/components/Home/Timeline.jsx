'use client'
import { useLayoutEffect, useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Pacman theme images for decoration
const DECORATIVE_DAYS = {
  5: `${BASE_PATH}/assets/home/Timeline/pacman theme/6.webp`,
  8: `${BASE_PATH}/assets/home/Timeline/pacman theme/5.webp`,
  12: `${BASE_PATH}/assets/home/Timeline/pacman theme/1.webp`,
  13: `${BASE_PATH}/assets/home/Timeline/pacman theme/2.webp`,
  16: `${BASE_PATH}/assets/home/Timeline/pacman theme/3.webp`,
  17: `${BASE_PATH}/assets/home/Timeline/pacman theme/7.webp`,
  24: `${BASE_PATH}/assets/home/Timeline/pacman theme/4.webp`,
  31: `${BASE_PATH}/assets/home/Timeline/pacman theme/8.webp`,
}

const calendarData = [
  // Week 1 (Jan starts on Wednesday - 1st is Wed)
  { day: null, pacmanFood: true }, { day: null, pacmanFood: true }, { day: null, pacman: true },
  { day: 1, type: 'normal' }, { day: 2, type: 'normal' }, { day: 3, type: 'normal' }, { day: 4, type: 'normal' },
  // Week 2
  { day: 5, type: 'decorative' }, { day: 6, type: 'normal' }, { day: 7, type: 'normal' }, { day: 8, type: 'decorative' },
  { day: 9, type: 'hackvision', title: 'Registration Opens', subtitle: 'PPT Round Begins', icon: '🎮' },
  { day: 10, type: 'normal' }, { day: 11, type: 'normal' },
  // Week 3
  { day: 12, type: 'decorative' }, { day: 13, type: 'decorative' },
  { day: 14, type: 'occasion', title: 'Makar Sankranti' },
  { day: 15, type: 'normal' }, { day: 16, type: 'decorative' },
  { day: 17, type: 'decorative' },
  { day: 18, type: 'normal' },
  // Week 4
  { day: 19, type: 'hackvision', title: 'Registration Closes', subtitle: 'PPT Round Ends', icon: '⏰' },
  { day: 20, type: 'hackvision', title: 'Teams Announced', icon: '🏆' },
  { day: 21, type: 'hackvision', title: 'Problems Revealed', icon: '💡' },
  { day: 22, type: 'hackday', title: 'Hackathon Day 1', subtitle: 'Let the hacking begin!', icon: '🚀' },
  { day: 23, type: 'hackday', title: 'Hackathon Day 2', subtitle: 'Final submissions!', icon: '🎉' },
  { day: 24, type: 'decorative' }, { day: 25, type: 'normal' },
  // Week 5
  { day: 26, type: 'occasion', title: 'Republic Day' },
  { day: 27, type: 'normal' }, { day: 28, type: 'normal' }, { day: 29, type: 'normal' }, { day: 30, type: 'normal' }, { day: 31, type: 'decorative' }, { day: null },
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
  const headingRef = useRef(null)
  const calendarRef = useRef(null)
  const cellsRef = useRef([])
  const mobileListRef = useRef(null)
  const mobileItemsRef = useRef([])
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
        // Heading animation
        if (headingRef.current) {
          gsap.fromTo(headingRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          )
        }

        // Calendar cells animation - all at once, no stagger for consistency
        const cells = cellsRef.current.filter(Boolean)
        if (cells.length > 0) {
          gsap.fromTo(cells,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: calendarRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              }
            }
          )
        }

        // Mobile list items animation - slide in from alternating sides
        const mobileItems = mobileItemsRef.current.filter(Boolean)
        if (mobileItems.length > 0) {
          mobileItems.forEach((item, i) => {
            gsap.fromTo(item,
              { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 90%',
                  toggleActions: 'play none none reverse',
                }
              }
            )
          })
        }

        ScrollTrigger.refresh()
      }, sectionRef)

      return () => ctxRef.current?.revert()
    }, 200)

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

  // Mobile list data - only HackVision dates
  const mobileListData = [
    { day: 9, type: 'hackvision', title: 'Registration Opens', icon: `${BASE_PATH}/assets/home/Timeline/pacman theme/6.webp` },
    { day: 14, type: 'occasion', title: 'Makar Sankranti', icon: `${BASE_PATH}/assets/home/Timeline/pacman theme/7.webp` },
    { day: 17, type: 'hackvision', title: 'Registration Closes', icon: `${BASE_PATH}/assets/home/Timeline/pacman theme/6.webp` },
    { day: 20, type: 'hackvision', title: 'Teams Announced', icon: `${BASE_PATH}/assets/home/Timeline/pacman theme/1.webp` },
    { day: 21, type: 'hackvision', title: 'Problems Revealed', icon: `${BASE_PATH}/assets/home/Timeline/pacman theme/4.webp` },
    { day: 22, type: 'hackday', title: 'Hackathon Day 1', icon: `${BASE_PATH}/assets/home/Timeline/pacman theme/6.webp` },
    { day: 23, type: 'hackday', title: 'Hackathon Day 2', icon: `${BASE_PATH}/assets/home/Timeline/pacman theme/1.webp` },
  ]

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden w-full min-h-screen bg-[#f5f0e6] py-20"
    >

      {/* Timeline Header */}
      <div className="pt-8 pb-8 w-full flex flex-col items-center">
        <div ref={headingRef} className="relative z-10 px-[5vw] mb-10">
          <h1
            className="font-pixel-emulator text-[#1a1a2e] text-[10vw] md:text-[6vw] tracking-wider text-center relative"
            style={{
              textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
            }}
          >
            JANUARY<br className="md:hidden" /> 2026
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-[#FF6B35]" />
        </div>
        <p className="font-nikea text-[#1a1a2e]/60 text-lg md:text-xl text-center max-w-md px-4">
          Your journey to victory starts here
        </p>
      </div>

      {/* Mobile List View - visible only on mobile */}
      <div ref={mobileListRef} className="md:hidden w-full px-6 pb-10">
        <div className="w-full max-w-md mx-auto flex flex-col gap-3">
          {mobileListData.map((item, i) => {
            const isHackvision = item.type === 'hackvision'
            const isOccasion = item.type === 'occasion'
            const isHackday = item.type === 'hackday'

            return (
              <div
                key={i}
                ref={el => mobileItemsRef.current[i] = el}
                className={`
                  flex items-center justify-between p-4 rounded-lg border-4
                  ${isHackday
                    ? 'bg-white border-[#d4cbc0]'
                    : isHackvision
                      ? 'bg-[#1a1a2e] border-[#1a1a2e]'
                      : isOccasion
                        ? 'bg-white border-[#FF6B35]'
                        : 'bg-[#e8e0d0] border-[#d4cbc0]'
                  }
                `}
                style={{
                  boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.1)',
                }}
              >
                {/* Left side - Date + Icon */}
                <div className="flex items-center gap-3">
                  <span className={`font-pixel-emulator text-2xl ${isOccasion ? 'text-[#FF6B35]' : isHackvision ? 'text-[#e8e0d0]' : 'text-[#1a1a2e]'}`}>
                    Jan {item.day}
                  </span>
                  {/* Small pacman icon */}
                  {/* {(isHackvision || isHackday) && (
                    <img
                      src="/assets/home/Timeline/pacman theme/6.png"
                      alt="icon"
                      className="w-6 h-6 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  )} */}
                </div>

                {/* Right side - Icon and Title */}
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <Image
                      src={item.icon}
                      alt="icon"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  )}

                  {item.title && (
                    <div className={`font-pixel-emulator text-xs leading-tight text-right max-w-[120px] ${isOccasion ? 'text-[#FF6B35]' : isHackvision ? 'text-[#f5f0e6]' : 'text-[#1a1a2e]'}`}>
                      {item.title.split(' ').map((word, idx) => (
                        <span key={idx}>{word}<br /></span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop Calendar Grid - hidden on mobile */}
      <div ref={calendarRef} className="hidden md:flex w-full justify-center px-4 md:px-[8vw]">
        <div className="w-full max-w-5xl">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {WEEKDAYS.map((day, i) => (
              <div
                key={day}
                className="text-center font-pixel-emulator text-[#1a1a2e]/50 text-xs md:text-sm py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {calendarData.map((item, i) => {
              // Empty cell
              if (item.day === null && !item.pacman && !item.pacmanFood) {
                return <div key={i} className="aspect-square" />
              }

              // Pacman food cell
              if (item.pacmanFood) {
                return (
                  <div
                    key={i}
                    ref={el => cellsRef.current[i] = el}
                    className="aspect-square flex items-center justify-center bg-[#e8e0d0] border-2 border-[#d4cbc0]"
                  >
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-[#FF6B35] rounded-sm" />
                  </div>
                )
              }

              // Pacman cell
              if (item.pacman) {
                return (
                  <div
                    key={i}
                    ref={el => cellsRef.current[i] = el}
                    className="aspect-square flex items-center justify-center bg-[#e8e0d0] border-2 border-[#d4cbc0]"
                  >
                    <Image
                      src={`${BASE_PATH}/assets/home/Timeline/pacman theme/pacman.webp`}
                      alt="Pacman"
                      width={56}
                      height={56}
                      className="w-10 h-10 md:w-14 md:h-14 object-contain"
                      style={{ transform: 'scaleX(-1)', imageRendering: 'pixelated' }}
                    />
                  </div>
                )
              }

              const isHackvision = item.type === 'hackvision'
              const isHackday = item.type === 'hackday'
              const isOccasion = item.type === 'occasion'
              const isDecorative = item.type === 'decorative'
              const hasEvent = isHackvision || isOccasion || isHackday
              const decorativeImg = DECORATIVE_DAYS[item.day]

              return (
                <div
                  key={i}
                  ref={el => cellsRef.current[i] = el}
                  className={`
                    aspect-square p-1 md:p-2 cursor-pointer group relative
                    border-4 font-quinque
                    transition-all duration-300
                    hover:scale-105 hover:z-10
                    ${isDecorative
                      ? 'bg-[#e8e0d0] border-[#d4cbc0]'
                      : isHackday
                        ? 'bg-linear-to-br from-[#FF6B35] to-[#ff8f5a] border-[#1a1a2e] hover:shadow-[0_0_30px_rgba(255,107,53,0.6)] hover:scale-110'
                        : isHackvision
                          ? 'bg-[#1a1a2e] border-[#1a1a2e] hover:shadow-[0_0_20px_rgba(26,26,46,0.5)]'
                          : isOccasion
                            ? 'bg-white border-[#1a1a2e] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]'
                            : 'bg-[#e8e0d0] border-[#d4cbc0] hover:border-[#FF6B35] hover:bg-[#fff]'
                    }
                  `}
                  style={{
                    boxShadow: hasEvent ? '4px 4px 0px 0px rgba(0,0,0,0.2)' : 'none',
                  }}
                >
                  {/* Decorative image - no date */}
                  {isDecorative && decorativeImg && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        src={decorativeImg}
                        alt="decoration"
                        width={56}
                        height={56}
                        className="w-10 h-10 md:w-14 md:h-14 object-contain"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  )}

                  {/* Regular day content */}
                  {!isDecorative && (
                    <>
                      {/* Day number */}
                      <div className={`relative z-10 text-lg md:text-2xl font-bold leading-none ${isHackday ? 'text-white' :
                        isHackvision ? 'text-[#FF6B35]' :
                          isOccasion ? 'text-[#FF6B35]' : 'text-[#1a1a2e]/60'
                        }`}>
                        {item.day}
                      </div>

                      {/* Event icon */}
                      {item.icon && (
                        <div className="relative z-10 text-sm md:text-lg mt-0.5">
                          {item.icon}
                        </div>
                      )}

                      {/* Inline label for events */}
                      {hasEvent && (
                        <div className="mt-auto">
                          <div className={`text-[6px] md:text-[9px] font-pixel-emulator leading-tight ${isHackday ? 'text-white/90' :
                            isHackvision ? 'text-[#f5f0e6]' : 'text-[#FF6B35]'
                            }`}>
                            {item.title}
                          </div>
                        </div>
                      )}

                      {/* Tooltip on hover */}
                      {hasEvent && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                          <div className="bg-[#1a1a2e] border-2 border-[#FF6B35] px-3 py-2 whitespace-nowrap rounded">
                            <div className="font-quinque text-xs md:text-sm text-[#FF6B35]">
                              {item.title}
                            </div>
                            {item.subtitle && (
                              <div className="font-nikea text-[#f5f0e6]/70 text-xs mt-0.5">
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                          {/* Tooltip arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1a1a2e]" />
                        </div>
                      )}
                    </>
                  )}

                  {/* Special glow effect for hackdays */}
                  {isHackday && (
                    <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#1a1a2e] border-2 border-[#1a1a2e]" />
              <span className="text-[#1a1a2e]/60 font-nikea">HackVision Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-linear-to-br from-[#FF6B35] to-[#ff8f5a] border-2 border-[#1a1a2e]" />
              <span className="text-[#1a1a2e]/60 font-nikea">Hackathon Days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-[#1a1a2e]" />
              <span className="text-[#1a1a2e]/60 font-nikea">Occasions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative pixels */}
      <div className="absolute top-[15%] left-[3%] w-3 h-3 bg-[#FF6B35] opacity-70 animate-pulse" />
      <div className="absolute top-[12%] left-[8%] w-2 h-2 bg-[#1a1a2e] opacity-30 animate-pulse" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-[18%] right-[5%] w-4 h-4 bg-[#FF6B35] opacity-60 animate-pulse" style={{ animationDelay: '0.7s' }} />
      <div className="absolute top-[10%] right-[12%] w-2 h-2 bg-[#1a1a2e] opacity-30 animate-pulse" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-[28%] left-[6%] w-5 h-5 bg-[#FF6B35] opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[32%] left-[2%] w-2 h-2 bg-[#1a1a2e] opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[25%] left-[5%] w-4 h-4 bg-[#FF6B35] opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[20%] right-[3%] w-3 h-3 bg-[#1a1a2e] opacity-30 animate-pulse" style={{ animationDelay: '1.4s' }} />
      <div className="absolute bottom-[10%] left-[3%] w-2 h-2 bg-[#FF6B35] opacity-60 animate-pulse" style={{ animationDelay: '1.7s' }} />
      <div className="absolute bottom-[8%] right-[5%] w-3 h-3 bg-[#1a1a2e] opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
    </section>
  )
}