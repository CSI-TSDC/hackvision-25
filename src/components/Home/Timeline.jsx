'use client'
import { useLayoutEffect, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Timeline data
const timelineData = [
  { date: '9', month: 'JAN', title: 'Registration Opens', subtitle: 'PPT Round Begins', icon: '🎮', highlight: true },
  { date: '17', month: 'JAN', title: 'Registration Closes', subtitle: 'PPT Round Ends', icon: '⏰' },
  { date: '20', month: 'JAN', title: 'Shortlisted Teams Announced', icon: '🏆' },
  { date: '21', month: 'JAN', title: 'Problem Statements Revealed', icon: '💡' },
  { date: '22', month: 'JAN', title: 'Hackathon Begins!', icon: '🚀' },
]

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

const repeat = (text, className) =>
  Array.from({ length: 50 }).map((_, i) => (
    <span key={i} className={`whitespace-nowrap font-bold flex items-center ${className}`}>
      {text}
    </span>
  ));

export default function Timeline() {
  const sectionRef = useRef(null)
  const timelineWrapRef = useRef(null)
  const stripsContainerRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])
  const ctxRef = useRef(null)

  // Resize handler to refresh ScrollTrigger
  useEffect(() => {
    let resizeTimer

    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        // Refresh all ScrollTrigger instances to recalculate positions
        ScrollTrigger.refresh(true)
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    // Also handle orientation change for mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(() => ScrollTrigger.refresh(true), 300)
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
            start: 'top 90%', // Start when strips container is 90% from top of viewport
            end: 'bottom 10%', // End when bottom is 10% from top
            scrub: 0.5,
            invalidateOnRefresh: true, // Recalculate on resize
            onUpdate: self => {
              const xPercent = (self.progress * speed * dir) % 100
              gsap.set(el, { xPercent: xPercent })
            },
          })
        })

        // Heading glitch animation
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

        // Cards staggered animation
        const cards = cardsRef.current.filter(Boolean)
        cards.forEach((card, i) => {
          const isLeft = i % 2 === 0
          gsap.fromTo(card,
            {
              opacity: 0,
              x: isLeft ? -100 : 100,
              rotateY: isLeft ? -15 : 15,
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              }
            }
          )
        })

        ScrollTrigger.refresh()
      }, sectionRef)

      return () => ctxRef.current?.revert()
    }, 500) // Increased delay to wait for all above sections to render

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
      {/* Strips Container - UNCHANGED */}
      <div ref={stripsContainerRef} className="relative w-full h-[380px] mb-[25vh] overflow-hidden">
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
      <div ref={timelineWrapRef} className="pt-16 pb-12 w-full flex flex-col items-center">
        <div ref={headingRef} className="relative z-10 px-[5vw] mb-6">
          <h1
            className="font-pixel-emulator text-[#d2ff52] text-[6vw] md:text-[8vw] tracking-wider text-center relative"
            style={{
              textShadow: '4px 4px 0px #000, 6px 6px 0px rgba(0,0,0,0.3)',
            }}
          >
            TIMELINE
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-[#d2ff52]" />
        </div>
        <p className="font-nikea text-white/70 text-lg md:text-xl text-center max-w-md px-4">
          Your journey to victory starts here
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="w-full flex justify-center px-4 md:px-[8vw] pb-20">
        <div className="relative max-w-5xl w-full">
          {/* Central vertical line - desktop only */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-1 hidden md:block transform -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent, #d2ff52, #fff, #d2ff52, transparent)',
              boxShadow: '0 0 15px rgba(210, 255, 82, 0.4)',
            }}
          />

          <div className="flex flex-col gap-6 md:gap-10">
            {timelineData.map((item, i) => {
              const isLeft = i % 2 === 0
              const isHighlight = item.highlight

              return (
                <div
                  key={i}
                  ref={el => cardsRef.current[i] = el}
                  className={`flex flex-col md:flex-row items-center gap-4 ${isLeft ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className={`w-full md:w-[45%] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className={`
                        relative p-5 md:p-6 cursor-pointer group
                        bg-black/30 backdrop-blur-sm
                        border-4 border-white/20
                        transition-all duration-300
                        hover:border-[#d2ff52] hover:bg-black/50
                        hover:shadow-[0_0_30px_rgba(210,255,82,0.3)]
                        ${isHighlight ? 'border-[#d2ff52] bg-black/40' : ''}
                      `}
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                      }}
                    >
                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-3 h-3 bg-[#d2ff52] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#d2ff52] opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Content */}
                      <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                        <span className={`font-quinque text-xl md:text-2xl font-bold ${isHighlight ? 'text-[#d2ff52]' : 'text-white'}`}>
                          {item.title}
                        </span>
                        {item.subtitle && (
                          <span className="font-nikea text-[#d2ff52] text-base mt-1">
                            {item.subtitle}
                          </span>
                        )}
                        <div className={`mt-3 flex items-center gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <span className="text-2xl">{item.icon}</span>
                          <span className="font-pixel-emulator text-white/50 text-xs tracking-wider">
                            {isHighlight ? 'FINAL EVENT' : `DAY ${i + 1}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date Badge - Center */}
                  <div className="relative z-10 order-first md:order-none">
                    <div
                      className={`
                        w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center cursor-pointer
                        border-4 border-black font-quinque
                        transition-all duration-300
                        hover:scale-110 hover:rotate-3
                        ${isHighlight
                          ? 'bg-gradient-to-br from-[#d2ff52] to-[#9eff00] animate-pulse'
                          : i % 2 === 0 ? 'bg-[#d2ff52]' : 'bg-white'
                        }
                      `}
                      style={{
                        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                      }}
                    >
                      <span className={`text-3xl md:text-4xl font-bold leading-none ${isHighlight || i % 2 === 0 ? 'text-black' : 'text-[#5B2EFF]'}`}>
                        {item.date}
                      </span>
                      <span className={`font-pixel-emulator text-xs uppercase ${isHighlight || i % 2 === 0 ? 'text-black' : 'text-[#5B2EFF]'}`}>
                        {item.month}
                      </span>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Decorative pixels - scattered throughout */}
      {/* Top area */}
      <div className="absolute top-[15%] left-[3%] w-3 h-3 bg-[#d2ff52] opacity-70 animate-pulse" />
      <div className="absolute top-[12%] left-[8%] w-2 h-2 bg-white opacity-50 animate-pulse" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-[18%] right-[5%] w-4 h-4 bg-[#FF8C00] opacity-60 animate-pulse" style={{ animationDelay: '0.7s' }} />
      <div className="absolute top-[10%] right-[12%] w-2 h-2 bg-[#d2ff52] opacity-50 animate-pulse" style={{ animationDelay: '1.2s' }} />

      {/* Upper middle */}
      <div className="absolute top-[28%] left-[6%] w-5 h-5 bg-[#4ecdc4] opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[32%] left-[2%] w-2 h-2 bg-white opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[25%] right-[3%] w-3 h-3 bg-[#d2ff52] opacity-50 animate-pulse" style={{ animationDelay: '0.2s' }} />
      <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-[#FF8C00] opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Middle */}
      <div className="absolute top-[45%] left-[4%] w-4 h-4 bg-[#d2ff52] opacity-60 animate-pulse" style={{ animationDelay: '0.8s' }} />
      <div className="absolute top-[50%] left-[10%] w-2 h-2 bg-[#ff6b6b] opacity-50 animate-pulse" style={{ animationDelay: '1.3s' }} />
      <div className="absolute top-[48%] right-[6%] w-3 h-3 bg-white opacity-40 animate-pulse" style={{ animationDelay: '0.4s' }} />
      <div className="absolute top-[52%] right-[2%] w-4 h-4 bg-[#9b59b6] opacity-50 animate-pulse" style={{ animationDelay: '1.8s' }} />

      {/* Lower middle */}
      <div className="absolute top-[65%] left-[2%] w-2 h-2 bg-[#4ecdc4] opacity-60 animate-pulse" style={{ animationDelay: '0.6s' }} />
      <div className="absolute top-[68%] left-[8%] w-3 h-3 bg-[#d2ff52] opacity-50 animate-pulse" style={{ animationDelay: '1.1s' }} />
      <div className="absolute top-[62%] right-[4%] w-5 h-5 bg-[#FF8C00] opacity-40 animate-pulse" style={{ animationDelay: '0.9s' }} />
      <div className="absolute top-[70%] right-[12%] w-2 h-2 bg-white opacity-70 animate-pulse" style={{ animationDelay: '1.6s' }} />

      {/* Bottom area */}
      <div className="absolute bottom-[25%] left-[5%] w-4 h-4 bg-[#d2ff52] opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[20%] left-[12%] w-2 h-2 bg-[#ff6b6b] opacity-60 animate-pulse" style={{ animationDelay: '0.3s' }} />
      <div className="absolute bottom-[30%] right-[3%] w-3 h-3 bg-[#4ecdc4] opacity-50 animate-pulse" style={{ animationDelay: '1.4s' }} />
      <div className="absolute bottom-[15%] right-[8%] w-4 h-4 bg-white opacity-30 animate-pulse" style={{ animationDelay: '0.7s' }} />
      <div className="absolute bottom-[10%] left-[3%] w-2 h-2 bg-[#9b59b6] opacity-60 animate-pulse" style={{ animationDelay: '1.7s' }} />
      <div className="absolute bottom-[8%] right-[5%] w-3 h-3 bg-[#d2ff52] opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
    </section>
  )
}