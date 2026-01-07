

export default function Timeline() {
  return (
    <section id="timeline" className="w-full min-h-screen bg-[#FF8C00] text-black py-40 px-[5vw]">
        <div className="w-full h-max flex flex-col items-start font-pixel-emulator text-[6vw] pb-20">
            <span>
                <span>Timeline</span>
            </span>
        </div>
        <div className="w-full h-max flex justify-center">
            <div className="max-w-[70vw] h-max flex flex-col md:flex-row font-quinque gap-4">
                
                {/* LEFT */}
                <div className="w-full md:w-1/2 grid grid-rows-3 divide-y-2 border-2">
                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">28th</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Jan</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">Registration Opens</span>
                        </div>
                    </div>

                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">29th</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Jan</span>
                        </div>
                        <div className="px-4 flex flex-col">
                        <span className="text-lg font-medium font-nikea">Registration Closes &</span>
                        <span className="text-lg font-medium font-nikea">PPT Round Begins</span>
                        </div>
                    </div>

                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">30th</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Jan</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">Round 1 Ends</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full md:w-1/2 grid grid-rows-3 divide-y-2 border-2">
                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">31st</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Jan</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">
                            Shortlisted Teams Announced
                        </span>
                        </div>
                    </div>

                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">1st</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Feb</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">
                            Problem Statements Revealed
                        </span>
                        </div>
                    </div>

                    <div className="flex items-center min-h-[110px]">
                        <div className="flex flex-col items-center justify-center border-r px-4 py-2 w-[150px] shrink-0">
                        <span className="text-2xl font-bold">2nd</span>
                        <span className="uppercase font-pixel-emulator text-[2.2vh]">Feb</span>
                        </div>
                        <div className="px-4">
                        <span className="text-lg font-medium font-nikea">Hackathon Begins</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}