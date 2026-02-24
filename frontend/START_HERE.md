# 🎨 START HERE - Frontend Developer

## 👋 Bienvenido al Frontend de Caffenio

Tu aplicación de escritorio con **Electron + React + Tailwind CSS**.

---

## ⚡ Inicio Rápido (5 minutos)

### **1. Instalar PNPM** (si no lo tienes)
```bash
npm install -g pnpm
```

### **2. Instalar dependencias**
```bash
cd frontend
pnpm install
```

### **3. Ejecutar la aplicación**
```bash
pnpm run electron:dev
```

✅ **¡Listo!** Se abrirá una ventana de Electron con tu aplicación corriendo.

---

## 🎯 Lo que ya está hecho (por ti)

✅ **Electron + React** configurado y funcionando  
✅ **Vite** para desarrollo rápido con hot reload  
✅ **Tailwind CSS** instalado y configurado  
✅ **React Router** para navegación entre páginas  
✅ **Fuentes Gilroy** incluidas y listas para usar  
✅ **Logo** y assets organizados  
✅ **Pantalla Home** como ejemplo  
✅ **CORS** listo para conectar con el backend  

---

## 📁 Estructura de Archivos

```
frontend/
├── src/                    # 💻 Tu código React
│   ├── pages/             # Páginas de la app
│   │   └── Home.jsx       # 👈 Pantalla de inicio (ejemplo)
│   ├── components/        # Componentes reutilizables (créalos aquí)
│   ├── App.jsx            # Componente raíz con rutas
│   ├── main.jsx           # Punto de entrada
│   └── index.css          # Estilos globales
│
├── electron/               # ⚡ Configuración de Electron
│   ├── main.js            # Ventana principal
│   └── preload.js         # Script de precarga
│
├── assets/                # 🎨 Recursos
│   ├── fonts/            # Fuentes Gilroy
│   └── images/           # Logo y otras imágenes
│
└── package.json          # Dependencias y scripts
```

---

## 🚀 Desarrollo Diario

### **Modo desarrollo** (recomendado)
```bash
pnpm run electron:dev
```

Esto iniciará:
1. **Vite dev server** con hot reload (cambios instantáneos)
2. **Electron** (ventana de escritorio)

Los cambios que hagas se verán automáticamente. **Deja esta terminal abierta.**

---

## 🎨 Crear Nueva Página

### **1. Crea el archivo** en `src/pages/`

```jsx
// src/pages/Products.jsx
function Products() {
  return (
    <div className="min-h-screen bg-caffenio-bg p-8">
      <h1 className="text-3xl font-gilroy font-bold">Productos</h1>
      {/* Tu contenido aquí */}
    </div>
  );
}

export default Products;
```

### **2. Agrega la ruta** en `src/App.jsx`

```jsx
import Products from './pages/Products';

// Dentro de <Routes>
<Route path="/products" element={<Products />} />
```

### **3. Navega** desde otro componente

```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/products')}>
      Ir a Productos
    </button>
  );
}
```

---

## 🎨 Usar Tailwind CSS

Ya está configurado. Usa clases directamente:

```jsx
// Botón con estilo
<button className="bg-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
  Click me
</button>

// Layout con grid
<div className="grid grid-cols-2 gap-4">
  <div>Columna 1</div>
  <div>Columna 2</div>
</div>

// Responsive
<div className="text-xl md:text-3xl">  {/* Mobile y Desktop */}
```

**Documentación:** https://tailwindcss.com/docs

---

## 📡 Conectar con Backend

### **Hacer una petición a la API:**

```jsx
import { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://localhost:5001/api/health')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return <div>{data ? 'Backend conectado ✅' : 'Cargando...'}</div>;
}
```

**URL del Backend:** https://localhost:5001

---

## 🎨 Fuentes Gilroy

Ya están incluidas. Usa estas clases:

```jsx
<h1 className="font-gilroy font-light">     // 300
<h1 className="font-gilroy font-normal">    // 400
<h1 className="font-gilroy font-medium">    // 500
<h1 className="font-gilroy font-semibold">  // 600
<h1 className="font-gilroy font-bold">      // 700
<h1 className="font-gilroy font-extrabold"> // 800
```

