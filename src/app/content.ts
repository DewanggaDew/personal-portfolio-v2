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

export interface Role {
  years: string;
  role: string;
  company: string;
}

export const experience: Role[] = [
  { years: "20XX — Now",  role: "Role Title",       company: "Company Name" },
  { years: "20XX — 20XX", role: "Role Title",       company: "Company Name" },
  { years: "20XX — 20XX", role: "Role Title",       company: "Company Name" },
  { years: "20XX — 20XX", role: "Role Title",       company: "Company Name" },
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
