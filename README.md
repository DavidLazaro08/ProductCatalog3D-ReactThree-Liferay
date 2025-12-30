# <img width="25" height="25" alt="Catalogo" src="https://github.com/user-attachments/assets/190c44a7-4e96-46c8-bc1c-cffd85915805" /> ProductCatalog3D-ReactThree-Liferay

Catálogo de productos **3D interactivo** desarrollado con **React** y **Three.js**, diseñado para funcionar tanto en **entorno Node (desarrollo/local)** como desplegado como **Client Extension en Liferay DXP**.

El proyecto presenta un sistema completo de visualización 3D de productos, con mini-visores normalizados y un visor principal avanzado, manteniendo coherencia visual independientemente del modelo 3D utilizado.

![Vista general](./screenshots/cab_readme.png)

---

## <img width="20" height="20" alt="Descripción" src="https://github.com/user-attachments/assets/d6b53e03-c4fb-49b1-9bc8-20af54d777e2" /> Descripción general

Este proyecto implementa un **sistema completo de catálogo 3D**, aplicado en este caso a monturas de gafas, que incluye:

- Grid de **mini-visores 3D** para navegación por catálogo.
- **Visor 3D principal** para inspección detallada del producto.
- Sistema automático de **normalización de modelos GLB**:
  - Centrado inteligente
  - Escalado automático
  - Corrección de orientación  
  Esto permite incorporar nuevos modelos sin ajustes manuales.
- Interfaz moderna y limpia con:
  - Estética tipo *glassmorphism*
  - Efectos hover
  - Diseño modular y escalable
- Panel lateral interactivo:
  - Control de escena
  - Control de modelo
  - Personalización de colores
  - Ayuda de uso

El resultado es una base sólida, reutilizable y extensible para **catálogos de producto 3D en entornos corporativos**.

---

## <img width="20" height="20" alt="Tecnologia" src="https://github.com/user-attachments/assets/12559971-46be-4064-9fd4-8b07f494e6aa" /> Tecnologías utilizadas

- **React**
- **Three.js**
- **JavaScript (ES6+)**
- **Webpack**
- **Node.js**
- **Liferay DXP (Client Extensions)**

---

## <img width="20" height="20" alt="Ejecucion" src="https://github.com/user-attachments/assets/ddaff5a0-f1a6-465c-9d13-6d83bb40d101" /> Ejecución en Node (desarrollo / demo local)

El proyecto puede ejecutarse como "aplicación React estándar" y de forma independiente en un entorno local.

### Requisitos previos

- **Node.js** (versión LTS recomendada)

### Instalación

```bash
npm install
```

### Ejecución

```bash
npm start
```

La aplicación estará disponible en:

```
http://localhost:3000
```

Esta modalidad es ideal para:

- Revisión rápida
- Demostraciones
- Desarrollo y pruebas visuales

---

## <img width="20" height="20" alt="Release" src="https://github.com/user-attachments/assets/fa1c0990-a566-4376-a6f5-5a696d69af9a" /> Release oficial (Client Extension para Liferay)

Además del código fuente, el proyecto dispone de una **Release oficial** que incluye el **ZIP final ya empaquetado**, listo para desplegar directamente en **Liferay DXP**.

👉 **Recomendado** si solo se desea probar o desplegar el visor sin necesidad de construir el proyecto.

- El ZIP **no forma parte del código fuente**
- Se distribuye mediante la sección **Releases** del repositorio  
👉 [Descargar Release v2025.12.30](https://github.com/DavidLazaro08/ProductCatalog3D-ReactThree-Liferay/releases/tag/v2025.12.30)

- Corresponde a la **versión final validada** tanto en Node.js como en Liferay DXP

---

## <img width="20" height="20" alt="Capturas" src="https://github.com/user-attachments/assets/eea4fb95-9434-4db9-9009-0e9feeb863cf" /> Despliegue en Liferay DXP (Client Extension)

El proyecto está preparado para funcionar como **Client Extension** dentro de un **workspace de Liferay DXP**.

### Opción A — Usando el ZIP de la Release (recomendada)

1. Descargar el ZIP desde la sección **Releases** del repositorio:

👉 https://github.com/DavidLazaro08/ProductCatalog3D-ReactThree-Liferay/releases/tag/v2025.12.30

2. Copiar el archivo ZIP en la ruta:

```text
liferay-workspace/bundles/osgi/modules
```
3. Iniciar Liferay (auto-deploy).

No es necesario ejecutar Node ni realizar procesos de build adicionales.

-----------------
### Opción B — Generar el ZIP manualmente

Pensado para quien desee revisar o reconstruir el artefacto final.

```bash
npm install
npm run build
```
A continuación, generar el ZIP de la Client Extension según el flujo habitual de Liferay.

---

## <img width="20" height="20" alt="image" src="https://github.com/user-attachments/assets/cefc4a34-c7ca-487d-9cef-bbc7651d6363" /> Notas de diseño

Arquitectura pensada para integración en portales corporativos:

- Separación clara entre:
  - Lógica 3D
  - Interfaz de usuario
  - Datos
- Comunicación desacoplada mediante Custom Events
- Preparado para:
  - Añadir nuevos productos
  - Integrar datos dinámicos
  - Escalar a otros contextos (catálogos técnicos, e-commerce, etc.)

---

## <img width="20" height="20" alt="Contexto" src="https://github.com/user-attachments/assets/3a8384cf-5085-46e7-b694-fd50c850e384" /> Contexto del proyecto

Este proyecto se desarrolló inicialmente en un contexto de **formación corporativa y experimentación técnica**, con el objetivo de integrar **visualización 3D avanzada** dentro de **Liferay DXP** mediante **Client Extensions**.

Durante el desarrollo:

- El proyecto funcionó inicialmente **solo en entorno Node.js**.
- Posteriormente se adaptó y validó para funcionar **simultáneamente** en:
  - Ejecución local (**Node.js**)
  - Despliegue real como **Client Extension en Liferay DXP**

El repositorio actual representa la **versión unificada y final**, compatible con ambos entornos.

---

## <img width="20" height="20" alt="Capturas" src="https://github.com/user-attachments/assets/eea4fb95-9434-4db9-9009-0e9feeb863cf" /> Capturas

### Catálogo

![Catálogo](./screenshots/catalogo.png)

### Visor 3D

![Visor 3D](./screenshots/visor3d.png)

### Integración en Liferay

![Integración en Liferay](./screenshots/liferay1.png)
![Integración en Liferay2](./screenshots/liferay2.png)
---

## <img width="20" height="20" alt="Autores" src="https://github.com/user-attachments/assets/324dc210-5510-4329-b878-84ec229b65bd" /> Autores

**David Gutiérrez**  
GitHub: [https://github.com/DavidLazaro08](https://github.com/DavidLazaro08)

**Miguel Benjumea**  
GitHub: [https://github.com/Benemerito86](https://github.com/Benemerito86)

---

## <img width="20" height="20" alt="image" src="https://github.com/user-attachments/assets/61e0e0cf-7e67-4b78-9c2d-952a341b86ce" /> Licencia

Proyecto compartido con fines educativos, demostrativos y de portfolio.
