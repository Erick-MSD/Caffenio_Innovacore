# ☕ Caffenio Innovacore

Sistema de gestión para cafetería con arquitectura moderna: Backend .NET + Frontend React + Electron.

## 🚀 Inicio Rápido (Un Solo Comando)

### Prerequisitos:
- ✅ Docker Desktop instalado y corriendo
- ✅ Node.js 18+ (solo para el frontend)

### Levantar Backend + Base de Datos:

```powershell
docker-compose up -d --build
```

**Eso es todo.** Este comando levanta:
- 🗄️ SQL Server 2022 Express
- 📊 Base de datos con tablas y datos de ejemplo
- 🚀 Backend API .NET 9

### Verificar que todo funcione:

```powershell
# Ver estado
docker-compose ps

# Probar el backend
Invoke-RestMethod -Uri "http://localhost:5000/api/health"
```

Deberías ver:
```json
{
  "Status": "Healthy",
  "Database": {
    "Status": "Connected",
    "Connected": true
  }
}
```

### Frontend (opcional):

```powershell
cd frontend
pnpm install
pnpm dev
```

El frontend abre en: `http://localhost:5173`

---

## 📚 Documentación

- **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** - Guía de inicio rápido completa
- **[DATABASE_DOCKER.md](DATABASE_DOCKER.md)** - Todo sobre la base de datos
- **[backend/START_HERE.md](backend/START_HERE.md)** - Desarrollo del backend
- **[frontend/START_HERE.md](frontend/START_HERE.md)** - Desarrollo del frontend

---

## 🏗️ Arquitectura

```
Caffenio_Innovacore/
├─ backend/            # API .NET 9 + Entity Framework
├─ frontend/           # React + Vite + Electron
├─ db-init/            # Scripts SQL de inicialización
├─ docker-compose.yml  # Configuración Docker
└─ README.md
```

---

## 🔐 Credenciales (Desarrollo)

```
Backend:     http://localhost:5000
Database:    localhost,1433
DB Name:     caffenio_innovacore
Username:    sa
Password:    CaffenioSecure2024!
```

⚠️ **Cambiar en producción**

---

## 🐳 Comandos Docker

```powershell
# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f backend
docker-compose logs -f sqlserver

# Reiniciar
docker-compose restart

# Detener
docker-compose down

# Reiniciar desde cero (borra datos)
docker-compose down -v
docker-compose up -d --build
```

---

## 👥 Trabajo en Equipo

Cada desarrollador tiene su propia base de datos local en Docker.

**Para sincronizar:**
```powershell
git pull
docker-compose down -v
docker-compose up -d --build
```

