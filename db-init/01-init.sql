-- =============================================
-- Script de Inicialización de Base de Datos
-- Caffenio Innovacore
-- =============================================

USE master;
GO

-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'caffenio_innovacore')
BEGIN
    CREATE DATABASE caffenio_innovacore;
    PRINT 'Base de datos caffenio_innovacore creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'La base de datos caffenio_innovacore ya existe.';
END
GO

-- Usar la base de datos
USE caffenio_innovacore;
GO

-- =============================================
-- Crear Tablas
-- =============================================

-- Tabla: CategoriaProducto
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CategoriaProducto]') AND type in (N'U'))
BEGIN
    CREATE TABLE [CategoriaProducto] (
        [CategoriaID] INT IDENTITY(1,1) NOT NULL,
        [NombreCategoria] VARCHAR(50) NOT NULL,
        [FechaCreacion] DATETIME DEFAULT GETDATE(),
        CONSTRAINT PK_CategoriaProducto PRIMARY KEY([CategoriaID])
    );
    PRINT 'Tabla CategoriaProducto creada.';
END
GO

-- Tabla: Producto
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Producto]') AND type in (N'U'))
BEGIN
    CREATE TABLE [Producto] (
        [ProductoID] INT IDENTITY(1,1) NOT NULL,
        [CategoriaID] INT NOT NULL,
        [Nombre] VARCHAR(100) NOT NULL,
        [Descripcion] VARCHAR(255),
        [PrecioBase] DECIMAL(10,2) NOT NULL,
        [Activo] BIT DEFAULT 1,
        [FechaCreacion] DATETIME DEFAULT GETDATE(),
        CONSTRAINT PK_Producto PRIMARY KEY([ProductoID]),
        CONSTRAINT FK_Producto_CategoriaProducto FOREIGN KEY([CategoriaID])
            REFERENCES [CategoriaProducto]([CategoriaID])
            ON UPDATE CASCADE ON DELETE CASCADE
    );
    PRINT 'Tabla Producto creada.';
END
GO

-- Tabla: VarianteProducto
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[VarianteProducto]') AND type in (N'U'))
BEGIN
    CREATE TABLE [VarianteProducto] (
        [VarianteID] INT IDENTITY(1,1) NOT NULL,
        [ProductoID] INT NOT NULL,
        [Tamano] VARCHAR(20) NOT NULL,
        [TipoPreparacion] VARCHAR(50) NOT NULL,
        [PrecioFinal] DECIMAL(10,2) NOT NULL,
        [Activo] BIT DEFAULT 1,
        [FechaCreacion] DATETIME DEFAULT GETDATE(),
        CONSTRAINT PK_VarianteProducto PRIMARY KEY([VarianteID]),
        CONSTRAINT FK_VarianteProducto_Producto FOREIGN KEY([ProductoID])
            REFERENCES [Producto]([ProductoID])
            ON UPDATE CASCADE ON DELETE CASCADE
    );
    PRINT 'Tabla VarianteProducto creada.';
END
GO

-- Tabla: Inventario
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Inventario]') AND type in (N'U'))
BEGIN
    CREATE TABLE [Inventario] (
        [InventarioID] INT IDENTITY(1,1) NOT NULL,
        [VarianteID] INT NOT NULL,
        [CantidadDisponible] INT NOT NULL DEFAULT 0,
        [FechaActualizacion] DATETIME DEFAULT GETDATE(),
        CONSTRAINT PK_Inventario PRIMARY KEY([InventarioID]),
        CONSTRAINT FK_Inventario_VarianteProducto FOREIGN KEY([VarianteID])
            REFERENCES [VarianteProducto]([VarianteID])
            ON UPDATE CASCADE ON DELETE CASCADE
    );
    PRINT 'Tabla Inventario creada.';
END
GO

-- Tabla: Cliente
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Cliente]') AND type in (N'U'))
BEGIN
    CREATE TABLE [Cliente] (
        [ClienteID] INT IDENTITY(1,1) NOT NULL,
        [Nombre] VARCHAR(100) NOT NULL,
        [TipoCliente] VARCHAR(20) NOT NULL, -- 'Regular', 'VIP', 'Mayorista'
        [Telefono] VARCHAR(20),
        [Email] VARCHAR(100),
        [FechaRegistro] DATETIME DEFAULT GETDATE(),
        [Activo] BIT DEFAULT 1,
        CONSTRAINT PK_Cliente PRIMARY KEY([ClienteID])
    );
    PRINT 'Tabla Cliente creada.';
END
GO

-- Tabla: Orden
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Orden]') AND type in (N'U'))
BEGIN
    CREATE TABLE [Orden] (
        [OrdenID] INT IDENTITY(1,1) NOT NULL,
        [ClienteID] INT NOT NULL,
        [Fecha] DATETIME DEFAULT GETDATE(),
        [Total] DECIMAL(10,2) NOT NULL,
        [MetodoPago] VARCHAR(50), -- 'Efectivo', 'Tarjeta', 'Transferencia'
        [Estado] VARCHAR(20) DEFAULT 'Pendiente', -- 'Pendiente', 'Completada', 'Cancelada'
        CONSTRAINT PK_Orden PRIMARY KEY([OrdenID]),
        CONSTRAINT FK_Orden_Cliente FOREIGN KEY([ClienteID])
            REFERENCES [Cliente]([ClienteID])
            ON UPDATE CASCADE ON DELETE NO ACTION
    );
    PRINT 'Tabla Orden creada.';
END
GO

