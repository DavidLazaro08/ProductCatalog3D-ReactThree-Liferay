// src/pages/App.jsx
import React, { useState } from "react";

import GalleryBase from "./GalleryBase.jsx";
import ViewerLayout from "../components/ViewerLayout.jsx";

import modelsPage1 from "../data/models.json";
import modelsPage2 from "../data/models_page2.json";

/**
 * Clarity 3D Viewer
 * -----------------
 * Archivo: App.jsx
 *
 * Componente raíz de la aplicación.
 * Controla la navegación entre páginas de galería y el modelo seleccionado.
 *
 * Compatible con:
 * - Desarrollo local (Node)
 * - Despliegue en Liferay DXP (Client Extension)
 */
export default function App() {
    const [selectedModel, setSelectedModel] = useState(null);
    const [page, setPage] = useState(1);

    const models = page === 1 ? modelsPage1 : modelsPage2;

    return (
        <div className="clarityRoot">
            <GalleryBase
                models={models}
                page={page}
                onSelectModel={setSelectedModel}
                onNextPage={() => setPage(2)}
                onPrevPage={() => setPage(1)}
            />

            {selectedModel && (
                <ViewerLayout
                    model={selectedModel}
                    onBack={() => setSelectedModel(null)}
                />
            )}
        </div>
    );
}
