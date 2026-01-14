'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export default function Tracks() {
  const containerRef = useRef<HTMLElement>(null);
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const stripsContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentOpacity, setContentOpacity] = useState(0);
  const [imageViewer, setImageViewer] = useState<{ src: string; title: string } | null>(null);
  const [textViewer, setTextViewer] = useState<{ content: string; title: string } | null>(null);

  const repeat = (text: React.ReactNode, className?: string) =>
    Array.from({ length: 50 }).map((_, i) => (
      <span key={i} className={`whitespace-nowrap font-bold flex items-center ${className || ''}`}>
        {text}
      </span>
    ));

  // Close all windows function
  const closeAllWindows = useCallback(() => {
    setImageViewer(null);
    setTextViewer(null);
  }, []);

  // Pixel reveal animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!canvas || !content) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Update canvas size to match content
    const rect = content.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const pixelSize = 6;
    const cols = Math.ceil(canvas.width / pixelSize);
    const rows = Math.ceil(canvas.height / pixelSize);
    const totalPixels = cols * rows;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create pixel order array (seeded random for consistent pattern)
    const pixelOrder: number[] = [];
    for (let i = 0; i < totalPixels; i++) {
      pixelOrder.push(i);
    }
    for (let i = pixelOrder.length - 1; i > 0; i--) {
      const j = Math.abs(Math.floor((Math.sin(i * 12.9898) * 43758.5453) % 1 * (i + 1)));
      [pixelOrder[i], pixelOrder[j % pixelOrder.length]] =
        [pixelOrder[j % pixelOrder.length], pixelOrder[i]];
    }

    // Draw pixels based on opacity (reveals content progressively)
    const pixelsToShow = Math.floor(totalPixels * contentOpacity);

    // Fill entire canvas with black glass-like semi-transparent color
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Black glass tint
    for (let i = 0; i < pixelsToShow; i++) {
      const pixelIndex = pixelOrder[i];
      const col = pixelIndex % cols;
      const row = Math.floor(pixelIndex / cols);
      ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
    }
  }, [contentOpacity]);

  useEffect(() => {
    if (!stripsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Strips animation - only when section is visible
      const strips = gsap.utils.toArray('.strip');
      if (strips.length === 0) return;

      strips.forEach((el: any, i: number) => {
        const speed = 100;
        const dir = i % 2 === 0 ? 1 : -1;
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%', // Match the pin duration
          scrub: 1,
          onUpdate: (self) => {
            // Loop the animation using modulo
            const xPercent = (self.progress * speed * dir) % 100;
            gsap.set(el, { xPercent });
          },
        });
      });
    }, stripsContainerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        onLeave: closeAllWindows,
        onLeaveBack: closeAllWindows,
      });

      // Animate hands coming together
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          onUpdate: (self) => {
            // Start filling pixels when hands start getting close (after 50%)
            if (self.progress > 0.5) {
              const revealStart = 0.5;
              const revealEnd = 1;
              const normalizedProgress = (self.progress - revealStart) / (revealEnd - revealStart);
              setContentOpacity(Math.min(1, Math.max(0, normalizedProgress)));
            } else {
              setContentOpacity(0);
            }
          }
        }
      })
        .to(leftHandRef.current, { x: 0, ease: 'none' }, 0)
        .to(rightHandRef.current, { x: 0, ease: 'none' }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, [closeAllWindows]);

  const handleImageDoubleClick = (src: string, title: string) => {
    setImageViewer({ src, title });
    // Disable scroll when viewer is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseImageViewer = () => {
    setImageViewer(null);
    // Re-enable scroll
    document.body.style.overflow = '';
  };

  const handleReadmeDoubleClick = () => {
    setTextViewer({
      title: 'readme.md',
      content: 'Problem statements for the Offline hackathon will be released a day prior to the hackathon.'
    });
    // Disable scroll when viewer is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseTextViewer = () => {
    setTextViewer(null);
    // Re-enable scroll
    document.body.style.overflow = '';
  };

  return (
    <section
      ref={containerRef}
      id="tracks"
      className="relative w-full min-h-screen bg-[#1757b7] text-white mt-[100vh] flex flex-col justify-between items-center z-5 overflow-hidden">
      <div className="relative w-full h-screen flex flex-row justify-between items-center">
        <div className='grid-bg'></div>

        {/* Hands */}
        <img
          ref={leftHandRef}
          className="w-[45vw] mix-blend-color-dodge -translate-x-[30%] z-20"
          src="/assets/home/Tracks/lefthand.png"
          alt=""
        />
        <img
          ref={rightHandRef}
          className="w-[45vw] mix-blend-color-dodge translate-x-[30%] z-20"
          src="/assets/home/Tracks/righthand.png"
          alt=""
        />

        {/* Always visible window frame with transparent content */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div
            className="relative w-[90vw] md:w-[650px]"
            style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif' }}
          >
            {/* Window frame - always visible */}
            <div className="border-2 border-[#c0c0c0] bg-transparent rounded-lg shadow-2xl overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center justify-between px-2 py-1 bg-[#000080]">
                <span className="text-white text-sm font-bold tracking-wide">TRACKS.EXE</span>
                <div className="flex gap-1">
                  <div className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] flex items-center justify-center text-black text-xs font-bold">_</div>
                  <div className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] flex items-center justify-center text-black text-xs font-bold">□</div>
                  <div className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] flex items-center justify-center text-black text-xs font-bold">×</div>
                </div>
              </div>

              {/* Content area - transparent background, pixels fill in */}
              <div
                ref={contentRef}
                className="relative h-[60vh] md:h-[500px] border-t-2 border-[#808080]"
                style={{ pointerEvents: contentOpacity > 0.9 ? 'auto' : 'none' }}
              >
                {/* Glassmorphism layer - fades in with animation */}
                <div
                  className="absolute inset-0 backdrop-blur-md bg-black/50"
                  style={{
                    opacity: contentOpacity,
                    visibility: contentOpacity > 0.01 ? 'visible' : 'hidden',
                    transition: 'opacity 0.1s'
                  }}
                />

                {/* Canvas for pixel fill effect */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ imageRendering: 'pixelated' }}
                />

                {/* Content - only visible when fully revealed */}
                <div
                  className="absolute inset-0 p-4 overflow-y-auto"
                  style={{ opacity: contentOpacity > 0.95 ? 1 : 0, transition: 'opacity 0.3s' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {IMAGES.map((img, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 md:cursor-pointer hover:md:bg-[#1757b7] p-2 rounded transition-colors pointer-events-none md:pointer-events-auto"
                        onDoubleClick={() => handleImageDoubleClick(img, TRACK_DATA[index]?.label || `Track ${index + 1}`)}
                      >
                        <div className="w-14 h-14 border-2 border-[#808080] bg-[#c0c0c0] flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={img}
                            alt={TRACK_DATA[index]?.label || `Track ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[11px] leading-tight text-white font-pixel-emulator">
                          {TRACK_DATA[index]?.label || `Track ${index + 1}`}
                        </span>
                      </div>
                    ))}
                    {/* Readme file */}
                    <div
                      className="flex items-center gap-3 md:cursor-pointer hover:md:bg-[#1757b7] p-2 rounded transition-colors pointer-events-none md:pointer-events-auto"
                      onDoubleClick={handleReadmeDoubleClick}
                    >
                      <div className="w-14 h-14 border-2 border-[#808080] bg-[#c0c0c0] flex items-center justify-center overflow-hidden shrink-0">
                        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#fff" stroke="#000" strokeWidth="1" />
                          <polyline points="14 2 14 8 20 8" fill="#ddd" stroke="#000" strokeWidth="1" />
                        </svg>
                      </div>
                      <span className="text-[11px] leading-tight text-white font-pixel-emulator">readme.md</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Viewer Window */}
        {imageViewer && (
          <div className="absolute inset-0 flex items-center justify-center z-60 bg-black/60 pointer-events-auto">
            <div
              className="w-[40vw] max-w-[600px] bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-2xl"
              style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif' }}
            >
              <div className="flex items-center justify-between px-1 py-0.5 bg-[#000080]">
                <span className="text-white text-xs font-bold">{imageViewer.title}</span>
                <button
                  onClick={handleCloseImageViewer}
                  className="w-4 h-4 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] flex items-center justify-center text-black text-[10px] font-bold hover:bg-[#d0d0d0]"
                >
                  ×
                </button>
              </div>
              <div className="p-2 bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white m-1">
                <img
                  src={imageViewer.src}
                  alt={imageViewer.title}
                  className="w-full h-auto max-h-[50vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Text Viewer Window */}
        {textViewer && (
          <div className="absolute inset-0 flex items-center justify-center z-60 bg-black/60 pointer-events-auto">
            <div
              className="w-[40vw] max-w-[500px] bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-2xl"
              style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif' }}
            >
              <div className="flex items-center justify-between px-1 py-0.5 bg-[#000080]">
                <span className="text-white text-xs font-bold">{textViewer.title}</span>
                <button
                  onClick={handleCloseTextViewer}
                  className="w-4 h-4 bg-[#c0c0c0] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] flex items-center justify-center text-black text-[10px] font-bold hover:bg-[#d0d0d0]"
                >
                  ×
                </button>
              </div>
              <div className="p-3 bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white m-1 min-h-[100px]">
                <p className="text-black text-sm leading-relaxed font-pixel-emulator">
                  {textViewer.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Animated Strips */}
      <div ref={stripsContainerRef} className="relative w-full h-[380px] overflow-hidden z-40 pointer-events-none">
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

        <div className="absolute top-[25%] w-[150vw] h-[70px] bg-[#FF6B35] -translate-x-[20px] text-black border-y-4 border-black origin-top-right -rotate-4">
          <div className="strip w-full h-full flex items-center justify-center">
            {repeat('CODE • CREATE • DEPLOY', 'mx-8')}
          </div>
        </div>

        <div className="absolute bottom-0 w-[150vw] h-[70px] bg-black border-y-4 border-black">
          <div className="strip w-full h-full flex items-center justify-center text-[#FF6B35]">
            {repeat(
              <>
                <span>REGISTRATIONS OPEN</span>
                <Dot />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}