'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import StarCanvas with no SSR + loading priority adjustment
const StarCanvas = dynamic(() => import("@/components/ui/StarCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});

// Pixelated CTA Button with jagged retro pixel edges (blue variant)
const PixelCTAButton = () => {
  return (
    <a
      href="#"
      className="relative mt-8 cursor-pointer inline-block group"
    >
      {/* Outer pixel border layer */}
      <div className="relative">
        {/* Main button with pixel styling */}
        <button className="relative px-8 py-3 bg-[#1a1a2e] text-white font-pixel-emulator text-base md:text-lg
          border-4 border-[#3b82f6]
          shadow-[4px_4px_0_#1e40af,-4px_-4px_0_#60a5fa]
          hover:shadow-[6px_6px_0_#1e40af,-6px_-6px_0_#60a5fa]
          active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#1e40af,-2px_-2px_0_#60a5fa]
          transition-all duration-100
          before:absolute before:inset-[-8px] before:border-2 before:border-[#3b82f6]/50
          after:absolute after:top-0 after:left-0 after:w-full after:h-full after:border-2 after:border-[#93c5fd]/30
          [clip-path:polygon(0_8px,8px_8px,8px_0,calc(100%-8px)_0,calc(100%-8px)_8px,100%_8px,100%_calc(100%-8px),calc(100%-8px)_calc(100%-8px),calc(100%-8px)_100%,8px_100%,8px_calc(100%-8px),0_calc(100%-8px))]
          flex items-center gap-3">
          <span className="text-[#60a5fa] text-xl">▶</span>
          <span className="tracking-wider">Press start</span>
        </button>
        {/* Corner pixel accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#3b82f6]"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#3b82f6]"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#3b82f6]"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#3b82f6]"></div>
      </div>
    </a>
  );
};

export default function Hero() {
  return (
    <>
      <section id="hero" className="h-screen w-full bg-black relative flex items-center justify-center overflow-hidden">
        {/* Desktop frame */}
        <Image
          src="/hero/frame.png"
          alt="Frame"
          width={1920}
          height={1080}
          priority
          className="absolute top-0 left-0 w-full h-full z-2 pointer-events-none hidden md:block"
        />
        {/* Mobile frame */}
        <Image
          src="/hero/mob_frame.png"
          alt="Frame"
          width={375}
          height={812}
          priority
          className="absolute top-0 left-0 w-full h-full z-2 pointer-events-none block md:hidden"
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

        <div className="absolute w-[33vw] top-0 left-0 pt-[2.5vh] tracking-wider flex flex-row items-stretch justify-center  pl-[2.2vw] z-5 text-[1.8vh] font-quinque">
          <div className="w-14 mr-6 relative h-14">
            <Image
              src="/assets/Logos/csi_logo.webp"
              alt="CSI Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative hidden flex-col-reverse justify-between h-auto md:flex">
            <span className="font-pixel-emulator text-white text-[2.3vh] leading-tigh">CSI Presents</span>
            <div className=" flex gap-[2px] mb-2">
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
          <div className="font-pixel-emulator text-[2vh] md:text-[2.8vh] tracking-wide text-center font-bold md:ml-6">
            <p>24 Hours of Coding, Creativity & Chaos</p>
          </div>

          {/* Pixel-style CTA Button */}
          <PixelCTAButton />
        </div>
      </section>
    </>
  );
}
