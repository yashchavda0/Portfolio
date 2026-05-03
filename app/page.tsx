import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative">
      {/* Ambient background — fixed behind the whole page so every section shares the same glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="ambient-orb absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)" }}
        />
        <div
          className="ambient-orb-reverse absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--color-secondary), transparent 70%)" }}
        />
        <div
          className="ambient-orb-slow absolute top-[55%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(ellipse, var(--color-primary), var(--color-secondary), transparent 70%)" }}
        />
        <div
          className="ambient-orb absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--color-secondary), transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="experience"><Experience /></section>
      <section id="projects"><Projects /></section>
      <section id="skills"><Skills /></section>
      <section id="education"><Education /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
}
