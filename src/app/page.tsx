import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
    </main>
  );
}
