import { motion, useMotionValue, useTransform } from "motion/react";

interface CardProps {
  src: string;
  label: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  width: number;
  height: number;
  z: number;
  interactive: boolean;
  isHovered: boolean;
  onHover: (h: boolean) => void;
  onTap: () => void;
}

export function Card({
  src,
  label,
  x,
  y,
  rotate,
  scale,
  width,
  height,
  z,
  interactive,
  isHovered,
  onHover,
  onTap,
}: CardProps) {
  const dragX = useMotionValue(0);
  const dragTilt = useTransform(dragX, [-300, 0, 300], [-15, 0, 15]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.6 }}
      animate={{
        opacity: 1,
        x,
        y: y + (isHovered ? -50 : 0),
        rotate: isHovered ? rotate * 0.4 : rotate,
        scale: isHovered ? scale * 1.18 : scale,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      style={{ zIndex: isHovered ? 50 : z }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        drag={interactive}
        dragSnapToOrigin
        dragElastic={0.7}
        dragTransition={{ bounceStiffness: 220, bounceDamping: 18 }}
        onTap={interactive ? onTap : undefined}
        onHoverStart={() => interactive && onHover(true)}
        onHoverEnd={() => interactive && onHover(false)}
        whileDrag={interactive ? { scale: 1.15, cursor: "grabbing" } : undefined}
        style={{
          x: dragX,
          rotate: dragTilt,
          cursor: interactive ? "grab" : "default",
          pointerEvents: interactive ? "auto" : "none",
        }}
        className="relative select-none touch-none focus:outline-none"
      >
        <motion.div
          animate={{ width, height }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
          className="relative rounded-lg overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
        >
          <img
            src={src}
            alt={label}
            draggable={false}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover pointer-events-none"
          />
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 flex items-start justify-center pt-3 pointer-events-none"
          >
            <span
              className="text-[10px] tracking-[0.35em] uppercase font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "rgba(0,0,0,0.55)" }}
            >
              {label}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
