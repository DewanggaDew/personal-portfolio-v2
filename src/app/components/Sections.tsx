import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  about,
  experience,
  projects,
  contactCTA,
  type ExperiencePhoto,
  type PhotoRatio,
} from "../content";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    delay: 0.1 + i * 0.08,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

const display = { fontFamily: "var(--font-display)" };
const body = { fontFamily: "var(--font-body)" };

function SectionShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-20 pb-48">
      <motion.div {...fadeUp} className="mb-16">
        <h1
          style={{
            ...display,
            color: "var(--surface-text)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
          }}
          className="text-5xl md:text-6xl leading-[1.05]"
        >
          {title}
        </h1>
      </motion.div>
      {children}
    </div>
  );
}

/**
 * Single line of text with a colored "blind" overlay that slides in to
 * cover the line, then out to reveal it. Mirrors the in-out mode of the
 * Framer BlindsTextReveal module. Re-triggers every time the line
 * enters the viewport so the reveal plays again on scroll-back.
 */
function BlindLine({ text, delay }: { text: string; delay: number }) {
  const inDuration = 0.5;
  const outDuration = 0.5;
  const total = inDuration + outDuration;
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <span
      ref={ref}
      className="relative inline-block overflow-hidden align-top"
      style={{ maxWidth: "100%" }}
    >
      <motion.span
        className="inline-block"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + inDuration, duration: 0 }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-0"
        style={{ background: "var(--surface-text)", zIndex: 1 }}
        initial={{ x: "-101%" }}
        animate={inView ? { x: ["-101%", "0%", "101%"] } : { x: "-101%" }}
        transition={{
          delay,
          duration: total,
          times: [0, inDuration / total, 1],
          ease: [
            [0.81, -0.02, 0.55, 0.51] as [number, number, number, number],
            [0.28, 0.25, 0.18, 0.98] as [number, number, number, number],
          ],
        }}
      />
    </span>
  );
}

