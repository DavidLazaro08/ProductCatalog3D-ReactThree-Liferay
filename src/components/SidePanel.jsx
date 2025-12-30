// src/components/SidePanel.jsx
import React, { useState } from "react";

import { IconColor, IconInfo, IconModel, IconScene } from "./icons.jsx";

import "../styles/sidePanel.css";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: SidePanel.jsx
 *
 * Panel lateral del visor:
 * - Tabs (Escena / Modelo / Colores / Info)
 * - Emite eventos CustomEvent para controlar el visor 3D desde ViewerLayout
 *
 * Compatible con:
 * - Desarrollo local (Node)
 * - Despliegue en Liferay DXP (Client Extension)
 */
export default function SidePanel() {
    const [activeTab, setActiveTab] = useState("world");
    const [autoRotate, setAutoRotate] = useState(false);

    // Paleta de colores (montura)
    const FRAME_COLORS = [
        "#1c1c1c",
        "#455a64",
        "#3f51b5",
        "#8d6e63",
        "#ffffff",
        "#bdbdbd",
    ];

    const toggleTab = (tab) => setActiveTab(tab);

    const toggleAutoRotate = () => {
        const newValue = !autoRotate;
        setAutoRotate(newValue);

        window.dispatchEvent(
            new CustomEvent("clarity-toggle-autorotate", { detail: newValue })
        );
    };

    /* ----------------- EVENTOS (visor) ----------------- */
    const changeBg = (color) => {
        window.dispatchEvent(
            new CustomEvent("clarity-change-bgcolor", { detail: color })
        );
    };

    const changeFrameColor = (hex) => {
        window.dispatchEvent(
            new CustomEvent("clarity-change-framecolor", { detail: hex })
        );
    };

    return (
        <div className="sidepanel-wrapper">
            {/* TABS */}
            <section className="sidepanel-tabs-row">
                <button
                    className={activeTab === "world" ? "active" : ""}
                    onClick={() => toggleTab("world")}
                >
                    <IconScene /> <span>Escena</span>
                </button>

                <button
                    className={activeTab === "model" ? "active" : ""}
                    onClick={() => toggleTab("model")}
                >
                    <IconModel /> <span>Modelo</span>
                </button>

                <button
                    className={activeTab === "colors" ? "active" : ""}
                    onClick={() => toggleTab("colors")}
                >
                    <IconColor /> <span>Colores</span>
                </button>

                <button
                    className={activeTab === "info" ? "active" : ""}
                    onClick={() => toggleTab("info")}
                >
                    <IconInfo /> <span>Info</span>
                </button>
            </section>

            {/* CONTENIDO - Solo renderiza la pestaña activa */}
            <section className="sidepanel-content">
                {/* ESCENA */}
                {activeTab === "world" && (
                    <div className="panel-section">
                        <h3 className="sr-only">Escena</h3>

                        <p className="panel-hint">Fondo:</p>

                        <input
                            type="color"
                            className="color-picker-full"
                            onChange={(e) => changeBg(e.target.value)}
                        />
                    </div>
                )}

                {/* MODELO */}
                {activeTab === "model" && (
                    <div className="panel-section">
                        <h3 className="sr-only">Modelo</h3>

                        <button
                            className="btn-autorotate"
                            onClick={toggleAutoRotate}
                        >
                            {autoRotate
                                ? "Desactivar auto-rotación"
                                : "Activar auto-rotación"}
                        </button>
                    </div>
                )}

                {/* COLORES */}
                {activeTab === "colors" && (
                    <div className="panel-section">
                        <h3 className="sr-only">Colores</h3>
                        <p className="panel-hint">Color de montura:</p>

                        <div className="grid-3cols">
                            {FRAME_COLORS.map((color) => (
                                <div
                                    key={color}
                                    className="color-swatch"
                                    style={{ background: color }}
                                    onClick={() => changeFrameColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* INFO */}
                {activeTab === "info" && (
                    <div className="panel-section">
                        <h3 className="sr-only">Ayuda</h3>

                        <ul className="panel-list">
                            <li>Arrastra: rota</li>
                            <li>Rueda: zoom</li>
                            <li>Pestañas: personaliza</li>
                        </ul>
                    </div>
                )}
            </section>
        </div>
    );
}
