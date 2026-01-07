"use client";

import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Prizes from "@/components/Home/Prizes"
import Tracks from "@/components/Home/Tracks";
import Timeline from "@/components/Home/Timeline";
import Sponsors from "@/components/Home/Sponsors"
import FAQs from "@/components/Home/FAQs"

export default function Home() {

  return (
    <main className="bg-[#f8f8f8]" id="app">
      <Hero></Hero>
      <About className="z-5"></About>
      <Prizes className="z-4"></Prizes>
      <Tracks></Tracks>
      <Timeline></Timeline>
      <Sponsors></Sponsors>
      <FAQs></FAQs>
    </main>
  );
}