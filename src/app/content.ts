import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import spades from "../imports/spades.webp";
import diamonds from "../imports/diamonds.webp";
import hearts from "../imports/hearts.webp";
import clubs from "../imports/clubs.webp";
import dksh1 from "../imports/dksh1.webp";
import dksh2 from "../imports/dksh2.webp";
import dksh3 from "../imports/dksh3.webp";
import dksh4 from "../imports/dksh4.webp";
import rac1 from "../imports/rac1.webp";
import rac2 from "../imports/rac2.webp";
import rac3 from "../imports/rac3.webp";
import rac4 from "../imports/rac4.webp";
import xmum2 from "../imports/xmum2.webp";
import xmum3 from "../imports/xmum3.webp";
import xmum4 from "../imports/xmum4.webp";

export type SectionId = "about" | "experience" | "projects" | "contact";

export interface CardEntry {
  id: SectionId;
  label: string;
  suit: "Hearts" | "Spades" | "Diamonds" | "Clubs";
  index: "I" | "II" | "III" | "IV";
  image: string;
}

export const cards: CardEntry[] = [
  { id: "about",      label: "About",      suit: "Hearts",   index: "I",   image: hearts },
  { id: "experience", label: "Experience", suit: "Spades",   index: "II",  image: spades },
  { id: "projects",   label: "Projects",   suit: "Diamonds", index: "III", image: diamonds },
  { id: "contact",    label: "Contact",    suit: "Clubs",    index: "IV",  image: clubs },
];

export const hero = {
  lines: ["DEWANGGA", "DEWATA"] as const,
};

export const about: { lines: string[] } = {
  lines: [
    "I'M A SOFTWARE DEVELOPER FROM JAKARTA",
    "AIMING TO BUILD MEANINGFUL PRODUCTS. ALWAYS FUELED BY R&B, RUNNING,",
    "BOULDERING, POKER, AND GYM SESHS.",
    "A JACK OF ALL TRADES, PLAYING EVERY HAND WITH MONSTER ADAPTABILITY.",
  ],
};

export type PhotoRatio = "1x1" | "3x4";

export interface ExperiencePhoto {
  src: string;
  ratio: PhotoRatio;
}

/**
 * Placeholder image builder. picsum.photos returns a deterministic image
 * per seed, so layout stays stable across reloads while real photos are
 * still being collected. Width/height match the requested ratio so the
 * fetched bytes aren't wasted on cropping.
 */
const photo = (seed: string, ratio: PhotoRatio): ExperiencePhoto => {
  const [w, h] = ratio === "1x1" ? [400, 400] : [360, 480];
  return { src: `https://picsum.photos/seed/${seed}/${w}/${h}`, ratio };
};

export interface Role {
  years: string;
  kind: string;
  role: string;
  company: string;
  bullets: string[];
  metrics: Array<{
    value: string;
    label: string;
  }>;
  photos: ExperiencePhoto[];
}

