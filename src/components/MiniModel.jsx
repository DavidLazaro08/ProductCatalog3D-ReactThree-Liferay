// src/components/MiniModel.jsx
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { assetUrl } from "../utils/assetUrl.js";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: MiniModel.jsx
 *
 * Modelo 3D reducido para tarjetas de galería (mini visor).
 * Se encarga de:
 * - Cargar el GLB
 * - Centrarlo automáticamente
 * - Escalarlo de forma uniforme
 * - Ajustar una cámara fija
 *
 * Pensado para:
 * - Vistas previas (cards)
 * - Buen rendimiento
 * - Coherencia visual entre modelos de distinto tamaño
 */
export default function MiniModel({ file }) {
    const { scene } = useGLTF(assetUrl(`glb_models/${file}`));
    const { camera } = useThree();

    const container = useMemo(() => {
        // Contenedor principal
        const wrapper = new THREE.Group();

        // Clonar GLB (evita modificar el original)
        const root = scene.clone(true);
        wrapper.add(root);

        // 1) Bounding box
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // 2) Centrado
        root.position.sub(center);

        // 3) Escalado uniforme automático
        const factor = 2.4 / Math.max(size.x, size.y, size.z);
        wrapper.scale.setScalar(factor);

        // 4) Orientación global (ligera inclinación estética)
        wrapper.rotation.set(-0.05, 0, 0);

        // 5) Cámara fija para mini visor
        camera.position.set(0, 0, 4.4);
        camera.near = 0.1;
        camera.far = 30;
        camera.updateProjectionMatrix();

        return wrapper;
    }, [scene, camera]);

    return <primitive object={container} />;
}
