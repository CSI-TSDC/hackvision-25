import Galaxy from "@/components/ui/Galaxy";
import Image from "next/image";

// Pixel Sponsor Card Component
const PixelSponsorCard = ({ number, logo, alt, size }: { number: number; logo: string; alt: string; size: string }) => {
    return (
        <div className="relative h-[40vh] flex flex-col justify-center p-4 aspect-3/4 sponsorclip bg-blue-600">
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
                        <span className="text-[3vh] text-white">{number}</span>
                    </div>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <Image className={`${size}`} src={logo} alt={alt} width={200} height={200} />
                </div>
            </div>
            <div className="w-full h-auto flex-1">
                <div className="w-full h-full flex items-center justify-center">

                </div>
            </div>
        </div>
    );
};

// Checkerboard Strip Component  
const CheckerboardStrip = () => {
    return (
        <div className="relative w-full flex flex-col px-[5vw]">
            {/* Row 1 */}
            <div className="w-full h-max flex">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={`row1-${i}`}
                        className={`h-full flex-1 w-[32px] aspect-square ${i % 2 === 0 ? 'rgb(0,0,0,0)' : 'bg-[#1a1a2e]'}`}
                    />
                ))}
            </div>
            {/* Row 2 - offset pattern */}
            <div className="w-full h-max flex">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={`row2-${i}`}
                        className={`h-full flex-1 w-[32px] aspect-square ${i % 2 === 1 ? 'rgb(0,0,0,0)' : 'bg-[#1a1a2e]'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default function Sponsors() {
    const sponsors = [
        { number: 1, logo: "/assets/home/Sponsors/unstop.png", alt: "Unstop", size: "w-[20vh] md:w-[10vw] h-auto" },
        { number: 2, logo: "/assets/home/Sponsors/unstop.png", alt: "Sponsor 2", size: "w-[20vh] md:w-[10vw] h-auto" },
        { number: 3, logo: "/assets/home/Sponsors/unstop.png", alt: "Sponsor 3", size: "w-[20vh] md:w-[10vw] h-auto" },
    ];

    return (
        <section className="relative min-h-[200vh] py-40 px-[5vw] bg-[#f5f0e6] text-black overflow-hidden">
            {/* Top Checkerboard Border */}
            <div className="absolute top-0 left-0 w-full z-20">
                <CheckerboardStrip />
            </div>

            <div className="relative  w-full h-max font-quinque">
                <div className="w-full text-[7vw] font-pixel-emulator py-4 flex items-center justify-center">
                    <span>OUR SPONSORS</span>
                </div>
            </div>

            {/* Sponsor Cards Grid */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4">
                {sponsors.map((sponsor) => (
                    <PixelSponsorCard
                        key={sponsor.number}
                        number={sponsor.number}
                        logo={sponsor.logo}
                        alt={sponsor.alt}
                        size={sponsor.size}
                    />
                ))}
            </div>
        </section>
    )
}