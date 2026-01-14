'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import StarCanvas with no SSR + loading priority adjustment
const StarCanvas = dynamic(() => import("@/components/ui/StarCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});

// 3D Beveled CTA Button Component (Windows 95 style)
const PixelCTAButton = () => {
  return (
    <a
      href="#"
      className="relative mt-8 cursor-pointer inline-block group"
    >
      {/* Outer frame - dark bottom/right edges */}
      <div className="absolute inset-0 bg-[#808080] translate-x-1 translate-y-1" />

      {/* Main button container */}
      <div className="relative bg-[#c0c0c0] border-4 border-t-white border-l-white border-r-[#404040] border-b-[#404040]">
        {/* Inner container with inverted bevel */}
        <div className="bg-white border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-8 py-3 md:px-12 md:py-4">
          <span className="font-pixel-emulator text-black text-sm md:text-base tracking-wider whitespace-nowrap">
            REGISTER NOW
          </span>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Active/pressed state handled by group-active */}
      <style jsx>{`
        a:active > div:nth-child(2) {
          border-color: #404040 #404040 white white;
        }
        a:active > div:nth-child(2) > div {
          border-color: white white #808080 #808080;
        }
      `}</style>
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
