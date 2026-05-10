import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  about,
  experience,
  projects,
  contactCopy,
  contactLinks,
  type Token,
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

function Chip({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      className="inline-block align-middle mx-1 my-1 overflow-hidden rounded-md"
      style={{
        height: "0.85em",
        width: "1.6em",
        verticalAlign: "-0.12em",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
      }}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full h-full object-cover"
      />
    </span>
  );
}

function RebusLine({ tokens, delay }: { tokens: Token[]; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className="inline"
      style={{
        fontFamily: "var(--font-hero)",
        fontWeight: 400,
        lineHeight: 1.4,
        letterSpacing: "-0.01em",
        color: "var(--surface-text)",
        fontSize: "clamp(32px, 4.5vw, 64px)",
      }}
    >
      {tokens.map((t, i) =>
        t.kind === "word" ? (
          <span key={i}>
            {t.text}
            {i < tokens.length - 1 ? " " : ""}
          </span>
        ) : (
          <Chip key={i} src={t.src} alt={t.alt} />
        ),
      )}{" "}
    </motion.span>
  );
}

export function AboutSection() {
  return (
    <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-32 pb-48 flex justify-center">
      <p className="max-w-6xl text-center" style={{ wordSpacing: "0.05em" }}>
        {about.lines.map((tokens, i) => (
          <RebusLine key={i} tokens={tokens} delay={0.1 + i * 0.08} />
        ))}
      </p>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <SectionShell title="Experience">
      <div
        className="space-y-0"
        style={{ borderBottom: "1px solid var(--surface-rule)" }}
      >
        {experience.map((r, i) => (
          <motion.div
            key={r.role}
            {...stagger(i)}
            className="grid grid-cols-12 gap-4 py-8 group cursor-default"
            style={{ borderTop: "1px solid var(--surface-rule)" }}
          >
            <div
              className="col-span-12 md:col-span-3 text-sm tracking-wider"
              style={{ ...display, color: "var(--surface-muted)" }}
            >
              {r.years}
            </div>
            <div className="col-span-9 md:col-span-7">
              <div
                className="text-2xl"
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
                style={{ ...body, color: "var(--surface-text)", opacity: 0.75 }}
              >
                {r.company}
              </div>
            </div>
            <div className="col-span-3 md:col-span-2 flex justify-end items-start">
              <ArrowUpRight
                className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500"
                style={{ color: "var(--surface-muted)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProjectsSection() {
  return (
    <SectionShell title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.href ?? "#"}
            {...stagger(i)}
            className="group block"
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
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.2))",
                }}
              />
              <div className="absolute inset-0 flex items-end p-5">
                <span
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ ...display, color: "var(--surface-muted)" }}
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
          </motion.a>
        ))}
      </div>
    </SectionShell>
  );
}

export function ContactSection() {
  return (
    <SectionShell title="Contact">
      <motion.p
        {...stagger(0)}
        className="leading-relaxed mb-12 max-w-lg text-lg"
        style={{ ...body, color: "var(--surface-text)" }}
      >
        {contactCopy}
      </motion.p>
      <div style={{ borderBottom: "1px solid var(--surface-rule)" }}>
        {contactLinks.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            {...stagger(i + 1)}
            className="flex items-center gap-4 py-4 group"
            style={{ borderTop: "1px solid var(--surface-rule)" }}
          >
            <l.icon
              className="w-4 h-4"
              style={{ color: "var(--surface-muted)" }}
            />
            <span
              className="group-hover:translate-x-1 transition-transform duration-500"
              style={{ ...body, color: "var(--surface-text)" }}
            >
              {l.label}
            </span>
            <ArrowUpRight
              className="ml-auto w-4 h-4 transition-colors"
              style={{ color: "var(--surface-muted)" }}
            />
          </motion.a>
        ))}
      </div>
    </SectionShell>
  );
}
