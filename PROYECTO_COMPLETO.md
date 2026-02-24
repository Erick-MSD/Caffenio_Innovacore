# 🎯 PROYECTO CAFFENIO - RESUMEN COMPLETO

## 📋 Especificaciones Técnicas

### **LENGUAJE:**
- **FRONTEND:** React + Electron
- **BACKEND:** API .NET Framework C#

### **MOTOR DE BASE DE DATOS:**
- **Microsoft SQL Server**

---

## 📁 Estructura del Proyecto

```
Caffenio_Innovacore/
│
├── 📂 frontend/                    # Aplicación de escritorio (Electron + React)
│   ├── electron/                  # Configuración de Electron
│   ├── src/                       # Código React
│   │   ├── pages/                # Páginas de la aplicación
│   │   ├── components/           # Componentes reutilizables
│   │   └── App.jsx               # Router principal
│   ├── assets/                    # Recursos (fuentes, imágenes)
│   ├── package.json               # Dependencias PNPM
│   ├── README.md                  # 📖 Documentación completa
│   └── START_HERE.md              # 👈 EMPIEZA AQUÍ (Frontend)
│
├── 📂 backend/                     # API REST (.NET C#)
│   ├── Caffenio.API/              # Proyecto Web API
│   │   ├── Controllers/          # Endpoints HTTP
│   │   ├── Models/               # Entidades del dominio
│   │   ├── DTOs/                 # Data Transfer Objects
│   │   ├── Services/             # Lógica de negocio
│   │   ├── Repositories/         # Acceso a datos
│   │   ├── Middleware/           # Middleware personalizado
│   │   └── appsettings.json      # Configuración (SQL Server)
│   ├── Caffenio.sln               # Solución .NET
│   ├── README.md                  # 📖 Documentación completa
│   ├── START_HERE.md              # 👈 EMPIEZA AQUÍ (Backend)
│   ├── GUIA_RAPIDA.md             # Guía paso a paso
│   └── CHECKLIST.md               # Tareas organizadas
│
└── README.md                       # 📄 Documentación principal (este archivo)
```

---

## 🚀 INICIO RÁPIDO

### 👨‍💻 Para el Desarrollador Frontend

**1. Navegar a la carpeta:**
```bash
cd frontend
```

**2. Instalar dependencias:**
```bash
pnpm install
```

**3. Ejecutar aplicación:**
```bash
pnpm run electron:dev
```

✅ **Se abrirá una ventana de Electron con la aplicación corriendo.**

📖 **Documentación:** [frontend/START_HERE.md](frontend/START_HERE.md)

---

### 👨‍💻 Para el Desarrollador Backend

**1. Navegar a la carpeta:**
```bash
cd backend/Caffenio.API
```

**2. Ejecutar API:**
```bash
dotnet run
```

✅ **La API estará corriendo en https://localhost:5001**

📖 **Documentación:** [backend/START_HERE.md](backend/START_HERE.md)

---

## 🔌 Conexión Frontend ↔ Backend

| Componente | URL | Puerto |
|------------|-----|--------|
| **Frontend (Dev)** | http://localhost:5173 | 5173 |
| **Backend (API)** | https://localhost:5001 | 5001 |

✅ **CORS ya está configurado** - El frontend puede hacer requests al backend sin problemas.

### Ejemplo de llamada desde React:
```javascript
const response = await fetch('https://localhost:5001/api/health');
const data = await response.json();
console.log(data); // { Status: "Healthy", ... }
```

---

## 🗄️ Base de Datos (SQL Server)

### Requisitos:
1. **SQL Server** instalado (Express o Developer - ambos gratis)
2. **Entity Framework Core** instalado en el proyecto backend

### Instalación de EF Core:
```bash
cd backend/Caffenio.API
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

### Connection String (ya configurado en `appsettings.json`):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CaffenioDB;Integrated Security=true;TrustServerCertificate=True;"
  }
}
```

### Crear base de datos (cuando implementes DbContext):
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## 📚 Documentación Disponible

| Archivo | Descripción | Para quién |
|---------|-------------|------------|
| **[README.md](README.md)** | Documentación principal del proyecto | Todos |
| **[frontend/START_HERE.md](frontend/START_HERE.md)** | 🎯 Inicio rápido frontend | Frontend Dev |
| **[frontend/README.md](frontend/README.md)** | Documentación completa frontend | Frontend Dev |
| **[backend/START_HERE.md](backend/START_HERE.md)** | 🎯 Inicio rápido backend | Backend Dev |
| **[backend/README.md](backend/README.md)** | Documentación completa backend | Backend Dev |
| **[backend/GUIA_RAPIDA.md](backend/GUIA_RAPIDA.md)** | Guía paso a paso backend | Backend Dev |
| **[backend/CHECKLIST.md](backend/CHECKLIST.md)** | Lista de tareas | Backend Dev |