Más info: [DATABASE_DOCKER.md](DATABASE_DOCKER.md#-trabajo-en-equipo-con-docker)

---

## 🛠️ Stack Tecnológico

- **Backend**: .NET 9, Entity Framework Core, SQL Server
- **Frontend**: React 18, Vite, TailwindCSS, Electron
- **DevOps**: Docker, Docker Compose
- **Base de Datos**: SQL Server 2022 Express

---

## 📖 Guías de Desarrollo

### Backend (con Docker):
```powershell
# Los cambios se reflejan automáticamente
docker-compose up -d --build backend
```

### Backend (sin Docker, para debugging):
```powershell
cd backend/Caffenio.API
dotnet run
```

### Frontend:
```powershell
cd frontend
pnpm dev          # Modo desarrollo web
pnpm electron:dev # Modo Electron
```

---

## ✅ Próximos Pasos

1. ✅ Levantar el proyecto: `docker-compose up -d --build`
2. ✅ Verificar: `Invoke-RestMethod http://localhost:5000/api/health`
3. 📖 Lee [INICIO_RAPIDO.md](INICIO_RAPIDO.md) para más detalles
4. 🚀 ¡Empieza a desarrollar!

---

**¿Problemas?** Ver [DATABASE_DOCKER.md#-solución-de-problemas](DATABASE_DOCKER.md#-solución-de-problemas)

Sistema de pedidos Caffenio con **Frontend Electron + React** y **Backend .NET C#**.

## 📋 Especificaciones del Proyecto

### **LENGUAJE:**
- **FRONT:** React + Electron
- **BACK:** API .NET Framework C#

### **MOTOR:**
- **Base de Datos:** Microsoft SQL Server

---

## 🏗️ Arquitectura del Proyecto

```
Caffenio_Innovacore/
├── frontend/          # 🎨 Aplicación Electron + React
│   ├── electron/     # Proceso principal de Electron
│   ├── src/         # Código React
│   │   ├── pages/  # Páginas de la aplicación
│   │   └── ...
│   ├── assets/      # Recursos (fuentes, imágenes)
│   └── README.md    # 📖 Documentación del frontend
│
├── backend/          # ⚙️ API REST en .NET
│   ├── Caffenio.API/ # Proyecto Web API
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── ...
│   ├── README.md     # 📖 Documentación del backend
│   └── START_HERE.md # 👈 Guía rápida para empezar
│
└── README.md         # 📄 Este archivo
```

---

## 🚀 Inicio Rápido

### **Frontend Developer**
```bash
cd frontend
pnpm install
pnpm run electron:dev
```
📖 [Ver documentación completa del frontend →](./frontend/README.md)

### **Backend Developer**
```bash
cd backend/Caffenio.API
dotnet run
```
📖 [Ver documentación completa del backend →](./backend/README.md)  
👉 [EMPEZAR AQUÍ →](./backend/START_HERE.md)

---

## 🎨 Frontend (Electron + React)

### Tecnologías
- **React 18** - UI Framework
- **Electron** - Desktop application
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **PNPM** - Package manager

### Comandos principales
```bash
cd frontend
pnpm install              # Instalar dependencias
pnpm run electron:dev     # Desarrollo
pnpm run electron:build   # Build producción
```

### Características
✅ Configurado con Tailwind CSS  
✅ Fuentes Gilroy incluidas  
✅ React Router para navegación  
✅ Hot reload habilitado  
✅ Listo para conectar con el backend  

**Puerto:** http://localhost:5173

---

## ⚙️ Backend (.NET C# + SQL Server)

### Tecnologías
- **.NET 9** - Framework
- **ASP.NET Core Web API** - REST API
- **C#** - Lenguaje
- **Entity Framework Core** (por implementar)
- **Microsoft SQL Server** - Base de datos

### Comandos principales
```bash
cd backend/Caffenio.API
dotnet restore            # Restaurar paquetes
dotnet run               # Ejecutar API
dotnet build             # Compilar
```

### Características
✅ Proyecto Web API configurado  
✅ CORS configurado para frontend  
✅ Estructura organizada (MVC pattern)  
✅ Ejemplos de código incluidos  
✅ SQL Server connection string configurado  
✅ Documentación completa  

**Puertos:**
- HTTP: http://localhost:5000
- HTTPS: https://localhost:5001

**Endpoint de prueba:** https://localhost:5001/api/health

---

## 🗄️ Base de Datos (SQL Server)

### Configuración

1. **Instalar SQL Server** (si no lo tienes):
   - [SQL Server Express](https://www.microsoft.com/sql-server/sql-server-downloads) (Gratis)
   - [SQL Server Developer Edition](https://www.microsoft.com/sql-server/sql-server-downloads) (Gratis)

2. **Configurar Connection String** en `backend/Caffenio.API/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CaffenioDB;Integrated Security=true;TrustServerCertificate=True;"
  }
}
```

3. **Instalar Entity Framework Core**:
```bash
cd backend/Caffenio.API
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

4. **Crear migraciones** (cuando implementes el DbContext):
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## 🔗 Comunicación Frontend ↔ Backend

El frontend se comunica con el backend via REST API:

**Frontend:** http://localhost:5173 (Vite dev server)  
**Backend:** https://localhost:5001 (API .NET)

### Ejemplo de llamada desde React:
```javascript
const response = await fetch('https://localhost:5001/api/health');
const data = await response.json();
console.log(data);
```

✅ **CORS ya está configurado** en el backend para aceptar requests del frontend.

---

## 📦 Gestión de Dependencias

### Frontend (PNPM)
```bash
cd frontend
pnpm install                # Instalar
pnpm add <package>          # Agregar paquete
pnpm remove <package>       # Eliminar paquete
pnpm update                 # Actualizar todos
```

### Backend (.NET)
```bash
cd backend/Caffenio.API
dotnet restore              # Restaurar
dotnet add package <name>   # Agregar paquete NuGet
dotnet remove package <name> # Eliminar paquete
dotnet list package         # Listar paquetes
```

---

## 🎨 Recursos del Proyecto

### Fuentes
**Gilroy** (ubicada en `frontend/assets/fonts/`):
- Light (300), Regular (400), Medium (500)
- SemiBold (600), Bold (700), ExtraBold (800)

### Imágenes
Logo ubicado en: `frontend/assets/images/logo.png`

### Colores
- **Fondo:** `#E1E1E1`
- **Tarjetas:** `#FFFFFF`

---

## 🚀 Desarrollo Full Stack

Para trabajar con ambos simultáneamente:

**Terminal 1 - Frontend:**
```bash
cd frontend
pnpm run electron:dev
```

**Terminal 2 - Backend:**
```bash
cd backend/Caffenio.API
dotnet run
```

Ambos servicios correrán en paralelo y podrás desarrollar con hot reload.

---

## 📝 Estructura de Trabajo

### Frontend
```
src/
├── pages/          # Páginas principales
├── components/     # Componentes reutilizables
├── services/       # Llamadas a la API
├── hooks/          # Custom hooks
└── utils/          # Utilidades
```

### Backend
```
Caffenio.API/
├── Controllers/    # Endpoints HTTP
├── Models/        # Entidades del dominio
├── DTOs/          # Data Transfer Objects
├── Services/      # Lógica de negocio
├── Repositories/  # Acceso a datos
└── Middleware/    # Middleware personalizado
```

---

## 🧪 Testing (Por implementar)

### Frontend
```bash
cd frontend
pnpm add -D vitest @testing-library/react
```

### Backend
```bash
cd backend
dotnet new xunit -n Caffenio.Tests
dotnet sln add Caffenio.Tests/Caffenio.Tests.csproj
```

---

## 📚 Documentación Detallada

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| **Frontend** | [frontend/README.md](./frontend/README.md) | Documentación completa del frontend |
| **Backend** | [backend/README.md](./backend/README.md) | Documentación completa del backend |
| **Inicio Backend** | [backend/START_HERE.md](./backend/START_HERE.md) | Guía rápida para comenzar |
| **Backend Checklist** | [backend/CHECKLIST.md](./backend/CHECKLIST.md) | Tareas pendientes organizadas |
| **Backend Guía** | [backend/GUIA_RAPIDA.md](./backend/GUIA_RAPIDA.md) | Guía paso a paso |

---

## 🔒 Seguridad

### Variables de Entorno
**NO subir a Git:**
- `appsettings.Development.json`
- `appsettings.Production.json`
- `.env.local`
- Archivos con contraseñas o secrets

El `.gitignore` ya está configurado para proteger archivos sensibles.

---

## 🛠️ Herramientas Recomendadas

### Editores
- **Visual Studio Code** (Frontend + Backend)
- **Visual Studio 2022** (Backend - opcional)
- **Rider** (Backend - opcional)

### Extensiones VS Code
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- C# Dev Kit
- SQL Server (mssql)

### Software Adicional
- **SQL Server Management Studio (SSMS)** - Gestión de base de datos
- **Postman** / **Insomnia** - Testing de API
- **Git** - Control de versiones

---

## 📊 Estado del Proyecto

### ✅ Completado
- [x] Configuración inicial de Frontend
- [x] Configuración inicial de Backend
- [x] Estructura de carpetas organizada
- [x] CORS configurado
- [x] Documentación completa
- [x] Ejemplos de código
- [x] .gitignore configurado

### 🔜 Por Implementar
- [ ] Base de datos con Entity Framework Core
- [ ] Autenticación JWT
- [ ] Endpoints de la API
- [ ] Páginas del frontend
- [ ] Sistema de login
- [ ] Catálogo de productos
- [ ] Sistema de pedidos

---

## 👥 Equipo

Proyecto desarrollado para **Caffenio** como parte del **Innovation Meet Up (IMU) 2026**.

---

## 📄 Licencia

MIT

---

## 🆘 Ayuda

### Problemas comunes:

**Frontend no inicia:**
```bash
cd frontend
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Backend no compila:**
```bash
cd backend/Caffenio.API
dotnet clean
dotnet restore
dotnet build
```

**Base de datos no conecta:**
- Verifica que SQL Server esté corriendo
- Revisa la connection string en `appsettings.json`
- Prueba la conexión con SSMS

---

**¿Listo para comenzar?**

👉 **Frontend:** Ve a [frontend/README.md](./frontend/README.md)  
👉 **Backend:** Ve a [backend/START_HERE.md](./backend/START_HERE.md)
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