export function AboutSection() {
  return (
    <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-32 pb-48 flex justify-center">
      <div
        className="max-w-5xl text-center"
        style={{
          fontFamily: "var(--font-hero)",
          fontWeight: 400,
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
          color: "var(--surface-text)",
          fontSize: "clamp(24px, 5vw, 54px)",
        }}
      >
        {about.lines.map((line, i) => (
          <div key={i} className="block">
            <BlindLine text={line} delay={0.15 + i * 0.08} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactChip({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rounded-full px-4 py-3 transition-transform duration-500 group-hover:-translate-y-0.5"
      style={{
        border: "1px solid var(--surface-rule)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.025))",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="font-mono text-sm leading-none"
        style={{ color: "var(--surface-text)" }}
      >
        {value}
      </div>
      <div
        className="mt-1 text-[10px] uppercase tracking-[0.22em] leading-relaxed"
        style={{ ...display, color: "var(--surface-muted)" }}
      >
        {label}
      </div>
    </div>
  );
}

function renderSummary(
  summary: string,
  links?: Array<{ text: string; href: string }>,
) {
  if (!links || links.length === 0) return summary;
  const sorted = [...links].sort((a, b) => b.text.length - a.text.length);
  type Part = string | { text: string; href: string };
  let parts: Part[] = [summary];
  for (const link of sorted) {
    const next: Part[] = [];
    for (const part of parts) {
      if (typeof part !== "string") {
        next.push(part);
        continue;
      }
      const segments = part.split(link.text);
      segments.forEach((seg, i) => {
        if (seg) next.push(seg);
        if (i < segments.length - 1) next.push(link);
      });
    }
    parts = next;
  }
  return parts.map((part, i) =>
    typeof part === "string" ? (
      <span key={i}>{part}</span>
    ) : (
      <span
        key={i}
        role="link"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          window.open(part.href, "_blank", "noopener,noreferrer");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            e.preventDefault();
            window.open(part.href, "_blank", "noopener,noreferrer");
          }
        }}
        className="underline underline-offset-2 cursor-pointer"
        style={{ color: "var(--surface-text)", opacity: 0.9 }}
      >
        {part.text}
      </span>
    ),
  );
}

type LandingZone = "top" | "bottom";

/**
 * Card sizes are kept compact so the rotated bounding boxes still fit
 * comfortably inside the viewport's "top zone" without ever bleeding
 * above the viewport top.
 */
const PHOTO_DIMS: Record<PhotoRatio, { width: number; height: number }> = {
  "1x1": { width: 130, height: 130 },
  "3x4": { width: 118, height: 157 },
};

/**
 * Landing offsets are measured from the photos container's center
 * (cards use left-1/2 top-1/2 -translate-1/2 anchoring). Fans the
 * cards out horizontally with a gentle vertical sag.
 */
const PHOTO_LANDING: ReadonlyArray<{ x: number; y: number; rotate: number }> = [
  { x: -240, y: 18, rotate: -16 },
  { x: -82, y: -12, rotate: -6 },
  { x: 82, y: -10, rotate: 6 },
  { x: 240, y: 20, rotate: 16 },
];

/**
 * Y-coords of the photos container's CENTER, expressed as fixed pixel
 * distances from the viewport edges (not percentages, so card framing
 * stays consistent across tall and short monitors).
 *
 * - TOP_ZONE_Y_PX: where photos land when the hovered row is below the
 *   middle of the viewport — i.e., the "default" position the user
 *   asked for ("on top of the screen").
 * - BOTTOM_ZONE_FROM_BOTTOM_PX: clearance for the docked card deck
 *   (≈140px tall when closed) plus the tallest card's half-height plus
 *   a margin.
 */
const TOP_ZONE_Y_PX = 150;
const BOTTOM_ZONE_FROM_BOTTOM_PX = 280;

/**
 * Threshold used to decide which zone to land in: if a row's bottom
 * edge sits in the top 55% of the viewport, the row is "near the top"
 * and photos go to the BOTTOM zone instead. Anything else lands at TOP.
 */
const ROW_TOP_HALF_THRESHOLD = 0.55;

/**
 * Page-level overlay that deals a fanned hand of photos from the docked
 * card deck (below the viewport) up to either the top or bottom of the
 * viewport. Position is `fixed` so the cards stay anchored relative to
 * the viewport regardless of which experience row the user is hovering.
 *
 * The whole layer is `pointer-events: none`, so the row's hover state
 * (and the deck dock's own hover state) are never interrupted by the
 * photos flying in front of them.
 */
function DealtPhotosOverlay({
  photos,
  active,
  zone,
}: {
  photos: ExperiencePhoto[];
  active: boolean;
  zone: LandingZone;
}) {
  const [vh, setVh] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const centerY =
    zone === "top" ? TOP_ZONE_Y_PX : vh - BOTTOM_ZONE_FROM_BOTTOM_PX;
  // Origin: well below the viewport, roughly where the docked deck sits.
  // Translates relative to the container's current `y`, so we add it back
  // to land at the same off-screen point regardless of zone.
  const originY = vh - centerY + 220;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 hidden lg:block"
      style={{ height: vh, zIndex: 25 }}
    >
      <motion.div
        className="relative mx-auto"
        animate={{ y: centerY }}
        transition={{ type: "spring", stiffness: 80, damping: 22, mass: 0.9 }}
        style={{ width: "min(700px, 92vw)", height: 0 }}
      >
        {photos.map((p, i) => {
          const dim = PHOTO_DIMS[p.ratio];
          const pos = PHOTO_LANDING[i % PHOTO_LANDING.length]!;
          const delay = active ? 0.08 + i * 0.13 : 0;
          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: 0,
                y: originY,
                rotate: 25 + i * 6,
                scale: 0.55,
              }}
              animate={
                active
                  ? {
                      opacity: 1,
                      x: pos.x,
                      y: pos.y,
                      rotate: pos.rotate,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      x: 0,
                      y: originY,
                      rotate: 25 + i * 6,
                      scale: 0.55,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 1,
                delay,
                opacity: {
                  duration: active ? 0.3 : 0.45,
                  ease: [0.22, 1, 0.36, 1] as const,
                  delay,
                },
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md ring-1 ring-white/20"
              style={{
                width: dim.width,
                height: dim.height,
                boxShadow:
                  "0 32px 60px -18px rgba(0,0,0,0.78), 0 8px 16px -4px rgba(0,0,0,0.5)",
                willChange: "transform, opacity",
              }}
            >
              <img
                src={p.src}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function ExperienceSection() {
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [zone, setZone] = useState<LandingZone>("top");
  // Stable copy of the currently-or-last-hovered row's photos. Keeping
  // this in its own state (instead of deriving from `hoveredIdx`) means
  // the exit animation can keep using the row's photos even after the
  // cursor leaves — without flickering to empty.
  const [activePhotos, setActivePhotos] = useState<ExperiencePhoto[]>(
    () => experience[0]?.photos ?? [],
  );

  const handleEnter = (i: number) => {
    const el = rowRefs.current[i];
    if (el && typeof window !== "undefined") {
      const rect = el.getBoundingClientRect();
      // If the row's bottom edge is in the top half of the viewport,
      // it's "near the top of the screen" → deal photos to the BOTTOM
      // zone so they don't sit on top of the row.
      const nextZone: LandingZone =
        rect.bottom < window.innerHeight * ROW_TOP_HALF_THRESHOLD
          ? "bottom"
          : "top";
      setZone(nextZone);
    }
    setActivePhotos(experience[i]!.photos);
    setHoveredIdx(i);
  };

  const handleLeave = (i: number) => {
    setHoveredIdx((prev) => (prev === i ? null : prev));
  };

  return (
    <SectionShell title="Experience">
      <div
        className="space-y-0"
        style={{ borderBottom: "1px solid var(--surface-rule)" }}
      >
        {experience.map((r, i) => (
          <motion.div
            key={`${r.role}-${r.company}`}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            {...stagger(i)}
            className="grid grid-cols-12 gap-x-6 gap-y-6 py-10 group cursor-default"
            style={{ borderTop: "1px solid var(--surface-rule)" }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            <div
              className="col-span-12 md:col-span-3"
              style={{ ...display, color: "var(--surface-muted)" }}
            >
              <div className="text-sm tracking-wider">{r.years}</div>
              <div
                className="mt-4 inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.28em]"
                style={{
                  border: "1px solid var(--surface-rule)",
                  color: "var(--surface-text)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                {r.kind}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex items-start gap-3">
                <div>
                  <div
                    className="text-2xl md:text-3xl"
                    style={{
                      ...display,
                      color: "var(--surface-text)",
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {r.role}
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      ...body,
                      color: "var(--surface-text)",
                      opacity: 0.75,
                    }}
                  >
                    {r.company}
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {r.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="grid grid-cols-[14px_1fr] gap-3 leading-relaxed"
                    style={{ ...body, color: "var(--surface-text)" }}
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "var(--surface-muted)" }}
                    />
                    <span style={{ opacity: 0.82 }}>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                {r.metrics.map((metric) => (
                  <ImpactChip
                    key={`${metric.value}-${metric.label}`}
                    value={metric.value}
                    label={metric.label}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <DealtPhotosOverlay
        photos={activePhotos}
        active={hoveredIdx !== null}
        zone={zone}
      />
    </SectionShell>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      setScrollDistance(distance);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <div className="pt-12 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
          <motion.h1
            {...fadeUp}
            style={{
              ...display,
              color: "var(--surface-text)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
            }}
            className="text-5xl md:text-6xl leading-[1.05]"
          >
            Projects
          </motion.h1>
        </div>
        <div className="flex-1 flex items-start pt-18">
          <motion.div
            ref={trackRef}
            style={{ x, willChange: "transform" }}
            className="flex gap-8 md:gap-12 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32"
          >
            {projects.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href ?? "#"}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noreferrer" : undefined}
                {...stagger(i)}
                className="group block shrink-0"
                style={{ width: "clamp(240px, 22vw, 320px)" }}
              >
                <div
                  className="aspect-4/5 mb-5 overflow-hidden relative"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--surface-rule)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.04 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    className="w-full h-full"
                    style={
                      p.thumbnail
                        ? undefined
                        : {
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.2))",
                          }
                    }
                  >
                    {p.thumbnail && (
                      <img
                        src={p.thumbnail}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="block h-full w-full object-cover"
                      />
                    )}
                  </motion.div>
                  {p.metrics && p.metrics.length > 0 && (
                    <div
                      className="absolute inset-x-0 top-0 p-5 pb-8 flex flex-wrap gap-x-5 gap-y-2"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                      }}
                    >
                      {p.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col">
                          <span
                            className="text-lg"
                            style={{
                              ...display,
                              color: "#fff",
                              fontWeight: 300,
                            }}
                          >
                            {m.value}
                          </span>
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase"
                            style={{
                              ...display,
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    className="absolute inset-x-0 bottom-0 flex items-end p-5 pt-8"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                    }}
                  >
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase"
                      style={{ ...display, color: "rgba(255,255,255,0.85)" }}
                    >
                      {p.year}
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-2xl"
                    style={{
                      ...display,
                      color: "var(--surface-text)",
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.name}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-colors"
                    style={{ color: "var(--surface-muted)" }}
                  />
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ ...body, color: "var(--surface-text)", opacity: 0.7 }}
                >
                  {p.tag}
                </div>
                <p
                  className="text-sm mt-3 leading-snug"
                  style={{ ...body, color: "var(--surface-text)", opacity: 0.6 }}
                >
                  {renderSummary(p.summary, p.summaryLinks)}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-20 pb-48">
      <motion.h1
        {...stagger(0)}
        style={{
          ...display,
          color: "var(--surface-text)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
        }}
        className="text-[clamp(2.75rem,9vw,8rem)] leading-[0.95] mb-10 max-w-5xl"
      >
        {contactCTA.headline[0]}
        <br />
        {contactCTA.headline[1]}
      </motion.h1>

      <motion.p
        {...stagger(1)}
        className="leading-relaxed mb-14 max-w-lg text-lg"
        style={{ ...body, color: "var(--surface-text)" }}
      >
        {contactCTA.supporting}
      </motion.p>

      <motion.a
        {...stagger(2)}
        href={contactCTA.primary.href}
        className="group block py-8 mb-12"
        style={{
          borderTop: "1px solid var(--surface-rule)",
          borderBottom: "1px solid var(--surface-rule)",
        }}
      >
        <div className="flex items-center justify-between gap-6">
          <span
            className="block transition-transform duration-700 group-hover:translate-x-2"
            style={{
              ...display,
              color: "var(--surface-text)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              fontSize: "clamp(1.5rem,5.5vw,4rem)",
              lineHeight: 1.05,
            }}
          >
            {contactCTA.primary.label}
          </span>
          <ArrowUpRight
            className="shrink-0 w-8 h-8 md:w-12 md:h-12 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2"
            style={{ color: "var(--surface-text)" }}
          />
        </div>
      </motion.a>

      <motion.div
        {...stagger(3)}
        className="flex flex-wrap items-center gap-x-8 gap-y-3"
      >
        {contactCTA.secondary.map((s) => {
          const isExternal = /^https?:\/\//.test(s.href);
          return (
            <a
              key={s.label}
              href={s.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity duration-300"
              style={{ ...display, color: "var(--surface-text)" }}
            >
              {s.label}
              {isExternal && <ArrowUpRight className="w-3 h-3" />}
            </a>
          );
        })}
      </motion.div>
    </div>
  );
}
