# Caffenio Frontend

Frontend de la aplicación Caffenio desarrollado con **Electron + React**.

---

## 🚀 Tecnologías

- **React 18** - Framework de UI
- **Electron** - Desktop application framework
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Router** - Navegación entre páginas
- **PNPM** - Package manager (rápido y eficiente)

---

## 📦 Instalación

### 1. Instalar PNPM (si no lo tienes)
```bash
npm install -g pnpm
```

### 2. Instalar dependencias
```bash
cd frontend
pnpm install
```

---

## 💻 Desarrollo

### Ejecutar en modo desarrollo
```bash
pnpm run electron:dev
```

Este comando iniciará:
1. **Vite dev server** en http://localhost:5173 (React con hot reload)
2. **Electron** (ventana de escritorio)

**Recomendación:** Deja esta terminal abierta mientras desarrollas. Los cambios se reflejarán automáticamente.

---

## 🏗️ Build

### Crear aplicación de producción
```bash
pnpm run electron:build
```

Esto generará:
- Instalador de Windows (`.exe`)
- Archivos en la carpeta `dist/` y `out/`

---

## 📁 Estructura del Proyecto

```
frontend/
├── electron/              # Proceso principal de Electron
│   ├── main.js           # Configuración de la ventana
│   └── preload.js        # Script de precarga
│
├── src/                  # Código fuente de React
│   ├── pages/           # Páginas de la aplicación
│   │   └── Home.jsx     # Página de inicio
│   ├── components/      # Componentes reutilizables (por crear)
│   ├── App.jsx          # Componente raíz
│   ├── main.jsx         # Punto de entrada de React
│   └── index.css        # Estilos globales + Tailwind
│
├── assets/              # Recursos estáticos
│   ├── fonts/          # Fuentes Gilroy
│   └── images/         # Imágenes y logo
│
├── index.html          # HTML base
├── package.json        # Dependencias y scripts
├── vite.config.js      # Configuración de Vite
└── tailwind.config.js  # Configuración de Tailwind
```

---

## 🎨 Fuentes

El proyecto usa la familia de fuentes **Gilroy** (ya incluida en `assets/fonts/`):

| Peso | Archivo |
|------|---------|
| 300 | Gilroy-Light.ttf |
| 400 | Gilroy-Regular.ttf |
| 500 | Gilroy-Medium.ttf |
| 600 | Gilroy-SemiBold.ttf |
| 700 | Gilroy-Bold.ttf |
| 800 | Gilroy-ExtraBold.ttf |

Uso en Tailwind:
```jsx
<h1 className="font-gilroy font-medium">Texto Medium</h1>
<h1 className="font-gilroy font-semibold">Texto SemiBold</h1>
```

---

## 🎨 Diseño

### Paleta de Colores
- **Fondo principal:** `#E1E1E1` (gris claro)
- **Tarjetas:** `#FFFFFF` (blanco)
- **Texto:** Gris oscuro por defecto

En Tailwind:
```jsx
<div className="bg-caffenio-bg">  {/* #E1E1E1 */}
```

### Componentes de Ejemplo

**Pantalla Home** (`src/pages/Home.jsx`):
- Logo en esquina superior izquierda
- Título con fuentes Gilroy (Medium + SemiBold)
- Dos tarjetas interactivas con hover effects

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm run dev              # Solo Vite (navegador)
pnpm run electron:dev     # Electron + Vite (recomendado)

# Build
pnpm run build            # Build de React
pnpm run electron:build   # Build de la aplicación Electron

# Preview
pnpm run preview          # Vista previa del build
```

---

## 🌐 Comunicación con Backend

El frontend se comunica con el backend a través de:

**Backend API:** `https://localhost:5001`

### Ejemplo de llamada a la API:

```javascript
// En un componente React
const fetchData = async () => {
  try {
    const response = await fetch('https://localhost:5001/api/health');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 📱 Páginas Implementadas

✅ **Home** (`/`) - Pantalla de inicio
- Identificarse con la App
- Realizar pedido sin identificarse

🔜 **Por implementar:**
- Login
- Catálogo de productos
- Carrito de compras
- Historial de pedidos

---

## 🛠️ Agregar Nueva Página

1. **Crear el componente** en `src/pages/`:

```jsx
// src/pages/Products.jsx
function Products() {
  return (
    <div className="min-h-screen bg-caffenio-bg">
      <h1>Productos</h1>
    </div>
  );
}

export default Products;
```

2. **Agregar ruta** en `src/App.jsx`:

```jsx
import Products from './pages/Products';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
</Routes>
```

3. **Navegar** desde otro componente:

```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/products');
```

---

## 🎯 Tips de Desarrollo

### ✅ **DO's (Haz esto)**
1. Usa **Tailwind CSS** para estilos (ya configurado)
2. Crea **componentes reutilizables** en `src/components/`
3. Usa **React Router** para navegación
4. Mantén el estado local con `useState`
5. Usa `useEffect` para efectos secundarios
6. Sigue la estructura de carpetas existente

### ❌ **DON'Ts (Evita esto)**
1. No uses CSS inline excesivamente
2. No hagas fetch directo en el render
3. No dupliques código - crea componentes
4. No ignores las warnings de React

---

## 🔥 Tailwind CSS - Guía Rápida

```jsx
// Layout
<div className="flex justify-center items-center">
<div className="grid grid-cols-2 gap-4">

// Spacing
<div className="p-4 m-2">     {/* padding, margin */}
<div className="px-6 py-8">   {/* padding x/y */}

// Typography
<h1 className="text-3xl font-bold">
<p className="text-gray-600">

// Colors
<div className="bg-white text-gray-800">
<div className="bg-caffenio-bg">  {/* Custom color */}

// Hover & Effects
<button className="hover:shadow-lg transition-all">
<div className="hover:scale-105 transform">

// Responsive
<div className="text-xl md:text-3xl">  {/* Mobile y Desktop */}
```

---

## 🐛 Debugging

### En Electron:
Las DevTools se abren automáticamente en desarrollo.

**Shortcuts:**
- **Ctrl + Shift + I** - Abrir DevTools
- **Ctrl + R** - Recargar
- **F5** - Reload (en VS Code con debugging)

### En React:
Instala [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

---

## 📚 Recursos Útiles

### Documentación Oficial
- [React Docs](https://react.dev)
- [Electron Docs](https://www.electronjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)

### Tutoriales
- [React Tutorial](https://react.dev/learn)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)
- [Electron + React Guide](https://www.electronjs.org/docs/latest/tutorial/tutorial-react)

---

## 🆘 Problemas Comunes

### Error: "Port 5173 already in use"
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Error: "Cannot find module"
```bash
pnpm install
```

### Cambios no se reflejan
- Asegúrate de que `pnpm run electron:dev` esté corriendo
- Guarda los archivos (Ctrl + S)
- Si persiste, reinicia el servidor

---

## ✉️ Contacto

Si tienes dudas o problemas:
1. Revisa esta documentación
2. Pregunta al equipo
3. Revisa los issues en el repositorio

---

**Proyecto desarrollado para Caffenio como parte del IMU**

¡Feliz coding! 🚀
