import { useRef, useEffect } from "react";

export default function About({ className = "" }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
      
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
      
        const img = new Image();
        img.src = "/assets/home/About/trophy.png";
      
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
              if (!hovered && Math.random() < 0.0005) {
                target[i] = target[i] === 1 ? 0 : 1;
              }
      
              alpha[i] += (target[i] - alpha[i]) * 0.05;
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
    return(
        <section id="about" className={`relative w-full h-max min-h-screen px-[8vw] py-20 bg-[#3054e5] font-quinque text-[#f8f8f8] ${className}`}>
            <div className="relative w-full h-max flex flex-col">
                <div className="w-full flex justify-center text-[1.6vh] mb-8">
                    <span>
                        <span>hosted by</span>
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center font-pixel-emulator text-[3.1vw] leading-snug mb-16">
                    <span>
                        <span className="float-left">CSI Committee of</span>
                    </span>
                    <span>
                        <span className="float-left">Thakur Shyamnarayan Degree College</span>
                    </span>
                </div>
                <div className="flex text-center flex-col w-full justify-center items-center text-[2.6vh] font-nikea tracking-wide mb-20">
                    <span>
                        <span>We invite fellow hackers from around the </span>
                    </span>
                    <span>
                        <span>country to join us for a 24-hour hackathon where</span>
                    </span>
                    <span>
                        <span>creativity, collaboration, and focused </span>
                    </span>
                    <span>
                        <span>building come together.</span>
                    </span>
                </div>
                <div className="relative w-full h-auto flex flex-col md:flex-row md:items-stretch justify-center tracking-wide gap-10">
                    <div className="relative w-full md:w-2/3 min-w-[350px] text-white h-auto bg-[#121212] rounded-3xl px-5 py-6">
                        <div className="flex flex-col mb-8">
                            <span className="text-[1.9vh] font-pixel-emulator leading-tight mb-4 bg-[#8ac926] text-black w-max p-3 rounded-3xl">
                                <span>Location:</span>
                            </span>
                            <span className="text-[1.3vh] md:text-[1.2vw]">
                                <span>Thakur Shyamnarayan Degree College, 90 Feet Rd, Kandivali, Thakur Complex, Kandivali East, Mumbai, Maharashtra 400101</span>
                            </span>
                        </div>
                        <div className="flex flex-col mb-6">
                            <span className="text-[1.9vh] font-pixel-emulator leading-tight mb-4 bg-[#8ac926] text-black w-max p-3 rounded-3xl">
                                <span>Date & Time:</span>
                            </span>
                            <span className="text-[1.3vh] md:text-[1.2vw]">
                                <span>21st January, 2025</span>
                            </span>
                            <span className="text-[1.3vh] md:text-[1.2vw]">
                                <span>11:00 AM Onwards</span>
                            </span>
                        </div>
                    </div>
                    <div className="relative h-auto hidden md:flex flex-col justify-around space-y-3">
                        <span className="block relative w-18 h-auto">
                            <img className="w-full h-full" src="/assets/home/About/asterisk.png" alt="Pixelated asterisk" />
                        </span>
                        <span className="block relative w-18 h-auto">
                            <img className="w-full h-full" src="/assets/home/About/asterisk.png" alt="Pixelated asterisk" />
                        </span>
                        <span className="block relative w-18 h-auto">
                            <img className="w-full h-full" src="/assets/home/About/asterisk.png" alt="Pixelated asterisk" />
                        </span>
                    </div>
                    <div className="w-full md:w-1/3 min-w-[350px] text-white bg-[#FF8C00] px-5 py-6 rounded-3xl h-auto flex flex-col justify-between">
                        <div className="w-full h-max flex">
                            <span className="block h-max text-[1.9vh] font-pixel-emulator leading-tight mb-4 text-white bg-black w-max p-3 rounded-3xl">
                                <span>PRIZE POOL</span>
                            </span>
                        </div>
                        <div className="flex-1 flex justify-center items-center">
                            <canvas
                                ref={canvasRef}
                                className="w-full h-full"
                            />
                        </div>
                        <span className="block w-full h-max text-center text-[4vh] md:text-[1.7vw]">
                            <span>Rs. 80,000</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}