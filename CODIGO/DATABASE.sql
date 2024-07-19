-- Criar o banco de dados
CREATE DATABASE postapp;

-- Selecionar o banco de dados
USE postapp;

-- Criar a tabela postagens
CREATE TABLE postagens (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(255) NOT NULL,
    conteudo NVARCHAR(MAX),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE() 
);


