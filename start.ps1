# Quick Start Script - Caffenio Innovacore
# Run this script to start the entire project with one command

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   ☕ Caffenio Innovacore - Quick Start" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check Docker Desktop
Write-Host "1. Checking Docker Desktop..." -ForegroundColor Yellow
$dockerRunning = docker ps -q 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker Desktop is not running." -ForegroundColor Red
    Write-Host "   Please start Docker Desktop and run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ Docker Desktop is running" -ForegroundColor Green
Write-Host ""

# Start services
Write-Host "2. Starting services (this may take a few minutes the first time)..." -ForegroundColor Yellow
docker-compose up -d --build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error starting services" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Wait for services to be ready
Write-Host "3. Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Check status
Write-Host ""
Write-Host "4. Checking services..." -ForegroundColor Yellow
Write-Host ""
docker-compose ps
Write-Host ""

# Test backend
Write-Host "5. Testing backend connection..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get -ErrorAction Stop
    
    if ($response.database.status -eq "Connected") {
        Write-Host "✅ Backend connected to database" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Backend running but database not connected" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "⚠️  Backend still starting... (this is normal)" -ForegroundColor Yellow
    Write-Host "   Wait a few more seconds and check: http://localhost:5000/api/health" -ForegroundColor Gray
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   ✅ Project Started!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Available services:" -ForegroundColor White
Write-Host "   - Backend API:    http://localhost:5000" -ForegroundColor Gray
Write-Host "   - Health Check:   http://localhost:5000/api/health" -ForegroundColor Gray
Write-Host "   - Database:       localhost,1433" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Next step: Start the frontend" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   pnpm install" -ForegroundColor Gray
Write-Host "   pnpm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "🐳 Useful commands:" -ForegroundColor White
Write-Host "   docker-compose ps              - View status" -ForegroundColor Gray
Write-Host "   docker-compose logs -f backend - View backend logs" -ForegroundColor Gray
Write-Host "   docker-compose down            - Stop everything" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 More information:" -ForegroundColor White
Write-Host "   README.md (English)" -ForegroundColor Gray
Write-Host "   README.es.md (Español)" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Enter to exit..." -ForegroundColor Yellow
Read-Host
