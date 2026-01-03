'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  '/assets/home/Tracks/aiml.png',
  '/assets/home/Tracks/blockchain.png',
  '/assets/home/Tracks/campus.png',
  '/assets/home/Tracks/cybersec.png',
  '/assets/home/Tracks/webdev.png',
];

export default function Tracks() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const list = listRef.current;
    const canvasWrap = canvasWrapRef.current;
    if (!canvas || !section || !list || !canvasWrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 512;
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

    const draw = (progress: number) => {
      const imgSize = SIZE * 0.8;
      const total = (IMAGES.length - 1) * imgSize;

      const scrolled = progress * total;
      const index = Math.floor(scrolled / imgSize);
      const local = (scrolled % imgSize) / imgSize;

      const imgA = imagesRef.current[index];
      const imgB = imagesRef.current[index + 1] || imgA;

      const offset = (SIZE - imgSize) / 2;
      const revealY = offset + imgSize * (1 - local);

      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.save();
      ctx.beginPath();
      ctx.rect(offset, offset, imgSize, revealY - offset);
      ctx.clip();
      drawImageContain(imgA, offset, offset, imgSize, imgSize);
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.rect(offset, revealY, imgSize, offset + imgSize - revealY);
      ctx.clip();
      drawImageContain(imgB, offset, offset, imgSize, imgSize);
      ctx.restore();
    };

    const setup = () => {
      const imgSize = SIZE * 0.8;
      const scrollLength = imgSize * (IMAGES.length - 1);

      gsap.set(section, {
        height: window.innerHeight + scrollLength,
      });

      // Calculate where the list will be when trigger starts (at viewport top)
      // Position canvas at viewport center relative to that point
      const listRect = list.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const listTopOffset = listRect.top - sectionRect.top;
      
      // Position canvas absolutely so it's at viewport center when list reaches top
      gsap.set(canvasWrap, {
        position: 'absolute',
        left: '50%',
        top: listTopOffset + window.innerHeight / 2,
        xPercent: -50,
        yPercent: -50,
      });

      ScrollTrigger.create({
        trigger: list,
        start: 'top top',
        end: `+=${scrollLength}`,
        pin: canvasWrap,
        pinSpacing: false,
        scrub: true,
        onUpdate: self => draw(self.progress),
      });

      draw(0);
    };

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <section
      id="tracks"
      className="relative w-full bg-[#5B2EFF] text-white pt-30 px-[5vw]"
    >
      <div className="w-full flex justify-center mb-[4vh]">
        <h2 className="text-[8vw] font-pixalic tracking-wider font-bold select-none">
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
            <div className="w-[20vw] aspect-square">
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
              className={`w-full flex text-[4vw] font-pixalic tracking-widest border-b-3 font-bold ${
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