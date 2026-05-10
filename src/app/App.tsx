import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { CardDeck } from "./components/CardDeck";
import { Hero } from "./components/Hero";
import {
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  ContactSection,
} from "./components/Sections";
import { BackgroundSwitcher } from "./components/BackgroundSwitcher";
import { SmoothScroll } from "./components/SmoothScroll";
import { smoothScrollTo } from "./smoothScroll";
import { backgrounds, type BgKey } from "./surfaces";
import { footer, type SectionId } from "./content";

type SurfaceVars = CSSProperties & {
  "--surface-text": string;
  "--surface-muted": string;
  "--surface-rule": string;
};

export default function App() {
  const [bg, setBg] = useState<BgKey>("felt");
  const [loading, setLoading] = useState(true);
  const theme = backgrounds[bg];

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  // Failsafe: if CardDeck somehow fails to fire onReady, never strand the user.
  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 4000);
    return () => window.clearTimeout(timeout);
  }, []);

  const scrollTo = (id: SectionId | "deck") => {
    if (id === "deck") {
      smoothScrollTo(0);
      return;
    }
    const el = document.getElementById(id);
    if (el) smoothScrollTo(el);
  };

  const surfaceStyle: SurfaceVars = {
    backgroundColor: theme.base,
    color: theme.text,
    fontFamily: "var(--font-body)",
    "--surface-text": theme.text,
    "--surface-muted": theme.muted,
    "--surface-rule": `${theme.muted}55`,
  };

  return (
    <div
      className="min-h-screen w-full relative transition-colors duration-700"
      style={surfaceStyle}
    >
      <motion.div
        key={bg + "-spot"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none fixed inset-0"
        style={{ background: theme.spotlight }}
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.6) 1px, transparent 1px), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "3px 3px, 5px 5px",
        }}
      />

      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 h-64 z-20"
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          maskImage: "linear-gradient(to top, black 35%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 35%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 h-64 z-20"
        style={{
          background: `linear-gradient(to top, ${theme.base}d9 10%, ${theme.base}66 55%, transparent)`,
        }}
      />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: loading ? 0 : 0.1 }}
      >
        <Hero />

        <section id="about" className="scroll-mt-24">
          <AboutSection />
        </section>
        <section id="experience" className="scroll-mt-24">
          <ExperienceSection />
        </section>
        <section id="projects" className="scroll-mt-24">
          <ProjectsSection />
        </section>
        <section id="contact" className="scroll-mt-24">
          <ContactSection />
        </section>
      </motion.main>

      <footer
        className="relative z-10 px-6 md:px-12 py-8 flex justify-between items-center text-[10px] tracking-[0.4em]"
        style={{ fontFamily: "var(--font-display)", color: theme.muted }}
      >
        <span>{footer.left}</span>
        <span>{footer.right}</span>
      </footer>

      <CardDeck onSelect={scrollTo} onReady={() => setLoading(false)} />
      {!loading && <BackgroundSwitcher current={bg} onChange={setBg} />}
      <SmoothScroll />
    </div>
  );
}
