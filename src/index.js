// src/index.js

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./pages/App.jsx";

// CSS global del viewer
import "./styles/clarityBackground.css";
import "./styles/miniViewer.css";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: index.js
 *
 * Punto de entrada de React.
 * Monta la app en:
 * - Un contenedor recibido (Custom Element / Liferay)
 * - O #root (modo Node / demo local)
 *
 * Nota:
 * Mantenemos una única raíz React para evitar recrearla si init se llama
 * más de una vez (por ejemplo, si el custom element se reconecta).
 */

// Mantiene una única raíz React (evita recrearla si init se llama más de una vez)
let root = null;

/* ===============================
   Init
   =============================== */

/**
 * initViewerApp(container?)
 * - Si Liferay pasa un contenedor, montamos ahí.
 * - Si no, usamos #root (modo Node / demo local).
 */
export default function initViewerApp(container) {
    const rootElement = container ?? document.getElementById("root");

    if (!rootElement) {
        console.error("Clarity 3D: no se encontró contenedor (#root o container).");
        return;
    }

    // Si ya existe root, reutilizamos. Si no, lo creamos.
    root = root ?? createRoot(rootElement);

    root.render(<App />);
}
