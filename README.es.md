# ☕ Caffenio Innovacore

Sistema moderno de punto de venta para cafeterías con stack tecnológico completo: Backend .NET 9 + Frontend React + Aplicación de Escritorio Electron + Docker.

> **🌍 English:** [README.md](README.md)

---

## 📖 Descripción General

**Caffenio Innovacore** es un sistema integral de gestión para cafeterías diseñado para toma de pedidos, gestión de inventario y atención al cliente. La aplicación proporciona una interfaz intuitiva optimizada para pantallas táctiles que permite a los empleados procesar pedidos, personalizar productos y gestionar la disponibilidad de productos en tiempo real.

### ¿Qué es este proyecto?
Un sistema completo de punto de venta (POS) construido para cafeterías que necesitan:
- Procesamiento rápido de pedidos con personalización de productos
- Seguimiento de disponibilidad de inventario en tiempo real
- Generación de tickets de pedido para cocina/caja
- Interfaz moderna y responsiva para pantallas táctiles

### Características Principales
- ✨ Catálogo interactivo de productos con navegación por categorías (Calientes, Fríos, Alimentos, Dulces)
- 🛒 Carrito de compras en tiempo real con gestión dinámica de pedidos
- 🎨 Personalización avanzada de productos (tamaño, tipo de leche, temperatura, extras)
- 📦 Verificación de disponibilidad de inventario en vivo
- 🎫 Generación automática de tickets de pedido (códigos de 4 dígitos)
- 🔐 Seguridad basada en API Key
- 📱 Aplicación de escritorio multiplataforma (Electron)
- 🐳 Completamente containerizado con Docker

---

