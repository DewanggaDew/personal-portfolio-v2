import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import NotFound from "./app/components/NotFound";
import "./styles/index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found in index.html");
}

const isRoot = window.location.pathname === "/" || window.location.pathname === "";

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    {isRoot ? <App /> : <NotFound />}
  </React.StrictMode>,
);
