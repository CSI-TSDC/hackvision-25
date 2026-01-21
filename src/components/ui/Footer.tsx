'use client';

import Image from 'next/image';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Tetris block shapes for decoration (similar to FAQ section)
const TetrisBlocks = () => {
    const blocks = [
        // Different positions for footer
        { type: 'T', left: 2, top: 20, color: '#d2ff52', rotation: 180 },
        { type: 'L', left: 80, top: 0, color: '#FF8C00', rotation: -45 },
        { type: 'O', left: 4, top: 60, color: '#4ecdc4', rotation: 0 },
        { type: 'O', left: 30, top: 30, color: '#4ecdc4', rotation: 45 },
        { type: 'S', left: 90, top: 55, color: '#ff6b6b', rotation: 30 },
        { type: 'I', left: 6, top: 85, color: '#9b59b6', rotation: 0 },
        { type: 'Z', left: 50, top: 70, color: '#d2ff52', rotation: -15 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {blocks.map((block, i) => (
                <div
                    key={i}
                    className="absolute animate-pulse"
                    style={{
                        left: `${block.left}%`,
                        top: `${block.top}%`,
                        transform: `rotate(${block.rotation}deg)`,
                        animationDelay: `${i * 0.4}s`,
                        animationDuration: '4s',
                    }}
                >
                    {block.type === 'L' && (
                        <div className="flex flex-col">
                            <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            <div className="flex">
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            </div>
                        </div>
                    )}
                    {block.type === 'T' && (
                        <div className="flex flex-col items-center">
                            <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            <div className="flex">
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            </div>
                        </div>
                    )}
                    {block.type === 'O' && (
                        <div className="grid grid-cols-2">
                            <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                        </div>
                    )}
                    {block.type === 'I' && (
                        <div className="flex">
                            {[0, 1, 2, 3].map(j => (
                                <div key={j} className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            ))}
                        </div>
                    )}
                    {block.type === 'S' && (
                        <div className="flex flex-col">
                            <div className="flex ml-6">
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            </div>
                            <div className="flex">
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            </div>
                        </div>
                    )}
                    {block.type === 'Z' && (
                        <div className="flex flex-col">
                            <div className="flex">
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            </div>
                            <div className="flex ml-6">
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                                <div className="w-6 h-6 border-2" style={{ borderColor: block.color, backgroundColor: `${block.color}40`, boxShadow: `0 0 8px ${block.color}30` }} />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Colorful Retro Divider Component (moved from Sponsors)
const ColorfulDivider = () => {
    const colors = [
        'bg-white',
        'bg-[#e8e337]',    // Yellow
        'bg-[#4fd1c5]',    // Cyan/Teal
        'bg-[#48bb78]',    // Green
        'bg-[#d53f8c]',    // Magenta/Pink
        'bg-[#ed8936]',    // Orange
        'bg-[#805ad5]',    // Purple
    ];

    return (
        <div className="w-full h-8 md:h-14 flex mb-35">
            {colors.map((color, i) => (
                <div
                    key={`color-${i}`}
                    className={`flex-1 h-full ${color} ${i === 0 ? 'flex-[0.8]' : ''}`}
                />
            ))}
        </div>
    );
};

export default function Footer({ className = "" }) {
    return (
        <footer
            id="footer"
            className={`relative bg-[#131313] text-white overflow-hidden ${className}`}
        >
            {/* Colorful Divider at top */}
            <ColorfulDivider />
            {/* Floating Tetris blocks decoration */}
            {/* <TetrisBlocks /> */}

            {/* Grid background - continues from FAQ */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Tetris blocks at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 flex">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 h-full border border-white/5"
                        style={{
                            backgroundColor: i % 7 === 0 ? 'rgba(210, 255, 82, 0.3)'
                                : i % 5 === 0 ? 'rgba(255, 140, 0, 0.3)'
                                    : i % 3 === 0 ? 'rgba(78, 205, 196, 0.2)'
                                        : 'transparent',
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 pb-16 md:pb-20 px-6 md:px-14">
                <div className="max-w-7xl mx-auto">
                    <div className="w-full flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center md:items-start gap-12">

                        {/* Logo section */}
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex flex-col  items-center md:items-start gap-4 mb-4 scale-90 md:scale-100 origin-left">
                                {/* Logos */}
                                <div className="flex items-center gap-4 md:mr-4">
                                    <div className="w-12 h-12 relative grayscale hover:grayscale-0 transition-all duration-300">
                                        <Image src={`${BASE_PATH}/assets/Logos/csi_logo.webp`} width={48} height={48} className="w-full h-full object-contain" alt="CSI Logo" />
                                    </div>
                                    <div className="w-12 h-12 relative grayscale hover:grayscale-0 transition-all duration-300">
                                        <Image src={`${BASE_PATH}/assets/Logos/tsdc_logo.webp`} width={48} height={48} className="w-full h-full object-contain" alt="TSDC Logo" />
                                    </div>
                                </div>
                                <span className="font-quinque text-lg tracking-wider">CSI x TSDC</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 bg-[#d2ff52] animate-pulse" />
                                <span className="font-pixel-emulator text-xs text-[#d2ff52]">HACKVISION 2026</span>
                            </div>
                            <span className="font-nikea text-white/40 text-sm">
                                © 2025 ALL RIGHTS RESERVED
                            </span>
                        </div>

                        {/* Links sections */}
                        <div className="flex flex-col sm:flex-row gap-12 md:gap-20 text-center sm:text-left">
                            {/* Quick Links */}
                            <div>
                                <h3 className="font-pixel-emulator text-xs text-[#d2ff52] mb-6 tracking-wider">
                                    QUICK LINKS
                                </h3>
                                <ul className="space-y-3 font-nikea text-sm">
                                    <li>
                                        <a href="#" className="text-white/80 hover:text-[#d2ff52] transition-colors duration-200 flex items-center justify-center sm:justify-start gap-2">
                                            <span className="w-1 h-1 bg-white/30" />
                                            Sponsors
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://csi-website-alpha.vercel.app/" className="text-white/80 hover:text-[#d2ff52] transition-colors duration-200 flex items-center justify-center sm:justify-start gap-2">
                                            <span className="w-1 h-1 bg-white/30" />
                                            CSI Webpage
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://csi-website-alpha.vercel.app/#about" className="text-white/80 hover:text-[#d2ff52] transition-colors duration-200 flex items-center justify-center sm:justify-start gap-2">
                                            <span className="w-1 h-1 bg-white/30" />
                                            About us
                                        </a>
                                    </li>
                                    <li className="h-2" />
                                    <li>
                                        <a href="https://docs.google.com/document/d/1CTVApZlIrJ4wRWESjdl386rg99Zgy3Fwor1OBkS76bU/edit?usp=sharing" className="text-white/40 hover:text-white/80 transition-colors duration-200 text-xs">
                                            Rules & Regulations
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-200 text-xs">
                                            Terms & Conditions
                                        </a>
                                    </li> */}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="font-pixel-emulator text-xs text-[#d2ff52] mb-6 tracking-wider">
                                    CONTACT
                                </h3>
                                <ul className="space-y-3 font-nikea text-sm text-white/80">
                                    <li className="max-w-[280px]">
                                        Thakur Shyamnarayan Degree College, Thakur Complex, Kandivali East, Mumbai, 400 101
                                    </li>
                                    <li className="h-2" />
                                    <a href="mailto:csi1019@tsdcmumabi.in" className="lowercase hover:text-[#d2ff52] transition-colors cursor-pointer">
                                        csi1019@tsdcmumabi.in
                                    </a>
                                </ul>
                            </div>

                            {/* Social */}
                            <div>
                                <h3 className="font-pixel-emulator text-xs text-[#d2ff52] mb-6 tracking-wider">
                                    FOLLOW US
                                </h3>
                                <div className="flex justify-center sm:justify-start gap-3">
                                    {[
                                        {
                                            icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
                                            label: 'Instagram',
                                            link: 'https://instagram.com/csixtsdc'
                                        },
                                        {
                                            icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
                                            label: 'GitHub',
                                            link: 'https://github.com/orgs/CSI-TSDC'
                                        },
                                        // {
                                        //     icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
                                        //     label: 'LinkedIn',
                                        //     link: '#'
                                        // },
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center
                                                       hover:bg-[#d2ff52]/20 hover:border-[#d2ff52]/50 transition-all duration-200
                                                       group"
                                            style={{
                                                clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                                            }}
                                            title={social.label}
                                        >
                                            <span className="text-white group-hover:text-[#d2ff52] group-hover:scale-110 transition-all">{social.icon}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-nikea text-white/30 text-xs text-center md:text-left">
                            Developed By <span className="text-[#d2ff52]">Tech Team</span> @ <a href="https://csi.tsdcmumbai.com" className="text-[#d2ff52]">CSI x TSDC</a>
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="font-pixel-emulator text-[10px] text-white/20">SCORE: 999999</span>
                            <div className="flex gap-1">
                                {[0, 1, 2].map(i => (
                                    <div key={i} className="w-2 h-2 bg-[#d2ff52]" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}