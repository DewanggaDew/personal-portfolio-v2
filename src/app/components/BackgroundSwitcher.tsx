import { motion } from "motion/react";
import { backgrounds, type BgKey } from "../surfaces";

interface Props {
  current: BgKey;
  onChange: (k: BgKey) => void;
}

export function BackgroundSwitcher({ current, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="fixed top-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md bg-white/5 ring-1 ring-white/10"
    >
      <span
        className="text-[9px] tracking-[0.3em] uppercase opacity-60"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Surface
      </span>
      <div className="h-3 w-px bg-white/15" />
      {(Object.keys(backgrounds) as BgKey[]).map((k) => {
        const b = backgrounds[k];
        const active = k === current;
        return (
          <button
            key={k}
            onClick={() => onChange(k)}
            title={b.label}
            aria-label={`Switch surface to ${b.label}`}
            aria-pressed={active}
            className="relative group"
          >
            <span
              className="block h-5 w-5 rounded-full ring-1 ring-white/20 transition-transform"
              style={{
                background: b.swatch,
                transform: active ? "scale(1.15)" : "scale(1)",
                boxShadow: active ? "0 0 0 2px rgba(255,255,255,0.6)" : "none",
              }}
            />
          </button>
        );
      })}
    </motion.div>
  );
}
