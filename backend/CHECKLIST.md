# Caffenio Backend - Checklist de Desarrollo

## ✅ Setup Inicial

- [ ] Verificar .NET SDK instalado (`dotnet --version`)
- [ ] Clonar repositorio
- [ ] Restaurar dependencias (`dotnet restore`)
- [ ] Configurar `appsettings.Development.json`
- [ ] Ejecutar API (`dotnet run`)
- [ ] Probar endpoint health: `https://localhost:5001/api/health`

---

## 📝 Tareas Pendientes

### **1. Base de Datos (Microsoft SQL Server)**
- [ ] Instalar SQL Server (si no lo tienes)
- [ ] Instalar paquete Entity Framework Core para SQL Server:
  ```bash
  dotnet add package Microsoft.EntityFrameworkCore.SqlServer
  dotnet add package Microsoft.EntityFrameworkCore.Tools
  ```
- [ ] Crear `DbContext`
- [ ] Configurar connection string
- [ ] Crear primera migración
- [ ] Aplicar migración

### **2. Autenticación**
- [ ] Instalar JWT Bearer Authentication
- [ ] Configurar JWT en `Program.cs`
- [ ] Crear `AuthController`
- [ ] Implementar login
- [ ] Implementar registro
- [ ] Agregar `[Authorize]` a endpoints protegidos

### **3. Modelos**
- [ ] Crear modelo `User`
- [ ] Crear modelo `Product`
- [ ] Crear modelo `Order`
- [ ] Crear modelo `OrderItem`
- [ ] Definir relaciones entre modelos

### **4. Controllers**
- [ ] Crear `AuthController`
- [ ] Crear `ProductsController`
- [ ] Crear `OrdersController`
- [ ] Crear `UsersController`

### **5. Services**
- [ ] Implementar `IAuthService`
- [ ] Implementar `IProductService`
- [ ] Implementar `IOrderService`
- [ ] Implementar `IUserService`

### **6. Repositories** (Si usas patrón Repository)
- [ ] Crear `IRepository<T>`
- [ ] Implementar `Repository<T>`
- [ ] Crear repositories específicos por entidad

### **7. Validaciones**
- [ ] Instalar FluentValidation
- [ ] Crear validadores para DTOs
- [ ] Configurar validación automática

### **8. Logging**
- [ ] Configurar Serilog (opcional)
- [ ] Agregar logging en services
- [ ] Configurar archivos de log

### **9. Manejo de Errores**
- [ ] Crear middleware de excepción global
- [ ] Definir códigos de error estándar
- [ ] Implementar respuestas de error consistentes

### **10. Testing**
- [ ] Crear proyecto de tests
- [ ] Tests unitarios para Services
- [ ] Tests de integración para Controllers
- [ ] Tests de integración para Base de Datos

### **11. Documentación**
- [ ] Configurar Swagger/OpenAPI
- [ ] Documentar todos los endpoints
- [ ] Agregar ejemplos de requests/responses
- [ ] Documentar códigos de error

### **12. Seguridad**
- [ ] HTTPS en producción
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] SQL injection prevention (EF Core lo maneja)
- [ ] XSS prevention

### **13. Performance**
- [ ] Implementar caché (Memory o Redis)
- [ ] Optimizar queries de BD
- [ ] Agregar paginación
- [ ] Comprimir responses

### **14. Deploy**
- [ ] Configurar `appsettings.Production.json`
- [ ] Crear Dockerfile
- [ ] CI/CD pipeline
- [ ] Ambiente de staging
- [ ] Monitoreo

---

## 🎯 Sprint Actual

**Sprint:** 1  
**Duración:** ___ días  
**Puntos totales:** ___/20

### Historias de Usuario

1. [ ] **Como usuario, quiero...** (puntos: ___)
   - [ ] Subtarea 1
   - [ ] Subtarea 2

2. [ ] **Como usuario, quiero...** (puntos: ___)
   - [ ] Subtarea 1
   - [ ] Subtarea 2

---

## 📊 Progreso

| Área | Status | Prioridad |
|------|--------|-----------|
| Setup Inicial | ⚪ Todo | Alta |
| Base de Datos | ⚪ Todo | Alta |
| Autenticación | ⚪ Todo | Alta |
| Modelos | ⚪ Todo | Alta |
| Controllers | ⚪ Todo | Media |
| Services | ⚪ Todo | Media |
| Testing | ⚪ Todo | Media |
| Documentación | ⚪ Todo | Baja |

**Leyenda:** ⚪ Todo | 🟡 En Progreso | 🟢 Completado

---

## 📈 Métricas

- **Endpoints implementados:** 1/X
- **Tests unitarios:** 0/X
- **Cobertura de código:** 0%
- **Documentación:** 60%

---

## 🐛 Bugs Conocidos

_Ninguno por ahora_

---

## 💡 Ideas / Mejoras Futuras

- [ ] WebSockets para notificaciones en tiempo real
- [ ] Cache distribuido con Redis
- [ ] Health checks avanzados
- [ ] Métricas con Application Insights

---

**Última actualización:** 23/02/2026
