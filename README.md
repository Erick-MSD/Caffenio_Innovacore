# ☕ Caffenio Innovacore

Modern point-of-sale system for coffee shops with a complete tech stack: .NET 9 Backend + React Frontend + Electron Desktop App + Docker.

> **🌍 Español:** [README.es.md](README.es.md)

---

## 📖 Overview

**Caffenio Innovacore** is a comprehensive coffee shop management system designed for order taking, inventory management, and customer service. The application provides an intuitive touch-screen interface for employees to process orders, customize products, and manage real-time product availability.

### What is this project?
A full-stack point-of-sale (POS) system built for coffee shops that need:
- Fast order processing with product customization
- Real-time inventory availability tracking
- Order ticket generation for kitchen/cashier
- Modern, responsive touch-screen interface

### Key Features
- ✨ Interactive product catalog with category navigation (Hot, Cold, Food, Sweets)
- 🛒 Real-time shopping cart with dynamic order management
- 🎨 Advanced product customization (size, milk type, temperature, extras)
- 📦 Live inventory availability checking
- 🎫 Automatic order ticket generation (4-digit codes)
- 🔐 API key-based security
- 📱 Cross-platform desktop application (Electron)
- 🐳 Fully containerized with Docker

---

## 🏗️ Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React + Vite | 19.0.0 / 6.0.1 | UI Framework & Build Tool |
| **Styling** | TailwindCSS | 3.4.17 | Utility-first CSS |
| **Desktop** | Electron | 34.0.0 | Cross-platform desktop app |
| **Backend** | .NET Web API (C#) | 9.0 | RESTful API server |
| **Database** | SQL Server Express | 2022 | Relational database |
| **ORM** | Entity Framework Core | 9.0 | Database access layer |
| **Containerization** | Docker Compose | - | Service orchestration |
| **Package Manager** | pnpm | 9.15.4 | Fast, efficient npm alternative |

---

## 🚀 Quick Start (3 Steps)

### Prerequisites
```
✅ Docker Desktop (required)
✅ Node.js 18+ (required for frontend)
✅ pnpm (install: npm install -g pnpm)
```

### 1. Start Backend + Database

```powershell
docker-compose up -d --build
```

This command starts:
- 🗄️ **SQL Server 2022** on port `1433`
- 📊 **Database initialization** with tables and sample data
- 🚀 **Backend API** on port `5000`

### 2. Verify Backend

```powershell
# Check containers
docker-compose ps

# Test API health
Invoke-RestMethod -Uri "http://localhost:5000/api/health"
```

Expected response:
```json
{
  "status": "Healthy",
  "database": { "status": "Connected" }
}
```

### 3. Start Frontend

```powershell
cd frontend
pnpm install
pnpm run dev
```

✅ Application opens at: **http://localhost:5173**

---

## 📁 Project Structure

```
Caffenio_Innovacore/
│
├── 🎨 frontend/                    # Desktop application (Electron + React)
│   ├── electron/                  # Electron main process
│   │   ├── main.js               # Application entry point
│   │   └── preload.js            # Context bridge
│   │
│   ├── src/                       # React source code
│   │   ├── pages/                # Application pages
│   │   │   ├── Home.jsx          # Category selection
│   │   │   ├── ProductList.jsx   # Product catalog
│   │   │   ├── ProductCustomization.jsx
│   │   │   ├── OrderSummary.jsx  # Cart review
│   │   │   └── OrderConfirmation.jsx
│   │   ├── context/              # Global state management
│   │   │   ├── AuthContext.jsx   # Authentication
│   │   │   └── CartContext.jsx   # Shopping cart
│   │   ├── services/             # API integration
│   │   │   └── api.js            # HTTP client
│   │   └── main.jsx              # React entry point
│   │
│   ├── assets/                    # Static resources
│   │   ├── fonts/                # Gilroy font family
│   │   └── images/               # Product images & logo
│   │
│   ├── package.json              # Dependencies
│   └── vite.config.js            # Build configuration
│
├── ⚙️ backend/                     # REST API (.NET 9)
│   └── Caffenio.API/              # Main API project
│       ├── Controllers/          # HTTP endpoints
│       │   ├── ProductosController.cs   # Product catalog
│       │   ├── OrdenesController.cs     # Order management
│       │   └── HealthController.cs      # System health
│       │
│       ├── Models/               # Domain entities
│       │   ├── Product.cs        # Product model
│       │   ├── Orden.cs          # Order model
│       │   └── User.cs           # User model
│       │
│       ├── Middleware/           # Custom middleware
│       │   └── ApiKeyMiddleware.cs  # API security
│       │
│       ├── Data/                 # Database context
│       │   └── CaffenioDbContext.cs
│       │
│       └── Program.cs            # Application startup
│
├── 🗄️ db-init/                     # Database initialization
│   └── 01-init.sql               # Schema + sample data
│
├── 🐳 docker-compose.yml          # Service orchestration
└── 📄 README.md                   # This file
```

---

## 🎯 Implemented Features

### Frontend ✅
- [x] **Product Catalog** - Browse by category (Hot, Cold, Food, Sweets)
- [x] **Product Customization** - Size, milk type, temperature, extras
- [x] **Shopping Cart** - Add/remove items, quantity management
- [x] **Order Summary** - Review before payment
- [x] **Order Confirmation** - Display ticket number
- [x] **Authentication** - QR code login system
- [x] **Real-time Availability** - Shows unavailable products with visual feedback
- [x] **Responsive Design** - Optimized for touch screens

### Backend ✅
- [x] **Products API** - GET all products, filter by category/subcategory
- [x] **Availability Check** - Real-time product availability status
- [x] **Order Management** - POST new orders, GET order history
- [x] **Ticket Generation** - Automatic 4-digit ticket codes
- [x] **Order Tracking** - Status updates (Pending, In Progress, Ready, Delivered)
- [x] **API Security** - API key middleware authentication
- [x] **Health Checks** - Database connection monitoring
- [x] **CORS Configuration** - Frontend communication enabled
- [x] **Structured Logging** - Request/response logging

### Infrastructure ✅
- [x] **Docker Compose** - Full stack containerization
- [x] **SQL Server** - Database in container with health checks
- [x] **Auto-initialization** - Database schema created on first run
- [x] **Sample Data** - 11 products preloaded with availability flags

---

## 🔐 API Authentication

All API endpoints (except `/health`) require an API key header:

```bash
X-Api-Key: caffenio-2024-frontend-key
```

### Example Request

```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/productos" `
  -Headers @{"X-Api-Key"="caffenio-2024-frontend-key"} `
  -UseBasicParsing
```

**Security Note:** In production, use environment variables for API keys.

---

## 📡 API Endpoints

### Products
```
GET  /api/productos                           # All products
GET  /api/productos/categoria/{id}            # By category
GET  /api/productos/categoria/4/subcategoria/{id}  # By subcategory
GET  /api/productos/{id}/disponibilidad       # Check availability
```

### Orders
```
POST   /api/ordenes                    # Create new order
GET    /api/ordenes                    # Get all orders
GET    /api/ordenes/ticket/{ticket}    # Get order by ticket
PATCH  /api/ordenes/{id}/estado        # Update order status
```

### System
```
GET  /api/health                       # System health check
```

---

## 🗄️ Database Setup

The database is **automatically initialized** via Docker. No manual setup required.

### Connection Details (Development)
```
Server:   localhost,1433
Database: caffenio_innovacore
User:     sa
Password: CaffenioSecure2024!
```

⚠️ **Change credentials in production**

### Manual Database Access

```powershell
# Connect using sqlcmd (inside container)
docker exec -it caffenio_sqlserver /opt/mssql-tools18/bin/sqlcmd `
  -S localhost -U sa -P "CaffenioSecure2024!" -C
```

---

## 🐳 Docker Commands

```powershell
# Start all services
docker-compose up -d

# View status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f sqlserver

# Restart services
docker-compose restart backend

# Stop all services
docker-compose down

# Complete reset (removes data)
docker-compose down -v
docker-compose up -d --build
```

---

## 🔧 Development Workflow

### Backend Development (with Docker)
```powershell
# Make code changes, then rebuild
docker-compose up -d --build backend
```

### Backend Development (without Docker - debugging)
```powershell
cd backend/Caffenio.API
dotnet run
```

### Frontend Development
```powershell
cd frontend
pnpm run dev          # Web mode (http://localhost:5173)
pnpm run electron:dev # Desktop Electron app
```

---

## 📦 Sample Data

The system includes **11 products** across 4 categories:

| Category | Products | Availability |
|----------|----------|--------------|
| **Hot Drinks** | Americano, Capuccino, Chocolate | Chocolate unavailable ❌ |
| **Cold Drinks** | Frappé, Cold Brew | All available ✅ |
| **Food** | Sandwich, Ensalada | Ensalada unavailable ❌ |
| **Sweets** | Ice Cream (Vanilla/Chocolate), Chocolate Cake, Croissant | All available ✅ |

**Unavailable products** are displayed in the UI with:
- Grayscale image filter
- Disabled "+" button
- Red "(No disponible)" label
- Warning message

---

## 🎨 Design System

### Colors
- **Background:** `#E1E1E1`
- **Cards:** `#FFFFFF`
- **Primary (Green):** `#84CC16` (lime-500)
- **Secondary (Red):** `#EF4444` (red-500)

### Typography
**Gilroy Font Family** (included in `assets/fonts/`):
- Light (300), Regular (400), Medium (500)
- SemiBold (600), Bold (700), ExtraBold (800)

---

## 🔄 Workflow Example

1. **Select Category** → Navigate to Hot/Cold/Food/Sweets
2. **Choose Product** → Click on product card
3. **Customize** → Select size, milk type, extras (for hot/cold drinks)
4. **Add to Cart** → Product added with customizations
5. **Review Order** → View cart summary with totals
6. **Process Payment** → Order sent to backend
7. **Get Ticket** → Receive 4-digit ticket number for pickup

---

## 📈 Future Improvements

### High Priority
- Persist orders to SQL Server database (currently in-memory)
- Add user authentication with JWT tokens
- Implement admin dashboard for inventory management
- Product image management system

### Medium Priority
- Order history with date filtering
- Sales reports and analytics
- Customer loyalty program
- Multi-language support (English/Spanish)

### Low Priority
- Thermal printer integration for ticket printing
- Real-time order status notifications
- Mobile app version (React Native)
- Payment gateway integration

---

## 🧪 Testing

### Backend API Tests

```powershell
# Products endpoint
Invoke-WebRequest -Uri "http://localhost:5000/api/productos" `
  -Headers @{"X-Api-Key"="caffenio-2024-frontend-key"} `
  -UseBasicParsing

# Create test order
$order = @{
  clienteId = "1"
  subtotal = 70.00
  iva = 11.20
  descuento = 0.00
  total = 81.20
  items = @(
    @{
      productoId = 1
      productoNombre = "Americano"
      cantidad = 2
      precioUnitario = 35.00
      subtotal = 70.00
      personalizacion = @{ tamano = "Grande"; leche = "Entera" }
    }
  )
} | ConvertTo-Json -Depth 10

Invoke-WebRequest -Uri "http://localhost:5000/api/ordenes" `
  -Method Post `
  -Headers @{"X-Api-Key"="caffenio-2024-frontend-key"; "Content-Type"="application/json"} `
  -Body $order `
  -UseBasicParsing
```

---

## 🛠️ Troubleshooting

### Docker Issues

**Containers not starting:**
```powershell
docker-compose down -v
docker-compose up -d --build
```

**Port already in use:**
```powershell
# Stop conflicting services
docker ps
docker stop <container_id>
```

### Backend Issues

**API not responding:**
```powershell
# Check backend logs
docker-compose logs backend

# Restart backend
docker-compose restart backend
```

### Frontend Issues

**Port 5173 already in use:**
```powershell
# Kill process using port
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

**Build errors:**
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item pnpm-lock.yaml
pnpm install
```

---

## 👥 Team Development

Each developer has their own local database in Docker. No shared database conflicts.

### Sync with team:
```powershell
git pull
docker-compose down -v
docker-compose up -d --build
```

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🆘 Support

For issues or questions:
1. Check [Troubleshooting](#-troubleshooting) section
2. Review Docker logs: `docker-compose logs`
3. Verify containers: `docker-compose ps`

---

## 🎯 Project Status

**Current Version:** 1.0.0  
**Status:** ✅ Functional MVP - Ready for testing and enhancement  
**Last Updated:** February 2026

---

**Ready to start?** Run `docker-compose up -d --build` and open http://localhost:5173
