'use client';

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

export default function Footer({ className = "" }) {
    return (
        <footer
            id="footer"
            className={`relative bg-[#131313] pt-35 text-white overflow-hidden ${className}`}
        >
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
                            <div className="flex flex-col items-start gap-4 mb-4 scale-90 md:scale-100 origin-left">
                                {/* Logos */}
                                <div className="flex items-center gap-4 mr-4">
                                    <div className="w-12 h-12 relative grayscale hover:grayscale-0 transition-all duration-300">
                                        <img src="/assets/Logos/csi_logo.webp" className="w-full h-full object-contain" alt="CSI Logo" />
                                    </div>
                                    <div className="w-12 h-12 relative grayscale hover:grayscale-0 transition-all duration-300">
                                        <img src="/assets/Logos/tsdc_logo.webp" className="w-full h-full object-contain" alt="TSDC Logo" />
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
                                        <a href="#" className="text-white/80 hover:text-[#d2ff52] transition-colors duration-200 flex items-center justify-center sm:justify-start gap-2">
                                            <span className="w-1 h-1 bg-white/30" />
                                            CSI Webpage
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white/80 hover:text-[#d2ff52] transition-colors duration-200 flex items-center justify-center sm:justify-start gap-2">
                                            <span className="w-1 h-1 bg-white/30" />
                                            About us
                                        </a>
                                    </li>
                                    <li className="h-2" />
                                    <li>
                                        <a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-200 text-xs">
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-200 text-xs">
                                            Terms & Conditions
                                        </a>
                                    </li>
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
                                    <li className="hover:text-[#d2ff52] transition-colors cursor-pointer">
                                        contact@hackvision.dev
                                    </li>
                                    <li className="text-white/40">
                                        +91 12345 67890
                                    </li>
                                </ul>
                            </div>

                            {/* Social */}
                            <div>
                                <h3 className="font-pixel-emulator text-xs text-[#d2ff52] mb-6 tracking-wider">
                                    FOLLOW US
                                </h3>
                                <div className="flex justify-center sm:justify-start gap-3">
                                    {[
                                        { icon: '📷', label: 'Instagram', link: 'https://instagram.com/csixtsdc' },
                                        { icon: '🎵', label: 'Discord', link: '#' },
                                        { icon: '👨‍💻', label: 'GitHub', link: 'https://github.com/orgs/CSI-TSDC' },
                                        { icon: '💼', label: 'LinkedIn', link: '#' },
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
                                            <span className="text-lg group-hover:scale-110 transition-transform">{social.icon}</span>
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