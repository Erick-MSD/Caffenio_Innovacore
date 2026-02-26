# Script para inicializar la base de datos manualmente
# Caffenio Innovacore

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Inicializando Base de Datos Caffenio Innovacore" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que Docker esté corriendo
Write-Host "1. Verificando Docker..." -ForegroundColor Yellow
$dockerRunning = docker ps -q
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Docker no está corriendo. Por favor, inicia Docker Desktop." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker está corriendo" -ForegroundColor Green
Write-Host ""

# Verificar si el contenedor ya existe
Write-Host "2. Verificando contenedor SQL Server..." -ForegroundColor Yellow
$containerExists = docker ps -a --filter "name=caffenio_sqlserver" --format "{{.Names}}"
if ($containerExists) {
    Write-Host "⚠️  El contenedor caffenio_sqlserver ya existe" -ForegroundColor Yellow
    $response = Read-Host "¿Deseas eliminarlo y recrearlo? (S/N)"
    if ($response -eq "S" -or $response -eq "s") {
        Write-Host "Eliminando contenedor existente..." -ForegroundColor Yellow
        docker-compose down -v
        Write-Host "✅ Contenedor eliminado" -ForegroundColor Green
    } else {
        Write-Host "❌ Operación cancelada" -ForegroundColor Red
        exit 0
    }
}
Write-Host ""

# Levantar el contenedor
Write-Host "3. Levantando SQL Server en Docker..." -ForegroundColor Yellow
docker-compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al levantar el contenedor" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Contenedor iniciado" -ForegroundColor Green
Write-Host ""

# Esperar a que SQL Server esté listo
Write-Host "4. Esperando a que SQL Server esté listo..." -ForegroundColor Yellow
$maxAttempts = 30
$attempt = 0
$ready = $false

while ($attempt -lt $maxAttempts -and -not $ready) {
    $attempt++
    Write-Host "   Intento $attempt de $maxAttempts..." -ForegroundColor Gray
    
    $result = docker exec caffenio_sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "CaffenioSecure2024!" -C -Q "SELECT 1" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        $ready = $true
        Write-Host "✅ SQL Server está listo!" -ForegroundColor Green
    } else {
        Start-Sleep -Seconds 2
    }
}

if (-not $ready) {
    Write-Host "❌ Timeout esperando a SQL Server" -ForegroundColor Red
    Write-Host "Ver logs con: docker logs caffenio_sqlserver" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Ejecutar el script de inicialización
Write-Host "5. Ejecutando script de inicialización..." -ForegroundColor Yellow
docker exec -i caffenio_sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "CaffenioSecure2024!" -C -i /docker-entrypoint-initdb.d/01-init.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Script ejecutado exitosamente" -ForegroundColor Green
} else {
    Write-Host "⚠️  Hubo problemas al ejecutar el script (puede que ya esté inicializado)" -ForegroundColor Yellow
}
Write-Host ""

# Verificar la base de datos
Write-Host "6. Verificando base de datos..." -ForegroundColor Yellow
$dbExists = docker exec caffenio_sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "CaffenioSecure2024!" -C -Q "SELECT name FROM sys.databases WHERE name = 'caffenio_innovacore'" -h -1
if ($dbExists -match "caffenio_innovacore") {
    Write-Host "✅ Base de datos 'caffenio_innovacore' encontrada" -ForegroundColor Green
} else {
    Write-Host "❌ Base de datos no encontrada" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Mostrar información de conexión
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "✅ ¡Base de Datos Configurada Exitosamente!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Información de Conexión:" -ForegroundColor Yellow
Write-Host "   Servidor: localhost,1433" -ForegroundColor White
Write-Host "   Base de Datos: caffenio_innovacore" -ForegroundColor White
Write-Host "   Usuario: sa" -ForegroundColor White
Write-Host "   Contraseña: CaffenioSecure2024!" -ForegroundColor White
Write-Host ""
Write-Host "📊 Comandos Útiles:" -ForegroundColor Yellow
Write-Host "   Ver logs:        docker logs caffenio_sqlserver" -ForegroundColor White
Write-Host "   Detener:         docker-compose down" -ForegroundColor White
Write-Host "   Reiniciar:       docker-compose restart" -ForegroundColor White
Write-Host "   Eliminar todo:   docker-compose down -v" -ForegroundColor White
Write-Host ""
Write-Host "🚀 El backend ya está configurado para conectarse automáticamente" -ForegroundColor Green
Write-Host ""
