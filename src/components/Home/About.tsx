export default function About({ className = "" }) {
    return(
        <section id="about" className={`relative w-full h-max min-h-screen px-[10vw] pt-25 bg-[#3054e5] rounded-b-[65px] ${className}`}>
            <div className="relative w-full bg-[#161616] flex flex-row pt-4 rounded-t-2xl px-4">
                <div className="bg-slate-600 w-[35%] h-full tab-clip rounded-t-xl">
                    <div className="w-full h-full min-h-[70px] pr-[20%] py-2 pl-3 flex items-center text-2xl">
                        {/* <span className="font-quinque">
                            <span>HOSTED BY</span>
                        </span> */}
                    </div>
                </div>
            </div>
            <div className="border-14 metal-bg border-t-0 border-[#161616] w-full px-[4px] h-[500px]">

            </div>
        </section>
    )
}