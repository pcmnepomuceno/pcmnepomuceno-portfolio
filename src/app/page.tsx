import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Foundations from "@/components/sections/Foundations";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

// Sections sit in one centered column; a color band (Projects) spans the full width behind its column.
const column = "mx-auto max-w-5xl px-4";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <div className={column}>
        <Hero />
      </div>
      <div className="bg-surface">
        <div className={column}>
          <Projects />
        </div>
      </div>
      <div className={column}>
        <Experience />
        <Skills />
        <Foundations />
        <Contact />
      </div>
    </main>
  );
}
