'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Pixel Sponsor Card Component
const PixelSponsorCard = ({ number, logo, alt, size, title, companyName }: { number: number; logo: string; alt: string; size: string; title: string; companyName: string }) => {
    return (
        <div className="relative h-[40vh] w-[250px] flex flex-col justify-center p-4 aspect-3/4 sponsorclip bg-blue-600">
            <div className="relative sponsor-im-clip w-full h-[60%] pt-[50px] bg-[#f5f0e6]">
                <div className="absolute top-0 left-0 w-[50px] aspect-square bg-blue-600">
                    <div className="absolute right-0 top-0 translate-x-full h-full w-[5px] flex flex-col">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={`row1-${i}`}
                                className={`h-full flex-1 w-[5px] aspect-square ${i % 2 === 0 ? 'rgb(0,0,0,0)' : 'bg-blue-600'}`}
                            />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 translate-x-[200%] h-full w-[5px] flex flex-col">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={`row2-${i}`}
                                className={`h-full flex-1 w-[5px] aspect-square ${i % 2 === 1 ? 'rgb(0,0,0,0)' : 'bg-blue-600'}`}
                            />
                        ))}
                    </div>
                    <div className="w-full h-full flex items-center justify-center font-quinque">
                        <span className="text-[3vh] text-white"></span>
                    </div>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <Image className={`${size}`} src={logo} alt={alt} width={200} height={200} />
                </div>
            </div>
            <div className="w-full h-auto flex-1">
                <div className="w-full h-full flex flex-col items-center justify-center px-2 gap-1">
                    <span className="text-white/70 font-pixel-emulator text-center text-[1.2vh] md:text-[1.4vh] mb-3 leading-tight">
                        {companyName}
                    </span>
                    <span className="text-white font-nikea text-center text-[2vh] md:text-[2.5vh] lg:text-[2.6vh] leading-tight">
                        {title}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Checkerboard Strip Component  
const CheckerboardStrip = () => {
    return (
        <div className="relative w-full flex flex-col">
            {/* Row 1 */}
            <div className="w-full h-max flex">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={`row1-${i}`}
                        className={`h-full flex-1 w-[32px] aspect-square ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#1a1a2e]'}`}
                    />
                ))}
            </div>
            {/* Row 2 - offset pattern */}
            <div className="w-full h-max flex">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={`row2-${i}`}
                        className={`h-full flex-1 w-[32px] aspect-square ${i % 2 === 1 ? 'bg-transparent' : 'bg-[#1a1a2e]'}`}
                    />
                ))}
            </div>
        </div>
    );
};

// Floating Pixel Decoration
const FloatingPixel = ({ className, delay }: { className: string; delay: number }) => {
    const pixelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pixelRef.current) {
            gsap.to(pixelRef.current, {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: delay
            });
        }
    }, [delay]);

    return (
        <div ref={pixelRef} className={`absolute w-4 h-4 md:w-6 md:h-6 ${className}`} />
    );
};

export default function Sponsors() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Sponsor Data Configuration
    const SPONSOR_CATEGORIES = [
        {
            title: "Platform Partner",
            folder: "Platform Partner",
            sponsors: [
                { file: "unstop.webp", name: "Unstop" }
            ]
        },
        {
            title: "Automation Partner",
            folder: "Automation Partner",
            sponsors: [
                { file: "navan_ai.webp", name: "Navan AI" }
            ]
        },
        {
            title: "Domain Partner",
            folder: "Domain Partner",
            sponsors: [
                { file: "dotxyz.webp", name: ".xyz" }
            ]
        },
        {
            title: "Community Partner",
            folder: "Community Partner",
            sponsors: [
                { file: "vighnolearn.webp", name: "Vighno Learn" }
            ]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            if (titleRef.current) {
                gsap.fromTo(titleRef.current,
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Cards staggered animation
            if (cardsRef.current) {
                const cards = cardsRef.current.querySelectorAll('.sponsor-card-wrapper');
                gsap.fromTo(cards,
                    { opacity: 0, y: 80, rotateY: -15 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id='partners' className="relative min-h-screen bg-[#f5f0e6] text-black overflow-hidden">
            <div className="relative h-max pt-20 pb-40 px-[5vw]">
                {/* Decorative Pixels */}
                <FloatingPixel className="bg-[#e8e337] top-[15%] left-[10%] rotate-12" delay={0} />
                <FloatingPixel className="bg-[#4fd1c5] top-[25%] right-[15%] -rotate-6" delay={0.5} />
                <FloatingPixel className="bg-[#d53f8c] bottom-[30%] left-[8%] rotate-45" delay={1} />
                <FloatingPixel className="bg-[#805ad5] bottom-[25%] right-[12%] -rotate-12" delay={1.5} />
                <FloatingPixel className="bg-[#48bb78] top-[40%] left-[5%]" delay={0.8} />
                <FloatingPixel className="bg-[#ed8936] top-[35%] right-[8%] rotate-6" delay={1.2} />

                {/* Checkerboard Strip */}
                <div className="relative w-full z-10 mb-30">
                    <CheckerboardStrip />
                </div>

                {/* Enhanced Title Section */}
                <div ref={titleRef} className="relative w-full h-max flex flex-col items-center justify-center mb-16">
                    <div className="relative w-max font-pixel-emulator">
                        <span className="block text-[8vw] md:text-[7vw] pb-2 text-blue-600 drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)]">
                            OUR PARTNERS
                        </span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-blue-600 opacity-60" />
                    </div>
                    <p className="mt-4 text-[#555] font-pixel-emulator text-[2vw] md:text-[1vw] tracking-widest uppercase">
                        Thanks to our amazing partners.
                    </p>
                </div>

                {/* Sponsor Cards - All sponsors in rows of max 3 */}
                <div ref={cardsRef} className="relative z-10 px-4">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto">
                        {SPONSOR_CATEGORIES.flatMap((category, catIndex) =>
                            category.sponsors.map((sponsor, index) => (
                                <div
                                    key={`${category.folder}-${index}`}
                                    className="sponsor-card-wrapper transform transition-all duration-300 ease-out cursor-pointer group"
                                >
                                    <PixelSponsorCard
                                        number={catIndex * 10 + index + 1}
                                        logo={`${BASE_PATH}/assets/home/Sponsors/${category.folder}/${sponsor.file}`}
                                        alt={sponsor.name}
                                        size="w-[20vh] md:w-[10vw] h-auto"
                                        title={category.title}
                                        companyName={sponsor.name}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}