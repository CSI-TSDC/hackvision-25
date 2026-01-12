'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  '/assets/home/Tracks/webdev.png',
  '/assets/home/Tracks/aiml.png',
  '/assets/home/Tracks/cybersec.png',
  '/assets/home/Tracks/blockchain.png',
  '/assets/home/Tracks/campus.png',
];

const TRACK_DATA = [
  { label: 'Web Development', icon: '🌐', color: '#00ff88' },
  { label: 'AI / ML', icon: '🤖', color: '#ff6b6b' },
  { label: 'Cybersecurity', icon: '🔒', color: '#4ecdc4' },
  { label: 'Web3 / Blockchain', icon: '⛓️', color: '#f39c12' },
  { label: 'Campus Solutions', icon: '🏫', color: '#9b59b6' },
];

// Floating particle component - uses CSS animations with fixed positions
const FloatingParticles = () => {
  // Use fixed seed-based positions to avoid hydration mismatch
  const particles = useMemo(() => [
    { id: 0, size: 6, left: 5, top: 10, duration: 4, delay: 0, color: '#d2ff52' },
    { id: 1, size: 8, left: 15, top: 25, duration: 5, delay: 0.5, color: '#FF8C00' },
    { id: 2, size: 5, left: 25, top: 15, duration: 3.5, delay: 1, color: '#ffffff' },
    { id: 3, size: 7, left: 35, top: 40, duration: 4.5, delay: 0.3, color: '#d2ff52' },
    { id: 4, size: 6, left: 45, top: 20, duration: 5.5, delay: 0.8, color: '#FF8C00' },
    { id: 5, size: 4, left: 55, top: 35, duration: 4, delay: 1.2, color: '#ffffff' },
    { id: 6, size: 8, left: 65, top: 50, duration: 3.8, delay: 0.2, color: '#d2ff52' },
    { id: 7, size: 5, left: 75, top: 30, duration: 4.8, delay: 0.6, color: '#FF8C00' },
    { id: 8, size: 7, left: 85, top: 45, duration: 5.2, delay: 1.1, color: '#ffffff' },
    { id: 9, size: 6, left: 92, top: 60, duration: 4.2, delay: 0.4, color: '#d2ff52' },
    { id: 10, size: 5, left: 8, top: 70, duration: 5, delay: 0.9, color: '#FF8C00' },
    { id: 11, size: 8, left: 20, top: 80, duration: 3.6, delay: 1.4, color: '#ffffff' },
    { id: 12, size: 6, left: 40, top: 75, duration: 4.4, delay: 0.7, color: '#d2ff52' },
    { id: 13, size: 4, left: 60, top: 85, duration: 5.3, delay: 0.1, color: '#FF8C00' },
    { id: 14, size: 7, left: 80, top: 70, duration: 4.1, delay: 1.3, color: '#ffffff' },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            opacity: 0.4,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-20px) translateX(15px);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default function Tracks() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const initialImageRef = useRef<HTMLImageElement | null>(null);
  const sectionElementRef = useRef<HTMLElement | null>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgCanvasWrapRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);

  // Title animation effect
  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Glitch effect on title layers
      const layers = titleRef.current?.querySelectorAll('.title-layer');
      layers?.forEach((layer, i) => {
        gsap.to(layer, {
          x: i === 0 ? 'random(-3, 3)' : i === 1 ? 'random(-2, 2)' : 0,
          y: i === 0 ? 'random(-2, 2)' : i === 1 ? 'random(-1, 1)' : 0,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)',
          repeatDelay: i === 0 ? 0.5 : 0.3,
        });
      });
    }, sectionElementRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const list = listRef.current;
    const canvasWrap = canvasWrapRef.current;
    const sectionElement = sectionElementRef.current;
    if (!canvas || !section || !list || !canvasWrap || !sectionElement) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getCanvasSize = () => {
      const vw = window.innerWidth;
      if (vw < 640) return 256;
      if (vw < 1024) return 384;
      return 512;
    };

    let SIZE = getCanvasSize();
    canvas.width = SIZE;
    canvas.height = SIZE;

    // Load initial cat image
    initialImageRef.current = new Image();
    initialImageRef.current.src = '/assets/home/Tracks/cat.png';

    imagesRef.current = IMAGES.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    let loaded = 0;
    const totalImages = IMAGES.length + 1; // +1 for initial cat image

    const checkAllLoaded = () => {
      loaded++;
      if (loaded === totalImages) setup();
    };

    initialImageRef.current.onload = checkAllLoaded;
    imagesRef.current.forEach(img => {
      img.onload = checkAllLoaded;
    });

    const drawImageContain = (
      img: HTMLImageElement,
      x: number,
      y: number,
      w: number,
      h: number
    ) => {
      const r = Math.min(w / img.width, h / img.height);
      const nw = img.width * r;
      const nh = img.height * r;
      ctx.drawImage(img, x + (w - nw) / 2, y + (h - nh) / 2, nw, nh);
    };

    const draw = (progress: number, listItems: HTMLLIElement[]) => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      const imgSize = SIZE * 0.8;
      const offset = (SIZE - imgSize) / 2;

      // Show initial cat image when progress is 0
      if (progress <= 0) {
        setActiveTrack(null); // Reset active track when at start
        if (initialImageRef.current?.complete) {
          drawImageContain(initialImageRef.current, offset, offset, imgSize, imgSize);
        }
        return;
      }

      const segmentDuration = 1 / listItems.length;
      const raw = progress / segmentDuration;

      const liIndex = Math.min(Math.floor(raw), listItems.length - 1);
      const t = raw - liIndex;

      // Update active track for styling
      setActiveTrack(liIndex);

      // When progress is complete (at the end), show the last image fully
      if (progress >= 0.99) {
        const lastImg = imagesRef.current[IMAGES.length - 1];
        if (lastImg?.complete) {
          drawImageContain(lastImg, offset, offset, imgSize, imgSize);
        }
        return;
      }

      // For first segment, use initial cat image as previous
      const newImg = imagesRef.current[Math.min(liIndex, IMAGES.length - 1)];
      const prevImg =
        liIndex === 0
          ? initialImageRef.current
          : liIndex > 0
            ? imagesRef.current[Math.min(liIndex - 1, IMAGES.length - 1)]
            : null;

      // wipe line moves bottom -> top
      const wipeY = offset + imgSize * (1 - t);

      // TOP = previous image
      if (prevImg?.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(offset, offset, imgSize, wipeY - offset);
        ctx.clip();
        drawImageContain(prevImg, offset, offset, imgSize, imgSize);
        ctx.restore();
      }

      // BOTTOM = new image
      if (newImg?.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(offset, wipeY, imgSize, offset + imgSize - wipeY);
        ctx.clip();
        drawImageContain(newImg, offset, offset, imgSize, imgSize);
        ctx.restore();
      }
      if (t > 0 && t < 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, wipeY);
        ctx.lineTo(SIZE, wipeY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#d2ff52';
        ctx.shadowColor = '#d2ff52';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }
    };

    let scrollTriggerInstance: ScrollTrigger | null = null;
    let animationTimeline: gsap.core.Timeline | null = null;

    const setup = () => {
      SIZE = getCanvasSize();
      canvas.width = SIZE;
      canvas.height = SIZE;

      scrollTriggerInstance?.kill();
      animationTimeline?.kill();

      const listItems = Array.from(
        list.querySelectorAll('li')
      ) as HTMLLIElement[];

      const vh = window.innerHeight;
      const transforms: number[] = [];
      let totalHeight = 0;

      listItems.forEach((li, i) => {
        const h = li.getBoundingClientRect().height;
        const y = vh - h * (i + 1);
        transforms.push(y);
        totalHeight += y;
      });

      listItems.forEach((li, i) => {
        gsap.set(li, { y: transforms[i] });
      });

      animationTimeline = gsap.timeline();
      const seg = 1 / listItems.length;

      listItems.forEach((li, i) => {
        animationTimeline!.to(
          li,
          { y: 0, duration: seg, ease: 'none' },
          i * seg
        );
      });

      gsap.set(canvasWrap, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        zIndex: 10,
      });

      // Create list ScrollTrigger first
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: list,
        start: 'top top',
        end: `+=${totalHeight}`,
        pin: list,
        scrub: true,
        animation: animationTimeline,
        onUpdate: self => draw(self.progress, listItems),
        onLeave: () => {
          // When scrolling past the section, reset all tracks to default
          setActiveTrack(null);
        },
        onEnterBack: () => {
          // Re-entering from below, set to last track
          setActiveTrack(listItems.length - 1);
        },
      });

      ScrollTrigger.refresh();

      draw(0, listItems);
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        setup();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollTriggerInstance?.kill();
      animationTimeline?.kill();
      ScrollTrigger.killAll();
    };
  }, []);

  useEffect(() => {
    const canvas = bgCanvasRef.current;
    const section = sectionElementRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Failed to get 2d context for background canvas');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const handleImageError = () => {
      console.warn('Failed to load dino.png image');
      // Continue without image - canvas will just be empty
    };

    img.onerror = handleImageError;
    img.src = '/assets/home/Tracks/dino.png';

    type Tile = {
      x: number;
      y: number;
      w: number;
      h: number;
      visible: boolean;
      nextToggle: number;
    };

    let offscreen: HTMLCanvasElement | null = null;
    let offCtx: CanvasRenderingContext2D | null = null;
    let tiles: Tile[] = [];
    let rafId: number | null = null;
    const TILE_SIZE = 40;
    const ACTIVE_FRACTION = 0.1;
    const MAX_INVISIBLE_FRACTION = 0.1;
    const TOGGLE_SPEED = 1.5;

    const createOffscreenAndTiles = () => {
      if (!img.complete || img.width === 0 || img.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(canvas.clientWidth || window.innerWidth, 1);
      const height = Math.max(canvas.clientHeight || window.innerHeight, 1);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      offCtx = offscreen.getContext('2d');
      if (!offCtx) {
        console.warn('Failed to get 2d context for offscreen canvas');
        return;
      }

      offCtx.clearRect(0, 0, width, height);

      // Only draw image if it's loaded successfully
      if (img.complete && img.width > 0 && img.height > 0) {
        // Use Math.min for contain behavior (fit within bounds, centered)
        const scale = Math.min(width / img.width, height / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const dx = (width - drawW) / 2;
        const dy = (height - drawH) / 2;
        offCtx.drawImage(img, dx, dy, drawW, drawH);
      }

      tiles = [];
      const now = performance.now();
      for (let y = 0; y < height; y += TILE_SIZE) {
        for (let x = 0; x < width; x += TILE_SIZE) {
          tiles.push({
            x,
            y,
            w: Math.min(TILE_SIZE, width - x),
            h: Math.min(TILE_SIZE, height - y),
            visible: true, // Start all visible
            nextToggle: now + Math.random() * 2000 * TOGGLE_SPEED, // Random initial delay
          });
        }
      }
    };

    const loop = (now: number) => {
      if (!offscreen || !offCtx) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      const source = offscreen;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly toggle tiles
      const maxActive = Math.max(1, Math.floor(tiles.length * ACTIVE_FRACTION));
      const maxInvisible = Math.max(1, Math.floor(tiles.length * MAX_INVISIBLE_FRACTION));
      const tilesToToggle: Tile[] = [];

      tiles.forEach(tile => {
        if (now >= tile.nextToggle) {
          tilesToToggle.push(tile);
        }
      });

      // Randomly select which tiles to toggle this frame (up to maxActive)
      const shuffled = tilesToToggle.sort(() => Math.random() - 0.5);
      const toToggle = shuffled.slice(0, maxActive);

      // Track current invisible count so we never exceed maxInvisible
      let currentInvisible = 0;
      tiles.forEach(tile => {
        if (!tile.visible) currentInvisible += 1;
      });

      toToggle.forEach(tile => {
        // If tile is currently visible and we're already at the invisible cap,
        // skip hiding it (but still schedule its next toggle)
        if (tile.visible && currentInvisible >= maxInvisible) {
          tile.nextToggle = now + (200 + Math.random() * 800) * TOGGLE_SPEED;
          return;
        }

        // Flip visibility instantly
        if (tile.visible) {
          tile.visible = false;
          currentInvisible += 1;
        } else {
          tile.visible = true;
          if (currentInvisible > 0) currentInvisible -= 1;
        }

        tile.nextToggle = now + (200 + Math.random() * 800) * TOGGLE_SPEED; // Random delay before next toggle
      });

      // Draw ALL tiles (only visible ones)
      tiles.forEach(tile => {
        if (tile.visible) {
          ctx.drawImage(
            source,
            tile.x,
            tile.y,
            tile.w,
            tile.h,
            tile.x,
            tile.y,
            tile.w,
            tile.h
          );
        }
      });

      rafId = requestAnimationFrame(loop);
    };

    let bgPinTrigger: ScrollTrigger | null = null;
    let observer: IntersectionObserver | null = null;

    const start = () => {
      createOffscreenAndTiles();
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);

      // Pin background canvas wrapper when section reaches top
      const bgWrap = bgCanvasWrapRef.current;
      if (bgWrap && section) {
        bgPinTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: bgWrap,
          pinSpacing: false,
        });
      }
    };

    const stopLoop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };

    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!rafId && img.complete) {
            rafId = requestAnimationFrame(loop);
          }
        } else {
          stopLoop();
        }
      });
    };

    const handleResize = () => {
      createOffscreenAndTiles();
    };

    img.onload = start;
    window.addEventListener('resize', handleResize);

    // Intersection Observer to pause animation when not visible
    if (sectionElementRef.current) {
      observer = new IntersectionObserver(handleVisibility, { threshold: 0 });
      observer.observe(sectionElementRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      bgPinTrigger?.kill();
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionElementRef}
      id="tracks"
      className="relative w-full bg-[#5B2EFF] text-white mt-[100vh] pt-30 pb-[30vh] px-[5vw] z-5 overflow-hidden"
    >
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      <div ref={bgCanvasWrapRef} className="absolute w-full h-screen py-25 top-0 left-0 pointer-events-none -z-10">
        <canvas ref={bgCanvasRef} className="w-full h-full block" />
      </div>

      {/* Animated Title */}
      <div className="relative w-full flex justify-center mb-[6vh]">
        <div ref={titleRef} className="relative">
          {/* Glitch layers */}
          <h2
            className="title-layer absolute text-[10vw] sm:text-[8vw] font-pixalic tracking-wider font-bold select-none text-[#d2ff52] opacity-70"
            style={{ left: '4px', top: '4px' }}
          >
            TRACKS
          </h2>
          <h2
            className="title-layer absolute text-[10vw] sm:text-[8vw] font-pixalic tracking-wider font-bold select-none text-[#FF8C00] opacity-70"
            style={{ left: '-4px', top: '-4px' }}
          >
            TRACKS
          </h2>
          <h2
            className="title-layer relative text-[10vw] sm:text-[8vw] font-pixalic tracking-wider font-bold select-none text-white"
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.5)' }}
          >
            TRACKS
          </h2>

          {/* Subtitle */}
          <p className="text-center font-nikea text-white/60 text-lg md:text-xl mt-2 tracking-wide">
            Choose your battleground
          </p>
        </div>
      </div>


      <div ref={sectionRef} className="relative w-full pointer-events-none">
        {/* TRACK LIST */}
        <ul
          ref={listRef}
          id="tracks_list"
          className="relative w-full flex flex-col h-screen justify-between gap-10 pt-40"
        >
          <div
            ref={canvasWrapRef}
            className="pointer-events-none z-10"
          >
            <div className="w-[30vw] sm:w-[25vw] md:w-[20vw] aspect-square relative">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
          </div>
          {TRACK_DATA.map((track, i) => (
            <li
              key={track.label}
              className={`
                w-full flex text-[5vw] sm:text-[4vw] font-pixalic tracking-widest border-b-3 font-bold
                transition-all duration-300 relative
                ${i % 2 === 0 ? 'justify-start' : 'justify-end'}
                ${activeTrack === i ? 'scale-105' : 'opacity-80'}
              `}
              style={{
                borderColor: activeTrack === i ? track.color : 'rgba(255,255,255,0.3)',
                textShadow: activeTrack === i ? `0 0 20px ${track.color}` : 'none',
              }}
            >
              {/* Active indicator */}
              {activeTrack === i && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ backgroundColor: track.color, boxShadow: `0 0 10px ${track.color}` }}
                />
              )}
              <span className='overflow-hidden tracking-wider mr-3 float-left block'>
                <span className="flex items-center gap-2">
                  <span className="text-2xl">{track.icon}</span>
                  <span>{i + 1}.</span>
                </span>
              </span>
              <span
                className='overflow-hidden tracking-wider float-left block transition-colors duration-300'
                style={{ color: activeTrack === i ? track.color : '#FF8C00' }}
              >
                <span>{track.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom accent line */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d2ff52] to-transparent opacity-50" /> */}
    </section>
  );
}