export const experience: Role[] = [
  {
    years: "Aug 2025 — Feb 2026",
    kind: "Professional",
    role: "IT Applications Intern",
    company: "DKSH CSSC · Petaling Jaya, Malaysia",
    bullets: [
      "Led development of a production-grade COI Disclosure System using React.js and .NET Core 8.",
      "Designed REST APIs and normalized relational schemas that removed manual COI review steps.",
      "Resolved cross-layer defects across React, .NET, and SQL stored procedures to support UAT and rollout.",
    ],
    metrics: [
      { value: "30+", label: "countries supported" },
      { value: "60%", label: "processing time cut" },
      { value: "100s", label: "internal users served" },
    ],
    photos: [
      { src: dksh1, ratio: "1x1" },
      { src: dksh2, ratio: "3x4" },
      { src: dksh4, ratio: "1x1" },
      { src: dksh3, ratio: "3x4" },
    ],
  },
  {
    years: "Nov 2024 — Jul 2025",
    kind: "Organization",
    role: "Tech & Hack Team",
    company: "Garuda Hacks 6.0",
    bullets: [
      "Built GH-Portal with React.js, Express.js, Firebase Auth, and Firestore for applications, scheduling, and admin workflows.",
      "Designed an admin-configurable application system with flexible Firestore schemas and backend validation.",
      "Developed multi-step forms with react-hook-form, Google OAuth, SendGrid confirmation, and Jest coverage.",
    ],
    metrics: [
      { value: "4", label: "core portal flows" },
    ],
    photos: [
      photo("exp-gh-a", "3x4"),
      photo("exp-gh-b", "1x1"),
      photo("exp-gh-c", "3x4"),
      photo("exp-gh-d", "1x1"),
    ],
  },
  {
    years: "Jul 2024 — Jun 2025",
    kind: "Leadership",
    role: "President",
    company: "Rotaract Club of Xiamen University Malaysia",
    bullets: [
      "Led a Board of Directors to plan club operations, coordinate activities, and deliver community service events.",
      "Built a collaborative team environment across committees while keeping execution and leadership responsibilities aligned.",
    ],
    metrics: [
      { value: "22", label: "board members led" },
      { value: "1 yr", label: "presidential term" },
    ],
    photos: [
      { src: rac1, ratio: "1x1" },
      { src: rac4, ratio: "3x4" },
      { src: rac2, ratio: "1x1" },
      { src: rac3, ratio: "1x1" },
    ],
  },
  {
    years: "Jul 2023 — Sep 2023",
    kind: "Professional",
    role: "Web Developer Intern",
    company: "Moflip Digital Solutions · Jakarta, Indonesia",
    bullets: [
      "Refactored a CMS dashboard using React and Tailwind CSS to improve API data flows and validation speed.",
      "Built configurable content update forms so non-technical users could publish changes independently.",
      "Streamlined media deployment workflows across platforms.",
    ],
    metrics: [
      { value: "30%", label: "faster load and validation" },
      { value: "60%", label: "update turnaround cut" },
      { value: "50%", label: "rollout time reduced" },
    ],
    photos: [
      photo("exp-mof-a", "3x4"),
      photo("exp-mof-b", "1x1"),
      photo("exp-mof-c", "3x4"),
      photo("exp-mof-d", "1x1"),
    ],
  },
  {
    years: "Sep 2022 — Aug 2026",
    kind: "Education",
    role: "Bachelor of Computer Science and Technology (Honors)",
    company: "Xiamen University Malaysia · GPA 3.91/4.00 · Dean's List",
    bullets: [
      "Studying Computer Science and Technology with a software engineering focus.",
      "Maintained a strong cumulative GPA while earning Dean's List recognition.",
    ],
    metrics: [
      { value: "3.91", label: "cumulative GPA" },
    ],
    photos: [
      { src: xmum2, ratio: "1x1" },
      { src: xmum3, ratio: "1x1" },
      { src: xmum4, ratio: "1x1" },
      photo("exp-edu-d", "3x4"),
    ],
  },
];

export interface Project {
  name: string;
  tag: string;
  year: string;
  href?: string;
}

export const projects: Project[] = [
  { name: "Project Name",  tag: "Category",  year: "20XX" },
  { name: "Project Name",  tag: "Category",  year: "20XX" },
  { name: "Project Name",  tag: "Category",  year: "20XX" },
  { name: "Project Name",  tag: "Category",  year: "20XX" },
];

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export interface ContactLink {
  icon: Icon;
  label: string;
  href: string;
}

export const contactCopy =
  "Slow correspondence welcome. I usually answer within a few days, with intention.";

export const contactLinks: ContactLink[] = [
  { icon: Mail,     label: "hello@portfolio.com", href: "mailto:hello@portfolio.com" },
  { icon: Github,   label: "github.com/portfolio", href: "#" },
  { icon: Linkedin, label: "in/portfolio",         href: "#" },
  { icon: MapPin,   label: "Jakarta, ID",          href: "#" },
];

export const footer = {
  left: "© MMXXVI",
  right: "HAND-DEALT",
};
