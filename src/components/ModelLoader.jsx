// src/components/ModelLoader.jsx
import React, { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

import models from "../data/models.json";
import { assetUrl } from "../utils/assetUrl.js";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: ModelLoader.jsx
 *
 * Carga un GLB (modelo principal del visor) y lo prepara para mostrarse:
 * - Clona la escena para evitar efectos colaterales
 * - Centra el modelo usando BoundingBox
 * - Escala automático en base al tamaño del modelo
 * - Ajusta cámara y parámetros básicos
 *
 * Extra:
 * - Detecta materiales "montura" vs "lentes" y los guarda en userData
 *   para poder editarlos desde ThreeDScene (cambio de color, etc.)
 *
 * Compatible con:
 * - Desarrollo local (Node)
 * - Despliegue en Liferay DXP (Client Extension)
 */
const ModelLoader = forwardRef(function ModelLoader({ modelPath }, ref) {
    const { scene } = useGLTF(modelPath);
    const { camera } = useThree();

    const container = useMemo(() => {
        /* ----------------- CONTENEDOR BASE ----------------- */
        const group = new THREE.Group();

        // Clonamos el GLB para trabajar sobre una copia segura
        const root = scene.clone(true);
        group.add(root);

        /* ----------------- DETECCIÓN DE MATERIALES ----------------- */
        // Separación aproximada: lentes (transparentes / "vidrio") vs montura (resto)
        const frameMaterials = [];
        const lensMaterials = [];

        root.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return;

            const m = obj.material;

            const isLens =
                (m.transparent && m.opacity < 1) ||
                m.transmission > 0 ||
                (m.roughness < 0.4 && m.metalness < 0.2);

            if (isLens) lensMaterials.push(m);
            else frameMaterials.push(m);
        });

        // Guardamos los materiales para que el controlador de color los encuentre fácil
        group.userData.frameMaterials = frameMaterials;
        group.userData.lensMaterials = lensMaterials;

        /* ----------------- CENTRADO + ESCALADO ----------------- */
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Centramos el modelo en el origen
        root.position.sub(center);

        // Escalado uniforme en base al mayor eje
        const biggest = Math.max(size.x, size.y, size.z);
        const factor = 5 / biggest;
        group.scale.setScalar(factor);

        /* ----------------- ORIENTACIÓN + CÁMARA ----------------- */
        group.rotation.set(-0.05, 0, 0);

        camera.position.set(0, 0, 8);
        camera.near = 0.1;
        camera.far = 50;
        camera.updateProjectionMatrix();

        return group;
    }, [scene, camera]);

    // El ref apunta al modelo final (group)
    return <primitive ref={ref} object={container} />;
});

/* ----------------- PRELOAD (mejor UX) ----------------- */
// Precarga modelos del catálogo principal para que el visor responda rápido
models.forEach((m) => {
    useGLTF.preload(assetUrl(`glb_models/${m.file}`));
});

export default ModelLoader;
