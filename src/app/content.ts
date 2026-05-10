import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import spades from "../imports/Use_the_same_size__same_202605101412.jpeg";
import diamonds from "../imports/Use_the_same_size__same_202605101412__1_.jpeg";
import hearts from "../imports/Use_the_same_size__same_202605101412__2_.jpeg";
import clubs from "../imports/f07875226c1b7c5f09b6dab22b15d59c.jpg";

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
  desk:    u("photo-1549833971-c4283bad0032"),
  coffee:  u("photo-1774529239747-125d7a0bf928"),
  jakarta: u("photo-1775808381593-b19e7927b7ce"),
  guitar:  u("photo-1648561848326-7eb7117274c8"),
  code:    u("photo-1692780237535-13c64f645fb5"),
  vinyl:   u("photo-1603850121303-d4ade9e5ba65"),
  books:   u("photo-1601546101027-753e8037792d"),
  camera:  u("photo-1643031643118-45c071165d0f"),
};

export const about: { lines: Token[][] } = {
  lines: [
    [
      { kind: "word", text: "I'M A" },
      { kind: "img", src: chips.desk, alt: "designer's desk" },
      { kind: "word", text: "DESIGNER" },
      { kind: "word", text: "AND" },
    ],
    [
      { kind: "word", text: "DEVELOPER" },
      { kind: "img", src: chips.code, alt: "code" },
      { kind: "word", text: "BUILDING QUIET" },
    ],
    [
      { kind: "word", text: "PRODUCTS FROM" },
      { kind: "img", src: chips.jakarta, alt: "jakarta sky" },
      { kind: "word", text: "JAKARTA." },
    ],
    [
      { kind: "word", text: "I LIVE ON" },
      { kind: "img", src: chips.coffee, alt: "coffee" },
      { kind: "word", text: "COFFEE," },
      { kind: "img", src: chips.vinyl, alt: "vinyl" },
      { kind: "word", text: "RECORDS," },
    ],
    [
      { kind: "word", text: "AND LATE NIGHT" },
      { kind: "img", src: chips.guitar, alt: "guitar" },
      { kind: "word", text: "GUITAR." },
    ],
    [
      { kind: "word", text: "I COLLECT" },
      { kind: "img", src: chips.books, alt: "books" },
      { kind: "word", text: "BOOKS, SHOOT" },
      { kind: "img", src: chips.camera, alt: "film camera" },
      { kind: "word", text: "FILM," },
    ],
    [
      { kind: "word", text: "AND BELIEVE LESS IS USUALLY MORE." },
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
  { years: "2023 — Now",  role: "Senior Product Designer", company: "Independent" },
  { years: "2020 — 2023", role: "Design Lead",             company: "Quiet Studio" },
  { years: "2018 — 2020", role: "Product Designer",        company: "North & Co." },
  { years: "2016 — 2018", role: "Visual Designer",         company: "Folio Press" },
];

export interface Project {
  name: string;
  tag: string;
  year: string;
  href?: string;
}

export const projects: Project[] = [
  { name: "Marginalia",            tag: "Editorial CMS",     year: "2025" },
  { name: "Slow Mail",             tag: "Async messaging",   year: "2024" },
  { name: "Atlas of Quiet Rooms",  tag: "Interactive essay", year: "2024" },
  { name: "Pocket Notebook",       tag: "iOS app",           year: "2023" },
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
