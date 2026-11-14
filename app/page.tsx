
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="relative">
      {/* Ambient background — warm ember orbs, fixed behind the whole page */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #dc2626, transparent 70%)" }}
        />
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #ea580c, transparent 70%)" }}
        />
        <div
          className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, #dc2626, #d97706, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #ea580c, transparent 70%)" }}
        />
      </div>

      <section id="hero"><Hero /></section>
      <section id="about"><About /></section>
      <section id="work"><Work /></section>
      <section id="skills"><Skills /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
}
