# Caffenio Backend API

API REST desarrollada en **.NET 9** con C# para el sistema de pedidos Caffenio.

## 🚀 Tecnologías

- **.NET 9** - Framework backend
- **ASP.NET Core Web API** - API REST
- **C#** - Lenguaje de programación
- **Entity Framework Core** (por implementar) - ORM
- **Microsoft SQL Server** - Base de datos

## 📁 Estructura del Proyecto

```
Caffenio.API/
├── Controllers/       # Controladores de la API
├── Models/           # Modelos de dominio
├── DTOs/             # Data Transfer Objects
├── Services/         # Lógica de negocio
├── Repositories/     # Acceso a datos (por implementar)
├── Middleware/       # Middleware personalizado
├── Program.cs        # Punto de entrada
└── appsettings.json  # Configuración
```

## 🔧 Configuración Inicial

### 1. Instalar .NET SDK

Si no lo tienes instalado:
- Descarga [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)

### 2. Restaurar dependencias

```bash
cd backend
dotnet restore
```

### 3. Configurar Base de Datos

Edita `appsettings.json` con tu cadena de conexión:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CaffenioDB;..."
  }
}
```

### 4. Ejecutar la API

```bash
cd Caffenio.API
dotnet run
```

La API estará disponible en:
- **HTTP:** http://localhost:5000
- **HTTPS:** https://localhost:5001

## 📡 Endpoints Disponibles

### Health Check
```
GET /api/health
```
Verifica que la API esté funcionando.

### Documentación OpenAPI
En desarrollo, visita: https://localhost:5001/openapi/v1.json

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas:

1. **Controllers** - Reciben requests HTTP
2. **Services** - Contienen la lógica de negocio
3. **Repositories** - Acceso a datos (patrón Repository)
4. **Models** - Entidades del dominio
5. **DTOs** - Objetos de transferencia de datos

## 🔐 Autenticación (Por implementar)

El proyecto está preparado para JWT Authentication. La configuración está en `appsettings.json`:

```json
{
  "Jwt": {
    "Key": "tu-clave-secreta",
    "Issuer": "Caffenio.API",
    "Audience": "Caffenio.Client"
  }
}
```

## 🌐 CORS

CORS está configurado para permitir requests desde:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:5174`

Edita `Program.cs` para agregar más orígenes si es necesario.

## 📦 Paquetes NuGet Recomendados

### **IMPORTANTE: Instalar Entity Framework Core para SQL Server**

Estos paquetes son **OBLIGATORIOS** para trabajar con SQL Server:

```bash
# Entity Framework Core (SQL Server) - REQUERIDO
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

# Entity Framework Core Tools
dotnet add package Microsoft.EntityFrameworkCore.Tools

# JWT Authentication
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer

# Identity para usuarios
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore

# AutoMapper para mapeo de objetos
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection

# FluentValidation para validaciones
dotnet add package FluentValidation.AspNetCore

# Serilog para logging
dotnet add package Serilog.AspNetCore
```

## 🧪 Testing (Por implementar)

Crear proyecto de tests:

```bash
cd backend
dotnet new xunit -n Caffenio.Tests
dotnet sln add Caffenio.Tests/Caffenio.Tests.csproj
```

## 📝 Ejemplos de Código

### Ejemplo de Controller

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _productService.GetAllAsync();
        return Ok(ApiResponse<List<Product>>.SuccessResponse(products));
    }
}
```

### Ejemplo de Service

```csharp
public interface IProductService
{
    Task<List<Product>> GetAllAsync();
}

public class ProductService : IProductService
{
    // Implementación
}
```

### Registrar Service en Program.cs

```csharp
builder.Services.AddScoped<IProductService, ProductService>();
```

## 🔄 Entity Framework Core (Cuando lo implementes)

### Crear DbContext

```csharp
public class CaffenioDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<User> Users { get; set; }
}
```

### Migraciones

```bash
# Crear migración
dotnet ef migrations add InitialCreate

# Aplicar migración
dotnet ef database update
```

## 🐛 Debugging

El proyecto está configurado para debugging en:
- Visual Studio
- Visual Studio Code
- Rider

Presiona **F5** para iniciar con debugging.

## 📚 Recursos Útiles

- [ASP.NET Core Docs](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [C# Documentation](https://docs.microsoft.com/dotnet/csharp)

## 👥 Equipo

Backend desarrollado como parte del proyecto **Caffenio Innovacore**.

---

**Nota:** Este proyecto está configurado para comunicarse con el frontend en Electron + React.
