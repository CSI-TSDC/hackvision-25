'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import StarCanvas with no SSR + loading priority adjustment
const StarCanvas = dynamic(() => import("@/components/ui/StarCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});

// Pixel-style CTA Button Component
const PixelCTAButton = () => {
  return (
    <div className="relative group mt-8 cursor-pointer">
      {/* Glitch layers */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
        <div className="absolute inset-0 bg-[#ff6b6b] translate-x-[2px] translate-y-[-2px]"
          style={{ clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }} />
        <div className="absolute inset-0 bg-[#4ecdc4] translate-x-[-2px] translate-y-[2px]"
          style={{ clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }} />
      </div>

      {/* Main button */}
      <a
        href="#"
        className="relative block px-10 py-4 md:px-14 md:py-5 bg-linear-to-r bg-[#00b4d8] 
                   text-black font-pixel-emulator text-sm md:text-base tracking-wider
                   transition-all duration-300 ease-out
                   hover:shadow-[0_0_40px_rgba(210,255,82,0.6),0_0_80px_rgba(210,255,82,0.3)]
                   hover:scale-105 active:scale-95
                   group-hover:animate-pulse"
        style={{
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
          textShadow: '1px 1px 0 rgba(0,0,0,0.1)'
        }}
      >
        {/* Corner pixels */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-black/20" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-black/20" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-black/20" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black/20" />

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-black animate-ping" />
          REGISTER NOW
          <span className="inline-block font-quinque">
            →
          </span>
        </span>
      </a>

      {/* Pixel border glow */}
      <div className="absolute -inset-1 opacity-60 blur-sm bg-gradient-to-r from-[#d2ff52] via-[#FF8C00] to-[#d2ff52] -z-10 group-hover:opacity-100 transition-opacity"
        style={{ clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)' }} />

      {/* Floating pixel decorations */}
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-[#d2ff52] animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-[#FF8C00] animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-2 h-2 bg-[#4ecdc4] animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-[#4ecdc4] animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-[#FF8C00] animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-2 h-2 bg-[#d2ff52] animate-bounce" style={{ animationDelay: '0s' }} />
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <>
      <section id="hero" className="h-screen w-full bg-black relative flex items-center justify-center overflow-hidden">
        <Image
          src="/hero/frame.png"
          alt="Frame"
          width={1920}
          height={1080}
          priority
          className="absolute top-0 left-0 w-full h-full z-2 pointer-events-none"
        />
        <StarCanvas />
        <div className="absolute bottom-0 w-full h-[52.5vh] z-3 pointer-events-none">
          <Image
            src="/hero/pixel_layer.png"
            alt="Pixel Layer"
            width={1920}
            height={1080}
            className="object-bottom w-full h-full"
          />
        </div>

        <div className="absolute top-0 left-0 pt-[2.5vh] tracking-wider flex flex-row pl-[2.2vw] z-5 text-[1.8vh] font-quinque">
          <div className="w-14 mr-6 relative h-14">
            <Image
              src="/assets/Logos/csi_logo.png"
              alt="CSI Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col-reverse">
            <span className="font-pixel-emulator text-[2.2vw] leading-tight md:block hidden">CSI Presents</span>
            <div className=" flex gap-[2px] mb-4">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="arrow"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-[28%] w-max max-w-[90vw] h-max left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10">
          <div className="w-[60vw] h-[20vh] mb-4 relative">
            <Image
              src="/assets/home/hackvision_logo.png"
              alt="HackVision Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="font-pixel-emulator text-[2vh] md:text-[2.8vh] tracking-wide text-center font-bold ml-6">
            <p>24 Hours of Coding, Creativity & Chaos</p>
          </div>

          {/* Pixel-style CTA Button */}
          <PixelCTAButton />
        </div>
      </section>
    </>
  );
}
