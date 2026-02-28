# 🐳 Base de Datos Docker - Caffenio Innovacore

Esta guía te ayudará a configurar y ejecutar la base de datos SQL Server en Docker para el proyecto Caffenio Innovacore.

## 📋 Requisitos Previos

- **Docker Desktop** instalado y ejecutándose
  - Windows: [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
  - Asegúrate de que Docker Desktop esté corriendo antes de continuar

## 🚀 Inicio Rápido

### 1. Levantar Todo el Proyecto

Abre una terminal en la raíz del proyecto y ejecuta:

```powershell
docker-compose up -d --build
```

Este comando levanta **automáticamente**:
- ✅ SQL Server 2022 Express (gratis)
- ✅ Base de datos `caffenio_innovacore`
- ✅ Tablas y datos de ejemplo
- ✅ Backend API (.NET)

Todo en un solo comando. 🎉

### 2. Verificar que Está Funcionando

```powershell
docker-compose ps
```

Deberías ver:
- `caffenio_sqlserver` - Estado: Up
- `caffenio_backend` - Estado: Up

### 3. Probar el Backend

Abre en el navegador o usa PowerShell:

```powershell
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

### 4. Ver los Logs

```powershell
# Logs del backend
docker-compose logs -f backend

# Logs de la base de datos
docker-compose logs -f sqlserver
```

## 🔐 Credenciales de Conexión

Estas credenciales están configuradas en el archivo `.env`:

- **Servidor**: `localhost,1433`
- **Base de Datos**: `caffenio_innovacore`
- **Usuario**: `sa`
- **Contraseña**: `CaffenioSecure2024!`

### Connection String completo:
```
Server=localhost,1433;Database=caffenio_innovacore;User Id=sa;Password=CaffenioSecure2024!;TrustServerCertificate=True;Encrypt=False;
```

> ⚠️ **IMPORTANTE**: Esta contraseña es para desarrollo local. Cámbiala en producción.

## 🔧 Comandos Útiles

### Detener la Base de Datos
```powershell
docker-compose down
```

### Detener y Eliminar los Datos
```powershell
docker-compose down -v
```
> ⚠️ Esto eliminará todos los datos. Úsalo solo si quieres empezar desde cero.

### Reiniciar la Base de Datos
```powershell
docker-compose restart
```

### Acceder al SQL Server directamente
```powershell
docker exec -it caffenio_sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "CaffenioSecure2024!" -C
```

Una vez dentro, puedes ejecutar comandos SQL:
```sql
USE caffenio_innovacore;
GO
SELECT * FROM CategoriaProducto;
GO
EXIT
```

## 🗄️ Estructura de la Base de Datos

### Tablas Principales:
1. **CategoriaProducto** - Categorías de productos (Café Caliente, Café Frío, etc.)
2. **Producto** - Productos (Americano, Latte, Cappuccino, etc.)
3. **VarianteProducto** - Variantes por tamaño y preparación
4. **Inventario** - Control de stock por variante
5. **Cliente** - Información de clientes
6. **Orden** - Órdenes de compra
7. **DetalleOrden** - Items de cada orden

### Datos de Ejemplo Incluidos:
- ✅ 5 categorías de productos
- ✅ 10 productos
- ✅ 7 variantes de productos
- ✅ Inventario inicial
- ✅ 3 clientes de ejemplo

## 🔌 Conectar desde el Backend

El backend ya está configurado para conectarse automáticamente. Las configuraciones están en:

- `backend/Caffenio.API/appsettings.json`
- `backend/Caffenio.API/appsettings.Development.json`

Simplemente ejecuta el backend y se conectará a la base de datos en Docker.

## 🛠️ Conectar con SQL Server Management Studio (SSMS)

Si tienes SSMS instalado:

1. Abre SSMS
2. Usa estos datos de conexión:
   - **Server name**: `localhost,1433`
   - **Authentication**: SQL Server Authentication
   - **Login**: `sa`
   - **Password**: `CaffenioSecure2024!`
3. Click en "Connect"

## 🌐 Conectar con Azure Data Studio

1. Descarga [Azure Data Studio](https://docs.microsoft.com/sql/azure-data-studio/download)
2. Nueva conexión con:
   - **Connection type**: Microsoft SQL Server
   - **Server**: `localhost,1433`
   - **Authentication type**: SQL Login
   - **User name**: `sa`
   - **Password**: `CaffenioSecure2024!`
   - **Database**: `caffenio_innovacore`

## 🔄 Reiniciar la Base de Datos desde Cero

Si necesitas reiniciar todo:

```powershell
# 1. Detener y eliminar todo
docker-compose down -v

# 2. Levantar nuevamente
docker-compose up -d

# 3. Verificar logs
docker logs caffenio_sqlserver -f
```

## 🐛 Solución de Problemas

### Error: "port is already allocated"
Otro servicio está usando el puerto 1433. Opciones:
1. Detén el servicio que usa el puerto 1433
2. O cambia el puerto en `docker-compose.yml`: `"1434:1433"`

### Error: "SA Password must be..."
La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y símbolos especiales.

### El contenedor no inicia
```powershell
# Ver logs detallados
docker logs caffenio_sqlserver

# Verificar que Docker Desktop está corriendo
docker ps
```

### No puedo conectarme desde el backend
1. Verifica que el contenedor esté corriendo: `docker ps`
2. Verifica la connection string en `appsettings.Development.json`
3. Asegúrate de que el puerto 1433 no esté bloqueado por firewall

## � Trabajo en Equipo con Docker

### ¿Cómo trabajar con otra persona?

**Cada persona tiene su propia instancia local** de la base de datos. Docker crea un contenedor independiente en cada máquina.

#### ✅ Lo que SÍ se comparte automáticamente:
- 📄 **Scripts de inicialización** (`db-init/01-init.sql`)
- 📄 **Configuración de Docker** (`docker-compose.yml`)
- 📄 **Connection strings** del backend

Cuando otro desarrollador clona el repositorio y ejecuta `docker-compose up -d`, obtiene la MISMA estructura de base de datos.

#### ❌ Lo que NO se comparte automáticamente:
- 📊 **Datos que insertes manualmente** en tu instancia local
- 📊 **Cambios que hagas** después de la inicialización

### Opciones para Sincronizar Datos entre Equipos:

#### **Opción 1: Scripts SQL Compartidos (Recomendado para Desarrollo)** ⭐
Cada vez que alguien necesite datos de prueba o cambios de estructura:

1. Crea un script SQL en `db-init/`:
   ```powershell
   # Ejemplo: db-init/02-datos-prueba.sql
   ```

2. Otros desarrolladores ejecutan:
   ```powershell
   docker-compose down -v
   docker-compose up -d
   ```

**Ventajas**: ✅ Versionado en Git, ✅ Repetible, ✅ Gratis

#### **Opción 2: Exportar/Importar Dumps**
Si tienes datos específicos que quieres compartir:

**Exportar datos:**
```powershell
# Desde tu máquina
docker exec caffenio_sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "CaffenioSecure2024!" -C -Q "BACKUP DATABASE caffenio_innovacore TO DISK='/var/opt/mssql/backup/caffenio_backup.bak'" 

# Copiar el backup fuera del contenedor
docker cp caffenio_sqlserver:/var/opt/mssql/backup/caffenio_backup.bak ./backup/
```

**Importar datos:**
```powershell
# Tu compañero copia el backup y lo restaura
docker cp ./backup/caffenio_backup.bak caffenio_sqlserver:/var/opt/mssql/backup/
docker exec caffenio_sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "CaffenioSecure2024!" -C -Q "RESTORE DATABASE caffenio_innovacore FROM DISK='/var/opt/mssql/backup/caffenio_backup.bak' WITH REPLACE"
```

**Ventajas**: ✅ Incluye todos los datos

#### **Opción 3: Base de Datos Compartida en la Nube** 💰
Para un ambiente compartido real (staging/testing):

**Gratuitas:**
- **Azure SQL Database** - Tier básico gratuito (32MB-2GB)
- **AWS RDS Free Tier** - 750 horas/mes gratis (primer año)
- **Clever Cloud** - PostgreSQL/MySQL gratis (si migras)

**Configuración:**
1. Crea la BD en la nube
2. Actualiza `appsettings.Development.json` con la connection string remota
3. Todos se conectan al mismo servidor

**Ventajas**: ✅ Datos sincronizados en tiempo real
**Desventajas**: ❌ No es gratis para SQL Server (límites estrictos), ❌ Requiere internet

### 🎯 Recomendación para tu Equipo:

**Desarrollo Local (cada quien su Docker)**:
- Cada desarrollador trabaja con su propia instancia
- Cambios de estructura → Scripts SQL en Git
- Datos de prueba → Scripts SQL en Git

**Testing/Staging (base de datos compartida)**:
- Usa Azure SQL Database (tier gratuito)
- O migra a PostgreSQL para más opciones gratuitas

## �📦 Hosting Gratuito

Esta configuración con Docker te permite deployar gratis en:

### Opciones de Hosting Gratuito:
1. **Railway.app** - Ofrece plan gratuito con PostgreSQL/MySQL
2. **Render.com** - Plan gratuito con PostgreSQL
3. **Supabase** - Base de datos PostgreSQL gratuita
4. **PlanetScale** - MySQL gratuito

> 💡 **Nota**: SQL Server en Docker requiere Windows Server en producción. Para hosting gratuito, considera migrar a PostgreSQL (más compatible con servicios gratuitos).

### Para Producción con SQL Server:
- **Azure SQL Database** - Tier gratuito disponible (con límites)
- **AWS RDS for SQL Server** - Tier gratuito (primer año)

## 🔒 Seguridad

### Para Desarrollo Local: ✅
La configuración actual es perfecta.

### Para Producción: ⚠️
1. Cambia la contraseña SA en el archivo `.env`
2. Usa variables de entorno o Azure Key Vault
3. Configura reglas de firewall
4. Habilita SSL/TLS
5. Usa cuentas de usuario específicas (no SA)
6. Implementa backups automáticos

## 📚 Scripts Disponibles

Los scripts SQL están en la carpeta `db-init/`:
- `01-init.sql` - Creación de base de datos, tablas e índices

Para agregar más scripts de inicialización, créalos con nombres como:
- `02-stored-procedures.sql`
- `03-views.sql`
- etc.

Se ejecutarán en orden alfabético al iniciar el contenedor por primera vez.

## 📞 Soporte

Si tienes problemas:
1. Verifica los logs: `docker logs caffenio_sqlserver`
2. Asegúrate de que Docker Desktop esté corriendo
3. Verifica que el puerto 1433 esté disponible
4. Revisa la sección de solución de problemas arriba

---

**¡Listo! Tu base de datos está corriendo en Docker. 🎉**
