"use client";

import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Prizes from "@/components/Home/Prizes"
import Tracks from "@/components/Home/Tracks";
export default function Home() {

  return (
    <main className="bg-[#f8f8f8]" id="app">
      <Hero></Hero>
      <About className="z-5"></About>
      <Prizes className="z-4"></Prizes>
      <Tracks></Tracks>
    </main>
  );
}