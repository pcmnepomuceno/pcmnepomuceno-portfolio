import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Foundations from "@/components/sections/Foundations";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-5xl px-4">
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Foundations />
      <Contact />
    </main>
  );
}
