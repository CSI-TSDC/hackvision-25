import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import NextImage from "next/image";

gsap.registerPlugin(ScrollTrigger);

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
export default function About({ className = "" }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [iconIndices, setIconIndices] = useState<[number, number, number]>([0, 1, 2]);

    // Array of 5 images
    const iconImages = [
        `${BASE_PATH}/assets/home/About/icons/img1.webp`,
        `${BASE_PATH}/assets/home/About/icons/img2.webp`,
        `${BASE_PATH}/assets/home/About/icons/img3.webp`,
        `${BASE_PATH}/assets/home/About/icons/img4.webp`,
        `${BASE_PATH}/assets/home/About/icons/img5.webp`,
        `${BASE_PATH}/assets/home/About/icons/img6.webp`,
        `${BASE_PATH}/assets/home/About/icons/img7.webp`,
        `${BASE_PATH}/assets/home/About/icons/img8.webp`,
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = `${BASE_PATH}/assets/home/About/trophy.webp`;

        img.onload = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = false;

            const scale = Math.min(rect.width / img.width, rect.height / img.height) * 0.8;
            const w = Math.floor(img.width * scale);
            const h = Math.floor(img.height * scale);
            const x = Math.floor((rect.width - w) / 2);
            const y = Math.floor((rect.height - h) / 2);

            // offscreen canvas
            const off = document.createElement("canvas");
            off.width = w;
            off.height = h;

            const offCtx = off.getContext("2d");
            if (!offCtx) return;

            offCtx.imageSmoothingEnabled = false;
            offCtx.drawImage(img, 0, 0, w, h);

            const block = 14;
            const cols = Math.floor(w / block);
            const rows = Math.floor(h / block);

            const alpha: number[] = new Array(cols * rows).fill(1);
            const target: number[] = new Array(cols * rows).fill(1);

            let hovered = false;

            const onEnter = () => {
                hovered = true;
                target.fill(1);
            };

            const onLeave = () => {
                hovered = false;
            };

            canvas.addEventListener("mouseenter", onEnter);
            canvas.addEventListener("mouseleave", onLeave);

            const animate = () => {
                ctx.clearRect(0, 0, rect.width, rect.height);

                for (let i = 0; i < alpha.length; i++) {
                    const MAX_FLICKER = 15;

                    if (!hovered && Math.random() < 0.002) {
                        const offBlocks = [];
                        const onBlocks = [];

                        for (let i = 0; i < target.length; i++) {
                            if (target[i] === 0) offBlocks.push(i);
                            else onBlocks.push(i);
                        }

                        if (offBlocks.length < MAX_FLICKER) {
                            const i = onBlocks[Math.floor(Math.random() * onBlocks.length)];
                            target[i] = 0;
                        } else {
                            const off = offBlocks[Math.floor(Math.random() * offBlocks.length)];
                            const on = onBlocks[Math.floor(Math.random() * onBlocks.length)];

                            target[off] = 1;
                            target[on] = 0;
                        }
                    }
                    const ease = hovered ? 0.25 : 0.05;
                    alpha[i] += (target[i] - alpha[i]) * ease;

                    if (alpha[i] < 0.01) continue;

                    const bx = (i % cols) * block;
                    const by = Math.floor(i / cols) * block;

                    ctx.globalAlpha = alpha[i];
                    ctx.drawImage(
                        off,
                        bx,
                        by,
                        block,
                        block,
                        x + bx,
                        y + by,
                        block,
                        block
                    );
                }

                ctx.globalAlpha = 1;
                requestAnimationFrame(animate);
            };

            animate();

            return () => {
                canvas.removeEventListener("mouseenter", onEnter);
                canvas.removeEventListener("mouseleave", onLeave);
            };
        };
    }, []);


    // Cycle through icons every 1 second, ensuring all 3 show different images
    useEffect(() => {
        const interval = setInterval(() => {
            setIconIndices((prev) => {
                // Get available indices (0-4)
                const available = [0, 1, 2, 3, 4, 5, 6, 7];

                // Function to get next unique indices
                const getNextIndices = (): [number, number, number] => {
                    const indices: number[] = [];
                    const used = new Set<number>();

                    // First index: random from available
                    let first = available[Math.floor(Math.random() * available.length)];
                    indices.push(first);
                    used.add(first);

                    // Second index: random from remaining
                    const remaining1 = available.filter(i => !used.has(i));
                    let second = remaining1[Math.floor(Math.random() * remaining1.length)];
                    indices.push(second);
                    used.add(second);

                    // Third index: random from remaining
                    const remaining2 = available.filter(i => !used.has(i));
                    let third = remaining2[Math.floor(Math.random() * remaining2.length)];
                    indices.push(third);

                    return [indices[0], indices[1], indices[2]];
                };

                return getNextIndices();
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="about" className={`relative w-full h-max min-h-screen bg-[#3054e5] font-quinque text-[#f8f8f8] ${className}`}>
            <div className="relative px-[8vw] py-20 w-full h-max flex flex-col">
                <div className="anim_text w-full flex justify-center text-[1.6vh] mb-2 md:mb-8">
                    <span>
                        <span>hosted by</span>
                    </span>
                </div>
                <div className="anim_text flex flex-col items-center justify-center font-pixel-emulator text-[5vw] md:text-[3.1vw] leading-snug mb-4 md:mb-16">
                    <span>
                        <span className="float-left text-center">CSI Committee of</span>
                    </span>
                    <span>
                        <span className="float-left text-center">Thakur Shyamnarayan Degree College</span>
                    </span>
                </div>
                <div id="anim_text" className="anim_text flex text-center flex-col w-full justify-center items-center text-[2vh] md:text-[2.6vh] font-nikea tracking-wide mb-8 md:mb-20 px-4">
                    <span>
                        <span className="md:hidden">Join us for a 24-hour hackathon where creativity and building come together.</span>
                        <span className="hidden md:inline">We invite fellow hackers from around the country to join us for a 24-hour hackathon where creativity, collaboration, and focused building come together.</span>
                    </span>
                </div>
                <div className="relative w-full h-auto flex flex-col md:flex-row md:items-stretch justify-center tracking-wide gap-4 md:gap-10">

                    {/* Mobile: Separate Cards */}
                    <div className="md:hidden flex flex-col gap-4 w-full">
                        {/* Location Card */}
                        <div className="w-full text-white bg-[#121212] rounded-3xl px-5 py-6 border border-[#8ac926]">
                            <span className="block text-[1.9vh] font-pixel-emulator leading-tight mb-4 bg-[#8ac926] text-black w-max px-4 py-2 rounded-full">
                                <span>LOCATION:</span>
                            </span>
                            <span className="block text-[1.6vh] font-pixel-emulator leading-relaxed uppercase">
                                <span>Thakur Shyamnarayan Degree College, 90 Feet Rd, Kandivali, Thakur Complex, Kandivali East, Mumbai, Maharashtra 400101</span>
                            </span>
                        </div>

                        {/* Date & Time Card */}
                        <div className="w-full text-white bg-[#121212] rounded-3xl px-5 py-6 border border-[#8ac926]">
                            <span className="block text-[1.9vh] font-pixel-emulator leading-tight mb-4 bg-[#8ac926] text-black w-max px-4 py-2 rounded-full">
                                <span>DATE & TIME:</span>
                            </span>
                            <div className="flex flex-col gap-1 text-[1.6vh] font-pixel-emulator uppercase">
                                <span>21st January, 2025</span>
                                <span>Starts at 8:00 AM</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Combined Card (Original) */}
                    <div className="hidden md:flex relative w-full md:w-2/3 text-white h-auto bg-[#121212] rounded-3xl px-5 py-6 flex-col">
                        <div className="flex flex-col mb-8">
                            <span className="text-[1.9vh] font-pixel-emulator leading-tight mb-4 bg-[#8ac926] text-black w-max p-3 rounded-3xl">
                                <span>Location:</span>
                            </span>
                            <span className="text-[1.6vh] md:text-[1.2vw]">
                                <span>Thakur Shyamnarayan Degree College, 90 Feet Rd, Kandivali, Thakur Complex, Kandivali East, Mumbai, Maharashtra 400101</span>
                            </span>
                        </div>
                        <div className="flex flex-col mb-6">
                            <span className="text-[1.9vh] font-pixel-emulator leading-tight mb-4 bg-[#8ac926] text-black w-max p-3 rounded-3xl">
                                <span>Date & Time:</span>
                            </span>
                            <span className="text-[1.6vh] md:text-[1.2vw]">
                                <span>21st January, 2025</span>
                            </span>
                            <span className="text-[1.6vh] md:text-[1.2vw]">
                                <span>11:00 AM Onwards</span>
                            </span>
                        </div>
                    </div>
                    <div className="relative h-auto hidden md:flex flex-col justify-around space-y-3">
                        <span className="block relative w-14 h-14">
                            <NextImage className="w-full h-full object-contain" src={iconImages[iconIndices[0]]} width={56} height={56} alt="Icon" unoptimized />
                        </span>
                        <span className="block relative w-14 h-14">
                            <NextImage className="w-full h-full object-contain" src={iconImages[iconIndices[1]]} width={56} height={56} alt="Icon" unoptimized />
                        </span>
                        <span className="block relative w-14 h-14">
                            <NextImage className="w-full h-full object-contain" src={iconImages[iconIndices[2]]} width={56} height={56} alt="Icon" unoptimized />
                        </span>
                    </div>
                    <div className="w-full md:w-1/3 text-white bg-[#FF8C00] px-5 py-6 rounded-3xl h-auto md:h-auto max-h-[50vh] md:max-h-none flex flex-col justify-between">
                        <div className="w-full h-max flex">
                            <span className="block h-max text-[1.9vh] font-pixel-emulator leading-tight mb-4 text-white bg-black w-max p-3 rounded-3xl">
                                <span>PRIZE POOL</span>
                            </span>
                        </div>
                        <div className="flex-1 flex justify-center items-center max-h-[40vh] md:max-h-none">
                            <canvas
                                ref={canvasRef}
                                className="w-full h-full"
                            />
                        </div>
                        <span className="block w-full font-pixel-emulator h-max text-center text-[4vh] md:text-[2.6vw]">
                            <span>Rs. 85,000+</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}