---

## 🎨 Recursos del Proyecto

### **Fuentes**
**Gilroy** (ubicación: `frontend/assets/fonts/`)
- Light (300), Regular (400), Medium (500)
- SemiBold (600), Bold (700), ExtraBold (800)

### **Logo**
`frontend/assets/images/logo.png`

### **Colores**
- Fondo: `#E1E1E1`
- Tarjetas: `#FFFFFF` (blanco)

---

## ✅ Lo que YA está hecho

### Frontend ✅
- [x] Proyecto Electron + React configurado
- [x] Vite con hot reload
- [x] Tailwind CSS instalado y configurado
- [x] React Router configurado
- [x] Fuentes Gilroy incluidas
- [x] Pantalla Home como ejemplo
- [x] Estructura de carpetas organizada
- [x] Documentación completa

### Backend ✅
- [x] Proyecto .NET 9 Web API configurado
- [x] CORS configurado para frontend
- [x] Estructura MVC organizada
- [x] Ejemplos de código (Models, Controllers, DTOs)
- [x] SQL Server connection string configurado
- [x] Endpoint de prueba (`/api/health`)
- [x] Documentación completa

### General ✅
- [x] `.gitignore` configurado (protege secretos)
- [x] Estructura de carpetas profesional
- [x] Documentación separada por componente

---

## 🔜 Por Implementar

### Frontend
- [ ] Página de Login
- [ ] Catálogo de productos
- [ ] Carrito de compras
- [ ] Historial de pedidos
- [ ] Perfil de usuario
- [ ] Sistema de notificaciones

### Backend
- [ ] Base de datos con Entity Framework Core
- [ ] Autenticación JWT
- [ ] Controladores (Products, Orders, Users)
- [ ] Servicios de lógica de negocio
- [ ] Repositories para acceso a datos
- [ ] Validaciones con FluentValidation
- [ ] Logging avanzado
- [ ] Tests unitarios

---

## 🛠️ Herramientas Necesarias

### Para Todos
- [x] **Git** - Control de versiones
- [x] **Visual Studio Code** - Editor recomendado

### Para Frontend
- [x] **Node.js** (incluye npm)
- [x] **PNPM** (`npm install -g pnpm`)

### Para Backend
- [x] **.NET 9 SDK** - [Descargar](https://dotnet.microsoft.com/download)
- [ ] **SQL Server** - [Descargar Express](https://www.microsoft.com/sql-server/sql-server-downloads)
- [ ] **SQL Server Management Studio (SSMS)** - [Descargar](https://learn.microsoft.com/sql/ssms/download-sql-server-management-studio-ssms) (opcional pero recomendado)

---

## 🎯 Flujo de Trabajo Recomendado

### Desarrollo Diario (Full Stack)

**Terminal 1 - Frontend:**
```bash
cd frontend
pnpm run electron:dev
```
Deja esta terminal abierta. Hot reload automático.

**Terminal 2 - Backend:**
```bash
cd backend/Caffenio.API
dotnet run
```
Deja esta terminal abierta. La API estará disponible.

Ahora puedes desarrollar ambos simultáneamente y ver los cambios en tiempo real.

---

## 🔒 Seguridad

### ⚠️ NO SUBIR A GIT:
- `appsettings.Development.json`
- `appsettings.Production.json`
- `.env.local`
- Archivos con contraseñas o API keys
- `node_modules/`
- `bin/`, `obj/`

✅ **El `.gitignore` ya está configurado para proteger estos archivos.**

---

## 📞 Contacto y Soporte

### Problemas Comunes

**Frontend no inicia:**
```bash
cd frontend
rm -rf node_modules
pnpm install
```

**Backend no compila:**
```bash
cd backend/Caffenio.API
dotnet clean
dotnet restore
dotnet build
```

**SQL Server no conecta:**
- Verifica que SQL Server esté corriendo
- Revisa la connection string
- Prueba conectarte con SSMS

---

## 🏁 Empezar a Trabajar

### 👨‍💻 Frontend Developer
1. Ve a [frontend/START_HERE.md](frontend/START_HERE.md)
2. Sigue los pasos
3. ¡Empieza a programar!

### 👨‍💻 Backend Developer
1. Ve a [backend/START_HERE.md](backend/START_HERE.md)
2. Sigue los pasos
3. ¡Empieza a programar!

---

## 🎉 ¡TODO ESTÁ LISTO!

El proyecto está **100% configurado** y listo para desarrollo.

**Documenta tus cambios.** ✍️  
**Haz commits frecuentes.** 💾  
**Pregunta cuando tengas dudas.** 🙋  

---

**Proyecto Caffenio - Innovation Meet Up 2026**

¡Buena suerte! 🚀
