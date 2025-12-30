// src/components/icons.jsx
import React from "react";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: icons.jsx
 *
 * Iconos SVG como componentes React.
 * Se usan principalmente en el panel lateral (SidePanel).
 *
 * Ventajas:
 * - Sin dependencias externas
 * - SVG inline (escala perfecta)
 * - Heredan color vía `currentColor`
 *
 * Compatible con:
 * - Desarrollo local (Node)
 * - Despliegue en Liferay DXP (Client Extension)
 */

export const IconScene = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.6"
    >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
    </svg>
);

export const IconModel = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.8"
    >
        <rect x="4" y="7" width="16" height="10" rx="3" />
        <path d="M9 17v2h6v-2" />
    </svg>
);

export const IconColor = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.6"
    >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3-7 8-7s8 3 8 7" />
    </svg>
);

export const IconInfo = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.6"
    >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M12 5h0.01" />
    </svg>
);
