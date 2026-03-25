import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/ProjectList";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="w-full h-screen snap-y overflow-y-scroll scroll-smooth bg-black text-white">
      <Hero/>
      <Skills/>
      <Projects/>
      <div className="px-24">
        <hr />
      </div>
      <About/>
      <Footer/>
    </div>
  );
}
