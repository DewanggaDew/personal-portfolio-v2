import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card } from "./Card";
import { cards, type SectionId } from "../content";

interface CardDeckProps {
  onSelect: (id: SectionId) => void;
  onReady?: () => void;
}

type Phase = "stack" | "fan" | "dock";

const FAN_POSITIONS = [
  { x: -260, rotate: -10 },
  { x: -90, rotate: -3.5 },
  { x: 90, rotate: 3.5 },
  { x: 260, rotate: 10 },
] as const;

const DOCK_POSITIONS = [
  { x: -210, rotate: -8 },
  { x: -70, rotate: -3 },
  { x: 70, rotate: 3 },
  { x: 210, rotate: 8 },
] as const;

const DECK_HEIGHT = 320;

export function CardDeck({ onSelect, onReady }: CardDeckProps) {
  const [phase, setPhase] = useState<Phase>("stack");
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
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

  const transforms = (i: number) => {
    if (phase === "stack") {
      return {
        x: 0,
        y: 0,
        rotate: -3 + i * 2,
        scale: 1,
        width: 220,
        height: 308,
      };
    }
    if (phase === "fan") {
      const f = FAN_POSITIONS[i]!;
      return {
        x: f.x,
        y: 0,
        rotate: f.rotate,
        scale: 1,
        width: 220,
        height: 308,
      };
    }
    const d = DOCK_POSITIONS[i]!;
    return {
      x: d.x,
      y: 0,
      rotate: d.rotate,
      scale: 1,
      width: 190,
      height: 266,
    };
  };

  const centeredY = -((vh - DECK_HEIGHT) / 2);
  const targetY = phase === "dock" ? (open ? 20 : 180) : centeredY;

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
      style={{ height: DECK_HEIGHT }}
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
