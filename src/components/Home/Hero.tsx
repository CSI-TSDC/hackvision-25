import StarCanvas from "@/components/ui/StarCanvas";

export default function Hero() {
  return (
    <>
    <section id="hero" className="min-h-dvh w-full bg-black relative h-screen flex items-center justify-center">
      <img
        src="/hero/frame.png"
        alt="Frame"
        className="w-full h-full absolute top-0 z-2 "
      />
      <StarCanvas />
      <img src="/hero/pixel_layer.png" alt="Pixel Layer" className="w-full h-[52.5vh] absolute bottom-0 z-3" />
      {/* <img src="/assets/home/bg1.png" alt="Background" className="w-full h-full" /> */}
      <div className="absolute top-0 left-0 pt-[2.5vh] tracking-wider flex flex-row pl-[2.2vw] z-5 text-[1.8vh] font-quinque">
        <div className="w-14 mr-6">
          <img src="/assets/Logos/csi_logo.png" className="w-full h-full object-contain" alt="" />
        </div>
        <div className="flex flex-col-reverse">
          <span className="">CSI Presents</span>
          <div className=" flex gap-[2px] mb-4">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="arrow"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-[30%] w-max max-w-[90vw] h-max left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
        <div className="w-[60vw] h-auto mb-4">
          <img src="/assets/home/hackvision_logo.png" alt="Background" className="w-full h-full" />
        </div>
        <div className="font-pixel-emulator text-[2vh] md:text-[2.8vh] tracking-wide text-center font-bold ml-6">
          <p>24 Hours of Coding, Creativity & Chaos</p>
        </div>
      </div>
    </section>
    </>
  );
}
