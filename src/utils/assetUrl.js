// src/utils/assetUrl.js

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: assetUrl.js
 *
 * Utilidad para resolver rutas de assets (GLB, HDRI, imágenes, SVG, etc.)
 * de forma compatible con:
 * - Desarrollo local (Node / npm start)
 * - Despliegue en Liferay DXP (Client Extension)
 *
 * Objetivo:
 * - Evitar rutas hardcodeadas
 * - Detectar automáticamente si estamos en Liferay
 * - Calcular la base real desde la que se está sirviendo el bundle
 *
 * Este enfoque evita problemas típicos de:
 * - IDs dinámicos de client-extension
 * - Cambios de contexto (/o/XXXX/)
 * - Diferencias entre DEV y producción
 */

export function assetUrl(relativePath) {
  // Normalizamos la ruta (sin / inicial)
  const cleanPath = relativePath.startsWith("/")
      ? relativePath.slice(1)
      : relativePath;

  // Detectamos si estamos en entorno Liferay
  const isLiferay =
      typeof window !== "undefined" &&
      (typeof window.Liferay !== "undefined" ||
          typeof window.themeDisplay !== "undefined");

  /* ============================================================
     DESARROLLO LOCAL (npm start)
     ============================================================ */
  if (!isLiferay) {
    // En local, los assets se sirven directamente desde /
    return `/${cleanPath}`;
  }

  /* ============================================================
     LIFERAY DXP (Client Extension)
     ============================================================ */

  // Buscamos el script real cargado por Liferay (index.js)
  // Esto permite calcular la base correcta aunque el ID cambie
  const scripts = Array.from(document.scripts || []);

  const liferayScript = scripts
      .map((s) => s.src)
      .find(
          (src) =>
              src &&
              src.includes("/o/") &&
              src.includes("index")
      );

  // Fallback: si no encontramos el script (caso raro)
  // usamos el friendlyURLMapping por defecto
  if (!liferayScript) {
    return `/o/clarity-3d-viewer/${cleanPath}`;
  }

  /* ============================================================
     RESOLUCIÓN DE BASE REAL
     ============================================================ */

  // Caso habitual:
  // /o/xxxx/static/index.js  → base = /o/xxxx/static/
  if (liferayScript.includes("/static/")) {
    const base = liferayScript.substring(
        0,
        liferayScript.lastIndexOf("/static/") + 1
    );

    return `${base}${cleanPath}`;
  }

  // Caso alternativo:
  // /o/xxxx/index.js → base = /o/xxxx/
  const base = liferayScript.substring(
      0,
      liferayScript.lastIndexOf("/") + 1
  );

  return `${base}${cleanPath}`;
}
