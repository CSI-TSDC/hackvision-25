'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Dither from '@/components/ui/Dither';
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
  const ditherRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const list = listRef.current;
    const canvasWrap = canvasWrapRef.current;
    if (!canvas || !section || !list || !canvasWrap) return;
  
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
  
    imagesRef.current = IMAGES.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
  
    let loaded = 0;
    imagesRef.current.forEach(img => {
      img.onload = () => {
        loaded++;
        if (loaded === IMAGES.length) setup();
      };
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
      if (progress <= 0) return;
    
      const imgSize = SIZE * 0.8;
      const offset = (SIZE - imgSize) / 2;
    
      const segmentDuration = 1 / listItems.length;
      const raw = progress / segmentDuration;
    
      const liIndex = Math.min(Math.floor(raw), listItems.length - 1);
      const t = raw - liIndex;
    
      // First segment starts blank
      if (liIndex === 0 && t <= 0) return;
    
      const newImg = imagesRef.current[Math.min(liIndex, IMAGES.length - 1)];
      const prevImg =
        liIndex > 0
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
  
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: list,
        start: 'top top',
        end: `+=${totalHeight}`,
        pin: list,
        scrub: true,
        animation: animationTimeline,
        onUpdate: self => draw(self.progress, listItems),
      });
  
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
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section
      id="tracks"
      className="relative w-full bg-[#5B2EFF] text-white pt-30 pb-50 px-[5vw]"
    >
      <div ref={ditherRef} className='absolute top-0 left-0 w-full h-screen opacity-60'>
        <Dither
          waveColor={[0.5,0.5,0.8]}
          mouseRadius={0.1}
        />
      </div>
      <div className="relative w-full flex justify-center mb-[4vh]">
        <h2 className="text-[10vw] sm:text-[8vw] font-pixalic tracking-wider font-bold select-none">
          Tracks
        </h2>
      </div>
      

      <div ref={sectionRef} className="relative w-full">
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