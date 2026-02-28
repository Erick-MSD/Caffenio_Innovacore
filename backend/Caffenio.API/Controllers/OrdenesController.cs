using Microsoft.AspNetCore.Mvc;
using Caffenio.API.Models;
using System.Text.Json;

namespace Caffenio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdenesController : ControllerBase
    {
        private readonly ILogger<OrdenesController> _logger;
        
        // Mock storage - en producción esto iría a la base de datos
        private static readonly List<Orden> _ordenes = new();
        private static int _nextId = 1;

        public OrdenesController(ILogger<OrdenesController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Crear una nueva orden
        /// </summary>
        [HttpPost]
        public ActionResult<Orden> CrearOrden([FromBody] CrearOrdenRequest request)
        {
            try
            {
                // Generar número de ticket único
                var numeroTicket = GenerarNumeroTicket();

                // Crear orden
                var orden = new Orden
                {
                    Id = _nextId++,
                    NumeroTicket = numeroTicket,
                    ClienteId = request.ClienteId,
                    Subtotal = request.Subtotal,
                    Iva = request.Iva,
                    Descuento = request.Descuento,
                    Total = request.Total,
                    Estado = "Pendiente",
                    CreatedAt = DateTime.UtcNow,
                    Items = request.Items.Select(i => new OrdenItem
                    {
                        Id = 0,
                        OrdenId = 0,
                        ProductoId = i.ProductoId,
                        ProductoNombre = i.ProductoNombre,
                        Cantidad = i.Cantidad,
                        PrecioUnitario = i.PrecioUnitario,
                        Subtotal = i.Subtotal,
                        Personalizacion = i.Personalizacion != null ? JsonSerializer.Serialize(i.Personalizacion) : null
                    }).ToList()
                };

                _ordenes.Add(orden);

                _logger.LogInformation($"Nueva orden creada - Ticket: {numeroTicket}, Total: ${orden.Total}");

                return Ok(new 
                { 
                    success = true,
                    numeroTicket = numeroTicket,
                    ordenId = orden.Id,
                    total = orden.Total,
                    mensaje = "Pasa a caja con tu número de ticket"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear orden");
                return StatusCode(500, new { success = false, mensaje = "Error al procesar tu orden" });
            }
        }

        /// <summary>
        /// Obtener todas las órdenes
        /// </summary>
        [HttpGet]
        public ActionResult<IEnumerable<Orden>> GetOrdenes()
        {
            return Ok(_ordenes.OrderByDescending(o => o.CreatedAt));
        }

        /// <summary>
        /// Obtener orden por número de ticket
        /// </summary>
        [HttpGet("ticket/{numeroTicket}")]
        public ActionResult<Orden> GetOrdenPorTicket(string numeroTicket)
        {
            var orden = _ordenes.FirstOrDefault(o => o.NumeroTicket == numeroTicket);
            if (orden == null)
            {
                return NotFound(new { mensaje = "Orden no encontrada" });
            }
            
            return Ok(orden);
        }

        /// <summary>
        /// Actualizar estado de la orden
        /// </summary>
        [HttpPatch("{id}/estado")]
        public ActionResult ActualizarEstado(int id, [FromBody] ActualizarEstadoRequest request)
        {
            var orden = _ordenes.FirstOrDefault(o => o.Id == id);
            if (orden == null)
            {
                return NotFound();
            }

            orden.Estado = request.Estado;
            _logger.LogInformation($"Orden {id} actualizada a estado: {request.Estado}");

            return Ok(new { success = true, mensaje = $"Orden actualizada a {request.Estado}" });
        }

        private string GenerarNumeroTicket()
        {
            // Generar número de 4 dígitos único
            var random = new Random();
            string ticket;
            do
            {
                ticket = random.Next(1000, 10000).ToString();
            } while (_ordenes.Any(o => o.NumeroTicket == ticket));

            return ticket;
        }
    }

    // DTOs para requests
    public class CrearOrdenRequest
    {
        public string? ClienteId { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Iva { get; set; }
        public decimal Descuento { get; set; }
        public decimal Total { get; set; }
        public List<CrearOrdenItemRequest> Items { get; set; } = new();
    }

    public class CrearOrdenItemRequest
    {
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; } = string.Empty;
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal { get; set; }
        public object? Personalizacion { get; set; }
    }

    public class ActualizarEstadoRequest
    {
        public string Estado { get; set; } = string.Empty;
    }
}
