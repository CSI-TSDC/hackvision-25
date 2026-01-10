'use client';
import { useEffect, useRef } from 'react';
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
        if (initialImageRef.current?.complete) {
          drawImageContain(initialImageRef.current, offset, offset, imgSize, imgSize);
        }
        return;
      }
    
      const segmentDuration = 1 / listItems.length;
      const raw = progress / segmentDuration;
    
      const liIndex = Math.min(Math.floor(raw), listItems.length - 1);
      const t = raw - liIndex;
    
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
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
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
      visible: boolean; // instant 0 or 1, no easing
      nextToggle: number; // timestamp when to toggle
    };

    let offscreen: HTMLCanvasElement | null = null;
    let offCtx: CanvasRenderingContext2D | null = null;
    let tiles: Tile[] = [];
    let rafId: number | null = null;
    const TILE_SIZE = 40;
    const ACTIVE_FRACTION = 0.1; // fraction of tiles that may try to toggle each frame
    const MAX_INVISIBLE_FRACTION = 0.1; // hard cap on how many tiles can be invisible at once
    const TOGGLE_SPEED = 1.5; // speed multiplier: lower = faster, higher = slower (1.0 = normal)

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

    const handleResize = () => {
      createOffscreenAndTiles();
    };

    img.onload = start;
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      bgPinTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionElementRef}
      id="tracks"
      className="relative w-full bg-[#5B2EFF] text-white pt-30 pb-50 px-[5vw] z-5"
    >
      <div ref={bgCanvasWrapRef} className="absolute w-full h-screen py-25 top-0 left-0 pointer-events-none -z-10">
        <canvas ref={bgCanvasRef} className="w-full h-full block" />
      </div>
      <div className="relative w-full flex justify-center mb-[4vh]">
        <h2 className="text-[10vw] sm:text-[8vw] font-pixalic tracking-wider font-bold select-none">
          Tracks
        </h2>
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
            <div className="w-[30vw] sm:w-[25vw] md:w-[20vw] aspect-square">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
          </div>
          {[
            'Web Dev',
            'AI / ML',
            'Cybersecurity',
            'Blockchain',
            'Campus',
          ].map((label, i) => (
            <li
              key={label}
              className={`w-full flex text-[5vw] sm:text-[4vw] font-pixalic tracking-widest border-b-3 font-bold ${
                i % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <span className='overflow-hidden tracking-wider mr-3 float-left block'>
                <span>{i+1}.</span>
              </span>
              <span className='overflow-hidden text-[#FF8C00] tracking-wider float-left block'>
                <span>{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}