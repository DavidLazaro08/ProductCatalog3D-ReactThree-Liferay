// src/components/MiniThumb3D.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MiniModel from "./MiniModel.jsx";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: MiniThumb3D.jsx
 *
 * Thumbnail 3D interactivo.
 * Pensado para:
 * - Vistas previas pequeñas
 * - Galerías secundarias
 * - Selectores de modelo / variante
 *
 * Usa MiniModel internamente para:
 * - Centrado
 * - Escalado automático
 * - Cámara fija
 */
export default function MiniThumb3D({ file, onClick }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            onClick={onClick}
            style={{
                width: "75px",
                height: "75px",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#f5f5f5",
                boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                cursor: "pointer",
            }}
        >
            {!loaded && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        opacity: 0.4,
                    }}
                >
                    loading...
                </div>
            )}

            <Canvas
                camera={{ position: [0, 0, 3], fov: 40 }}
                onCreated={() => setLoaded(true)}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                <MiniModel file={file} />

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}
