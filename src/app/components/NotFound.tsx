import { type CSSProperties } from "react";
import { m } from "motion/react";
import { backgrounds } from "../surfaces";

type SurfaceVars = CSSProperties & {
  "--surface-text": string;
  "--surface-muted": string;
  "--surface-rule": string;
};

export default function NotFound() {
  const theme = backgrounds.felt;

  const surfaceStyle: SurfaceVars = {
    backgroundColor: theme.base,
    color: theme.text,
    fontFamily: "var(--font-body)",
    "--surface-text": theme.text,
    "--surface-muted": theme.muted,
    "--surface-rule": `${theme.muted}55`,
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden transition-colors duration-700"
      style={surfaceStyle}
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: theme.spotlight }}
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.6) 1px, transparent 1px), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "3px 3px, 5px 5px",
        }}
      />

      {/* scanlines */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <m.main
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="glitch-wrap" aria-hidden="false">
          <span className="glitch-text" data-text="404">
            404
          </span>
          <span className="glitch-text glitch-text--r" aria-hidden="true">
            404
          </span>
          <span className="glitch-text glitch-text--g" aria-hidden="true">
            404
          </span>
          <span className="glitch-text glitch-text--b" aria-hidden="true">
            404
          </span>
        </div>

        <p
          className="mt-8 text-[10px] md:text-xs tracking-[0.5em] uppercase text-center"
          style={{ fontFamily: "var(--font-display)", color: theme.muted }}
        >
          Signal lost: page not found
        </p>

        <a
          href="/"
          className="mt-10 inline-flex items-center gap-3 px-6 py-3 text-[10px] md:text-xs tracking-[0.4em] uppercase transition-colors duration-300 hover:opacity-70"
          style={{
            fontFamily: "var(--font-display)",
            color: theme.text,
            border: `1px solid ${theme.muted}55`,
          }}
        >
          <span aria-hidden="true">←</span>
          Return home
        </a>
      </m.main>

      <footer
        className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 py-8 flex justify-between items-center text-[10px] tracking-[0.4em]"
        style={{ fontFamily: "var(--font-display)", color: theme.muted }}
      >
        <span>ERROR / 404</span>
        <span>{new Date().getFullYear()}</span>
      </footer>

      <style>{`
        .glitch-wrap {
          position: relative;
          display: inline-block;
          line-height: 1;
          font-family: var(--font-hero);
          font-size: clamp(8rem, 28vw, 22rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          color: ${theme.text};
        }

        .glitch-text {
          display: block;
          position: relative;
        }

        .glitch-text--r,
        .glitch-text--g,
        .glitch-text--b {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
        }

        .glitch-text--r {
          color: #ff2d55;
          animation: glitch-r 2.6s infinite steps(1);
        }
        .glitch-text--g {
          color: #00ffd1;
          animation: glitch-g 2.6s infinite steps(1);
        }
        .glitch-text--b {
          color: #4d6bff;
          animation: glitch-b 3.1s infinite steps(1);
        }

        @keyframes glitch-r {
          0%, 100%  { transform: translate(0, 0); clip-path: inset(0 0 0 0); }
          10%       { transform: translate(-3px, 1px); clip-path: inset(12% 0 70% 0); }
          22%       { transform: translate(4px, -2px); clip-path: inset(40% 0 35% 0); }
          38%       { transform: translate(-2px, 2px); clip-path: inset(70% 0 8% 0); }
          55%       { transform: translate(3px, 0); clip-path: inset(20% 0 55% 0); }
          72%       { transform: translate(-4px, 1px); clip-path: inset(60% 0 25% 0); }
          88%       { transform: translate(2px, -1px); clip-path: inset(5% 0 80% 0); }
        }

        @keyframes glitch-g {
          0%, 100%  { transform: translate(0, 0); clip-path: inset(0 0 0 0); }
          12%       { transform: translate(2px, -1px); clip-path: inset(55% 0 30% 0); }
          26%       { transform: translate(-3px, 2px); clip-path: inset(8% 0 78% 0); }
          44%       { transform: translate(3px, 1px); clip-path: inset(35% 0 50% 0); }
          60%       { transform: translate(-2px, -2px); clip-path: inset(72% 0 12% 0); }
          78%       { transform: translate(4px, 0); clip-path: inset(18% 0 60% 0); }
          92%       { transform: translate(-2px, 1px); clip-path: inset(45% 0 40% 0); }
        }

        @keyframes glitch-b {
          0%, 100%  { transform: translate(0, 0); clip-path: inset(0 0 0 0); }
          15%       { transform: translate(-2px, 2px); clip-path: inset(30% 0 50% 0); }
          33%       { transform: translate(3px, -2px); clip-path: inset(65% 0 18% 0); }
          50%       { transform: translate(-3px, 1px); clip-path: inset(10% 0 75% 0); }
          68%       { transform: translate(2px, 2px); clip-path: inset(48% 0 35% 0); }
          85%       { transform: translate(-4px, -1px); clip-path: inset(78% 0 8% 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .glitch-text--r,
          .glitch-text--g,
          .glitch-text--b {
            animation: none;
            opacity: 0.35;
          }
        }
      `}</style>
    </div>
  );
}