---

## 🎨 Colores del Proyecto

Ya configurados en Tailwind:

```jsx
<div className="bg-caffenio-bg">  {/* #E1E1E1 - Fondo */}
<div className="bg-white">        {/* Blanco - Tarjetas */}
<p className="text-gray-800">     {/* Texto oscuro */}
```

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
pnpm run electron:dev     # 👈 Usa este normalmente

# Solo React (en navegador)
pnpm run dev              # Para debug web

# Build de producción
pnpm run electron:build   # Crea instalador .exe

# Instalar nueva dependencia
pnpm add <package-name>

# Eliminar dependencia
pnpm remove <package-name>
```

---

## 🔥 Tips Importantes

### ✅ **DO's (Haz esto)**
1. Usa **Tailwind CSS** para todos los estilos
2. Crea **componentes reutilizables** en `src/components/`
3. Mantén las **páginas** en `src/pages/`
4. Usa **React Router** para navegación (no cambies URL manualmente)
5. Guarda frecuentemente (Ctrl + S) - Hot reload automático
6. Usa las **fuentes Gilroy** como en el diseño

### ❌ **DON'Ts (Evita esto)**
1. **No** uses CSS tradicional (archivos .css separados) - usa Tailwind
2. **No** hagas `fetch` dentro del render - usa `useEffect`
3. **No** modifies archivos en `electron/` sin saber qué haces
4. **No** ignores las warnings de React en la consola

---

## 🐛 Debugging

### **DevTools ya están abiertas** en desarrollo

**Shortcuts:**
- **Ctrl + Shift + I** - Abrir/cerrar DevTools
- **Ctrl + R** - Recargar la ventana
- **F12** - Abrir DevTools

### **Console.log es tu amigo:**
```jsx
console.log('Valor:', miVariable);
```

---

## 📚 Recursos de Aprendizaje

### React
- [React Docs (oficial)](https://react.dev/learn)
- [React Tutorial interactivo](https://react.dev/learn/tutorial-tic-tac-toe)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

### React Router
- [React Router Docs](https://reactrouter.com/en/main)

---

## 🎯 Tu Primera Tarea

Sugerencia para empezar:

1. **Abre** `src/pages/Home.jsx` y revisa el código
2. **Modifica** el texto del título
3. **Guarda** y ve el cambio automático en Electron
4. **Crea** una nueva página (ej: Login.jsx)
5. **Agrégale** una ruta en App.jsx
6. **Navega** a ella desde Home

---

## 🆘 Problemas Comunes

### **Error: "Port 5173 already in use"**
```bash
# Cierra el proceso anterior o usa otro terminal
# Windows: Busca procesos en puerto 5173
netstat -ano | findstr :5173
taskkill /PID <numero> /F
```

### **Cambios no se ven**
- Guarda el archivo (Ctrl + S)
- Revisa que `pnpm run electron:dev` esté corriendo
- Recarga con Ctrl + R si es necesario

### **Error de módulo no encontrado**
```bash
pnpm install
```

---

## ✅ Checklist Inicial

- [ ] Ejecuté `pnpm install`
- [ ] Ejecuté `pnpm run electron:dev` y funciona
- [ ] Vi la pantalla Home en Electron
- [ ] Abrí DevTools (Ctrl + Shift + I)
- [ ] Modifiqué algo en Home.jsx y vi el cambio
- [ ] Revisé la estructura de carpetas
- [ ] Leí cómo usar Tailwind CSS
- [ ] Entiendo cómo crear nuevas páginas

---

## 🚀 ¡A Programar!

Ya tienes todo listo. El proyecto está configurado y funcionando.

**Tu siguiente paso:**
1. Revisa `src/pages/Home.jsx` para entender la estructura
2. Crea tus propias páginas
3. Usa Tailwind para los estilos
4. Conecta con el backend cuando esté listo

📖 **Si necesitas más detalles:** Lee [README.md](./README.md)

---

**¡Feliz coding! 🎉**

_Si tienes dudas, pregunta al equipo._
