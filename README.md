# Caffenio Innovacore

Sistema de pedidos Caffenio desarrollado con React + Electron.

## 🚀 Tecnologías

- **React 18** - Framework de UI
- **Electron** - Desktop application framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navegación
- **PNPM** - Package manager

## 📦 Instalación

```bash
pnpm install
```

## 💻 Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
pnpm run electron:dev
```

Este comando iniciará:
1. El servidor de desarrollo de Vite (React)
2. La aplicación de Electron

## 🏗️ Build

Para crear la aplicación de producción:

```bash
pnpm run electron:build
```

## 📁 Estructura del Proyecto

```
Caffenio_Innovacore/
├── electron/          # Proceso principal de Electron
├── src/              # Código fuente de React
│   ├── pages/       # Páginas de la aplicación
│   ├── App.jsx      # Componente principal
│   └── main.jsx     # Punto de entrada
├── assets/          # Recursos estáticos
│   ├── css/
│   ├── fonts/       # Fuentes Gilroy
│   └── images/
└── dist/            # Build de producción
```

## 🎨 Fuentes

El proyecto usa la familia de fuentes **Gilroy** con los siguientes pesos:
- Light (300)
- Regular (400)
- Medium (500)
- SemiBold (600)
- Bold (700)
- ExtraBold (800)

## 🔧 Scripts Disponibles

- `pnpm run dev` - Servidor de desarrollo Vite
- `pnpm run build` - Build de producción
- `pnpm run electron:dev` - Desarrollo con Electron
- `pnpm run electron:build` - Build de la aplicación Electron

---

Proyecto desarrollado para **Caffenio** como parte del **IMU**.
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
├── .github/
│   └── workflows/   # CI/CD
├── README.md
└── docs/
    └── arquitectura.md
```

### Descripción de Carpetas Clave

* **services/**: contiene todos los microservicios del backend.
* **controllers/**: manejo de peticiones HTTP.
* **routes/**: definición de endpoints.
* **models/**: esquemas y modelos de MongoDB.
* **services/**: lógica de negocio.
* **middlewares/**: validaciones, autenticación, etc.
* **tests/**: pruebas unitarias del servicio.
* **frontend/**: aplicación web (React o Astro).
* **.github/workflows/**: pipelines de CI/CD.
* **docs/**: documentación adicional del proyecto.

Esta estructura permite mantener el proyecto ordenado y facilita la colaboración y el mantenimiento a largo plazo.

---

Este documento sirve como base inicial y podrá ajustarse conforme avance el desarrollo del proyecto.