-- Tabla: DetalleOrden
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DetalleOrden]') AND type in (N'U'))
BEGIN
    CREATE TABLE [DetalleOrden] (
        [DetalleID] INT IDENTITY(1,1) NOT NULL,
        [OrdenID] INT NOT NULL,
        [VarianteID] INT NOT NULL,
        [Cantidad] INT NOT NULL,
        [PrecioUnitario] DECIMAL(10,2) NOT NULL,
        [Subtotal] DECIMAL(10,2) NOT NULL,
        CONSTRAINT PK_DetalleOrden PRIMARY KEY([DetalleID]),
        CONSTRAINT FK_DetalleOrden_Orden FOREIGN KEY([OrdenID])
            REFERENCES [Orden]([OrdenID])
            ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT FK_DetalleOrden_VarianteProducto FOREIGN KEY([VarianteID])
            REFERENCES [VarianteProducto]([VarianteID])
            ON UPDATE NO ACTION ON DELETE NO ACTION
    );
    PRINT 'Tabla DetalleOrden creada.';
END
GO

-- =============================================
-- Crear Índices para mejor performance
-- =============================================

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Producto_CategoriaID')
BEGIN
    CREATE INDEX IX_Producto_CategoriaID ON Producto(CategoriaID);
    PRINT 'Índice IX_Producto_CategoriaID creado.';
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_VarianteProducto_ProductoID')
BEGIN
    CREATE INDEX IX_VarianteProducto_ProductoID ON VarianteProducto(ProductoID);
    PRINT 'Índice IX_VarianteProducto_ProductoID creado.';
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Orden_ClienteID')
BEGIN
    CREATE INDEX IX_Orden_ClienteID ON Orden(ClienteID);
    PRINT 'Índice IX_Orden_ClienteID creado.';
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Orden_Fecha')
BEGIN
    CREATE INDEX IX_Orden_Fecha ON Orden(Fecha);
    PRINT 'Índice IX_Orden_Fecha creado.';
END
GO

-- =============================================
-- Insertar Datos de Ejemplo
-- =============================================

-- Categorías
IF NOT EXISTS (SELECT 1 FROM CategoriaProducto)
BEGIN
    INSERT INTO CategoriaProducto (NombreCategoria) VALUES
        ('Café Caliente'),
        ('Café Frío'),
        ('Bebidas Especiales'),
        ('Repostería'),
        ('Snacks');
    PRINT 'Datos de ejemplo insertados en CategoriaProducto.';
END
GO

-- Productos
IF NOT EXISTS (SELECT 1 FROM Producto)
BEGIN
    INSERT INTO Producto (CategoriaID, Nombre, Descripcion, PrecioBase) VALUES
        (1, 'Café Americano', 'Café clásico americano', 2.50),
        (1, 'Café Espresso', 'Espresso intenso', 2.00),
        (1, 'Café Latte', 'Café con leche cremoso', 3.50),
        (1, 'Cappuccino', 'Espresso con espuma de leche', 3.50),
        (2, 'Frappuccino', 'Café frío batido', 4.50),
        (2, 'Cold Brew', 'Café de extracción fría', 4.00),
        (3, 'Chocolate Caliente', 'Chocolate cremoso', 3.00),
        (4, 'Croissant', 'Croissant de mantequilla', 2.50),
        (4, 'Muffin', 'Muffin de arándanos', 2.00),
        (5, 'Sandwich', 'Sandwich de jamón y queso', 4.00);
    PRINT 'Datos de ejemplo insertados en Producto.';
END
GO

-- Variantes de Productos
IF NOT EXISTS (SELECT 1 FROM VarianteProducto)
BEGIN
    -- Variantes para Café Americano
    INSERT INTO VarianteProducto (ProductoID, Tamano, TipoPreparacion, PrecioFinal) VALUES
        (1, 'Pequeño', 'Regular', 2.50),
        (1, 'Mediano', 'Regular', 3.00),
        (1, 'Grande', 'Regular', 3.50);
    
    -- Variantes para Café Latte
    INSERT INTO VarianteProducto (ProductoID, Tamano, TipoPreparacion, PrecioFinal) VALUES
        (3, 'Pequeño', 'Caliente', 3.50),
        (3, 'Mediano', 'Caliente', 4.00),
        (3, 'Grande', 'Caliente', 4.50),
        (3, 'Mediano', 'Helado', 4.50);
    
    PRINT 'Datos de ejemplo insertados en VarianteProducto.';
END
GO

-- Inventario inicial
IF NOT EXISTS (SELECT 1 FROM Inventario)
BEGIN
    INSERT INTO Inventario (VarianteID, CantidadDisponible) VALUES
        (1, 100),
        (2, 100),
        (3, 100),
        (4, 50),
        (5, 50),
        (6, 50),
        (7, 30);
    PRINT 'Datos de ejemplo insertados en Inventario.';
END
GO

-- Cliente de ejemplo
IF NOT EXISTS (SELECT 1 FROM Cliente)
BEGIN
    INSERT INTO Cliente (Nombre, TipoCliente, Telefono, Email) VALUES
        ('Cliente General', 'Regular', NULL, NULL),
        ('Juan Pérez', 'Regular', '555-1234', 'juan@example.com'),
        ('María García', 'VIP', '555-5678', 'maria@example.com');
    PRINT 'Datos de ejemplo insertados en Cliente.';
END
GO

PRINT '================================================';
PRINT 'Base de datos caffenio_innovacore configurada exitosamente!';
PRINT '================================================';
GO
