
'use client';
import { useEffect, useRef } from 'react';

const IMAGES = [
    '/assets/home/Tracks/aiml.png',
    '/assets/home/Tracks/blockchain.png',
    '/assets/home/Tracks/campus.png',
    '/assets/home/Tracks/cybersec.png',
    '/assets/home/Tracks/webdev.png',
  ];

export default function Tracks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 512;
    const GRID = 8;

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

    const setup = () => {
      const canvasScroll = canvas.getBoundingClientRect().height;
      section.style.height =
        `${window.innerHeight + canvasScroll * (IMAGES.length - 1)}px`;

      window.addEventListener('scroll', draw);
      draw();
    };

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
      const nx = x + (w - nw) / 2;
      const ny = y + (h - nh) / 2;
      ctx.drawImage(img, nx, ny, nw, nh);
    };

    const draw = () => {
        const rect = section.getBoundingClientRect();
      
        const imgSize = SIZE * 0.8;
        const total = (IMAGES.length - 1) * imgSize;
      
        const scrolled = Math.min(
          Math.max(-rect.top, 0),
          total
        );
      
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
      
        ctx.globalCompositeOperation = 'source-atop';
        const cell = imgSize / GRID;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
      
        for (let i = 0; i <= GRID; i++) {
          const p = offset + i * cell;
      
          ctx.beginPath();
          ctx.moveTo(p, offset);
          ctx.lineTo(p, offset + imgSize);
          ctx.stroke();
      
          ctx.beginPath();
          ctx.moveTo(offset, p);
          ctx.lineTo(offset + imgSize, p);
          ctx.stroke();
        }
      
        ctx.globalCompositeOperation = 'source-over';
      
        if (index < IMAGES.length - 1) {
          ctx.save();
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2; 
          ctx.beginPath();
          ctx.moveTo(0, revealY);
          ctx.lineTo(SIZE, revealY);
          ctx.stroke();
          ctx.restore();
        }
      };
    return () => window.removeEventListener('scroll', draw);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tracks"
      className="relative w-full bg-black grassbg pt-20"
    >
      <div className="w-full flex justify-center mb-[4vh]">
        <h2 className="cd text-[8vw] font-pixel-emulator select-none">
          Tracks
        </h2>
      </div>

      <div className="sticky top-[20vh] flex justify-center">
        <canvas
          ref={canvasRef}
          className="w-[30vw] aspect-square"
        />
      </div>
    </section>
  );
}