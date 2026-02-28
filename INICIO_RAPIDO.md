# 🚀 Inicio Rápido - Caffenio Innovacore

## ✅ Inicio con Un Solo Comando

Todo el proyecto se levanta con Docker Compose. **Un solo comando levanta:**
- ✅ Base de datos SQL Server
- ✅ Backend API (.NET)
- ✅ Inicialización automática de la BD con datos de ejemplo

### 🎯 Pasos para Iniciar:

#### 1. Asegúrate de tener Docker Desktop corriendo
Abre Docker Desktop y espera a que esté listo.

#### 2. Levanta todo el proyecto:
```powershell
docker-compose up -d --build
```

Este comando:
- 🐳 Descarga las imágenes necesarias
- 🗄️ Crea y configura la base de datos
- 📊 Ejecuta el script de inicialización (tablas + datos)
- 🚀 Levanta el backend API

#### 3. Verifica que todo esté corriendo:
```powershell
docker-compose ps
```

Deberías ver 2 servicios corriendo:
- `caffenio_sqlserver` - Base de datos
- `caffenio_backend` - API Backend

#### 4. Prueba el backend:
```powershell
# PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/api/health"
```

O abre en el navegador: [http://localhost:5000/api/health](http://localhost:5000/api/health)

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

### 🎨 Frontend (opcional):

El frontend **NO** está en Docker (para desarrollo más rápido con hot-reload):

```powershell
cd frontend
pnpm install
pnpm dev
```

El frontend se abrirá en: `http://localhost:5173`

---

## 🔐 Credenciales:

```
Backend API: http://localhost:5000
Base de datos: localhost,1433
Database: caffenio_innovacore
Usuario: sa
Contraseña: CaffenioSecure2024!
```

---

## 🐳 Comandos Docker Útiles:

```powershell
# Ver estado de los contenedores
docker-compose ps

# Ver logs del backend
docker-compose logs -f backend

# Ver logs de la base de datos
docker-compose logs -f sqlserver

# Reiniciar todo
docker-compose restart

# Detener todo
docker-compose down

# Detener y eliminar TODO (incluidos datos)
docker-compose down -v

# Reconstruir el backend después de cambios
docker-compose up -d --build backend
```

---

## 📊 Acceso Directo a la Base de Datos

### Desde la terminal:
```powershell
docker exec -it caffenio_sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "CaffenioSecure2024!" -C
```

Luego ejecuta:
```sql
USE caffenio_innovacore;
SELECT * FROM CategoriaProducto;
GO
```

### Desde SQL Server Management Studio (SSMS):
- Server: `localhost,1433`
- Authentication: SQL Server Authentication
- Login: `sa`
- Password: `CaffenioSecure2024!`

---

## 👥 Trabajo en Equipo

**Cada persona tiene su propia base de datos local** en Docker.

### Lo que se comparte (vía Git):
- ✅ Código del backend
- ✅ Scripts de base de datos (`db-init/`)
- ✅ Configuración Docker (`docker-compose.yml`)

### Para sincronizar cambios:
```powershell
# Tu compañero hace pull del repo
git pull

# Reconstruye todo desde cero
docker-compose down -v
docker-compose up -d --build
```

Ver más detalles en [DATABASE_DOCKER.md](DATABASE_DOCKER.md#-trabajo-en-equipo-con-docker)

---

## 🛠️ Desarrollo del Backend

Si necesitas desarrollar el backend **fuera** de Docker (para debugging):

```powershell
cd backend/Caffenio.API
dotnet run
```

El backend se conectará automáticamente a la base de datos en Docker.

---

## 📚 Documentación Completa:

- [DATABASE_DOCKER.md](DATABASE_DOCKER.md) - Guía completa de la base de datos
- [backend/START_HERE.md](backend/START_HERE.md) - Guía del backend
- [frontend/START_HERE.md](frontend/START_HERE.md) - Guía del frontend

---

**¡Todo listo para empezar a desarrollar! 🎉**
