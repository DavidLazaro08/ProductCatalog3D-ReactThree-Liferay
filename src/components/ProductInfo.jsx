// src/components/ProductInfo.jsx
import React from "react";

import MiniThumb3D from "./MiniThumb3D.jsx";

import models from "../data/models.json";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: ProductInfo.jsx
 *
 * Panel de información lateral (sidebar).
 * Muestra:
 * - Especificaciones del modelo (specs)
 * - Estadísticas (views / comments / likes)
 * - Tags
 * - Mini-galería de otros modelos (thumbnails 3D)
 *
 * Nota:
 * - "sidebarOnly" queda como flag por si más adelante se reutiliza
 *   este panel en otra vista.
 */
export default function ProductInfo({ model, sidebarOnly = false }) {
    if (!model) return null;

    return (
        <div className="sidebar-content">
            {/* ESPECIFICACIONES TÉCNICAS */}
            {model.specs && (
                <div className="sidebar-section">
                    <h3 className="sidebar-subtitle">Especificaciones</h3>

                    <ul className="specs-list">
                        {Object.entries(model.specs).map(([key, value]) => (
                            <li key={key}>
                                <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </strong>{" "}

                                {/* Si es array → chips, si no → texto normal */}
                                {Array.isArray(value) ? (
                                    <span className="spec-features">
                                        {value.map((f) => (
                                            <span key={f} className="tag-pill">
                                                {f}
                                            </span>
                                        ))}
                                    </span>
                                ) : (
                                    value
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* ESTADÍSTICAS */}
            <div className="sidebar-section">
                <h3 className="sidebar-subtitle">Estadísticas</h3>

                <div className="sidebar-stats">
                    <span>👁 {model.views.toLocaleString()}</span>
                    <span>💬 {model.comments}</span>
                    <span>★ {model.likes}</span>
                </div>
            </div>

            {/* TAGS */}
            <div className="sidebar-section">
                <h3 className="sidebar-subtitle">Tags</h3>

                <div className="sidebar-tags">
                    {model.tags?.map((tag) => (
                        <span key={tag} className="tag-pill">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* MINI-GALERÍA DE OTROS MODELOS */}
            <div className="sidebar-section">
                <h3 className="sidebar-subtitle">Otros modelos</h3>

                <div className="sidebar-gallery">
                    {models.slice(0, 2).map((m) => (
                        <MiniThumb3D
                            key={m.id}
                            file={m.file}
                            onClick={() => console.log("Abrir", m.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}