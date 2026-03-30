'use client'
import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/ProjectList";
import Scene from "@/components/Scene";
import Skills from "@/components/Skills";
import { useState } from "react";

export default function Home() {
  const [scrollProgress, setScrollProgress]=useState(0)
  const handleScroll=(e:React.UIEvent<HTMLDivElement>)=>{
    const target=e.currentTarget
    const progress=target.scrollTop/(target.scrollHeight- target.clientHeight)
    setScrollProgress(progress)
  }
  return (
    <>
      <Scene progress={scrollProgress} />
      <div onScroll={(e)=>handleScroll(e)} className="w-full h-screen snap-y overflow-y-scroll scroll-smooth z-10">
        <Hero />
        <Skills />
        <Projects />
        <div className="px-24">
          <hr />
        </div>
        <About />
        <Footer />
      </div>
    </>
  );
}