## 🏗️ Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| **Frontend** | React + Vite | 19.0.0 / 6.0.1 | Framework UI y Build Tool |
| **Estilos** | TailwindCSS | 3.4.17 | CSS utility-first |
| **Escritorio** | Electron | 34.0.0 | Aplicación de escritorio multiplataforma |
| **Backend** | .NET Web API (C#) | 9.0 | Servidor API RESTful |
| **Base de Datos** | SQL Server Express | 2022 | Base de datos relacional |
| **ORM** | Entity Framework Core | 9.0 | Capa de acceso a datos |
| **Containerización** | Docker Compose | - | Orquestación de servicios |
| **Gestor de Paquetes** | pnpm | 9.15.4 | Alternativa rápida y eficiente a npm |

---

## 🚀 Inicio Rápido (3 Pasos)

### Prerequisitos
```
✅ Docker Desktop (requerido)
✅ Node.js 18+ (requerido para frontend)
✅ pnpm (instalar: npm install -g pnpm)
```

### 1. Iniciar Backend + Base de Datos

```powershell
docker-compose up -d --build
```

Este comando inicia:
- 🗄️ **SQL Server 2022** en puerto `1433`
- 📊 **Inicialización de base de datos** con tablas y datos de ejemplo
- 🚀 **Backend API** en puerto `5000`

### 2. Verificar Backend

```powershell
# Verificar contenedores
docker-compose ps

# Probar salud del API
Invoke-RestMethod -Uri "http://localhost:5000/api/health"
```

Respuesta esperada:
```json
{
  "status": "Healthy",
  "database": { "status": "Connected" }
}
```

### 3. Iniciar Frontend

```powershell
cd frontend
pnpm install
pnpm run dev
```

✅ La aplicación abre en: **http://localhost:5173**

---

## 📁 Estructura del Proyecto

```
Caffenio_Innovacore/
│
├── 🎨 frontend/                    # Aplicación de escritorio (Electron + React)
│   ├── electron/                  # Proceso principal de Electron
│   │   ├── main.js               # Punto de entrada de la aplicación
│   │   └── preload.js            # Context bridge
│   │
│   ├── src/                       # Código fuente React
│   │   ├── pages/                # Páginas de la aplicación
│   │   │   ├── Home.jsx          # Selección de categorías
│   │   │   ├── ProductList.jsx   # Catálogo de productos
│   │   │   ├── ProductCustomization.jsx
│   │   │   ├── OrderSummary.jsx  # Revisión del carrito
│   │   │   └── OrderConfirmation.jsx
│   │   ├── context/              # Gestión de estado global
│   │   │   ├── AuthContext.jsx   # Autenticación
│   │   │   └── CartContext.jsx   # Carrito de compras
│   │   ├── services/             # Integración con API
│   │   │   └── api.js            # Cliente HTTP
│   │   └── main.jsx              # Punto de entrada React
│   │
│   ├── assets/                    # Recursos estáticos
│   │   ├── fonts/                # Familia de fuentes Gilroy
│   │   └── images/               # Imágenes de productos y logo
│   │
│   ├── package.json              # Dependencias
│   └── vite.config.js            # Configuración de build
│
├── ⚙️ backend/                     # API REST (.NET 9)
│   └── Caffenio.API/              # Proyecto API principal
│       ├── Controllers/          # Endpoints HTTP
│       │   ├── ProductosController.cs   # Catálogo de productos
│       │   ├── OrdenesController.cs     # Gestión de pedidos
│       │   └── HealthController.cs      # Salud del sistema
│       │
│       ├── Models/               # Entidades del dominio
│       │   ├── Product.cs        # Modelo de producto
│       │   ├── Orden.cs          # Modelo de orden
│       │   └── User.cs           # Modelo de usuario
│       │
│       ├── Middleware/           # Middleware personalizado
│       │   └── ApiKeyMiddleware.cs  # Seguridad API
│       │
│       ├── Data/                 # Contexto de base de datos
│       │   └── CaffenioDbContext.cs
│       │
│       └── Program.cs            # Inicio de aplicación
│
├── 🗄️ db-init/                     # Inicialización de base de datos
│   └── 01-init.sql               # Schema + datos de ejemplo
│
├── 🐳 docker-compose.yml          # Orquestación de servicios
└── 📄 README.md                   # Archivo principal (inglés)
```

---

## 🎯 Funcionalidades Implementadas

### Frontend ✅
- [x] **Catálogo de Productos** - Navegación por categorías (Calientes, Fríos, Alimentos, Dulces)
- [x] **Personalización de Productos** - Tamaño, tipo de leche, temperatura, extras
- [x] **Carrito de Compras** - Agregar/eliminar items, gestión de cantidad
- [x] **Resumen de Pedido** - Revisión antes del pago
- [x] **Confirmación de Pedido** - Mostrar número de ticket
- [x] **Autenticación** - Sistema de login con código QR
- [x] **Disponibilidad en Tiempo Real** - Muestra productos no disponibles con feedback visual
- [x] **Diseño Responsivo** - Optimizado para pantallas táctiles

### Backend ✅
- [x] **API de Productos** - GET todos los productos, filtrar por categoría/subcategoría
- [x] **Verificación de Disponibilidad** - Estado de disponibilidad de productos en tiempo real
- [x] **Gestión de Pedidos** - POST nuevos pedidos, GET historial de pedidos
- [x] **Generación de Tickets** - Códigos automáticos de 4 dígitos
- [x] **Seguimiento de Pedidos** - Actualización de estados (Pendiente, En Preparación, Listo, Entregado)
- [x] **Seguridad API** - Autenticación con middleware de API key
- [x] **Health Checks** - Monitoreo de conexión a base de datos
- [x] **Configuración CORS** - Comunicación con frontend habilitada
- [x] **Logging Estructurado** - Registro de requests/responses

### Infraestructura ✅
- [x] **Docker Compose** - Containerización de stack completo
- [x] **SQL Server** - Base de datos en contenedor con health checks
- [x] **Auto-inicialización** - Schema de base de datos creado en primer arranque
- [x] **Datos de Ejemplo** - 11 productos precargados con flags de disponibilidad

---

## 🔐 Autenticación de API

Todos los endpoints de la API (excepto `/health`) requieren un header de API key:

```bash
X-Api-Key: caffenio-2024-frontend-key
```

### Ejemplo de Request

```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/productos" `
  -Headers @{"X-Api-Key"="caffenio-2024-frontend-key"} `
  -UseBasicParsing
```

**Nota de Seguridad:** En producción, usar variables de entorno para las API keys.

---

## 📡 Endpoints de la API

### Productos
```
GET  /api/productos                           # Todos los productos
GET  /api/productos/categoria/{id}            # Por categoría
GET  /api/productos/categoria/4/subcategoria/{id}  # Por subcategoría
GET  /api/productos/{id}/disponibilidad       # Verificar disponibilidad
```

### Órdenes
```
POST   /api/ordenes                    # Crear nueva orden
GET    /api/ordenes                    # Obtener todas las órdenes
GET    /api/ordenes/ticket/{ticket}    # Obtener orden por ticket
PATCH  /api/ordenes/{id}/estado        # Actualizar estado de orden
```

### Sistema
```
GET  /api/health                       # Verificación de salud del sistema
```

---

## 🗄️ Configuración de Base de Datos

La base de datos se **inicializa automáticamente** vía Docker. No se requiere configuración manual.

### Detalles de Conexión (Desarrollo)
```
Servidor: localhost,1433
Base:     caffenio_innovacore
Usuario:  sa
Password: CaffenioSecure2024!
```

⚠️ **Cambiar credenciales en producción**

### Acceso Manual a Base de Datos

```powershell
# Conectar usando sqlcmd (dentro del contenedor)
docker exec -it caffenio_sqlserver /opt/mssql-tools18/bin/sqlcmd `
  -S localhost -U sa -P "CaffenioSecure2024!" -C
```

---

## 🐳 Comandos Docker

```powershell
# Iniciar todos los servicios
docker-compose up -d

# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f backend
docker-compose logs -f sqlserver

# Reiniciar servicios
docker-compose restart backend

# Detener todos los servicios
docker-compose down

# Reinicio completo (elimina datos)
docker-compose down -v
docker-compose up -d --build
```

---

## 🔧 Flujo de Desarrollo

### Desarrollo de Backend (con Docker)
```powershell
# Hacer cambios en código, luego reconstruir
docker-compose up -d --build backend
```

### Desarrollo de Backend (sin Docker - para debugging)
```powershell
cd backend/Caffenio.API
dotnet run
```

### Desarrollo de Frontend
```powershell
cd frontend
pnpm run dev          # Modo web (http://localhost:5173)
pnpm run electron:dev # Aplicación Electron de escritorio
```

---

## 📦 Datos de Ejemplo

El sistema incluye **11 productos** en 4 categorías:

| Categoría | Productos | Disponibilidad |
|-----------|-----------|----------------|
| **Bebidas Calientes** | Americano, Capuccino, Chocolate | Chocolate no disponible ❌ |
| **Bebidas Frías** | Frappé, Cold Brew | Todos disponibles ✅ |
| **Alimentos** | Sandwich, Ensalada | Ensalada no disponible ❌ |
| **Dulces** | Helado (Vainilla/Chocolate), Pastel de Chocolate, Croissant | Todos disponibles ✅ |

**Los productos no disponibles** se muestran en la UI con:
- Filtro de imagen en escala de grises
- Botón "+" deshabilitado
- Etiqueta roja "(No disponible)"
- Mensaje de advertencia

---

## 🎨 Sistema de Diseño

### Colores
- **Fondo:** `#E1E1E1`
- **Tarjetas:** `#FFFFFF`
- **Primario (Verde):** `#84CC16` (lime-500)
- **Secundario (Rojo):** `#EF4444` (red-500)

### Tipografía
**Familia de Fuentes Gilroy** (incluida en `assets/fonts/`):
- Light (300), Regular (400), Medium (500)
- SemiBold (600), Bold (700), ExtraBold (800)

---

## 🔄 Ejemplo de Flujo de Trabajo

1. **Seleccionar Categoría** → Navegar a Calientes/Fríos/Alimentos/Dulces
2. **Elegir Producto** → Click en tarjeta de producto
3. **Personalizar** → Seleccionar tamaño, tipo de leche, extras (para bebidas calientes/frías)
4. **Agregar al Carrito** → Producto agregado con personalizaciones
5. **Revisar Pedido** → Ver resumen del carrito con totales
6. **Procesar Pago** → Pedido enviado al backend
7. **Obtener Ticket** → Recibir número de ticket de 4 dígitos para recoger

---

## 📈 Mejoras Futuras

### Alta Prioridad
- Persistir órdenes en base de datos SQL Server (actualmente en memoria)
- Agregar autenticación de usuarios con tokens JWT
- Implementar panel administrativo para gestión de inventario
- Sistema de gestión de imágenes de productos

### Prioridad Media
- Historial de pedidos con filtrado por fecha
- Reportes de ventas y analytics
- Programa de lealtad de clientes
- Soporte multi-idioma (Inglés/Español)

### Prioridad Baja
- Integración con impresora térmica para impresión de tickets
- Notificaciones de estado de pedido en tiempo real
- Versión de aplicación móvil (React Native)
- Integración con pasarela de pagos

---

## 🧪 Pruebas

### Pruebas de API del Backend

```powershell
# Endpoint de productos
Invoke-WebRequest -Uri "http://localhost:5000/api/productos" `
  -Headers @{"X-Api-Key"="caffenio-2024-frontend-key"} `
  -UseBasicParsing

# Crear orden de prueba
$orden = @{
  clienteId = "1"
  subtotal = 70.00
  iva = 11.20
  descuento = 0.00
  total = 81.20
  items = @(
    @{
      productoId = 1
      productoNombre = "Americano"
      cantidad = 2
      precioUnitario = 35.00
      subtotal = 70.00
      personalizacion = @{ tamano = "Grande"; leche = "Entera" }
    }
  )
} | ConvertTo-Json -Depth 10

Invoke-WebRequest -Uri "http://localhost:5000/api/ordenes" `
  -Method Post `
  -Headers @{"X-Api-Key"="caffenio-2024-frontend-key"; "Content-Type"="application/json"} `
  -Body $orden `
  -UseBasicParsing
```

---

## 🛠️ Solución de Problemas

### Problemas con Docker

**Los contenedores no inician:**
```powershell
docker-compose down -v
docker-compose up -d --build
```

**Puerto ya en uso:**
```powershell
# Detener servicios en conflicto
docker ps
docker stop <container_id>
```

### Problemas con Backend

**API no responde:**
```powershell
# Verificar logs del backend
docker-compose logs backend

# Reiniciar backend
docker-compose restart backend
```

### Problemas con Frontend

**Puerto 5173 ya en uso:**
```powershell
# Detener proceso usando el puerto
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

**Errores de build:**
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item pnpm-lock.yaml
pnpm install
```

---

## 👥 Desarrollo en Equipo

Cada desarrollador tiene su propia base de datos local en Docker. Sin conflictos de base de datos compartida.

### Sincronizar con el equipo:
```powershell
git pull
docker-compose down -v
docker-compose up -d --build
```

---

## 📄 Licencia

Licencia MIT - Ver archivo LICENSE para más detalles

---

## 🆘 Soporte

Para problemas o preguntas:
1. Revisar sección [Solución de Problemas](#-solución-de-problemas)
2. Revisar logs de Docker: `docker-compose logs`
3. Verificar contenedores: `docker-compose ps`

---

## 🎯 Estado del Proyecto

**Versión Actual:** 1.0.0  
**Estado:** ✅ MVP Funcional - Listo para pruebas y mejoras  
**Última Actualización:** Febrero 2026

---

**¿Listo para empezar?** Ejecuta `docker-compose up -d --build` y abre http://localhost:5173
