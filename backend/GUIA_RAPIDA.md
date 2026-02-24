# 🚀 Guía Rápida para el Desarrollador Backend

## ⚡ Inicio Rápido (5 minutos)

### 1. **Verificar instalación de .NET**
```bash
dotnet --version
# Debería mostrar: 9.0.x
```

### 2. **Navegar al proyecto**
```bash
cd backend/Caffenio.API
```

### 3. **Ejecutar la API**
```bash
dotnet run
```

### 4. **Probar que funciona**
Abre en tu navegador: https://localhost:5001/api/health

Deberías ver:
```json
{
  "Status": "Healthy",
  "Timestamp": "2026-02-23T...",
  "Service": "Caffenio.API",
  "Version": "1.0.0"
}
```

✅ **¡Listo! La API está funcionando.**

---

## 📁 Estructura del Código

```
Caffenio.API/
├── Controllers/              # 🎮 Controladores (endpoints HTTP)
│   └── HealthController.cs  # Ejemplo de controller
│
├── Models/                  # 📦 Modelos de dominio
│   ├── Product.cs          # Ejemplo: Producto
│   └── User.cs             # Ejemplo: Usuario
│
├── DTOs/                    # 📮 Data Transfer Objects
│   ├── ApiResponse.cs      # Respuesta estándar de API
│   └── AuthDTOs.cs         # DTOs de autenticación
│
├── Services/                # 🔧 Lógica de negocio
│   └── ExampleService.cs   # Ejemplo de servicio
│
├── Repositories/            # 💾 Acceso a datos (por implementar)
│
├── Middleware/              # ⚙️ Middleware personalizado
│   └── RequestLoggingMiddleware.cs
│
└── Program.cs              # 🚪 Punto de entrada
```

---

## 🎯 Flujo de Trabajo Recomendado

### **Paso 1: Crear un nuevo endpoint**

1. **Crear el Modelo** (`Models/`)
```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

2. **Crear los DTOs** (`DTOs/`)
```csharp
public class CreateProductRequest
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

3. **Crear el Service** (`Services/`)
```csharp
public interface IProductService
{
    Task<List<Product>> GetAllAsync();
}

public class ProductService : IProductService
{
    public async Task<List<Product>> GetAllAsync()
    {
        // Tu lógica aquí
    }
}
```

4. **Registrar el Service** (`Program.cs`)
```csharp
builder.Services.AddScoped<IProductService, ProductService>();
```

5. **Crear el Controller** (`Controllers/`)
```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _service.GetAllAsync();
        return Ok(ApiResponse<List<Product>>.SuccessResponse(products));
    }
}
```

---

## 🛠️ Comandos Útiles

### **Desarrollo**
```bash
# Ejecutar en modo desarrollo
dotnet run

# Ejecutar con hot reload
dotnet watch run

# Ejecutar en modo específico
dotnet run --launch-profile https
```

### **Build**
```bash
# Compilar
dotnet build

# Limpiar
dotnet clean

# Publicar
dotnet publish -c Release
```

### **Dependencias**
```bash
# Restaurar paquetes
dotnet restore

# Agregar paquete
dotnet add package NombrePaquete

# Listar paquetes
dotnet list package
```

### **Entity Framework (cuando lo uses)**
```bash
# Crear migración
dotnet ef migrations add NombreMigracion

# Aplicar migraciones
dotnet ef database update

# Eliminar última migración
dotnet ef migrations remove

# Ver migraciones
dotnet ef migrations list
```

---

## 🔥 Tips y Mejores Prácticas

### ✅ **DO's (Haz esto)**
1. **Usa inyección de dependencias** para todos los servicios
2. **Separa lógica de negocio** en Services (no en Controllers)
3. **Usa DTOs** para requests/responses (no expongas Models directamente)
4. **Maneja errores** con try-catch y devuelve respuestas apropiadas
5. **Usa async/await** para operaciones I/O
6. **Valida inputs** antes de procesarlos
7. **Documenta endpoints** con comentarios XML

### ❌ **DON'Ts (Evita esto)**
1. **No pongas lógica de negocio en Controllers**
2. **No uses `var` sin saber el tipo** (excepto LINQ obvio)
3. **No ignores excepciones** sin loggearlas
4. **No uses strings mágicos** - usa constantes o enums
5. **No hagas queries directas en Controllers** - usa Repositories/Services

---

## 🐛 Debugging

### En Visual Studio Code
1. Presiona **F5** o ve a "Run and Debug"
2. Selecciona ".NET Core Launch (web)"
3. Pon breakpoints haciendo click a la izquierda de los números de línea

### En Visual Studio
1. Presiona **F5**
2. Pon breakpoints haciendo click a la izquierda de los números de línea

---

## 📡 Probar la API

### **Opción 1: En el navegador**
Para endpoints GET simples:
```
https://localhost:5001/api/health
```

### **Opción 2: Con cURL**
```bash
curl https://localhost:5001/api/health -k
```

### **Opción 3: Postman / Insomnia**
Importa y prueba endpoints desde estas apps.

### **Opción 4: HTTPie**
```bash
http https://localhost:5001/api/health
```

### **Opción 5: REST Client (VS Code)**
Crea un archivo `.http`:
```http
###
GET https://localhost:5001/api/health
```

---

## 🔐 Configuración de Seguridad

### Variables de Entorno Sensibles
**NO subas a Git:**
- `appsettings.Development.json`
- `appsettings.Production.json`
- Archivos con contraseñas o secrets

**Ejemplo de appsettings.Development.json:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CaffenioDB;..."
  },
  "Jwt": {
    "Key": "tu-clave-secreta-super-larga"
  }
}
```

---

## 📚 Recursos Recomendados

### **Documentación Oficial**
- [ASP.NET Core Fundamentals](https://learn.microsoft.com/aspnet/core/fundamentals/)
- [Entity Framework Core](https://learn.microsoft.com/ef/core/)
- [C# Programming Guide](https://learn.microsoft.com/dotnet/csharp/)

### **Tutoriales**
- [Build a Web API with ASP.NET Core](https://learn.microsoft.com/aspnet/core/tutorials/first-web-api)
- [REST API Best Practices](https://learn.microsoft.com/azure/architecture/best-practices/api-design)

### **Videos**
- [ASP.NET Core Tutorial for Beginners](https://www.youtube.com/results?search_query=asp+net+core+tutorial)
- [Entity Framework Core Tutorial](https://www.youtube.com/results?search_query=entity+framework+core)

---

## 🆘 Ayuda Rápida

### **Error: Puerto en uso**
```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

### **Error: Certificate issue**
```bash
dotnet dev-certs https --trust
```

### **Error: Compilación falla**
```bash
dotnet clean
dotnet restore
dotnet build
```

---

## ✉️ Contacto

Si tienes dudas o problemas:
1. Revisa la [documentación completa](./README.md)
2. Pregunta al equipo
3. Revisa los issues en el repositorio

---

**¡Éxito con el desarrollo! 🚀**
