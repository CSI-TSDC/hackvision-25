export default function Hero() {
  return (
    <section className="min-h-svh max-h-screen w-full flex items-center justify-center relative">
      <img
        src="/hero/frame.svg"
        alt=""
        className="w-full absolute top-0 aspect-[16/9]"
      />
      <img
        src="/hero/pixel_layer.svg"
        alt=""
        className="w-full absolute -bottom-30 aspect-[16/9]"
      />
    </section>
  );
}
