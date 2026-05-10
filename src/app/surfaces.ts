export type BgKey = "charcoal" | "felt" | "leather" | "ink" | "bone";

export interface Surface {
  label: string;
  base: string;
  spotlight: string;
  text: string;
  muted: string;
  swatch: string;
}

export const backgrounds: Record<BgKey, Surface> = {
  charcoal: {
    label: "Charcoal",
    base: "#0d0d0f",
    spotlight: "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(220,200,160,0.10) 0%, rgba(20,18,16,0) 60%)",
    text: "#e7e5e0",
    muted: "#7a7670",
    swatch: "#0d0d0f",
  },
  felt: {
    label: "Felt",
    base: "#0e2a23",
    spotlight: "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(220,210,170,0.12) 0%, rgba(8,20,16,0) 60%)",
    text: "#f5ecd6",
    muted: "#c9b896",
    swatch: "#0e2a23",
  },
  leather: {
    label: "Leather",
    base: "#241511",
    spotlight: "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(240,190,140,0.12) 0%, rgba(20,10,8,0) 60%)",
    text: "#efe4d2",
    muted: "#9a8270",
    swatch: "#241511",
  },
  ink: {
    label: "Ink",
    base: "#0a0d14",
    spotlight: "radial-gradient(ellipse 55% 50% at 50% 55%, rgba(140,170,220,0.10) 0%, rgba(6,8,12,0) 60%)",
    text: "#e2e6ee",
    muted: "#7a8294",
    swatch: "#0a0d14",
  },
  bone: {
    label: "Bone",
    base: "#1a1714",
    spotlight: "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(255,235,200,0.08) 0%, rgba(15,12,10,0) 60%)",
    text: "#ece5d8",
    muted: "#8a8074",
    swatch: "#1a1714",
  },
};
