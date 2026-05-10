import { motion } from "motion/react";
import { hero } from "../content";

const lineAnim = (i: number) => ({
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 1.1,
    delay: 0.2 + i * 0.18,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export function Hero() {
  return (
    <section
      id="deck"
      className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-10 overflow-hidden"
    >
      <h1
        className="w-full text-center"
        style={{
          fontFamily: "var(--font-hero)",
          fontWeight: 400,
          lineHeight: 0.88,
          letterSpacing: "-0.02em",
          color: "var(--surface-text)",
        }}
      >
        {hero.lines.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              {...lineAnim(i)}
              className="block"
              style={{ fontSize: "clamp(72px, 17vw, 280px)" }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
    </section>
  );
}
