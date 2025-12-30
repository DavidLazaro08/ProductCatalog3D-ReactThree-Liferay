/**
 * Registro del Custom Element para el VISOR 3D
 */

import initClarityApp from '../src/index.js';

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: assets/index.js
 *
 * Registro del Custom Element <clarity-3d-viewer>.
 * Punto de entrada para Liferay DXP.
 *
 * Responsabilidad:
 * - Define el Web Component
 * - Inyecta la app React dentro del elemento
 *
 * Compatible con:
 * - Desarrollo local (Node)
 * - Despliegue en Liferay DXP (Client Extension)
 */

class Clarity3DViewer extends HTMLElement {
	connectedCallback() {
		console.log("Custom element VISOR conectado");
		initClarityApp(this);
	}

	disconnectedCallback() {
		this.innerHTML = '';
	}
}

const ELEMENT_NAME = 'clarity-3d-viewer';

if (!customElements.get(ELEMENT_NAME)) {
	customElements.define(ELEMENT_NAME, Clarity3DViewer);
}
