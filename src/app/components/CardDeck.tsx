import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card } from "./Card";
import { cards, type SectionId } from "../content";

interface CardDeckProps {
  onSelect: (id: SectionId) => void;
  onReady?: () => void;
}

type Phase = "stack" | "fan" | "dock";

const FAN_POSITIONS_DESKTOP = [
  { x: -260, rotate: -10 },
  { x: -90, rotate: -3.5 },
  { x: 90, rotate: 3.5 },
  { x: 260, rotate: 10 },
] as const;

const DOCK_POSITIONS_DESKTOP = [
  { x: -210, rotate: -8 },
  { x: -70, rotate: -3 },
  { x: 70, rotate: 3 },
  { x: 210, rotate: 8 },
] as const;

const FAN_POSITIONS_MOBILE = [
  { x: -110, rotate: -10 },
  { x: -38, rotate: -3.5 },
  { x: 38, rotate: 3.5 },
  { x: 110, rotate: 10 },
] as const;

const DOCK_POSITIONS_MOBILE = [
  { x: -95, rotate: -8 },
  { x: -32, rotate: -3 },
  { x: 32, rotate: 3 },
  { x: 95, rotate: 8 },
] as const;

const MOBILE_BREAKPOINT = 640;

const DECK_HEIGHT_DESKTOP = 320;
const DECK_HEIGHT_MOBILE = 220;

export function CardDeck({ onSelect, onReady }: CardDeckProps) {
  const [phase, setPhase] = useState<Phase>("stack");
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < MOBILE_BREAKPOINT
      : false,
  );

  useEffect(() => {
    const onResize = () => {
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fan"), 700);
    const t2 = setTimeout(() => {
      setPhase("dock");
      onReady?.();
    }, 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onReady]);

  const fanPositions = isMobile ? FAN_POSITIONS_MOBILE : FAN_POSITIONS_DESKTOP;
  const dockPositions = isMobile
    ? DOCK_POSITIONS_MOBILE
    : DOCK_POSITIONS_DESKTOP;
  const fanSize = isMobile
    ? { width: 140, height: 196 }
    : { width: 220, height: 308 };
  const dockSize = isMobile
    ? { width: 120, height: 168 }
    : { width: 190, height: 266 };
  const deckHeight = isMobile ? DECK_HEIGHT_MOBILE : DECK_HEIGHT_DESKTOP;
  const dockClosedY = isMobile ? 130 : 180;
  const dockOpenY = 20;

  const transforms = (i: number) => {
    if (phase === "stack") {
      return {
        x: 0,
        y: 0,
        rotate: -3 + i * 2,
        scale: 1,
        width: fanSize.width,
        height: fanSize.height,
      };
    }
    if (phase === "fan") {
      const f = fanPositions[i]!;
      return {
        x: f.x,
        y: 0,
        rotate: f.rotate,
        scale: 1,
        width: fanSize.width,
        height: fanSize.height,
      };
    }
    const d = dockPositions[i]!;
    return {
      x: d.x,
      y: 0,
      rotate: d.rotate,
      scale: 1,
      width: dockSize.width,
      height: dockSize.height,
    };
  };

  const centeredY = -((vh - deckHeight) / 2);
  const targetY = phase === "dock" ? (open ? dockOpenY : dockClosedY) : centeredY;

  return (
    <motion.div
      initial={false}
      animate={{ y: targetY }}
      transition={{ type: "spring", stiffness: 110, damping: 22 }}
      onMouseEnter={() => phase === "dock" && setOpen(true)}
      onMouseLeave={() => {
        if (phase === "dock") {
          setOpen(false);
          setHovered(null);
        }
      }}
      className="fixed left-0 right-0 bottom-0 z-30 flex justify-center items-center"
      style={{ height: deckHeight }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          animate={{
            opacity: phase === "dock" ? 0 : 1,
            y: phase === "stack" ? 0 : -20,
          }}
          transition={{ duration: 0.5 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-center"
        >
          <div
            className="tracking-[0.5em] text-[10px] opacity-60"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--surface-muted)",
            }}
          >
            {phase === "stack" ? "SHUFFLING THE DECK" : "DRAW A CARD"}
          </div>
        </motion.div>

        {cards.map((c, i) => {
          const t = transforms(i);
          return (
            <Card
              key={c.id}
              src={c.image}
              label={c.label}
              x={t.x}
              y={t.y}
              rotate={t.rotate}
              scale={t.scale}
              width={t.width}
              height={t.height}
              z={i}
              interactive={phase === "dock"}
              isHovered={hovered === i}
              onHover={(h) => setHovered(h ? i : null)}
              onTap={() => onSelect(c.id)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
