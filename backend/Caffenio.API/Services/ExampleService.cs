namespace Caffenio.API.Services
{
    /// <summary>
    /// Interfaz de ejemplo para servicios
    /// Implementa el patrón Repository/Service
    /// </summary>
    public interface IExampleService
    {
        Task<string> GetExampleDataAsync();
    }

    public class ExampleService : IExampleService
    {
        public async Task<string> GetExampleDataAsync()
        {
            // Simular operación asíncrona
            await Task.Delay(100);
            return "Example Data";
        }
    }
}
