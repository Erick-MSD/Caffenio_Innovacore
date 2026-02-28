namespace Caffenio.API.Middleware
{
    /// <summary>
    /// Middleware simple de seguridad con API Key
    /// </summary>
    public class ApiKeyMiddleware
    {
        private readonly RequestDelegate _next;
        private const string API_KEY_HEADER = "X-Api-Key";
        private const string VALID_API_KEY = "caffenio-2024-frontend-key";

        public ApiKeyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Permitir endpoints de health y swagger sin autenticación
            var path = context.Request.Path.Value?.ToLower() ?? "";
            if (path.Contains("/health") || path.Contains("/swagger") || path.Contains("/openapi"))
            {
                await _next(context);
                return;
            }

            // Verificar API Key para otros endpoints
            if (!context.Request.Headers.TryGetValue(API_KEY_HEADER, out var extractedApiKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsJsonAsync(new { mensaje = "API Key requerida" });
                return;
            }

            if (!VALID_API_KEY.Equals(extractedApiKey))
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsJsonAsync(new { mensaje = "API Key inválida" });
                return;
            }

            await _next(context);
        }
    }
}
