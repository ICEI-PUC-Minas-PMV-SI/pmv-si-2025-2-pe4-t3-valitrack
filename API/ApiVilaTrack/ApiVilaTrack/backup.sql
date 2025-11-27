-- =============================================
-- ValiTrack Database Backup
-- Generated: 2025-10-28
-- Database: ValiTrackDB
-- =============================================

USE master;
GO

-- Drop database if exists
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'ValiTrackDB')
BEGIN
    ALTER DATABASE ValiTrackDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE ValiTrackDB;
END
GO

-- Create database
CREATE DATABASE ValiTrackDB;
GO

USE ValiTrackDB;
GO

-- =============================================
-- CREATE TABLES
-- =============================================

-- Table: Catalogs
CREATE TABLE [Catalogs] (
    [InternalCode] NVARCHAR(450) NOT NULL,
    [Name] NVARCHAR(MAX) NOT NULL,
    [Section] NVARCHAR(MAX) NOT NULL,
    [Quantity] REAL NOT NULL,
    CONSTRAINT [PK_Catalogs] PRIMARY KEY ([InternalCode])
);
GO

-- Table: Statuses
CREATE TABLE [Statuses] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Description] NVARCHAR(MAX) NOT NULL,
    CONSTRAINT [PK_Statuses] PRIMARY KEY ([Id])
);
GO

-- Table: Users
CREATE TABLE [Users] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(MAX) NOT NULL,
    [Senha] NVARCHAR(MAX) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
);
GO

-- Table: StockProducts
CREATE TABLE [StockProducts] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [InternalCode] NVARCHAR(450) NOT NULL,
    [ExpirationDate] DATE NOT NULL,
    [UnitType] NVARCHAR(MAX) NULL,
    [OriginalPrice] REAL NULL,
    [PromotionalPrice] REAL NULL,
    [CostPrice] REAL NULL,
    [Priority] INT NULL,
    [StatusId] INT NOT NULL,
    [UpdatedBy] NVARCHAR(MAX) NULL,
    [ControlDate] DATE NULL,
    CONSTRAINT [PK_StockProducts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_StockProducts_Catalogs_InternalCode] FOREIGN KEY ([InternalCode]) 
        REFERENCES [Catalogs]([InternalCode]) ON DELETE CASCADE,
    CONSTRAINT [FK_StockProducts_Statuses_StatusId] FOREIGN KEY ([StatusId]) 
        REFERENCES [Statuses]([Id]) ON DELETE NO ACTION
);
GO

-- Create indexes
CREATE INDEX [IX_StockProducts_InternalCode] ON [StockProducts]([InternalCode]);
CREATE INDEX [IX_StockProducts_StatusId] ON [StockProducts]([StatusId]);
GO

-- Create EF Migrations History table
CREATE TABLE [__EFMigrationsHistory] (
    [MigrationId] NVARCHAR(150) NOT NULL,
    [ProductVersion] NVARCHAR(32) NOT NULL,
    CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
);
GO

-- =============================================
-- INSERT DATA
-- =============================================

-- Insert Statuses
SET IDENTITY_INSERT [Statuses] ON;
GO

INSERT INTO Statuses (Id, Description) VALUES (1, 'Ativo');
INSERT INTO Statuses (Id, Description) VALUES (2, 'Vendido');
INSERT INTO Statuses (Id, Description) VALUES (3, 'Expirado');

SET IDENTITY_INSERT [Statuses] OFF;
GO

-- Insert EF Migration History
INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250919223906_InitialCreate', N'9.0.9');
GO

-- =============================================
-- VERIFICATION
-- =============================================

PRINT 'Database backup script completed successfully!';
PRINT 'Tables created:';
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME;
GO

PRINT 'Row counts:';
SELECT 'Catalogs' AS TableName, COUNT(*) AS RowCount FROM Catalogs
UNION ALL
SELECT 'Statuses', COUNT(*) FROM Statuses
UNION ALL
SELECT 'Users', COUNT(*) FROM Users
UNION ALL
SELECT 'StockProducts', COUNT(*) FROM StockProducts;
GO
