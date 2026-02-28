using Microsoft.AspNetCore.Mvc;
using Caffenio.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Caffenio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly CaffenioDbContext _context;

        public HealthController(CaffenioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            bool dbConnected = false;
            string dbStatus = "Disconnected";

            try
            {
                // Verificar conexión a la base de datos
                dbConnected = await _context.Database.CanConnectAsync();
                dbStatus = dbConnected ? "Connected" : "Disconnected";
            }
            catch (Exception ex)
            {
                dbStatus = $"Error: {ex.Message}";
            }

            return Ok(new
            {
                Status = dbConnected ? "Healthy" : "Degraded",
                Timestamp = DateTime.UtcNow,
                Service = "Caffenio.API",
                Version = "1.0.0",
                Database = new
                {
                    Status = dbStatus,
                    Connected = dbConnected
                }
            });
        }
    }
}
