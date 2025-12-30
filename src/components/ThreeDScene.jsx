// src/components/ThreeDScene.jsx
import React, { useEffect, useRef } from "react";

import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as THREE from "three";

import ModelLoader from "./ModelLoader.jsx";
import { assetUrl } from "../utils/assetUrl.js";

/* ============================================================
   HDRI / ENVIRONMENT (fondo + reflections)
   ============================================================ */

function EnvironmentController({ bgColor }) {
    const { scene, gl } = useThree();

    // Cargamos el HDRI
    const hdri = useLoader(RGBELoader, assetUrl("hdri/campo.hdr"));

    useEffect(() => {
        if (!hdri) return;

        // HDRI como equirectangular
        hdri.mapping = THREE.EquirectangularReflectionMapping;

        // Generador PMREM para convertirlo en envMap
        const pmrem = new THREE.PMREMGenerator(gl);
        const envMap = pmrem.fromEquirectangular(hdri).texture;

        // Si el usuario NO ha cambiado el fondo → mostramos el HDRI
        if (bgColor === "#f0f0f0") {
            scene.background = envMap;
        } else {
            // Si ha cambiado el color → forzar color liso
            scene.background = new THREE.Color(bgColor);
        }

        // Siempre usamos HDRI como environment para materiales metálicos
        scene.environment = envMap;

        return () => {
            pmrem.dispose();
        };
    }, [hdri, bgColor, scene, gl]);

    return null;
}

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: ThreeDScene.jsx
 *
 * Canvas principal del visor 3D.
 * - Renderiza el modelo GLB
 * - OrbitControls (autorotate opcional)
 * - HDRI + environment para reflejos
 * - Permite cambiar el color de la montura vía CustomEvent
 *
 * Compatible con:
 * - Desarrollo local (Node)
 * - Despliegue en Liferay DXP (Client Extension)
 */
export default function ThreeDScene({
                                        modelPath,
                                        autoRotate,
                                        bgColor = "#f0f0f0",
                                        ambientIntensity = 0.6,
                                    }) {
    const modelRef = useRef(null);

    /* ============================================================
       Color dinámico: SOLO a la montura
       ============================================================ */
    useEffect(() => {
        const handleColor = (e) => {
            const color = e.detail;

            if (!modelRef.current) return;

            const frames = modelRef.current.userData.frameMaterials || [];

            frames.forEach((mat) => {
                mat.color.set(color);
                mat.needsUpdate = true;
            });
        };

        window.addEventListener("clarity-change-framecolor", handleColor);
        return () =>
            window.removeEventListener("clarity-change-framecolor", handleColor);
    }, []);

    return (
        <div className="three-d-scene" style={{ width: "100%", height: "100%" }}>
            <Canvas camera={{ position: [5, 5, 5], fov: 45 }}
                    gl={{ alpha: false, antialias: true }}>
                {/* Controlador HDRI (fondo + environment) */}
                <EnvironmentController bgColor={bgColor} />

                {/* Luz ambiental */}
                <ambientLight intensity={ambientIntensity} />

                {/* Luz direccional */}
                <directionalLight position={[10, 10, 5]} intensity={1.2} />

                {/* Modelo */}
                <ModelLoader modelPath={modelPath} ref={modelRef} />

                {/* Controles */}
                <OrbitControls
                    enablePan={false}
                    autoRotate={autoRotate}
                    autoRotateSpeed={1.2}
                />
            </Canvas>
        </div>
    );
}