'use client';
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
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
  const folderRef = useRef<HTMLDivElement>(null);
  const stripsContainerRef = useRef<HTMLDivElement>(null);
  const [windowOpen, setWindowOpen] = useState(false);
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
    // Re-enable body scroll when closing all windows
    document.body.style.overflow = '';
    setWindowOpen(false);
    setImageViewer(null);
    setTextViewer(null);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section for 300vh
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        onLeave: closeAllWindows,
        onLeaveBack: closeAllWindows,
      });

      // Animate hands coming together (first 33% of scroll)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        }
      })
        .to(leftHandRef.current, {
          x: 0,
          ease: 'none',
        }, 0)
        .to(rightHandRef.current, {
          x: 0,
          ease: 'none',
        }, 0);

      // Fade in folder when hands meet (around 33% mark)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        }
      })
        .fromTo(folderRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, ease: 'power2.out' }
        );

    }, containerRef);

    return () => ctx.revert();
  }, [closeAllWindows]);

  const handleFolderDoubleClick = () => {
    // Check if tracks section bottom is above 30% from bottom viewport
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.7; // 30% from bottom = 70% from top

      // If the bottom of the tracks section is above the 30% from bottom line, don't open
      if (rect.bottom < threshold) {
        return;
      }
    }

    // Disable body scroll when window opens
    document.body.style.overflow = 'hidden';
    setWindowOpen(true);
  };

  const handleCloseWindow = () => {
    // Re-enable body scroll when window closes
    document.body.style.overflow = '';
    setWindowOpen(false);
  };

  const handleImageDoubleClick = (src: string, title: string) => {
    // Replace existing image viewer or open new one
    setImageViewer({ src, title });
  };

  const handleCloseImageViewer = () => {
    setImageViewer(null);
  };

  const handleReadmeDoubleClick = () => {
    setTextViewer({
      title: 'readme.md',
      content: 'Problem statements for the Offline hackathon will be released a day prior to the hackathon.'
    });
  };

  const handleCloseTextViewer = () => {
    setTextViewer(null);
  };

  return (
    <section
      ref={containerRef}
      id="tracks"
      className="relative w-full h-screen bg-[#170d22] text-white mt-[100vh] flex flex-row justify-between items-center pt-30 z-5 overflow-hidden"
    >
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

      {/* Pixel Folder - Centered */}
      <div
        ref={folderRef}
        className="absolute inset-0 pt-30 flex items-center justify-center z-30 opacity-0"
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="flex flex-col items-center cursor-pointer select-none"
          onDoubleClick={handleFolderDoubleClick}
        >
          {/* Pixel Folder Icon */}
          <div className="w-24 h-20 relative mb-2">
            <svg viewBox="0 0 64 52" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
              {/* Folder back */}
              <rect x="0" y="8" width="64" height="44" fill="#c4a000" />
              {/* Folder tab */}
              <rect x="0" y="0" width="24" height="12" fill="#c4a000" />
              <polygon points="24,0 32,8 24,8" fill="#c4a000" />
              {/* Folder front */}
              <rect x="0" y="16" width="64" height="36" fill="#edd400" />
              {/* Pixel details */}
              <rect x="4" y="20" width="4" height="4" fill="#c4a000" />
              <rect x="12" y="20" width="4" height="4" fill="#c4a000" />
              <rect x="20" y="20" width="4" height="4" fill="#c4a000" />
            </svg>
          </div>
          <span className="text-white text-sm font-pixel-emulator drop-shadow-lg">tracks</span>
        </div>
      </div>

      {/* Dark Mode Retro Computer Window */}
      {windowOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50">
          <div
            className="w-[50vw] max-w-[800px] bg-[#1e1e1e] border-4 border-t-[#3c3c3c] border-l-[#3c3c3c] border-r-[#0a0a0a] border-b-[#0a0a0a] shadow-2xl"
            style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif' }}
          >
            {/* Title bar - Dark */}
            <div className="flex items-center justify-between px-2 py-1 bg-linear-to-r from-[#2d2d2d] to-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4">
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <rect x="0" y="4" width="16" height="12" fill="#edd400" />
                    <rect x="0" y="0" width="8" height="6" fill="#edd400" />
                  </svg>
                </div>
                <span className="text-gray-200 text-sm font-bold">Tracks</span>
              </div>
              <button
                onClick={handleCloseWindow}
                className="w-6 h-6 bg-[#e81123] border border-[#ff4d4d] rounded-sm flex items-center justify-center text-white font-bold text-xs hover:bg-[#f1707a] active:bg-[#8b0a14] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Menu bar - Dark */}
            <div className="flex gap-4 px-3 py-1.5 bg-[#2d2d2d] border-b border-[#3c3c3c] text-sm text-gray-300">
              <span className="hover:text-white cursor-pointer">File</span>
              <span className="hover:text-white cursor-pointer">Edit</span>
              <span className="hover:text-white cursor-pointer">View</span>
              <span className="hover:text-white cursor-pointer">Help</span>
            </div>

            {/* Content area - Dark */}
            <div className="p-4 bg-[#252526] min-h-[300px] border-2 border-[#3c3c3c] m-1">
              <div className="grid grid-cols-6 gap-4">
                {/* Track images */}
                {IMAGES.map((img, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer hover:bg-[#094771] p-2 rounded transition-colors"
                    onDoubleClick={() => handleImageDoubleClick(img, TRACK_DATA[index]?.label || `Track ${index + 1}`)}
                  >
                    <div className="w-16 h-16 border border-[#3c3c3c] bg-[#1e1e1e] flex items-center justify-center overflow-hidden mb-1 rounded">
                      <img
                        src={img}
                        alt={TRACK_DATA[index]?.label || `Track ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-center leading-tight text-gray-300">
                      {TRACK_DATA[index]?.label || `Track ${index + 1}`}
                    </span>
                  </div>
                ))}
                {/* Readme file - shown last */}
                <div
                  className="flex flex-col items-center cursor-pointer hover:bg-[#094771] p-2 rounded transition-colors"
                  onDoubleClick={handleReadmeDoubleClick}
                >
                  <div className="w-16 h-16 border border-[#3c3c3c] bg-[#1e1e1e] flex items-center justify-center overflow-hidden mb-1 rounded">
                    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#4fc3f7" stroke="#29b6f6" strokeWidth="1" />
                      <polyline points="14 2 14 8 20 8" fill="#81d4fa" stroke="#29b6f6" strokeWidth="1" />
                      <line x1="8" y1="13" x2="16" y2="13" stroke="#1e1e1e" strokeWidth="1.5" />
                      <line x1="8" y1="17" x2="14" y2="17" stroke="#1e1e1e" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <span className="text-xs text-center leading-tight text-gray-300">
                    readme.md
                  </span>
                </div>
              </div>
            </div>

            {/* Status bar - Dark */}
            <div className="flex items-center px-3 py-1.5 bg-[#2d2d2d] border-t border-[#3c3c3c] text-xs text-gray-400">
              <div className="flex-1">
                6 objects
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer Window - Dark Mode */}
      {imageViewer && (
        <div className="absolute inset-0 flex items-center justify-center z-60 bg-black/60">
          <div
            className="w-[40vw] max-w-[600px] bg-[#1e1e1e] border-4 border-t-[#3c3c3c] border-l-[#3c3c3c] border-r-[#0a0a0a] border-b-[#0a0a0a] shadow-2xl"
            style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif' }}
          >
            {/* Title bar with filename */}
            <div className="flex items-center justify-between px-2 py-1 bg-linear-to-r from-[#2d2d2d] to-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4">
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <rect x="2" y="2" width="12" height="12" fill="#4fc3f7" rx="1" />
                    <circle cx="6" cy="6" r="2" fill="#fff" />
                    <polygon points="4,12 8,8 10,10 14,6 14,12" fill="#81c784" />
                  </svg>
                </div>
                <span className="text-gray-200 text-sm font-bold truncate max-w-[300px]">
                  {imageViewer.title}
                </span>
              </div>
              <button
                onClick={handleCloseImageViewer}
                className="w-6 h-6 bg-[#e81123] border border-[#ff4d4d] rounded-sm flex items-center justify-center text-white font-bold text-xs hover:bg-[#f1707a] active:bg-[#8b0a14] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Image content */}
            <div className="p-2 bg-[#252526] border-2 border-[#3c3c3c] m-1">
              <img
                src={imageViewer.src}
                alt={imageViewer.title}
                className="w-full h-auto max-h-[50vh] object-contain rounded"
              />
            </div>

            {/* Status bar */}
            <div className="flex items-center px-3 py-1.5 bg-[#2d2d2d] border-t border-[#3c3c3c] text-xs text-gray-400">
              <div className="flex-1">
                {imageViewer.title}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Text Viewer Window - Dark Mode */}
      {textViewer && (
        <div className="absolute inset-0 flex items-center justify-center z-60 bg-black/60">
          <div
            className="w-[40vw] max-w-[600px] bg-[#1e1e1e] border-4 border-t-[#3c3c3c] border-l-[#3c3c3c] border-r-[#0a0a0a] border-b-[#0a0a0a] shadow-2xl"
            style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif' }}
          >
            {/* Title bar with filename */}
            <div className="flex items-center justify-between px-2 py-1 bg-linear-to-r from-[#2d2d2d] to-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4">
                  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#4fc3f7" stroke="#29b6f6" strokeWidth="1" />
                    <polyline points="14 2 14 8 20 8" fill="#81d4fa" stroke="#29b6f6" strokeWidth="1" />
                  </svg>
                </div>
                <span className="text-gray-200 text-sm font-bold truncate max-w-[300px]">
                  {textViewer.title}
                </span>
              </div>
              <button
                onClick={handleCloseTextViewer}
                className="w-6 h-6 bg-[#e81123] border border-[#ff4d4d] rounded-sm flex items-center justify-center text-white font-bold text-xs hover:bg-[#f1707a] active:bg-[#8b0a14] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Text content */}
            <div className="p-4 bg-[#1e1e1e] border-2 border-[#3c3c3c] m-1 min-h-[150px]">
              <p className="text-gray-300 text-sm leading-relaxed font-pixel-emulator" style={{ imageRendering: 'pixelated' }}>
                {textViewer.content}
              </p>
            </div>

            {/* Status bar */}
            <div className="flex items-center px-3 py-1.5 bg-[#2d2d2d] border-t border-[#3c3c3c] text-xs text-gray-400">
              <div className="flex-1">
                {textViewer.title}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}