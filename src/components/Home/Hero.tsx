'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const StarCanvas = dynamic(() => import("@/components/ui/StarCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});

const PixelCTAButton = () => {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href="https://unstop.com/o/8YEQtVf?lb=xk26YO1e&utm_medium=Share&utm_source=abhadho42350&utm_campaign=Online_coding_challenge"
      className="relative mt-8 cursor-pointer inline-block group"
    >
      <div className="absolute -translate-y-3 active:-translate-y-1.5 w-[30vh] h-[8vh] md:w-[20vw] p-1.5 bg-white ctaclip z-2">
        <div className="relative w-full h-full bg-blue-600 ctaclip flex items-center justify-center">
          <span className="font-pixel-emulator text-white text-[2.3vh] leading-tigh">Register Now</span>
        </div>
      </div>
      <div className="w-[30vh] h-[8vh] md:w-[20vw] bg-blue-600 ctaclip scale-98"></div>
    </a>
  );
};

export default function Hero() {
  // Parallax effect for frame2 only
  useEffect(() => {
    const frame2 = document.getElementById('frame2');

    if (frame2) {
      gsap.to(frame2, {
        yPercent: -20, // Enhanced parallax effect
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === document.getElementById('hero')) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="h-screen w-full bg-black relative flex items-center justify-center overflow-hidden">
        {/* Desktop frame */}
        <Image
          id='frame1'
          src={`${BASE_PATH}/hero/frame.png`}
          alt="Frame"
          width={1920}
          height={1080}
          priority
          className="absolute top-0 left-0 w-full h-full z-2 pointer-events-none hidden md:block"
        />
        {/* Mobile frame */}
        <Image
          src={`${BASE_PATH}/hero/mob_frame.png`}
          alt="Frame"
          width={375}
          height={812}
          priority
          className="absolute top-0 left-0 w-full h-full z-2 pointer-events-none block md:hidden"
        />

        <StarCanvas />
        <div id='frame2' className="absolute bottom-0 w-full h-[52.5vh] z-3 pointer-events-none hidden md:block">
          <Image
            src={`${BASE_PATH}/hero/pixel_layer.png`}
            alt="Pixel Layer"
            width={1920}
            height={1080}
            className="object-bottom w-full h-full z-5 hidden md:landscape:block lg:block"
          />
          <Image
            src={`${BASE_PATH}/hero/mob_pixel.png`}
            alt="Frame"
            width={375}
            height={812}
            priority
            className="object-bottom w-full h-full z-5 md:hidden"
          />
          <Image
            src={`${BASE_PATH}/hero/tab_pixel.png`}
            alt="Frame"
            width={1536}
            height={2048}
            priority
            className="object-bottom w-full h-full z-5 hidden md:portrait:block lg:hidden"
          />
          <div className='w-full h-1/2 bg-[#3054e5]'></div>
        </div>

        <div className="absolute w-[33vw] top-0 left-0 pt-[2.5vh] tracking-wider hidden md:flex flex-row items-stretch justify-center  pl-[2.2vw] z-5 text-[1.8vh] font-quinque">
          <div className="w-14 mr-6 relative h-14">
            <Image
              src={`${BASE_PATH}/assets/Logos/csi_logo.webp`}
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
          <div className="w-[85vw] h-[20vh] md:w-[60vw] md:h-[20vh] mb-4 relative">
            <Image
              src={`${BASE_PATH}/assets/Logos/hackvision_logo.webp`}
              alt="HackVision Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="font-pixel-emulator text-white text-[2vh] mb-10 md:text-[2.8vh] tracking-wide text-center font-bold md:ml-6">
            <p>24 Hours of Coding, Creativity & Chaos</p>
          </div>

          {/* Pixel-style CTA Buttons */}
          <div className="flex flex-col-reverse items-center md:flex-row-reverse gap-8">
            {/* Long button - Problem Statements */}
            <a
              href="https://docs.google.com/document/d/1XTSru9dEsbVjpeD36SmxH1yrmUBp_te1OvnIsQFLRes/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group cursor-pointer w-full md:w-[50vh]"
            >
              <div className="relative bg-amber-50 cta-button p-1.5 h-[7vh] z-10 -translate-y-3 group-hover:-translate-y-2">
                <div className="w-full h-full px-2 md:px-4 flex justify-center items-center bg-blue-600 group-hover:bg-yellow-400 cta-button text-white group-hover:text-black transition-colors duration-200">
                  <p className="text-[1.3vh] md:text-[1.6vh] font-quinque whitespace-nowrap">
                    View Problem Statements <span className='inline-block -ml-2'>→</span>
                  </p>
                </div>
              </div>
              <div className="top-0 left-0 w-full h-full absolute z-0 cta-button bg-blue-900 group-hover:bg-yellow-900 transition-colors duration-200" />
            </a>

            {/* Short button - Register Now */}
            <a
              href="https://unstop.com/hackathons/hackvision-thakur-shyamnarayan-degree-college-mumbai-maharashtra-1620837"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group cursor-pointer w-[25vh] md:w-[32vh]"
            >
              <div className="relative bg-amber-50 cta-button p-1.5 h-[7vh] z-10 -translate-y-3 group-hover:-translate-y-2">
                <div className="w-full h-full flex justify-center items-center bg-blue-600 group-hover:bg-yellow-400 cta-button text-white group-hover:text-black transition-colors duration-200">
                  <p className="text-[1.4vh] md:text-[1.8vh] font-quinque whitespace-nowrap">
                    Register Now!
                  </p>
                </div>
              </div>
              <div className="top-0 left-0 w-full h-full absolute z-0 cta-button bg-blue-900 group-hover:bg-yellow-900 transition-colors duration-200" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
