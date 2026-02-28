using Microsoft.AspNetCore.Mvc;
using Caffenio.API.Models;

namespace Caffenio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly ILogger<ProductosController> _logger;

        // Mock data - productos con disponibilidad
        private static readonly List<Product> _productos = new()
        {
            // Calientes
            new Product { Id = 1, Name = "Americano", Description = "Café preparado con espresso y agua caliente, con un sabor más suave y menos intenso que el espresso.", Price = 35, Category = "Calientes", IsAvailable = true, ImageUrl = "/assets/images/americano.png" },
            new Product { Id = 2, Name = "Capuccino", Description = "Base de café espresso, leche caliente y una capa de espuma de leche en crema.", Price = 45, Category = "Calientes", IsAvailable = true, ImageUrl = "/assets/images/capuccino.png" },
            new Product { Id = 3, Name = "Chocolate", Description = "Base de leche y chocolate, también disponible con el carácter tóbic toque mexicano.", Price = 40, Category = "Calientes", IsAvailable = false, ImageUrl = "/assets/images/chocolate.png" }, // NO DISPONIBLE
            
            // Fríos
            new Product { Id = 4, Name = "Frappé", Description = "Bebida helada de café con leche y hielo.", Price = 55, Category = "Fríos", IsAvailable = true, ImageUrl = "/assets/images/frappe.png" },
            new Product { Id = 5, Name = "Cold Brew", Description = "Café preparado con agua fría durante varias horas.", Price = 50, Category = "Fríos", IsAvailable = true, ImageUrl = "/assets/images/coldbrew.png" },
            
            // Alimentos
            new Product { Id = 6, Name = "Sandwich", Description = "Sandwich fresco con ingredientes de calidad.", Price = 60, Category = "Alimentos", IsAvailable = true, ImageUrl = "/assets/images/sandwich.png" },
            new Product { Id = 7, Name = "Ensalada", Description = "Ensalada fresca del día.", Price = 55, Category = "Alimentos", IsAvailable = false, ImageUrl = "/assets/images/ensalada.png" }, // NO DISPONIBLE
            
            // Dulces - Nieve
            new Product { Id = 8, Name = "Helado de Vainilla", Description = "Nieve artesanal de vainilla.", Price = 35, Category = "Dulces-Nieve", IsAvailable = true, ImageUrl = "/assets/images/nieve-vainilla.png" },
            new Product { Id = 9, Name = "Helado de Chocolate", Description = "Nieve artesanal de chocolate.", Price = 35, Category = "Dulces-Nieve", IsAvailable = true, ImageUrl = "/assets/images/nieve-chocolate.png" },
            
            // Dulces - Repostería
            new Product { Id = 10, Name = "Pastel de Chocolate", Description = "Delicioso pastel de chocolate casero.", Price = 45, Category = "Dulces-Repostería", IsAvailable = true, ImageUrl = "/assets/images/pastel-chocolate.png" },
            new Product { Id = 11, Name = "Croissant", Description = "Croissant recién horneado.", Price = 30, Category = "Dulces-Repostería", IsAvailable = true, ImageUrl = "/assets/images/croissant.png" }
        };

        public ProductosController(ILogger<ProductosController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Obtener todos los productos
        /// </summary>
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProductos()
        {
            return Ok(_productos);
        }

        /// <summary>
        /// Obtener productos por categoría
        /// </summary>
        [HttpGet("categoria/{categoryId}")]
        public ActionResult<IEnumerable<Product>> GetProductosPorCategoria(int categoryId)
        {
            var categoriaMap = new Dictionary<int, string>
            {
                { 1, "Calientes" },
                { 2, "Fríos" },
                { 3, "Alimentos" }
            };

            if (!categoriaMap.ContainsKey(categoryId))
            {
                return BadRequest("Categoría inválida");
            }

            var productos = _productos.Where(p => p.Category == categoriaMap[categoryId]).ToList();
            return Ok(productos);
        }

        /// <summary>
        /// Obtener productos por subcategoría de Dulces
        /// </summary>
        [HttpGet("categoria/4/subcategoria/{subcategoryId}")]
        public ActionResult<IEnumerable<Product>> GetProductosPorSubcategoria(string subcategoryId)
        {
            var subcategoriaMap = new Dictionary<string, string>
            {
                { "nieve", "Dulces-Nieve" },
                { "reposteria", "Dulces-Repostería" }
            };

            if (!subcategoriaMap.ContainsKey(subcategoryId))
            {
                return BadRequest("Subcategoría inválida");
            }

            var productos = _productos.Where(p => p.Category == subcategoriaMap[subcategoryId]).ToList();
            return Ok(productos);
        }

        /// <summary>
        /// Verificar disponibilidad de un producto
        /// </summary>
        [HttpGet("{id}/disponibilidad")]
        public ActionResult<bool> GetDisponibilidad(int id)
        {
            var producto = _productos.FirstOrDefault(p => p.Id == id);
            if (producto == null)
            {
                return NotFound();
            }
            
            return Ok(new { disponible = producto.IsAvailable });
        }

        /// <summary>
        /// Obtener producto por ID
        /// </summary>
        [HttpGet("{id}")]
        public ActionResult<Product> GetProducto(int id)
        {
            var producto = _productos.FirstOrDefault(p => p.Id == id);
            if (producto == null)
            {
                return NotFound();
            }
            
            return Ok(producto);
        }
    }
}
