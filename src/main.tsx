import React from "react";
import ReactDOM from "react-dom/client";
import { LazyMotion, domMax } from "motion/react";
import App from "./app/App";
import NotFound from "./app/components/NotFound";
import "./styles/index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found in index.html");
}

const isRoot = window.location.pathname === "/" || window.location.pathname === "";

// Load Motion's feature set once for the whole tree so components import the
// lightweight `m` component instead of the full `motion` bundle. domMax (not
// domAnimation) because the card deck uses drag/gesture features.
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <LazyMotion features={domMax}>
      {isRoot ? <App /> : <NotFound />}
    </LazyMotion>
  </React.StrictMode>,
);
