import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { hero } from "../content";

import casioWatch from "../../imports/hero-section-asset/casio-watch.webp";
import freitag from "../../imports/hero-section-asset/freitag.webp";
import owala from "../../imports/hero-section-asset/owala.webp";
import runningShoe from "../../imports/hero-section-asset/running-shoe.webp";
import sweater from "../../imports/hero-section-asset/sweater.webp";

const lineAnim = (i: number) => ({
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 1.1,
    delay: 0.2 + i * 0.18,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

interface FloatingItemConfig {
  src: string;
  alt: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  /** Approximate max width in px; scales down on smaller viewports. */
  size: number;
  /** Resting tilt, in deg. */
  rotate: number;
  /** Parallax depth. 0 = static, 1 = scrolls with page. Lower drifts more. */
  depth: number;
  /** Entrance delay (seconds). */
  delay: number;
  /** Ambient float amplitude in px. */
  floatY: number;
  /** Ambient float period in seconds. */
  floatDur: number;
}

const items: FloatingItemConfig[] = [
  {
    src: sweater,
    alt: "Studio Concrete sweater",
    top: "6%",
    left: "2%",
    size: 300,
    rotate: -10,
    depth: 0.55,
    delay: 0.9,
    floatY: 18,
    floatDur: 7.8,
  },
  {
    src: casioWatch,
    alt: "Casio watch",
    top: "14%",
    right: "6%",
    size: 150,
    rotate: 14,
    depth: 0.85,
    delay: 1.1,
    floatY: 10,
    floatDur: 6.2,
  },
  {
    src: runningShoe,
    alt: "Hoka running shoe",
    bottom: "8%",
    left: "3%",
    size: 260,
    rotate: 8,
    depth: 0.5,
    delay: 1.25,
    floatY: 20,
    floatDur: 8.4,
  },
  {
    src: owala,
    alt: "Owala water bottle",
    bottom: "12%",
    right: "4%",
    size: 200,
    rotate: -8,
    depth: 0.75,
    delay: 1.4,
    floatY: 14,
    floatDur: 7.1,
  },
  {
    src: freitag,
    alt: "Freitag bag",
    top: "42%",
    right: "1%",
    size: 340,
    rotate: -6,
    depth: 0.65,
    delay: 1.55,
    floatY: 16,
    floatDur: 7.6,
  },
];

/**
 * Inline SVG <filter> that drops near-white background pixels from the
 * product shots so they read as cutouts on the dark surface.
 *
 * Two-step pipeline:
 *  1. feColorMatrix builds a pure alpha mask — bright source pixels get
 *     low alpha, dark pixels get full alpha. RGB is zeroed so the mask
 *     can't leak premultiplied-color artefacts (the single-matrix form
 *     of this trick renders as black rectangles in Chrome because the
 *     un-premultiply step divides RGB by ~0 alpha).
 *  2. feComposite keeps SourceGraphic's RGB only where the mask is opaque.
 */
function WhiteKeyDefs() {
  return (
    <svg
      aria-hidden
      focusable={false}
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        <filter id="hero-white-key" colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.6 -1.6 -1.6 0 4.45"
            result="alphaMask"
          />
          <feComposite in="SourceGraphic" in2="alphaMask" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

function FloatingItem({
  item,
  progress,
}: {
  item: FloatingItemConfig;
  progress: MotionValue<number>;
}) {
  const drift = useTransform(progress, [0, 1], [0, -260 * (1 - item.depth)]);
  const fade = useTransform(progress, [0, 0.6, 1], [1, 0.55, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: item.top,
        left: item.left,
        right: item.right,
        bottom: item.bottom,
        y: drift,
        opacity: fade,
        willChange: "transform, opacity",
      }}
      initial={{ opacity: 0, scale: 0.78, rotate: item.rotate - 10 }}
      animate={{ opacity: 1, scale: 1, rotate: item.rotate }}
      transition={{
        duration: 1.2,
        delay: item.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.img
        src={item.src}
        alt={item.alt}
        draggable={false}
        animate={{
          y: [0, -item.floatY, 0],
          rotate: [item.rotate, item.rotate + 2.5, item.rotate],
        }}
        transition={{
          duration: item.floatDur,
          repeat: Infinity,
          ease: "easeInOut",
          delay: item.delay,
        }}
        style={{
          display: "block",
          width: `clamp(${Math.round(item.size * 0.42)}px, ${Math.round(
            item.size / 8.5,
          )}vw, ${item.size}px)`,
          height: "auto",
          filter:
            "url(#hero-white-key) drop-shadow(0 18px 28px rgba(0,0,0,0.45))",
        }}
      />
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      id="deck"
      className="relative min-h-screen w-full flex items-center justify-center px-3 sm:px-6 md:px-10 overflow-hidden"
    >
      <WhiteKeyDefs />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        {items.map((item) => (
          <FloatingItem
            key={item.alt}
            item={item}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <h1
        className="relative z-10 w-full text-center"
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
              className="block text-[clamp(54px,15vw,280px)] md:text-[clamp(72px,17vw,280px)]"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
    </section>
  );
}
