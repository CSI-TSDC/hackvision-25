'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TetrisBlocks = () => {
    const blocks = [
        // L-piece
        { type: 'L', left: 30, top: 30, color: '#FF8C00', rotation: 0 },
        // T-piece  
        { type: 'T', left: 80, top: 40, color: '#d2ff52', rotation: 90 },
        // Square
        { type: 'O', left: 5, top: 55, color: '#4ecdc4', rotation: 0 },
        // Line
        { type: 'I', left: 92, top: 65, color: '#ff6b6b', rotation: 0 },
        // S-piece
        { type: 'S', left: 8, top: 85, color: '#9b59b6', rotation: 0 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            {blocks.map((block, i) => (
                <div
                    key={i}
                    className="absolute animate-pulse"
                    style={{
                        left: `${block.left}%`,
                        top: `${block.top}%`,
                        transform: `rotate(${block.rotation}deg)`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: '3s',
                    }}
                >
                    {block.type === 'L' && (
                        <div className="flex flex-col">
                            <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            <div className="flex">
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            </div>
                        </div>
                    )}
                    {block.type === 'T' && (
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            <div className="flex">
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            </div>
                        </div>
                    )}
                    {block.type === 'O' && (
                        <div className="grid grid-cols-2">
                            <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                        </div>
                    )}
                    {block.type === 'I' && (
                        <div className="flex flex-col">
                            {[0, 1, 2, 3].map(j => (
                                <div key={j} className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            ))}
                        </div>
                    )}
                    {block.type === 'S' && (
                        <div className="flex flex-col">
                            <div className="flex ml-8">
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            </div>
                            <div className="flex">
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            </div>
                        </div>
                    )}
                    {block.type === 'Z' && (
                        <div className="flex flex-col">
                            <div className="flex">
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            </div>
                            <div className="flex ml-8">
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            </div>
                        </div>
                    )}
                    {block.type === 'J' && (
                        <div className="flex flex-col">
                            <div className="flex">
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                                <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            </div>
                            <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                            <div className="w-8 h-8 border-3" style={{ borderColor: block.color, backgroundColor: `${block.color}50`, boxShadow: `0 0 10px ${block.color}40` }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default function FAQs({ className = "" }) {
    const [openIndex, setOpenIndex] = useState(null);
    const sectionRef = useRef(null);
    const faqItemsRef = useRef([]);

    const faqs = [
        {
            question: "What is HackVision 2025?",
            answer: "HackVision is an epic 24-hour hackathon where developers, designers, and innovators come together to build amazing projects. Compete in multiple tracks, win prizes, and showcase your skills!"
        },
        {
            question: "Who can participate in this hackathon?",
            answer: "All students, developers, and tech enthusiasts are welcome! Whether you're a beginner or experienced coder, we encourage everyone to participate. Teams can have 2-4 members."
        },
        {
            question: "Do I need to pay to participate?",
            answer: "First Round (PPT Round) is free to participate in. If shortlisted, there's a nominal fee of ₹1000 per team for the On-site Round."
        },
        {
            question: "What should I bring to the event?",
            answer: "Bring your laptop, chargers, student ID, and lots of energy! We'll provide the rest - including WiFi, food, drinks, and an awesome atmosphere to hack in."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate FAQ items on scroll
            faqItemsRef.current.forEach((item, i) => {
                if (!item) return;
                gsap.fromTo(item,
                    { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            ref={sectionRef}
            id="faqs"
            className={`relative w-full bg-[#212529] pt-[20vh] md:pt-[45vh] pb-20 text-white overflow-hidden ${className}`}
        >
            <div className="absolute top-0 left-0 w-full h-max bg-[#212529] overflow-hidden">
                <img src="/assets/home/Sponsors/transition2.png" className='w-full h-max' alt="" />
            </div>
            <TetrisBlocks />

            {/* Grid background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Main content */}
            <div className="relative z-10 py-20 px-6 md:px-12">
                {/* Title */}
                <div className="relative w-full flex flex-col items-center mb-16">
                    <div className="relative mb-10">
                        {/* Pixel border effect */}
                        <div className="absolute -inset-4 border-4 border-[#d2ff52] opacity-30"
                            style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                        />
                        <h1 className="font-pixel-emulator text-5xl md:text-7xl font-bold text-[#d2ff52] tracking-wider"
                            style={{ textShadow: '4px 4px 0px #000, 6px 6px 0px rgba(0,0,0,0.3)' }}>
                            FAQ
                        </h1>
                    </div>
                    <p className="font-nikea text-white/50 text-lg mt-4">
                        Got questions? We got answers.
                    </p>
                </div>

                {/* FAQ Container */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                ref={el => faqItemsRef.current[index] = el}
                                className="relative group"
                            >
                                {/* Tetris-style card */}
                                <div
                                    className={`
                                        relative bg-[#16213e] border-2 overflow-hidden cursor-pointer
                                        transition-all duration-300
                                        ${openIndex === index
                                            ? 'border-[#d2ff52] shadow-[0_0_20px_rgba(210,255,82,0.2)]'
                                            : 'border-white/10 hover:border-white/30'
                                        }
                                    `}
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                                    }}
                                >
                                    {/* Corner pixel */}
                                    <div className={`absolute top-0 right-0 w-3 h-3 transition-colors duration-300 ${openIndex === index ? 'bg-[#d2ff52]' : 'bg-white/20'}`} />
                                    <div className={`absolute bottom-0 left-0 w-3 h-3 transition-colors duration-300 ${openIndex === index ? 'bg-[#d2ff52]' : 'bg-white/20'}`} />

                                    {/* Question Button */}
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full px-6 py-3 flex justify-between items-center text-left"
                                    >
                                        <span className="font-quinque text-sm md:text-lg text-white pr-4">
                                            <span className="text-[#d2ff52] mr-3 font-pixel-emulator text-xs md:text-sm">0{index + 1}</span>
                                            {faq.question}
                                        </span>
                                        <span className={`
                                            font-pixel-emulator text-2xl shrink-0 transition-all duration-300
                                            ${openIndex === index ? 'text-[#d2ff52] rotate-45' : 'text-white/50'}
                                        `}>
                                            +
                                        </span>
                                    </button>

                                    {/* Answer */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-6 pb-6 border-t border-white/10 pt-4 ml-8">
                                            <p className="font-nikea text-base md:text-lg text-white/70 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom text */}
                    <div className="mt-12 text-center">
                        <p className="font-pixel-emulator text-sm text-white/40 tracking-wider">
                            STILL HAVE QUESTIONS?
                        </p>
                        <p className="font-nikea text-white/60 text-base mt-2">
                            Reach out to us via <a className='text-[#d2ff52]' href="mailto:csi1019@tsdcmumbai.in">Email</a>!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
