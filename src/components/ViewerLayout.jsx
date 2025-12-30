// src/components/ViewerLayout.jsx
import React, { useEffect, useState } from "react";

import ThreeDScene from "./ThreeDScene.jsx";
import ProductInfo from "./ProductInfo.jsx";
import SidePanel from "./SidePanel.jsx";

import { assetUrl } from "../utils/assetUrl.js";

import "../styles/viewerOverlay.css";
import "../styles/sidePanel.css";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: ViewerLayout.jsx
 *
 * Layout del visor avanzado (overlay):
 * - Fondo con backdrop + panel central
 * - Visor 3D a la izquierda
 * - Info y detalles a la derecha
 * - SidePanel con controles (autorotate, fondo, luz ambiente)
 *
 * Compatible con:
 * - Desarrollo local (Node)
 * - Despliegue en Liferay DXP (Client Extension)
 */
export default function ViewerLayout({ model, onBack }) {
    if (!model) return null;

    const modelPath = assetUrl(`glb_models/${model.file}`);

    const [panelOpen, setPanelOpen] = useState(false);

    const [settings, setSettings] = useState({
        autoRotate: false,
        bgColor: "#f0f0f0",
        ambientIntensity: 0.6,
    });

    /* ----------------- EVENTOS ----------------- */
    useEffect(() => {
        const h = (e) => setSettings((s) => ({ ...s, autoRotate: e.detail }));
        window.addEventListener("clarity-toggle-autorotate", h);
        return () => window.removeEventListener("clarity-toggle-autorotate", h);
    }, []);

    useEffect(() => {
        const h = (e) => setSettings((s) => ({ ...s, bgColor: e.detail }));
        window.addEventListener("clarity-change-bgcolor", h);
        return () => window.removeEventListener("clarity-change-bgcolor", h);
    }, []);

    useEffect(() => {
        const h = (e) =>
            setSettings((s) => ({ ...s, ambientIntensity: e.detail }));
        window.addEventListener("clarity-change-ambient", h);
        return () => window.removeEventListener("clarity-change-ambient", h);
    }, []);

    return (
        <div className="viewer-overlay">
            <div className="viewer-backdrop" onClick={onBack} />

            <div className="viewer-panel">
                {/* TOPBAR */}
                <div className="viewer-topbar">
                    <img
                        src={assetUrl("clarity/logo-full-name-vector.svg")}
                        className="viewer-logo"
                        alt="Clarity"
                    />
                    <button className="viewer-close" onClick={onBack}>
                        ✕
                    </button>
                </div>

                <div className="viewer-grid">
                    {/* VISOR */}
                    <div className="viewer-3d">
                        {/* PANEL LATERAL + BOTÓN */}
                        <div
                            className={`clarity-sidepanel-container ${
                                panelOpen ? "open" : ""
                            }`}
                        >
                            {/* Botón */}
                            <button
                                className="clarity-sidepanel-toggle"
                                onClick={() => setPanelOpen(!panelOpen)}
                            >
                                <div className="clarity-toggle-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </button>

                            {/* Panel */}
                            <aside className="clarity-sidepanel">
                                <SidePanel />
                            </aside>
                        </div>

                        {/* ⭐ SOLO ESTO SE MUEVE AL ABRIR EL PANEL ⭐ */}
                        <div
                            className={`scene-wrapper ${
                                panelOpen ? "shifted" : ""
                            }`}
                        >
                            <ThreeDScene
                                modelPath={modelPath}
                                autoRotate={settings.autoRotate}
                                bgColor={settings.bgColor}
                                ambientIntensity={settings.ambientIntensity}
                            />
                        </div>
                    </div>

                    {/* DERECHA INFO */}
                    <div className="viewer-sidebar">
                        <ProductInfo model={model} />
                    </div>

                    {/* TEXTOS INFERIORES */}
                    <div className="viewer-info-main">
                        <h2 className="info-title">{model.name}</h2>
                        <p className="info-desc">{model.description}</p>

                        {model.price && (
                            <p className="info-price">
                                Precio: {model.price} €
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
