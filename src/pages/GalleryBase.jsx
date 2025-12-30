// src/pages/GalleryBase.jsx
import React, { useEffect, useRef, useState } from "react";

import MiniViewer from "../components/MiniViewer.jsx";
import { assetUrl } from "../utils/assetUrl.js";

import "../styles/clarityBackground.css";
import "../styles/miniViewer.css";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: GalleryBase.jsx
 *
 * Página de galería (catálogo) con fondo animado y grid de modelos.
 * Permite cambiar de página y seleccionar un modelo para abrir el visor.
 *
 * Compatible con:
 * - Desarrollo local (Node)
 * - Despliegue en Liferay DXP (Client Extension)
 */
export default function GalleryBase({
                                        models,
                                        onSelectModel,
                                        onNextPage,
                                        onPrevPage,
                                        page,
                                    }) {
    const rootRef = useRef(null);

    const [taglineIndex, setTaglineIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const taglines = [
        "3D Interactive Catalog.",
        "See Beyond.",
        "Vision Meets Innovation.",
        "Designed for Clarity.",
        "3D Eyewear Reinvented."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);

            setTimeout(() => {
                setTaglineIndex((prev) => (prev + 1) % taglines.length);
                setFade(false);
            }, 400);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const el = rootRef.current;
            if (!el) return;

            const x = (e.clientX - window.innerWidth / 2) * 0.015;
            const y = (e.clientY - window.innerHeight / 2) * 0.015;

            el.style.setProperty("--px", `${x}px`);
            el.style.setProperty("--py", `${y}px`);
        };

        // Parallax suave según posición del ratón
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div ref={rootRef} className="clarity-page">
            {/* Fondo (burbujas + parallax) */}
            <div
                className="clarity-bg-layer bubbles-bg parallax-shift"
                aria-hidden="true"
            >
                <div className="bubble-1"></div>
                <div className="bubble-2"></div>
                <div className="bubble-3"></div>
            </div>

            {/* Contenido */}
            <div className="bubbles-content">
                {/* Paginación */}
                <div className="clarity-pagination">
                    <div
                        className={`clarity-dot ${page === 1 ? "active" : ""}`}
                        onClick={() => page === 2 && onPrevPage()}
                        style={{ pointerEvents: page === 1 ? "none" : "auto" }}
                    ></div>

                    <div
                        className={`clarity-dot ${page === 2 ? "active" : ""}`}
                        onClick={() => page === 1 && onNextPage()}
                        style={{ pointerEvents: page === 2 ? "none" : "auto" }}
                    ></div>
                </div>

                {/* Cabecera */}
                <header>
                    <div className="clarity-badge">
                        <img
                            src={assetUrl("clarity/logo-c-square.svg")}
                            alt="Clarity Logo"
                        />
                        Clarity Vision Lab
                    </div>

                    <h1>Catálogo Clarity</h1>

                    <div
                        id="clarity-tagline"
                        className="clarity-tagline"
                        style={{ opacity: fade ? 0 : 1 }}
                    >
                        {taglines[taglineIndex]}
                    </div>

                    <p className="clarity-description">
                        Explora nuestra colección de monturas en 3D real. Selecciona un
                        modelo para verlo en detalle en el visor avanzado y
                        simular su presentación dentro del portal Clarity.
                    </p>
                </header>

                {/* Grid */}
                <div className="clarity-grid">
                    {models.map((model) => (
                        <MiniViewer
                            key={model.id}
                            model={model}
                            onSelect={onSelectModel}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
