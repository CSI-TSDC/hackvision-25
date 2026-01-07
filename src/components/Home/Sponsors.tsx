import Galaxy from "@/components/ui/Galaxy";
import Image from "next/image";

export default function Sponsors() {
    return (
        <section className="relative min-h-[200vh] py-40 bg-black text-white">
            <div className="absolute top-0 left-0 w-full h-full">
                <Galaxy
                    density={0.7}
                    hueShift={60}
                    rotationSpeed={0.05}
                    starSpeed={0.3}
                    speed={0.6}
                    glowIntensity={0.2}
                    mouseInteraction={false}
                />
            </div>
            <div className="absolute top-0 left-0 w-full h-full py-40">
                <Image className="w-[150px] h-auto object-contain absolute top-15 right-10" src="/assets/home/Sponsors/star_1.png" alt="Sponsor 1" width={100} height={100} />
                <Image className="w-[150px] h-auto object-contain absolute left-10" src="/assets/home/Sponsors/star_1.png" alt="Sponsor 1" width={100} height={100} />
                <Image className="w-[150px] h-auto object-contain absolute top-[40%] right-25" src="/assets/home/Sponsors/star_1.png" alt="Sponsor 1" width={100} height={100} />
                <Image className="w-[150px] h-auto object-contain absolute top-[45%] left-25" src="/assets/home/Sponsors/star_1.png" alt="Sponsor 1" width={100} height={100} />
                <Image className="w-[150px] h-auto object-contain absolute bottom-[15%] right-25" src="/assets/home/Sponsors/star_1.png" alt="Sponsor 1" width={100} height={100} />
                <Image className="w-[150px] h-auto object-contain absolute bottom-[15%] left-25" src="/assets/home/Sponsors/star_1.png" alt="Sponsor 1" width={100} height={100} />
            </div>
            <div className="relative w-full text-[5vw] flex justify-center items-center font-quinque tracking-wider">
                <span>
                    <span>Our <span className="text-[#8ac926]">SPONSORS</span></span>
                </span>
            </div>
        </section>
    )
}