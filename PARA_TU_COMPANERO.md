# 🚀 PARA TU COMPAÑERO DE EQUIPO

¡Hola! Este proyecto usa Docker para que todo funcione con un solo comando.

## 📋 ¿Qué necesitas instalar?

1. **Docker Desktop** - [Descárgalo aquí](https://www.docker.com/products/docker-desktop)
2. **Git** (si aún no lo tienes)
3. **Node.js 18+** (solo si vas a trabajar en el frontend) - [Descárgalo aquí](https://nodejs.org/)

## ⚡ Inicio Super Rápido

### Opción 1: Script Automático (Más Fácil)

1. Abre Docker Desktop y espera a que esté listo
2. Haz doble clic en: `start.ps1`
3. ¡Listo!

### Opción 2: Manual

```powershell
# 1. Clonar el repo (si aún no lo has hecho)
git clone [URL_DEL_REPO]
cd Caffenio_Innovacore

# 2. Asegúrate de que Docker Desktop esté corriendo

# 3. Levantar todo
docker-compose up -d --build

# 4. Verificar que funcione
Invoke-RestMethod http://localhost:5000/api/health
```

## ✅ ¿Qué hace esto?

Levanta automáticamente:
- ✅ Base de datos SQL Server con todas las tablas
- ✅ Backend API funcionando
- ✅ Datos de ejemplo para probar

## 🌐 URLs Importantes

- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **Base de Datos**: localhost,1433

## 🔐 Credenciales

```
Usuario: sa
Contraseña: CaffenioSecure2024!
Base de datos: caffenio_innovacore
```

## 🛠️ Comandos Básicos

```powershell
# Ver si está corriendo
docker-compose ps

# Ver logs del backend
docker-compose logs -f backend

# Reiniciar todo
docker-compose restart

# Detener todo
docker-compose down

# Empezar desde cero (borra la base de datos)
docker-compose down -v
docker-compose up -d --build
```

## 📱 Frontend (Opcional)

Si vas a trabajar en el frontend:

```powershell
cd frontend
pnpm install
pnpm dev
```

Abre: http://localhost:5173

## 🐛 ¿Problemas?

### "Docker no está corriendo"
- Abre Docker Desktop y espera a que inicie completamente

### "Port already in use"
- Otro programa está usando el puerto 1433 o 5000
- Detén el otro programa o cambia el puerto en `docker-compose.yml`

### "No puedo conectarme al backend"
- Espera unos segundos más, puede estar iniciando
- Verifica los logs: `docker-compose logs backend`

### Error al hacer pull/push
- Asegúrate de que tu SSH/credenciales estén configuradas

## 📚 Documentación Completa

- **[README.md](README.md)** - Documentación principal
- **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** - Guía completa de inicio
- **[DATABASE_DOCKER.md](DATABASE_DOCKER.md)** - Todo sobre la base de datos

## 👥 Trabajando en Equipo

Cuando yo (tu compañero) haga cambios y los suba:

```powershell
# 1. Descargar cambios
git pull

# 2. Reconstruir (solo si hay cambios en Docker o BD)
docker-compose down -v
docker-compose up -d --build
```

**Nota**: Tu base de datos es LOCAL. Cada quien tiene su propia copia.

## ✨ Tips

- Los cambios en el backend requieren reconstruir: `docker-compose up -d --build backend`
- Los cambios en el frontend son automáticos (hot-reload)
- Si algo no funciona, prueba: `docker-compose down -v && docker-compose up -d --build`

---

**¿Más dudas?** Pregúntame o revisa la documentación en los archivos .md

**¡Listo para desarrollar!** 🎉
