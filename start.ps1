# Script de Inicio Rápido - Caffenio Innovacore
# Ejecuta este script para levantar todo el proyecto con un solo comando

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   ☕ Caffenio Innovacore - Inicio Rápido" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Docker Desktop
Write-Host "1. Verificando Docker Desktop..." -ForegroundColor Yellow
$dockerRunning = docker ps -q 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker Desktop no está corriendo." -ForegroundColor Red
    Write-Host "   Por favor, inicia Docker Desktop y vuelve a ejecutar este script." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Presiona Enter para salir"
    exit 1
}
Write-Host "✅ Docker Desktop está corriendo" -ForegroundColor Green
Write-Host ""

# Levantar servicios
Write-Host "2. Levantando servicios (esto puede tardar unos minutos la primera vez)..." -ForegroundColor Yellow
docker-compose up -d --build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al levantar los servicios" -ForegroundColor Red
    Write-Host ""
    Read-Host "Presiona Enter para salir"
    exit 1
}
Write-Host ""

# Esperar a que los servicios estén listos
Write-Host "3. Esperando a que los servicios estén listos..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar estado
Write-Host ""
Write-Host "4. Verificando servicios..." -ForegroundColor Yellow
Write-Host ""
docker-compose ps
Write-Host ""

# Probar el backend
Write-Host "5. Probando conexión al backend..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get -ErrorAction Stop
    
    if ($response.Database.Connected) {
        Write-Host "✅ Backend conectado a la base de datos" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Backend corriendo pero la BD no está conectada" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "❌ No se pudo conectar al backend" -ForegroundColor Red
    Write-Host "   El servicio puede estar iniciando aún. Espera unos segundos más." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   ✅ ¡Proyecto Iniciado!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Servicios disponibles:" -ForegroundColor White
Write-Host "   - Backend API:    http://localhost:5000" -ForegroundColor Gray
Write-Host "   - Health Check:   http://localhost:5000/api/health" -ForegroundColor Gray
Write-Host "   - Base de Datos:  localhost,1433" -ForegroundColor Gray
Write-Host ""
Write-Host "🐳 Comandos útiles:" -ForegroundColor White
Write-Host "   docker-compose ps              - Ver estado" -ForegroundColor Gray
Write-Host "   docker-compose logs -f backend - Ver logs del backend" -ForegroundColor Gray
Write-Host "   docker-compose down            - Detener todo" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Más información en:" -ForegroundColor White
Write-Host "   README.md" -ForegroundColor Gray
Write-Host "   INICIO_RAPIDO.md" -ForegroundColor Gray
Write-Host ""
Write-Host "Presiona Enter para salir..." -ForegroundColor Yellow
Read-Host
