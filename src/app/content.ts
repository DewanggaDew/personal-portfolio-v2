import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import spades from "../imports/spades.webp";
import diamonds from "../imports/diamonds.webp";
import hearts from "../imports/hearts.webp";
import clubs from "../imports/clubs.webp";

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

/**
 * "Rebus" inline-image tokens. Unsplash URLs use w=128 because the chips
 * render at ~1.6em wide; a 1080w fetch would be a 50× waste.
 */
type Token =
  | { kind: "word"; text: string }
  | { kind: "img"; src: string; alt: string };

const u = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=128`;

const chips = {
  code:       u("photo-1692780237535-13c64f645fb5"),
  jakarta:    u("photo-1775808381593-b19e7927b7ce"),
  helping:    u("photo-1651372381086-9861c9c81db5"),
  rnb:        u("photo-1605170876472-db58e15c430e"),
  running:    u("photo-1460353581641-37baddab0fa2"),
  bouldering: u("photo-1501450626433-39bbf117090e"),
  poker:      u("photo-1670659215634-213e8d03fccb"),
  dumbbell:   u("photo-1584827386894-fc939dad6078"),
  chameleon:  u("photo-1654751894453-ab14e1e977a7"),
};

export const about: { lines: Token[][] } = {
  lines: [
    [
      { kind: "word", text: "I'M A" },
      { kind: "img", src: chips.code, alt: "code" },
      { kind: "word", text: "SOFTWARE DEVELOPER" },
    ],
    [
      { kind: "word", text: "FROM" },
      { kind: "img", src: chips.jakarta, alt: "jakarta sky" },
      { kind: "word", text: "JAKARTA, BUILDING" },
    ],
    [
      { kind: "img", src: chips.helping, alt: "hands together" },
      { kind: "word", text: "STUFF THAT HELPS PEOPLE." },
    ],
    [
      { kind: "word", text: "I LIVE FOR" },
      { kind: "img", src: chips.rnb, alt: "headphones" },
      { kind: "word", text: "R&B," },
      { kind: "img", src: chips.running, alt: "running shoes" },
      { kind: "word", text: "RUNNING," },
    ],
    [
      { kind: "img", src: chips.bouldering, alt: "climbing wall" },
      { kind: "word", text: "BOULDERING," },
      { kind: "img", src: chips.poker, alt: "poker chips" },
      { kind: "word", text: "POKER," },
    ],
    [
      { kind: "word", text: "AND THE OCCASIONAL" },
      { kind: "img", src: chips.dumbbell, alt: "dumbbell" },
      { kind: "word", text: "GYM SESH." },
    ],
    [
      { kind: "word", text: "A" },
      { kind: "img", src: chips.chameleon, alt: "chameleon" },
      { kind: "word", text: "JACK OF ALL TRADES, PLAYING EVERY HAND WITH MONSTER ADAPTABILITY." },
    ],
  ],
};

export type { Token };

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
      photo("exp-dksh-a", "1x1"),
      photo("exp-dksh-b", "3x4"),
      photo("exp-dksh-c", "1x1"),
      photo("exp-dksh-d", "3x4"),
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
      photo("exp-rot-a", "1x1"),
      photo("exp-rot-b", "3x4"),
      photo("exp-rot-c", "1x1"),
      photo("exp-rot-d", "3x4"),
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
      photo("exp-edu-a", "1x1"),
      photo("exp-edu-b", "3x4"),
      photo("exp-edu-c", "1x1"),
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
