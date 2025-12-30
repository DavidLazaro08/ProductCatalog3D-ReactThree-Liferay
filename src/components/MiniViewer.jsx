// src/components/MiniViewer.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import MiniModel from "./MiniModel.jsx";

import "../styles/miniViewer.css";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: MiniViewer.jsx
 *
 * Tarjeta de catálogo con mini visor 3D interactivo.
 * Se utiliza en la galería principal para:
 * - Mostrar una vista previa del modelo
 * - Mantener interacción básica (rotación)
 * - Permitir la selección del modelo para abrir el visor completo
 *
 * Características:
 * - Hover visual controlado por estado (evita scrolls fantasma)
 * - Loader mientras carga el modelo 3D
 * - Uso de MiniModel para centrar, escalar y fijar cámara
 *
 * Compatible con:
 * - Desarrollo local (Node)
 * - Despliegue en Liferay DXP (Client Extension)
 */
export default function MiniViewer({ model, onSelect }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="fade-in-wrapper">
            <div
                className={`mini-card ${isHovered ? "is-hovered" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Loader mientras se inicializa el Canvas */}
                {!isLoaded && (
                    <div className="mini-loader">
                        <div className="mini-spinner"></div>
                    </div>
                )}

                {/* Zona del mini visor 3D */}
                <div className="mini-canvas-area">
                    <Canvas
                        camera={{ position: [0, 0, 3.2], fov: 40 }}
                        onCreated={() => setIsLoaded(true)}
                    >
                        <ambientLight intensity={0.9} />
                        <directionalLight position={[5, 5, 5]} intensity={1.1} />

                        <MiniModel file={model.file} />

                        <OrbitControls enableZoom={false} enablePan={false} />
                    </Canvas>
                </div>

                {/* Footer con información básica del modelo */}
                <button
                    className={`mini-footer ${isHovered ? "is-hovered" : ""}`}
                    onClick={() => {
                        console.log("MiniViewer → click:", model);
                        onSelect(model);
                    }}
                >
                    <span className="mini-title">{model.name}</span>

                    <span className="mini-stats">
                        <span>👁 {model.views.toLocaleString()}</span>
                        <span>💬 {model.comments}</span>
                        <span>★ {model.likes}</span>
                    </span>
                </button>
            </div>
        </div>
    );
}