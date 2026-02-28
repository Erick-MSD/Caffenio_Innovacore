namespace Caffenio.API.Models
{
    public class Orden
    {
        public int Id { get; set; }
        public string NumeroTicket { get; set; } = string.Empty;
        public string? ClienteId { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Iva { get; set; }
        public decimal Descuento { get; set; }
        public decimal Total { get; set; }
        public string Estado { get; set; } = "Pendiente"; // Pendiente, EnPreparacion, Listo, Entregado
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<OrdenItem> Items { get; set; } = new();
    }

    public class OrdenItem
    {
        public int Id { get; set; }
        public int OrdenId { get; set; }
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; } = string.Empty;
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal { get; set; }
        public string? Personalizacion { get; set; } // JSON con personalización
    }
}
